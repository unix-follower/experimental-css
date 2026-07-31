import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import App from "@/App"

describe("App component", () => {
  test("renders home page", () => {
    // given
    render(<App />)

    // then
    const shapePicker = screen.getByText("Choose shapes:")
    expect(shapePicker).toBeInTheDocument()
  })
})
