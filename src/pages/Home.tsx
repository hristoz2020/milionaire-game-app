import { FC } from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/image.webp";
import { playGameSound } from "../helpers/soundsCommands";

const Home: FC = () => (
	<div className="home-page d-flex justify-content-center">
		<div className="d-flex flex-column align-items-center">
			<img
				src={image}
				className="w-25 mt-5 mb-3"
				alt="background-image"
			/>
			<Link
				to="/start-game"
				className="btn btn-dark rounded-5 p-3 mt-4 text-decoration-none col-5 col-sm-4"
				onClick={playGameSound}
			>
				Start Game
			</Link>
		</div>
	</div>
);

export default Home;
