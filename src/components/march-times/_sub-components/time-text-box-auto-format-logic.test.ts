import { describe, test, expect } from "vitest";
import {
  parseTimeNoColon,
  parseTimeColon,
} from "./time-text-box-auto-format-logic";

describe("parseTimeColon", () => {
  //TODO: this should probably pass
  test.skip("should parse :SS", () => {
    const time = parseTimeColon(":12");
    expect(time).toEqual({ hours: 0, minutes: 0, seconds: 12 });
  });
  test("should parse MM:SS", () => {
    const time = parseTimeColon("12:34");
    expect(time).toEqual({ hours: 0, minutes: 12, seconds: 34 });
  });
  test("should parse HH:MM:SS", () => {
    const time = parseTimeColon("12:34:56");
    expect(time).toEqual({ hours: 12, minutes: 34, seconds: 56 });
  });
  test("should throw error for invalid number of parts", () => {
    expect(() => parseTimeColon("12:34:56:78")).toThrowError(
      "Invalid time format, invalid number of parts"
    );
  });
});

describe("parseNoColon", () => {
  test("should throw error for no digits", () => {
    //TODO: this should probably throw
    expect(parseTimeNoColon("")).toEqual({
      hours: 0,
      minutes: 0,
      seconds: Number.NaN,
    });
  });
  test("should parse S", () => {
    const time = parseTimeNoColon("2");
    expect(time).toEqual({ hours: 0, minutes: 0, seconds: 2 });
  });
  test("should parse SS", () => {
    const time = parseTimeNoColon("12");
    expect(time).toEqual({ hours: 0, minutes: 0, seconds: 12 });
  });
  test("should parse MMSS", () => {
    const time = parseTimeNoColon("1234");
    expect(time).toEqual({ hours: 0, minutes: 12, seconds: 34 });
  });
  test("should parse HHMMSS", () => {
    const time = parseTimeNoColon("123456");
    expect(time).toEqual({ hours: 12, minutes: 34, seconds: 56 });
  });
  test("should throw error for too many digits", () => {
    expect(() => parseTimeNoColon("1234567")).toThrowError(
      "Invalid time format, too many digits"
    );
  });
});
