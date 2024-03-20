import "./App.css"
import Layouts from "./components/layouts"
import Hero from "./components/hero"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient= new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Layouts>
        <Hero />
      </Layouts>
    </QueryClientProvider>
  )
}

export default App