import {
  StackContext,
  Cognito,
  Api,
  Bucket,
  StaticSite,
} from "@serverless-stack/resources";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export function HackStack({ stack, app }: StackContext) {
  // User pool for minimum access to S3 bucket
  const auth = new Cognito(stack, "Auth", {
    login: ["email", "phone"],
  });

  // An API
  const api = new Api(stack, "RandomAPI", {
    defaults: {
      authorizer: "iam",
    },
    routes: {
      // Some random public API
      "GET /public": {
        function: "functions/lambda.handler",
        authorizer: "none",
      },
    },
  });

  // A good old S3 bucket
  const bucket = new Bucket(stack, "Bucket", {
    notifications: {
      transcribe: {
        function: {
          handler: "functions/transcribe.handler",
        },
        events: ["object_created"],
      },
    },
  });

  auth.attachPermissionsForUnauthUsers(auth, [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:PutObject",
        "s3:GetObject",
        // Stuff to allow multipart uploads
        "s3:ListMultipartUploadParts",
        "s3:CreateMultipartUpload",
        "s3:CompleteMultipartUpload",
        "s3:AbortMultipartUpload",
        "s3:ListBucket",
        "s3:PutObjectAcl",
      ],
      // Restricted to cognito's user sub
      resources: [
        `${bucket.bucketArn}/private/\${cognito-identity.amazonaws.com:sub}/*`,
      ],
    }),
  ]);

  // Allow authenticated users to invoke the API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  const site = new StaticSite(stack, "StaticNextJsSite", {
    path: "frontend",
    buildCommand: "npm run build",
    buildOutput: "out",
    purgeFiles: false,
    // Otherwise, deploys will cause a bunch of CLI time..
    waitForInvalidation: false,
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_BUCKET_NAME: bucket.bucketName,
      NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
    BucketName: bucket.bucketName,
  });
}
