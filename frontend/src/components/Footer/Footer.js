import "./Footer.css";

function Footer() {
  //

  return (
    <div className="footer__container">
      <div className="footer__left__side">
        <img src="/BNB.svg" className="boat__bnb__logo" />

        <div className="footer__left__links">
          {/* <span>A clone of</span>
          <div>Boatsetter</div> */}
        </div>
      </div>
      <div className="footer__middle__placeholder"></div>

      <div className="footer__right__links">
        <div>2022 </div>
        <div className="footer__profile__name__link"> Chris Threadgill</div>
        <div className="footer__right__name__split">, Meet the developer.</div>
        <div className="footer__profile__links">LinkedIn</div>
        <div className="footer__profile__links">Github</div>
        <div className="footer__profile__links">Portfolio</div>
      </div>
    </div>
  );
}

export default Footer;
