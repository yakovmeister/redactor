import redact from "@src/index";
import * as basic from "./samples/basic.json";
import * as basic2 from "./samples/basic_with_numerical_values.json";
import * as basic3 from "./samples/basic_with_nested.json";
import * as nested from "./samples/nested.json";
import * as nested2 from "./samples/nested_with_array.json";
import Basic from "./samples/basic.type";
import BasicWithNumericalValue from "./samples/basic_with_numerical_values.type";
import BasicWithNested from "./samples/basic_with_nested.type";
import Nested from "./samples/nested.type";
import NestedWithArray from "./samples/nested_with_array.type";
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

  it("should redact nested properties", async () => {
    const redactRule = redact([
      "first",
      "city"
    ]);

    const redacted: Nested = redactRule(nested);

    expect(redacted.name).to.haveOwnProperty("first");
    expect(redacted.name.first).to.be.equal("J██n");
    expect(redacted.name).to.haveOwnProperty("first");
    expect(redacted.name.last).to.be.equal("Doe");
    expect(redacted.address).to.have.haveOwnProperty("street");
    expect(redacted.address.street).to.be.equal("14th Greenland, Cartimar");
    expect(redacted.address).to.haveOwnProperty("city");
    expect(redacted.address.city).to.be.equal("P████████y");
  });

  it("should redact nested properties from array", async () => {
    const redactRule = redact([
      "first",
      "city"
    ]);

    const redacted: NestedWithArray = redactRule(nested2);

    expect(redacted.names[0]).to.haveOwnProperty("first");
    expect(redacted.names[0].first).to.be.equal("J██n");
    expect(redacted.names[0]).to.haveOwnProperty("last");
    expect(redacted.names[0].last).to.be.equal("Doe");
    expect(redacted.names[1]).to.haveOwnProperty("first");
    expect(redacted.names[1].first).to.be.equal("V███e");
    expect(redacted.names[1]).to.haveOwnProperty("last");
    expect(redacted.names[1].last).to.be.equal("Doe");
    expect(redacted.names[2]).to.haveOwnProperty("first");
    expect(redacted.names[2].first).to.be.equal("S█████n");
    expect(redacted.names[2]).to.haveOwnProperty("last");
    expect(redacted.names[2].last).to.be.equal("Cooper");
    expect(redacted.address).to.have.haveOwnProperty("street");
    expect(redacted.address.street).to.be.equal("14th Greenland, Cartimar");
    expect(redacted.address).to.haveOwnProperty("city");
    expect(redacted.address.city).to.be.equal("P████████y");
  });

  it("should fully redact basic plain string key pair", async () => {
    const options = {
      fullRedaction: true
    };
    const redactRule = redact([
      "last_name",
      "birthday"
    ], options);

    const redacted: Basic = redactRule(basic);

    expect(redacted.first_name).to.be.equal("John");
    expect(redacted.country).to.be.equal("PH");
    expect(redacted.last_name).to.be.equal("███");
    expect(redacted.birthday).to.be.equal("███████████████");
  });

  it("should change redactor character", async () => {
    const options = {
      maskCharacter: "X",
      fullRedaction: true
    };
    const redactRule = redact([
      "last_name",
      "birthday"
    ], options);

    const redacted: Basic = redactRule(basic);

    expect(redacted.first_name).to.be.equal("John");
    expect(redacted.country).to.be.equal("PH");
    expect(redacted.last_name).to.be.equal("XXX");
    expect(redacted.birthday).to.be.equal("XXXXXXXXXXXXXXX");
  });
});
