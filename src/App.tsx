import { Routes, Route } from "react-router-dom";
import RewardScale from "./pages/RewardScale";
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/start-game" element={<StartGame />} />
				<Route path="/score" element={<RewardScale />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
