import Router from "./Routes/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-light vh-100 text-light">
      <Router />
      <Toaster/>
    </div>
  )
}

export default App;
