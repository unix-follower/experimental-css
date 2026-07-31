const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(() => true),
  setParams: jest.fn(),
}

export const useRouter = jest.fn(() => mockRouter)
export const useLocalSearchParams = jest.fn(() => ({}))
export const useGlobalSearchParams = jest.fn(() => ({}))
export const usePathname = jest.fn(() => "/")
export const useSearchParams = jest.fn(() => ({}))

export const router = mockRouter

// Satisfy expo-router's global augmentation
if (typeof globalThis !== "undefined") {
  globalThis.expo = {
    ...globalThis.expo,
    router: mockRouter,
  } as unknown as typeof globalThis.expo
}
