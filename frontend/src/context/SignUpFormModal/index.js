import React, { useState } from "react";
import UserLoginForm from "../../components/UserLoginForm";
import { Modal } from "../../context/Modal";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import SignUpForm from "../../components/SignUpForm";

function SignUpFormModal() {
  const [showSignUpModal, setSignUpShowModal] = useState(false);

  return (
    <>
      <img
        className="nav__profile__picture"
        src="/api/images/aa32be9f0cf08a175725c2748989a3a1"
        onClick={() => setSignUpShowModal(true)}
      />

      {showSignUpModal && (
        <Modal onClose={() => setSignUpShowModal(false)}>
          <SignUpForm></SignUpForm>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
