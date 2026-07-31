import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ShapePicker from "@/components/ShapePicker"

describe("ShapePicker component", () => {
  test("renders ShapePicker component", () => {
    // given
    render(<ShapePicker />)

    // then
    const shapePicker = screen.getByText("Choose shapes:")
    expect(shapePicker).toBeInTheDocument()
  })
})
