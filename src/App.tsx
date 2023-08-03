import { Routes, Route } from "react-router-dom";
import RewardScale from "./pages/RewardScale";
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/start-game" element={<StartGame />} />
			<Route path="/score" element={<RewardScale />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
