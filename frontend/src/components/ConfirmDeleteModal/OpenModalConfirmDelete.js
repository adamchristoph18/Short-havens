import React from "react";
import { useModal } from "../../context/Modal";
import "./ConfirmDeleteModal.css";

function OpenModalConfirmDelete({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = (e) => {
      e.stopPropagation();
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (onItemClick) onItemClick();
    };

    return (
      <div className='delete-button clickable' onClick={onClick}>{itemText}</div>
    );
  }

  export default OpenModalConfirmDelete;
