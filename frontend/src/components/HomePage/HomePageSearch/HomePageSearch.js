import "./HomePageSearch.css";

function HomePageSearch() {
  //

  return (
    <div className="home__page__search__container">
      <div className="home__page__search__heading">
        <h1>Choose your adventure</h1>
        <h3>Boating for everyone, everywhere.</h3>
      </div>
      <div className="home__page__search__div">
        <div className="home__page__location__marker"></div>
        <input placeholder="Where would you like to go boating?" type="search"></input>
        <button>SEARCH</button>
      </div>
    </div>
  );
}

export default HomePageSearch;
