import { setIsCallAFrendClicked, setIsCallAFrendUsed } from "../redux/slices/jokersSlice";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";

const PhoneAFrendModal = () => {
	const dispatch = useAppDispatch();
	const { isCallAFrendClicked, isCallAFrendUsed } = useAppSelector(
		(state: RootState) => state.jokers
	);
	const { questions, currentQuestionIndex } = useAppSelector(
		(state: RootState) => state.questions
	);

	const closeModal = () => {
		dispatch(setIsCallAFrendClicked(!isCallAFrendClicked));
		dispatch(setIsCallAFrendUsed(!isCallAFrendUsed));
	};

	return (
		<div
			className={`modal fade ${
				isCallAFrendClicked ? "show d-block" : "d-none"
			} `}
			id="callFrendModal"
			tabIndex={-1}
			aria-labelledby="callFrendModalLabel"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1
							className="modal-title fs-5 m-auto"
							id="callFrendModalLabel"
						>
							Call to friend
						</h1>
					</div>
					<div className="modal-body">
						Your friend says: “Are you sure you read the question
						correctly? Because if you did, you’d know the correct
						answer is obviously
						{questions[currentQuestionIndex]?.correct_answer}.”
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary m-auto"
							data-bs-dismiss="modal"
							onClick={closeModal}
						>
							Continue game
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PhoneAFrendModal;
