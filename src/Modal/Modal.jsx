import './Modal.css'

export default function Modal({ message, onClick }) {
    return(
        <div className="modal">
                <div className="modal-contents">
                    <p>{ message }</p>
                    <button onClick={onClick}>Play Again!</button>
                </div>
            </div>
    )
}