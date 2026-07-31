import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Welcome from "@/welcome/welcome"

describe("Welcome component snapshot", () => {
  test("renders Welcome component", () => {
    const { container } = render(<Welcome />)
    expect(container).toMatchSnapshot()
  })
})
