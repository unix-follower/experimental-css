import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library"

import Shape from "./Shape"

afterEach(() => {
  cleanup()
})

function setSelectedShapes(select: HTMLSelectElement, values: string[]) {
  for (const option of Array.from(select.options)) {
    option.selected = values.includes(option.value)
  }

  fireEvent.change(select)
}

describe("Shape", () => {
  it("renders the available shape options", () => {
    render(() => <Shape />)

    const select = screen.getByLabelText("Choose shapes:") as HTMLSelectElement

    expect(select.multiple).toBe(true)
    expect(select.options.length).toBeGreaterThan(0)
    expect(Array.from(select.options).some((option) => option.value === "Square")).toBe(true)
    expect(Array.from(select.options).some((option) => option.value === "Circle")).toBe(true)
  })

  it("renders the selected shapes", () => {
    const { container } = render(() => <Shape />)

    const select = screen.getByLabelText("Choose shapes:") as HTMLSelectElement
    setSelectedShapes(select, ["Square", "Circle"])

    expect(container.querySelector("#square")).not.toBeNull()
    expect(container.querySelector("#circle")).not.toBeNull()
  })

  it("replaces the rendered shapes when selection changes", () => {
    const { container } = render(() => <Shape />)

    const select = screen.getByLabelText("Choose shapes:") as HTMLSelectElement
    setSelectedShapes(select, ["Square", "Circle"])
    setSelectedShapes(select, ["Rectangle"])

    expect(container.querySelector("#square")).toBeNull()
    expect(container.querySelector("#circle")).toBeNull()
    expect(container.querySelector("#rectangle")).not.toBeNull()
  })
})
