import { FC } from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/image.webp";

const Home: FC = () => {
	return (
		<div className="home-page d-flex align-items-center justify-content-center">
			<div className="d-flex flex-column align-items-center justify-content-center">
				<img src={image} className="w-25" alt="background-image" />
				<Link
					to="/start-game"
					className="border-2 rounded-5 p-3 text-white bg-dark mt-4 text-decoration-none"
				>
					Start Game
				</Link>
			</div>
		</div>
	);
};

export default Home;
