import "./HomePageTech.css";
import { useState, useEffect } from "react";

function HomePageTech() {
  const [selected, setSelected] = useState(0);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    if (selected === 0 && !clicked) {
      setTimeout(() => {
        setSelected(1);
      }, 3500);
    }
    if (selected === 1 && !clicked) {
      setTimeout(() => {
        setSelected(2);
      }, 3500);
    }
    if (selected === 2 && !clicked) {
      setTimeout(() => {
        setSelected(3);
      }, 3500);
    }
    if (selected === 3 && !clicked) {
      setTimeout(() => {
        setSelected(4);
      }, 3500);
    }
    if (selected === 4 && !clicked) {
      setTimeout(() => {
        setSelected(5);
      }, 3500);
    }
    if (selected === 5 && !clicked) {
      setTimeout(() => {
        setSelected(0);
      }, 3500);
    }
  }, [selected]);
  useEffect(() => {
    if (clicked === 1) {
      setTimeout(() => {
        setClicked(0);
        setSelected(1);
      }, 3500);
    }
    if (clicked === 2) {
      setTimeout(() => {
        setClicked(0);
        setSelected(2);
      }, 3500);
    }
    if (clicked === 3) {
      setTimeout(() => {
        setClicked(0);
        setSelected(3);
      }, 3500);
    }
    if (clicked === 4) {
      setTimeout(() => {
        setClicked(0);
        setSelected(4);
      }, 3500);
    }
    if (clicked === 5) {
      setTimeout(() => {
        setClicked(0);
        setSelected(5);
      }, 3500);
    }
    if (clicked === 6) {
      setTimeout(() => {
        setClicked(0);
        setSelected(0);
      }, 3500);
    }
  }, [clicked]);
  //

  return (
    <div className="home__page__tech__container">
      <div className="home__page__tech__carousel">
        <div className={selected === 0 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
          />
        </div>

        <div className={selected === 1 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg__double"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
          <img
            className="home__page__tech__svg__double"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
          />
        </div>
        <div className={selected === 2 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg__double"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          />
          <img
            className="home__page__tech__svg__double"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"
          />
        </div>
        <div className={selected === 3 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
          />
        </div>
        <div className={selected === 4 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg"
          />
        </div>
        <div className={selected === 5 ? "home__page__tech__card__selected" : "home__page__tech__card"}>
          <img
            className="home__page__tech__svg"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
          />
        </div>
      </div>
      <div className="home__page__tech__information__container">
        {selected === 0 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">Javascript</div>
            <div className="home__page__tech__information__content">
              The main universal language used throughout all services of this application.
            </div>
          </div>
        ) : null}
        {selected === 1 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">React/Redux</div>
            <div className="home__page__tech__information__content">
              Front-end framework used to render to the browser - React. The state management used throughout entire
              application. - Redux
            </div>
          </div>
        ) : null}
        {selected === 2 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">Postgresql/Sequelize</div>
            <div className="home__page__tech__information__content">
              Postgresql was the RDBMS-(Relational Database Management System) communicating with the Sequelize
              ORM(Object Relational Mapping) framework through the Express.js back-end framework.{" "}
            </div>
          </div>
        ) : null}

        {selected === 3 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">AmazonWebServices</div>
            <div className="home__page__tech__information__content">
              Single/Multiple image upload via Amazon Web Services S3
            </div>
          </div>
        ) : null}
        {selected === 4 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">Google Cloud</div>
            <div className="home__page__tech__information__content">
              Custom Google Places search feature using the Google Cloud Platform.
            </div>
          </div>
        ) : null}

        {selected === 5 ? (
          <div className="home__page__tech__information">
            <div className="home__page__tech__information__header">CSS3</div>
            <div className="home__page__tech__information__content">
              All raw CSS3 no CSS frameworks used throughout the entire project. Implementing uniformed HTML/CSS class
              names.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePageTech;
