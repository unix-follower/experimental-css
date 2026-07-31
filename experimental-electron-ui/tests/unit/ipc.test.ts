import { describe, it, expect, vi } from "vitest"

// Mock the window.electron API exposed via preload script
const mockSend = vi.fn()
vi.stubGlobal("electron", {
  send: mockSend,
})

describe("IPC Wrapper", () => {
  it("should send events over IPC", () => {
    window.electron.send("ping", "hello")
    expect(mockSend).toHaveBeenCalledWith("ping", "hello")
  })
})
