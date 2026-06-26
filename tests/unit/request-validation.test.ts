import { describe, expect, it } from "vitest";
import {
  validateTitle,
  validateDescription,
  validateLocation,
  validateCategory,
  validateRequestNumber,
} from "../../src/utils/validation";

describe("Validation Unit Tests", () => {
  describe("validateTitle", () => {
    it("should accept valid titles", () => {
      expect(validateTitle("Proyektor Kelas Rusak")).toBe(true);
      expect(validateTitle("Lampu Selasar Mati")).toBe(true);
    });

    it("should trim leading and trailing spaces", () => {
      expect(validateTitle("   AC Kelas Rusak   ")).toBe(true);
    });

    it("should reject too short titles", () => {
      expect(validateTitle("AC")).toBe(false);
      expect(validateTitle("    ")).toBe(false);
    });

    it("should reject too long titles", () => {
      const longTitle = "a".repeat(101);
      expect(validateTitle(longTitle)).toBe(false);
    });
  });

  describe("validateDescription", () => {
    it("should accept valid descriptions (>= 20 characters)", () => {
      expect(validateDescription("AC di kelas R.302 tidak dingin dan berisik sekali.")).toBe(true);
      expect(validateDescription("Lampu di toilet selasar Lt. 2 mati total sejak pagi.")).toBe(true);
    });

    it("should reject too short descriptions", () => {
      expect(validateDescription("rusak")).toBe(false);
      expect(validateDescription("1234567890123459")).toBe(false); // 16 chars
    });

    it("should reject too long descriptions", () => {
      const longDesc = "a".repeat(1001);
      expect(validateDescription(longDesc)).toBe(false);
    });
  });

  describe("validateLocation", () => {
    it("should accept valid locations", () => {
      expect(validateLocation("R.302")).toBe(true);
      expect(validateLocation("Selasar Lt.2")).toBe(true);
    });

    it("should trim leading and trailing spaces", () => {
      expect(validateLocation("   R.302   ")).toBe(true);
    });

    it("should reject empty or too short locations", () => {
      expect(validateLocation("")).toBe(false);
      expect(validateLocation("R.")).toBe(false);
      expect(validateLocation("   ")).toBe(false);
    });
  });

  describe("validateCategory", () => {
    it("should accept valid categories", () => {
      expect(validateCategory("Internet & Jaringan")).toBe(true);
      expect(validateCategory("Pendingin Ruangan (AC)")).toBe(true);
      expect(validateCategory("Peralatan Kelas")).toBe(true);
      expect(validateCategory("Alat Laboratorium")).toBe(true);
      expect(validateCategory("Kebersihan & Sanitasi")).toBe(true);
      expect(validateCategory("Lainnya")).toBe(true);
    });

    it("should reject invalid categories", () => {
      expect(validateCategory("Makanan")).toBe(false);
      expect(validateCategory("Parkiran")).toBe(false);
      expect(validateCategory("")).toBe(false);
    });
  });

  describe("validateRequestNumber", () => {
    it("should accept valid request numbers", () => {
      expect(validateRequestNumber("CSR-20260626-0001")).toBe(true);
      expect(validateRequestNumber("CSR-20241231-9999")).toBe(true);
    });

    it("should reject invalid request numbers", () => {
      expect(validateRequestNumber("CSR-20260626-001")).toBe(false); // suffix too short
      expect(validateRequestNumber("CSR-260626-0001")).toBe(false);  // date too short
      expect(validateRequestNumber("REQ-20260626-0001")).toBe(false);  // wrong prefix
      expect(validateRequestNumber("")).toBe(false);
    });
  });
});
