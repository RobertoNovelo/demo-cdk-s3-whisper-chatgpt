import { Amplify, API } from "aws-amplify";

try {
  Amplify.configure({
    Auth: {
      mandatorySignIn: false,
      region: process.env.NEXT_PUBLIC_REGION,
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
      userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    },
    API: {
      endpoints: [
        {
          name: "random-api",
          region: process.env.NEXT_PUBLIC_REGION,
          endpoint: process.env.NEXT_PUBLIC_API_URL,
        },
      ],
    },
    Storage: {
      AWSS3: {
        bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_REGION,
      },
    },
  });
} catch (error) {
  // ---
}
