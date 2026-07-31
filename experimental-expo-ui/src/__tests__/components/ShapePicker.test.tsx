import { render, screen } from "@testing-library/react-native"
import ShapePicker from "@/components/ShapePicker"

describe("ShapePicker component", () => {
  test("renders shape picker", async () => {
    // given
    await render(<ShapePicker />)

    // then
    const shapePicker = screen.getByText("Choose shapes:")
    expect(shapePicker).toBeOnTheScreen()
  })
})
