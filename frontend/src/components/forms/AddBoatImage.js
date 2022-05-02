function AddBoatImage() {
  return (
    <div>
      <form>
        <label>
          images
          <input
            // onChange={(e) => {
            //   setFile(e.target.files[0]);
            // }}
            type="file"
            name="file"
            accept="image/*"
          ></input>
        </label>
        <button type="submit">Add A Boat</button>
      </form>
    </div>
  );
}

export default AddBoatImage;
