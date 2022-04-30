import { useState } from "react";
import axios from "axios";

async function postImage(image) {
  console.log(image);
  const formData = new FormData();
  formData.append("image", image);
  const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
  console.log(result, "aaaaaaaaaaaaa");
  return result.data;
}

function Test() {
  const [file, setFile] = useState();
  // const [images, setImages] = useState([]);
  // console.log(images);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    console.log(file);
    // const result = await postImage({ image: file, boatId });

    // setImages([result.image], ...images);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={fileSelected} type="file" name="file" accept="image/*"></input>
        <button type="submit">submit</button>
      </form>
      <img src="/api/images/345a00a61d75fa917306342db5a6d2d9" />
    </div>
  );
}

export default Test;
