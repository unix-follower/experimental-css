import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Welcome from "@/welcome/welcome"

describe("Welcome component", () => {
  test("renders welcome page", () => {
    // given
    render(<Welcome />)

    // then
    const shapePicker = screen.getByText("Choose shapes:")
    expect(shapePicker).toBeInTheDocument()
  })
})
