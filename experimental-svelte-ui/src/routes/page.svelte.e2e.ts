import { expect, test } from "@playwright/test"

test("home page renders selected shapes", async ({ page }) => {
	await page.goto("/")
	await page.locator("#selectShape").selectOption(["Square", "Circle"])

	await expect(page.locator("#square")).toBeVisible()
	await expect(page.locator("#circle")).toBeVisible()
})
