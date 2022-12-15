// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/transcribe-examples-section.html

import {
  S3ObjectCreatedNotificationEvent,
  S3BatchEvent,
  S3BatchHandler,
  S3Handler,
} from "aws-lambda";
import {
  TranscribeClient,
  StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";
// Set the AWS Region.
const REGION = process.env.REGION;
// Create an Amazon Transcribe service client object.
const transcribeClient = new TranscribeClient({ region: REGION });

const awsTranscribePrefix = `_result-`;
const chatGPTPrefix = `_chatgptresult-`;

export const handler = async (event) => {
  // Hardcoded
  const s3Record = event.Records[0].s3;

  // Grab the filename and bucket name
  const Key = s3Record.object.key;
  const Bucket = s3Record.bucket.name;

  // Do nothing if file comes from AWS Transcribe write check or final chatGPTResult
  if (Key.startsWith(chatGPTPrefix) || /\.temp$/.test(Key)) {
    return;
  }
  // Do nothing if the file is the result or AWS's Transcribe write check.
  if (Key.startsWith(awsTranscribePrefix)) {
    return await sendToChatGPT();
  }
  // Create the new filename with the dimensions
  const newKey = `${awsTranscribePrefix}-${Key}`;
  const params = {
    TranscriptionJobName: newKey,
    LanguageCode: "en-US",
    MediaFormat: "mp3", // For example, 'wav'
    Media: {
      MediaFileUri: `s3://${Bucket}/${Key}`,
      // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
    },
    OutputBucketName: process.env.BUCKET_NAME,
  };
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    console.log("Success - put", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
  return true;
};

function sendToChatGPT() {
  return true;
}
