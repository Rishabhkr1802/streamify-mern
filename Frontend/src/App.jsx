import Router from "./Routes/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-light vh-100">
      <Router />
      <Toaster/>
    </div>
  )
}

export default App;
