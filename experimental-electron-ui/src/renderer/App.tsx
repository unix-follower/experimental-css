import ShapePicker from "@/components/ShapePicker"

export default function App() {
  console.log("App component rendered")
  return (
    <div className="app-container">
      <h1>Welcome to Electron!</h1>
      <ShapePicker />
    </div>
  )
}
