import "./HomePageSearch.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as boatsActions from "../../../store/boats";

function HomePageSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchState, setSearchState] = useState(false);

  const searchSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    dispatch(boatsActions.getAllBoatsSearch(searchState)).then(() =>
      history.push(`/boat-listings/${searchState.toUpperCase()}`)
    );
  };

  return (
    <form className="home__page__search__container" onSubmit={(e) => searchSubmit(e)}>
      <div className="home__page__search__heading">
        <h1>Choose your adventure</h1>
        <h3>Boating for everyone, everywhere.</h3>
      </div>
      <div className="home__page__search__div">
        <div className="home__page__location__marker"></div>

        <input
          placeholder="Where would you like to go boating?"
          type="search"
          onChange={(e) => setSearchState(e.target.value)}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   setSearchState(e.target.value);

          // }}
        ></input>
        <button type="submit">SEARCH</button>
      </div>
    </form>
  );
}

export default HomePageSearch;
