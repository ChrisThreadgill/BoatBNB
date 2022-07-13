import "./HomePageSearch.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as boatsActions from "../../../store/boats";
import { states } from "../../Utils";

function HomePageSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchInput = useRef(null);
  const [searchState, setSearchState] = useState(false);
  const [blur, setBlur] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilterShow, setSearchFilterShow] = useState(false);
  const [searchFilter, setSearchFilter] = useState(states);

  const searchSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    dispatch(boatsActions.getAllBoatsSearch(searchState)).then(() =>
      history.push(`/boat-listings/${searchState.toUpperCase()}`)
    );
  };
  useEffect(() => {
    if (searchState.length >= 3) {
      setSearchFilter(states.filter((state) => state.toLowerCase().includes(searchState.toLowerCase())));
    }
    if (searchState.length < 3) {
      setSearchFilter(states.filter((state) => state.slice(-2).includes(searchState.toUpperCase())));
      // state.slice(-2) === search.toUpperCase())
    }
    if (!searchState.length) {
      setSearchFilter(states.filter((state) => state.toLowerCase().includes(search.toLowerCase())));
    }
  }, [searchState]);

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
          ref={searchInput}
          type="search"
          onChange={(e) => setSearchState(e.target.value)}
          onFocus={() => setSearchFilterShow(true)}
          onBlur={() => {
            if (blur) return;
            setSearchFilterShow(false);
          }}
          onfocusout={() => {
            setSearchFilterShow(false);
          }}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   setSearchState(e.target.value);

          // }}
        ></input>
        <button type="submit">SEARCH</button>
        {searchFilterShow && searchFilter ? (
          <div className="home__search__filter__container">
            <div className="home__search__filter__header">Where do you want to boat?</div>
            {searchFilter.map((state) => {
              const fullState = state.split(",")[0];
              const stateAbr = state.split(",")[1];
              return (
                <div
                  onMouseUp={() => setBlur(false)}
                  onMouseDown={() => setBlur(true)}
                  className="search__option"
                  onClick={async (e) => {
                    setSearchFilterShow(false);
                    setSearch(state);
                    dispatch(boatsActions.getAllBoatsSearch(state.slice(-2).toUpperCase())).then(() => {
                      // setIsLoaded(true);
                      history.push(`/boat-listings/${state.slice(-2).toUpperCase()}`);
                      // setSearch("");
                    });

                    // handleSearch();
                    // history.push(`/boat-listings/${state.slice(-2).toUpperCase()}`);
                  }}
                >
                  <div className="location__marker"></div>
                  <div className="location__state__full">
                    {fullState},<span className="location__state__abr">{stateAbr}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default HomePageSearch;
