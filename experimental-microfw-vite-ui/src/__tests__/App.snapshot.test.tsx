import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import App from "@/App"

describe("App component snapshot", () => {
  test("renders App component", () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
