import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import ShapePicker from "@/components/ShapePicker"

describe("ShapePicker component snapshot", () => {
  test("renders ShapePicker component", () => {
    const { container } = render(<ShapePicker />)
    expect(container).toMatchSnapshot()
  })
})
