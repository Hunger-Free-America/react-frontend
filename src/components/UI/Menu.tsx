import React from "react";
import styled from "styled-components";
import { IoMdMenu } from "react-icons/all";
import Button from "../common/Button"
import InfoPopover from "./InfoPopover";

const MenuContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-left: 0px;

  @media (max-width: 400px) {
    top: 80px;
  }
`;

const MobileMenu = styled("div")`
  @media (min-width: 400px) {
    display: none;
  }
`;

const ButtonsContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  width: 380px;

  & button {
    border: none;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    text-transform: uppercase;
  }

  @media (max-width: 400px) {
    position: fixed;
    top: 120px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;

    background: white;
    padding: 20px;
  }
`;

const LearnMore = styled.div`
  color: #0093d7;
  letter-spacing: 0.75px;
  font-size: 15px;
  font-weight: 700;
  height: 23px;
  width: 350px;
`;

const FundRaisingButton = styled(Button)`
  bottom: 40px;
  margin-top: 30px;
  position: absolute;
  right: 40px;
`;

const AboutInfoPopover = styled(InfoPopover)`
  @media (min-width: 400px) {
    margin-right: 10px;
  }
`;

export default () => (
  <MenuContainer>
    <MobileMenu>
      <IoMdMenu />
    </MobileMenu>

    <ButtonsContainer
      className="btns-container"
    >
      <AboutInfoPopover title="About" name="aboutus">
        <p>
          For over 30 years, the Souper Bowl of Caring campaign has been a local effort with a collective impact using the energy of the Big Game to tackle hunger.
        </p>
        <p>
          Churches, schools and civic groups around the country join in through hosting food and donation campaigns each year that benefit local charities picked by participants.
        </p>
        <p>
          Since 1990, over $163 million has been raised for almost 10,000 local charities around the nation and world.
        </p>
        <p>
          The Souper Bowl of Caring illustrates the importance of a collective impact from local grassroots efforts to tackle hunger.
        </p>
        <LearnMore>Learn more about our history</LearnMore>
        <FundRaisingButton size="large">Start FundRaising</FundRaisingButton>
      </AboutInfoPopover>
      <InfoPopover title="Contact" name="contact">
        <p>
          Contributing, Branching, & Forking While we actively accept help, as
          well as encourage you to fork this repo and build it out for your
          city, we do not take pull requests directly to this repo - please
          contact us before you plan to do so. Reach out to: <br />
          Repo <a href="https://github.com/ShelterTechSF/VACS-MVP">
            Github
          </a>{" "}
          <br />
          Twitter{" "}
          <a href="https://twitter.com/dariceshelter">@dariceshelter</a>
        </p>
      </InfoPopover>
      <Button>Login</Button>
    </ButtonsContainer>
  </MenuContainer>
);
