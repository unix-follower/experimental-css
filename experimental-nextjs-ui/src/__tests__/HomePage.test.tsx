import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Page from "@/app/page"

describe("Home page", () => {
  test("renders home page", () => {
    // given
    render(<Page />)

    // then
    const menu = screen.getByText("To get started, edit the page.tsx file.")
    expect(menu).toBeInTheDocument()
  })
})
