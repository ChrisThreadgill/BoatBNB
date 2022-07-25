import { ExternalLink } from "react-external-link";
import "./Footer.css";

function Footer() {
  //

  return (
    <div className="footer__wrapper">
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
          <div className="footer__developer__name">
            <div className="footer__profile__name__link">
              {" "}
              <span>2022 </span>
              <ExternalLink href="https://christhreadgill.com/" className="footer__external__links">
                <div className="footer__portfolio__link">Chris Threadgill</div>
              </ExternalLink>
            </div>
            <div className="footer__right__name__split">, Meet the developer:</div>
          </div>
          <div className="footer__links">
            <ExternalLink href="https://www.linkedin.com/in/chris-threadgill" className="footer__external__links">
              <div className="footer__profile__links">LinkedIn</div>
            </ExternalLink>
            <ExternalLink href="https://github.com/ChrisThreadgill" className="footer__external__links">
              <div className="footer__profile__links">Github</div>
            </ExternalLink>
            <ExternalLink href="https://christhreadgill.com/" className="footer__external__links">
              <div className="footer__profile__links">Portfolio</div>
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
