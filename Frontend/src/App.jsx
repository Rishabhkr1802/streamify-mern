import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-dark vh-100 text-light">
      <Router />
      <Toaster/>
    </div>
  )
}

export default App
