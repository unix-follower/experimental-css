import "@testing-library/jest-native"

jest.mock("expo-router", () => {
  const actual = jest.requireActual("expo-router")
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    })),
    useLocalSearchParams: jest.fn(() => ({})),
    useGlobalSearchParams: jest.fn(() => ({})),
    usePathname: jest.fn(() => "/"),
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    },
  }
})

jest.mock("expo-constants", () => ({
  expoConfig: { name: "TestApp", version: "1.0.0" },
}))
