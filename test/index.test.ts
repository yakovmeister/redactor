import redact from "@src/index";
import * as basic from "./samples/basic.json";
import * as basic2 from "./samples/basic_with_numerical_values.json";
import * as basic3 from "./samples/basic_with_nested.json";
import Basic from "./samples/basic.type";
import BasicWithNumericalValue from "./samples/basic_with_numerical_values.type";
import BasicWithNested from "./samples/basic_with_nested.type";
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

  it("should redact basic with numeric key pair value", async () => {
    const redactRule = redact([
      "age",
      "birthday"
    ]);

    const redacted: BasicWithNumericalValue = redactRule(basic2);

    expect(redacted.first_name).to.be.equal("John");
    expect(redacted.country).to.be.equal("PH");
    expect(redacted.last_name).to.be.equal("Doe");
    expect(redacted.birthday).to.be.equal("J█████████████1");
    expect(redacted.age).to.be.equal("██");
  });

  it("should NOT redact specified key with nested object as value", async () => {
    const redactRule = redact([
      "address",
      "first_name"
    ]);

    const redacted: BasicWithNested = redactRule(basic3);

    expect(redacted.first_name).to.be.equal("J██n");
    expect(redacted.country).to.be.equal("PH");
    expect(redacted.last_name).to.be.equal("Doe");
    expect(redacted.birthday).to.be.equal("January 1, 1991");
    expect(redacted.address).not.to.be.a("string");
    expect(redacted.address).to.have.haveOwnProperty("street");
  });
});
