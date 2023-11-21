import { MemoryRouter } from "react-router-dom"
import Contexts from "./contexts"

const TestContexts = ({ children }) => {
  return (
    <MemoryRouter>
      <Contexts>
        { children }
      </Contexts>
    </MemoryRouter>
  )
}

export default TestContexts;