import { configurationVariables } from "./configurationVariables";

const { appId, apiKey } = configurationVariables;

describe("Environment Variables", () => {
  it("API Key should be defined", () => {
    expect(apiKey).toBeDefined();
  });

  it("API URL should be defined", () => {
    expect(appId).toBeDefined();
  });
});
