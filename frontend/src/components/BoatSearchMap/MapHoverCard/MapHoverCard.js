import "./MapHoverCard.css";

function MapHoverCard({ boat }) {
  // console.log(boat);
  //

  return (
    <div className="map__hover__card__wrapper">
      {boat && (
        <div className="map__hover__card__container">
          {boat?.Images.length > 0 ? <img className="hover__image" src={`${boat.Images[0].url}`}></img> : null}
          <div>
            <div className="boat__hover__card__model">
              <div>{`${boat.year} `}</div>
              <div className="boat__model__hover">{boat.model && boat.model}</div>
            </div>
            <div className="boat__hover__card__location">
              <div>{boat.city ? boat.city : null},</div>
              <div>{boat.state ? boat.state : null}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapHoverCard;
