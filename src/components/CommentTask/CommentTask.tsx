import Popup from "components/Popup/Popup"

interface CommentTaskProps {
	handleShowPopup: () => void;
}

const CommentTask = ({ handleShowPopup }: CommentTaskProps) => {
	return (
		<>
			<Popup close = {handleShowPopup}>
				<>huila</>
			</Popup>
		</>
	)
}

export default CommentTask