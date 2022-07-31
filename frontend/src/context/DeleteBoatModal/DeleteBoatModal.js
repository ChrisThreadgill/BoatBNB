import React, { useState } from "react";

import { Modal } from "../../context/Modal";

import DeleteBoatForm from "../../components/forms/DeleteBoat/DeleteBoatForm";

function DeleteBoatModal({ boat }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="boat__manager__delete__listing" onClick={() => setShowModal(true)}>
        Delete listing
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBoatForm boat={boat} setShowModal={setShowModal}></DeleteBoatForm>
        </Modal>
      )}
    </>
  );
}

export default DeleteBoatModal;
