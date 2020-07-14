import React from "react"
import styled from "styled-components"
import { IoMdMenu } from "react-icons/all"
// import InfoPopover from "./InfoPopover"
import MenuButton from '../common/MenuButton'
import { Navbar } from 'react-bootstrap'

const MenuContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-left: 0px;

  @media (max-width: 400px) {
    position: absolute;
    top: 5px;
    right: 0;
    padding: .75rem;
  }
`

const MobileMenu = styled("div")`
  position: absolute;
  padding: .5rem .75rem;
  right: 0;
  top: 0;
`

const ButtonsContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  right: 0;

  & button {
    border: none;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    text-transform: uppercase;
  }

  @media (max-width: 400px) {
    // display: block;
    // top: 7rem;
    // left: -18rem;
    // width: 300px;
    // height: 100%;
    bottom: 0;
    z-index: 1000;

    background: white;
    padding: 20px;
  }
`

// const LearnMore = styled.div`
//   color: #0093d7;
//   letter-spacing: 0.75px;
//   font-size: 15px;
//   font-weight: 700;
//   height: 23px;
//   width: 350px;
// `

// const AboutInfoPopover = styled(InfoPopover)`
//   @media (min-width: 400px) {
//     margin-right: 10px;
//   }
// `

export default () => (
  <>
      <MobileMenu>
        <Navbar.Toggle aria-controls="collapsable"/>
      </MobileMenu>
      <Navbar.Collapse className="flex-grow-0" id="collapsable">
        <ButtonsContainer>

          <MenuButton title='About' href='https://www.hungerfreeamerica.org/about'/>
          <MenuButton title='Contact' href='https://www.hungerfreeamerica.org/about/contact-us'/>
          <MenuButton title='Volunteer' href='https://www.hungerfreeamerica.org/hv'/>
        {/* <AboutInfoPopover title="About" name="aboutus">
          <p>
            For over 30 years, the Souper Bowl of Caring campaign has been a local
            effort with a collective impact using the energy of the Big Game to
            tackle hunger.
          </p>
          <p>
            Churches, schools and civic groups around the country join in through
            hosting food and donation campaigns each year that benefit local
            charities picked by participants.
          </p>
          <p>
            Since 1990, over $163 million has been raised for almost 10,000 local
            charities around the nation and world.
          </p>
          <p>
            The Souper Bowl of Caring illustrates the importance of a collective
            impact from local grassroots efforts to tackle hunger.
          </p>
          <LearnMore>Learn more about our history</LearnMore>
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
            Twitter <a href="https://twitter.com/dariceshelter">@dariceshelter</a>
          </p>
        </InfoPopover>
        <InfoPopover title="Volunteer" name="volunteer">
          <p>Coming soon</p>
        </InfoPopover> */}
        </ButtonsContainer>
      </Navbar.Collapse>
  </>
)
