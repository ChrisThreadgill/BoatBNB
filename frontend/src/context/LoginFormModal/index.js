import React, { useState } from "react";
import UserLoginForm from "../../components/UserLoginForm";
import { Modal } from "../../context/Modal";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login__modal__button" onClick={() => setShowModal(true)}>
        <FaSignInAlt className="sign__in__buttons"></FaSignInAlt>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserLoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
