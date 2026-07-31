import { describe, expect, it } from "vitest"
import { setupCounter } from "@/counter"

describe("setupCounter", () => {
  it("sets up the counter correctly", () => {
    const button = document.createElement("button")
    setupCounter(button)
    expect(button.innerHTML).toBe("Count is 0")
  })
})
