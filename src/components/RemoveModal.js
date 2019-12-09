import React from 'react';
import Modal from 'react-modal';

const RemoveModal = (props) => (
	<Modal
		isOpen={props.delete}
		contentLabel="Are you sure you want to remove this expense?"
		onRequestClose={props.handleCancelDeleteExpense}
		closeTimeoutMS={200}
		className="modal"
		ariaHideApp={false}
	>
		<h3 className="modal__title">Are you sure you want to remove this expense?</h3>
		<button className="button button--modal" onClick={props.handleDeleteExpense}>Yes</button>
		<button className="button button--modal" onClick={props.handleCancelDeleteExpense}>No</button>
	</Modal>
);

export default RemoveModal;