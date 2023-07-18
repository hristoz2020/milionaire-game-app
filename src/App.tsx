import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-game" element={<StartGame />} />
      </Routes>
    </div>
  )
}

export default App
