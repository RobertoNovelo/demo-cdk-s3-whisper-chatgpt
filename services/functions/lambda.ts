import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import fetch from "node-fetch";

export const handler = async (event: any) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "text-davinci-003",
        max_tokens: 4000,
        temperature: 1.0,
        prompt,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHATGPT_API_KEY || ""}`,
      },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: `ChatGPT is unavailable at the moment`,
    };
  }
};
