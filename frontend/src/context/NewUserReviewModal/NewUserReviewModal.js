import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import { SideModal } from "../SideModal/Index";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import UserReviewForm from "../../components/forms/UserReviewRating/UserReview";

function NewUserReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user__review__form__modal__button" onClick={() => setShowModal(true)}>
        Leave a review
      </button>
      {showModal && (
        <SideModal onClose={() => setShowModal(false)}>
          <UserReviewForm setShowModal={setShowModal}></UserReviewForm>
        </SideModal>
      )}
    </>
  );
}

export default NewUserReviewModal;
