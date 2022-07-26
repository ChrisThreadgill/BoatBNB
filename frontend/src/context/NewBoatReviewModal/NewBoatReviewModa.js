import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import BoatReviewForm from "../../components/forms/BoatReviewForm";
import NewBoatReviewForm from "../../components/forms/NewBoatReview/NewBoatReviewForm";

function NewBoatReviewModal({ reviews }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user__review__form__modal__button" onClick={() => setShowModal(true)}>
        Leave a review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewBoatReviewForm reviews={reviews}></NewBoatReviewForm>
        </Modal>
      )}
    </>
  );
}

export default NewBoatReviewModal;
