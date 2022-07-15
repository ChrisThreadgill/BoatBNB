import "./NewBoatForm.css";

function NewBoatForm() {
  //

  return (
    <div className="new__boat__listing__container">
      <div className="new__boat__listing__header__container">
        <h1>Tell us a little about your boat</h1>
        <div>
          Please make sure your address to the boat's location is correct and you specify if it is already at a slip.
        </div>
      </div>
      <form className="new__boat__form"></form>
    </div>
  );
}

export default NewBoatForm;
