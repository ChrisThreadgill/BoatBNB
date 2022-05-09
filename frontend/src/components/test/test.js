// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";
// import UserRating from "../Ratings/UserRating";
// import UserReview from "../Reviews/UserReview";
// import BoatReview from "../Reviews/BoatReview";

// async function postImage(image) {
//   const formData = new FormData();
//   formData.append("image", image);
//   const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });

//   return result.data;
// }

// function Test() {
//   const [file, setFile] = useState();

//   const onSubmit = async (event) => {
//     event.preventDefault();
//   };

//   const fileSelected = (event) => {
//     const file = event.target.files[0];
//     setFile(file);
//   };

//   const boat = { id: 1 };

//   return (
//     <div>
//       {/* <UserReview></UserReview> */}
//       <BoatReview boat={boat}></BoatReview>
//     </div>
//   );
// }

// export default Test;
