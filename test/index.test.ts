import redact from "@src/index";
import * as basic from "./samples/basic.json";
import Basic from "./samples/basic.type";
import { expect } from "chai";

describe("redactor", () => {
  it("should redact basic plain string key pair", async () => {
    const redactRule = redact([
      "last_name",
      "birthday"
    ]);

    const redacted: Basic = redactRule(basic);

    expect(redacted.first_name).to.be.equal("John");
    expect(redacted.country).to.be.equal("PH");
    expect(redacted.last_name).to.be.equal("███");
    expect(redacted.birthday).to.be.equal("J█████████████1");
  });
});
