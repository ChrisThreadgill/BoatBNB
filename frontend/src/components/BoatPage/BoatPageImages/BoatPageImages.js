import "./BoatPageImages.css";
import { useEffect, useState } from "react";

function BoatPageImages({ boat }) {
  //
  const imagesArr = boat.Images;

  const [displayPicture1, setDisplayPicture1] = useState(0);
  const [displayPicture2, setDisplayPicture2] = useState(1);

  return (
    <div className="boat__page__picture__container">
      <button
        className={
          displayPicture1 === 0 ? "boat__page__prev__image__button__disabled" : "boat__page__prev__image__button"
        }
        onClick={
          displayPicture1 === 0
            ? null
            : () => {
                setDisplayPicture1(displayPicture1 - 1);
                setDisplayPicture2(displayPicture2 - 1);
              }
        }
        disabled={displayPicture1 === 0}
      >
        {"<"}
      </button>
      {/* {boat.Images.map((image) => {
    return <img className="boat__page__image" src={`/api/images/${image.url}`}></img>;
  })} */}

      <img
        className="boat__page__image"
        src={imagesArr[displayPicture1] ? `${imagesArr[displayPicture1]?.url}` : null}
      ></img>
      <img
        className="boat__page__image"
        src={imagesArr[displayPicture2] ? `${imagesArr[displayPicture2]?.url}` : null}
      ></img>

      <button
        className={
          displayPicture2 === imagesArr.length - 1
            ? "boat__page__next__image__button__disabled"
            : "boat__page__next__image__button"
        }
        onClick={
          displayPicture2 == imagesArr.length + 1
            ? null
            : () => {
                setDisplayPicture1(displayPicture1 + 1);
                setDisplayPicture2(displayPicture2 + 1);
              }
        }
        disabled={displayPicture2 == imagesArr.length - 1}
        // disabled={displayPicture2 === 0}
      >
        {">"}
      </button>
    </div>
  );
}

export default BoatPageImages;
