import React, { useState } from "react";

import { SideModal } from "../SideModal/Index";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import EditBoatForm from "../../components/forms/EditBoatForm/EditBoatForm";

function EditBoatModal({ boat }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="boat__manager__edit__listing" onClick={() => setShowModal(true)}>
        Edit
      </div>

      {showModal && (
        <SideModal onClose={() => setShowModal(false)}>
          <EditBoatForm boat={boat} setShowModal={setShowModal}></EditBoatForm>
        </SideModal>
      )}
    </>
  );
}

export default EditBoatModal;
