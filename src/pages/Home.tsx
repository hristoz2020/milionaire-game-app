import { FC } from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/image.webp";

const Home: FC = () => {
	return (
		<div className="home-page d-flex justify-content-center">
			<div className="d-flex flex-column align-items-center">
				<img src={image} className="w-25 mt-5 mb-3" alt="background-image" />
				<Link
					to="/start-game"
					className="rounded-5 p-3 text-white text-center bg-dark mt-4 text-decoration-none col-3"
				>
					Start Game
				</Link>
			</div>
		</div>
	);
};

export default Home;
