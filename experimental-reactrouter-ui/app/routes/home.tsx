import type { Route } from "./+types/home"
import Welcome from "../welcome/welcome"

// eslint-disable-next-line no-empty-pattern, react-refresh/only-export-components
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return <Welcome />
}
