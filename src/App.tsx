import { RouterProvider } from "react-router"
import { Analytics } from "@vercel/analytics/react"
import IntroLoader from "./components/IntroLoader"
import { router } from "./routes"

export default function App() {
  return (
    <>
      <IntroLoader />
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}
