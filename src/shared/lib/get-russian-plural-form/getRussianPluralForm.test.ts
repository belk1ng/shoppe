import { getRussianPluralForm } from "./getRussianPluralForm";

const STAR_PLURALS: [string, string, string] = ["звезда", "звезды", "звезд"];
const APPLE_PLURALS: [string, string, string] = ["яблоко", "яблока", "яблок"];

describe("getRussianPluralForm", () => {
  it("should return the correct form for the number 1 (singular)", () => {
    expect(getRussianPluralForm(1, STAR_PLURALS)).toBe("1 звезда");
    expect(getRussianPluralForm(1, APPLE_PLURALS)).toBe("1 яблоко");
  });

  it("should return the correct form for numbers ending in 2–4 (except 12–14)", () => {
    expect(getRussianPluralForm(2, STAR_PLURALS)).toBe("2 звезды");
    expect(getRussianPluralForm(3, APPLE_PLURALS)).toBe("3 яблока");
    expect(getRussianPluralForm(4, ["кот", "кота", "котов"])).toBe("4 кота");
  });

  it("should return the correct form for numbers ending in 5–9", () => {
    expect(getRussianPluralForm(5, STAR_PLURALS)).toBe("5 звезд");
    expect(getRussianPluralForm(9, APPLE_PLURALS)).toBe("9 яблок");
    expect(getRussianPluralForm(7, ["кот", "кота", "котов"])).toBe("7 котов");
  });

  it("should return the correct form for the number 0", () => {
    expect(getRussianPluralForm(0, STAR_PLURALS)).toBe("0 звезд");
    expect(getRussianPluralForm(0, APPLE_PLURALS)).toBe("0 яблок");
  });

  it("should return the correct form for numbers ending in 11–14", () => {
    expect(getRussianPluralForm(11, STAR_PLURALS)).toBe("11 звезд");
    expect(getRussianPluralForm(13, APPLE_PLURALS)).toBe("13 яблок");
  });

  it("should return the correct form for numbers greater than 20 ending in 1", () => {
    expect(getRussianPluralForm(21, STAR_PLURALS)).toBe("21 звезда");
    expect(getRussianPluralForm(31, APPLE_PLURALS)).toBe("31 яблоко");
  });

  it("should return the correct form for numbers greater than 20 ending in 2–4", () => {
    expect(getRussianPluralForm(22, STAR_PLURALS)).toBe("22 звезды");
    expect(getRussianPluralForm(33, APPLE_PLURALS)).toBe("33 яблока");
  });

  it("should return the correct form for numbers greater than 20 ending in 5–9", () => {
    expect(getRussianPluralForm(25, STAR_PLURALS)).toBe("25 звезд");
    expect(getRussianPluralForm(39, APPLE_PLURALS)).toBe("39 яблок");
  });

  it("should return the correct form for numbers greater than 100 ending in 0", () => {
    expect(getRussianPluralForm(100, STAR_PLURALS)).toBe("100 звезд");
    expect(getRussianPluralForm(200, APPLE_PLURALS)).toBe("200 яблок");
  });

  it("should return the correct form for numbers greater than 100 ending in 1", () => {
    expect(getRussianPluralForm(101, STAR_PLURALS)).toBe("101 звезда");
    expect(getRussianPluralForm(201, APPLE_PLURALS)).toBe("201 яблоко");
  });

  it("should return the correct form for numbers greater than 100 ending in 2–4", () => {
    expect(getRussianPluralForm(102, STAR_PLURALS)).toBe("102 звезды");
    expect(getRussianPluralForm(203, APPLE_PLURALS)).toBe("203 яблока");
  });

  it("should return the correct form for numbers greater than 100 ending in 5–9", () => {
    expect(getRussianPluralForm(105, STAR_PLURALS)).toBe("105 звезд");
    expect(getRussianPluralForm(209, APPLE_PLURALS)).toBe("209 яблок");
  });

  it("should return the correct form for negative numbers (singular)", () => {
    expect(getRussianPluralForm(-1, STAR_PLURALS)).toBe("-1 звезда");
    expect(getRussianPluralForm(-1, APPLE_PLURALS)).toBe("-1 яблоко");
  });

  it("should return the correct form for negative numbers (plural)", () => {
    expect(getRussianPluralForm(-2, STAR_PLURALS)).toBe("-2 звезды");
    expect(getRussianPluralForm(-5, APPLE_PLURALS)).toBe("-5 яблок");
  });

  it("should return the correct form for fractional numbers (plural)", () => {
    expect(getRussianPluralForm(2.5, STAR_PLURALS)).toBe("2.5 звезды");
    expect(getRussianPluralForm(5.7, APPLE_PLURALS)).toBe("5.7 яблок");
  });

  it("should return the correct form for numbers ending in 0 (plural)", () => {
    expect(getRussianPluralForm(10, STAR_PLURALS)).toBe("10 звезд");
    expect(getRussianPluralForm(20, APPLE_PLURALS)).toBe("20 яблок");
  });
});
