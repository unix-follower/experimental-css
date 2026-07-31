import { useSyncExternalStore } from "react"
import { useColorScheme as useRNColorScheme } from "react-native"

const emptySubscribe = () => () => {}

function useHasHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  )
}

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const hasHydrated = useHasHydrated()

  const colorScheme = useRNColorScheme()

  if (hasHydrated) {
    return colorScheme
  }

  return "light"
}
