import "./BoatListings.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsActions from "../../store/boats";
import BoatCard from "../Boats/BoatCard";
import { useParams, useHistory } from "react-router-dom";
import { states } from "../Utils";
import BoatSearchMap from "../BoatSearchMap/BoatSearchMap";
import { getKey } from "../../store/maps";

function BoatListings() {
  let { searchState } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchInput = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blur, setBlur] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilterShow, setSearchFilterShow] = useState(false);

  const [searchFilter, setSearchFilter] = useState(states);

  const boatsObj = useSelector((state) => state.boats);
  const key = useSelector((state) => state.key);
  let boatsArr = Object.values(boatsObj);
  console.log(history);
  // console.log(boatsObj);
  // const [searchState, setSearchState] = useState(boatsArr[0]?.state);
  console.log(searchState);
  const handleSearch = async (e) => {
    // console.log("this is the search", search);

    e.preventDefault();
    // console.log(e);
    // const searchButton = document.getElementById("search");
    // searchButton.click();
    // console.log(searchButton);

    dispatch(boatsActions.getAllBoatsSearch(search)).then(() => {
      // console.log(searchInput);
      // searchInput.current.onblur = true;
      searchInput.current.blur();
      setIsLoaded(true);
      setSearch("");
      setSearchFilterShow(false);
      // setBlur(true);
      history.push(`/boat-listings/${search.toUpperCase()}`, { test: `${searchFilter}TEST` });
    });
  };
  useEffect(() => {}, [searchState]);

  // const handle
  useEffect(() => {
    if (search.length >= 3) {
      setSearchFilter(states.filter((state) => state.toLowerCase().includes(search.toLowerCase())));
    }
    if (search.length < 3) {
      setSearchFilter(states.filter((state) => state.slice(-2).includes(search.toUpperCase())));
      // state.slice(-2) === search.toUpperCase())
    }
    if (!search.length) {
      setSearchFilter(states.filter((state) => state.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search]);

  useEffect(() => {
    dispatch(boatsActions.getAllBoatsSearch(searchState)).then(() => {
      dispatch(getKey());

      setIsLoaded(true);
    });
    // setIsLoaded(true);
    return () => {
      // console.log("we are in the return");
      // dispatch(boatsActions.clean());
    };
  }, [dispatch]);
  //

  return (
    <div>
      <form className="boat__listings__search" onSubmit={(e) => handleSearch(e)}>
        <div className="boat__listings__search__div">
          <div className="home__page__location__marker"></div>

          <input
            ref={searchInput}
            placeholder="Search New State"
            type="search"
            value={search}
            maxLength={2}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
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
            //   console.log("hello");
            //   // setSearchState(e.target.value);
            // }}
          ></input>
          <button id="search" type="submit">
            SEARCH
          </button>
        </div>
        {searchFilterShow && searchFilter ? (
          <div className="search__filter__container">
            <div className="search__filter__header">Where do you want to boat?</div>
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
                      setIsLoaded(true);
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
      </form>
      {isLoaded ? (
        <div className="boat__listings__container">
          <div className="boat__cards__container">
            {boatsArr.length >= 1 && boatsArr ? (
              boatsArr.map((boat, idx) => {
                return <BoatCard key={idx} boat={boat}></BoatCard>;
              })
            ) : (
              <h1>no boats</h1>
            )}
          </div>

          <div>
            <BoatSearchMap searchState={searchState} key={key}></BoatSearchMap>
          </div>
        </div>
      ) : (
        <h1>...loading</h1>
      )}
      ;
    </div>
  );
}

export default BoatListings;
