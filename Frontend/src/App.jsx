import Router from "./routes/Router"

function App() {
  console.log('port', import.meta.env.VITE_PORT);
  console.log('port', import.meta.env.VITE_BASE_URL);
  return (
    <>
      <Router />
    </>
  )
}

export default App
