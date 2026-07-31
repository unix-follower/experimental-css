import { test, expect, _electron as electron } from "@playwright/test"

test("Launch app and verify home screen", async () => {
  // when
  const electronApp = await electron.launch({
    args: ["."],
    env: {
      ...process.env,
      IS_TEST: "true",
    },
  })

  const window = await electronApp.firstWindow()
  // then
  expect(await window.title()).toBe("Hello World!")

  const header = window.locator("h1").first()
  await expect(header).toHaveText("💖 Hello World!")

  await electronApp.close()
})
