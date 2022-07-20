import "./UserAccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import * as sessionActions from "../../store/session";
import axios from "axios";

function UserAccountPage() {
  const dispatch = useDispatch();
  const uploadHiddenInput = useRef();
  const [roleId, setRoleId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  console.log(user);

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return result.data;
  }

  const handleClick = (e) => {
    e.preventDefault();
    uploadHiddenInput.current.click();
  };
  const updateImage = (e) => {
    let file = e.target.files[0];
    setFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    // setSubmitted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    console.log(file);
    let userId = user.id;
    dispatch(sessionActions.updateUserProfilePicture(file, userId)).then(() => {
      setFile("");
    });
    // const result = await postImage({ image: file });
    // const profilePicture = result.url;
    // console.log(profilePicture, "hopefully the URL");

    //   setErrors([]);
    //   return dispatch(sessionActions.updateUserProfilePicture({ profilePicture})).catch(
    //     async (res) => {
    //       const data = await res.json();
    //       if (!data.errors) {
    //         setRoleId("");
    //         setFirstName("");
    //         setLastName("");
    //         setEmail("");
    //         setPassword("");
    //         setConfirmPassword("");
    //       }

    //       if (data && data.errors) setErrors(data.errors);
    //     }
    //   );
    // }
    // return setErrors(["Confirm Password field must be the same as the Password field"]);
    // }
  };
  //
  return (
    <div className="user__account__page__container">
      <div className="user__account__header">
        <h1>My account</h1>
        <div className="user__account__profile__picture__container">
          {/* <div className="user__account__profile__picture"></div> */}

          {user.profilePicture && !file ? (
            <img
              className="user__account__profile__picture"
              src={user.profilePicture ? `${user.profilePicture}` : null}
            ></img>
          ) : (
            <img className="user__account__profile__picture" src={preview ? `${preview}` : null}></img>
          )}
          {!user.profilePicture ? (
            <div className="no__profile__picture__avatar">{`${user.firstName.slice(0, 1)} ${user.lastName.slice(
              0,
              1
            )}`}</div>
          ) : null}

          <div className="user__account__profile__name__container">
            <div className="user__account__name">{user.firstName}</div>
            {/* <div>rating</div> */}
          </div>
          <form onSubmit={handleSubmit} className="user__profile__picture__update">
            <input
              type="file"
              // name="filefield"
              ref={uploadHiddenInput}
              className="user__profile__picture__input"
              // multiple="multiple"
              onChange={(e) => {
                updateImage(e);
              }}
              // className="choose__file__button"
              accept="image/*"
              id="hello"
            ></input>
            <div className="user__picture__options">
              <div className="user__picture__option" onClick={handleClick}>
                Change Photo
              </div>
              {file ? (
                <div className="user__picture__option" onClick={handleSubmit}>
                  Update Photo
                </div>
              ) : null}

              {file ? (
                <div className="user__picture__option__cancel" onClick={() => setFile("")}>
                  Cancel
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
      <div className="user__account__options"></div>
    </div>
  );
}

export default UserAccountPage;