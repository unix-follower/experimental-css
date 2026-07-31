import { page } from "vitest/browser"
import { describe, expect, it } from "vitest"
import { render } from "vitest-browser-svelte"
import Shape from "./Shape.svelte"

function nextFrame() {
	return new Promise<void>((resolve) => {
		requestAnimationFrame(() => resolve())
	})
}

describe("Shape.svelte", () => {
	it("renders an empty state before a selection and updates after multi-select changes", async () => {
		render(Shape)

		expect(document.querySelector("#square")).toBeNull()
		await expect
			.element(page.getByText("Select one or more shapes to preview them."))
			.toBeInTheDocument()

		const select = document.querySelector("#selectShape") as HTMLSelectElement
		for (const option of Array.from(select.options)) {
			option.selected = option.value === "Square" || option.value === "Circle"
		}
		select.dispatchEvent(new Event("change", { bubbles: true }))
		await nextFrame()

		expect(document.querySelector("#square")).not.toBeNull()
		expect(document.querySelector("#circle")).not.toBeNull()
	})

	it("renders any initial selection passed through props", async () => {
		render(Shape, { initialSelection: ["Heart"] })
		await nextFrame()

		expect(document.querySelector("#heart")).not.toBeNull()
		expect(document.querySelector("#square")).toBeNull()
	})
})
