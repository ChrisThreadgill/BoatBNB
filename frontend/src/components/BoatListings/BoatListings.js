import "./BoatListings.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsActions from "../../store/boats";
import BoatCard from "../Boats/BoatCard";
import { useParams, useHistory } from "react-router-dom";

function BoatListings() {
  let { searchState } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFilterShow, setSearchFilterShow] = useState(false);
  const states = [
    "Alabama,AL",
    " Alaska,AK",
    "Arizona,AZ",
    "Arkansas,AR",
    "California,CA",
    "Colorado,CO",
    " Connecticut,CT",
    "Delaware,DE",
    " Florida,FL",
    "Georgia,GA",
    "Hawaii,HI",
    "Idaho,ID",
    "Illinois,IL",
    "Indiana,IN",
    "Iowa,IA",
    "Kansas,KS",
    "Kentucky,KY",
    "Louisiana,LA",
    "Maine	ME,",
    "Maryland,MD",
    "Massachusetts,MA",
    "Michigan,MI",
    "Minnesota,MN",
    "Mississippi,MS",
    "Missouri,MO",
    "Montana,MT",
    "Nebraska,NE",
    "Nevada,NV",
    "New Hampshire,NH",
    "New Jersey,NJ",
    "New Mexico,NM",
    "New York,NY",
    "North Carolina,NC",
    "North Dakota,ND",
    "Ohio,OH",
    "Oklahoma,OK",
    "Oregon,OR",
    "Pennsylvania,PA",
    "Rhode Island,RI",
    "South Carolina,SC",
    "South Dakota,SD",
    "Tennessee,TN",
    "Texas,TX",
    "Utah,UT",
    "Vermont,VT",
    "Virginia,VA",
    "Washington,WA",
    "West Virginia,WV",
    "Wisconsin,WI",
    "Wyoming,WY",
  ];

  const [searchFilter, setSearchFilter] = useState(states);

  const boatsObj = useSelector((state) => state.boats);
  let boatsArr = Object.values(boatsObj);
  // console.log(boatsObj);
  // const [searchState, setSearchState] = useState(boatsArr[0]?.state);
  // console.log(searchState);
  const handleSearch = async (e) => {
    // console.log("this is the search", search);

    e.preventDefault();

    dispatch(boatsActions.getAllBoatsSearch(search)).then(() => {
      setIsLoaded(true);
      setSearch("");
      history.push(`/boat-listings/${search.toUpperCase()}`);
    });
  };
  // useEffect(() => {
  //   if (setSearchFilterShow) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [setSearchFilterShow]);

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
    dispatch(boatsActions.getAllBoatsSearch(searchState)).then(() => setIsLoaded(true));
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
            placeholder="Search New State"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFilterShow(true)}
            onfocusout={() => {
              setSearchFilterShow(false);
            }}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   console.log("hello");
            //   // setSearchState(e.target.value);
            // }}
          ></input>
          <button type="submit">SEARCH</button>
        </div>
        {searchFilterShow && searchFilter ? (
          <div className="search__filter__container">
            {searchFilter.map((state) => {
              return (
                <div
                  className="search__option"
                  onClick={async (e) => {
                    setSearchFilterShow(false);
                    console.log(e, "---------event");
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
                  {state}
                </div>
              );
            })}
          </div>
        ) : null}
      </form>
      {isLoaded ? (
        <div>
          {boatsArr.length > 1 && boatsArr ? (
            boatsArr.map((boat, idx) => {
              return <BoatCard key={idx} boat={boat}></BoatCard>;
            })
          ) : (
            <h1>no boats bitch</h1>
          )}
        </div>
      ) : (
        <h1>...loading</h1>
      )}
      ;
    </div>
  );
}

export default BoatListings;
