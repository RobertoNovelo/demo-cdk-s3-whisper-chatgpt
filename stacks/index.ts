import { HackStack } from "./HackStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
    environment: {
      REGION: app.region,
    },
  });
  app.stack(HackStack);
}
