import styled from "styled-components"
import { Popover, Overlay } from "react-bootstrap"
// import { Overlay } from 'react-native'
import React, { useContext, useRef, useState } from "react"
import { CustomMarker } from "react-instantsearch-dom-maps"
import MediaQuery from 'react-responsive';
import mediaQuery from 'css-mediaquery';

import { Pin } from "../common/Pin"
import { GmapsTypeIcon } from "../common/GmapsType"
import { SearchContext } from "../../contexts/SearchContext"
import { LocationContext, TLocation } from "../../contexts/LocationContext"

interface IProps {
  style?: object
  title?: string
  index: number
  hit: {
    objectID: string
    name?: string
    streetAddress?: string
    city?: string
    state?: string
    zip?: string
    stockStatus?: Array<string>
    _geoloc: TLocation
    allGmapsTypes?: Array<string>
    publicEmails?: string
    publicPhones?: string
    websites?: string
  }
}

const Title = styled.div`
  color: #262626;
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 5px;
  line-height: normal;
`
const MarkerContainer = styled.div`
  width: 375px;
  height: 517px;
  border-radius: 5px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
`


const Marker: React.FC<IProps> = (props) => {
  const ref = useRef(null)
  const { hit, index } = props
  const type = "CHANGE_SELECTED_HIT"
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<HTMLDivElement | null>(null)
  const { firstSearchDone, setFirstSearchDone } = useContext(SearchContext)
  const { state: locationState, dispatch: locationDispatch } = useContext(
    LocationContext
  )

  const selectHit = (
    isOpen = false,
    payload = { location: hit._geoloc, selectedHit: hit.objectID }
  ) => {
    locationDispatch({ type, payload })
    setOpen(isOpen)
  }

  const handleClick = (event) => {
    const { _geoloc, streetAddress, name, objectID } = hit
    const { lat, lng } = _geoloc
    const location = { lat, lng, address: streetAddress || name }

    selectHit(true, { location, selectedHit: objectID })
    setTarget(event.target)
  }

  const handleClose = () => {
    selectHit(false, {
      location: { ...locationState.location },
      selectedHit: "",
    })
  }

  const id = open ? "simple-popover" : undefined

  if (!firstSearchDone && index === 0 && target && !open) {
    // selectHit(true)
    setFirstSearchDone(true)
  } else if (target && locationState.selectedHit === hit.objectID && !open) {
    selectHit(true)
  }

  const direction = () => {
    const smallScreen = window.matchMedia('(min-width: 400px)')
    return smallScreen.matches ? "right" : "bottom-end"
  }


  return (
    <div>
      <CustomMarker aria-describedby={id} key={hit.objectID} hit={hit}>
        <div onClick={handleClick} ref={(ref) => setTarget(ref)}>
          <Pin allGmapsTypes={hit.allGmapsTypes} selectedPin={hit.objectID} />
        </div>
      </CustomMarker>
      <Overlay
        rootClose
        show={open}
        target={target}
        placement={direction()}
        transition={false}
        onHide={handleClose}
        container={ref.current}>
        <Popover id="map-popover">
          <Popover.Content>
            {/* Close button */}
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close alert</span>
            </button>
            {/* Location info */}
            <div className="map-popover__info">
              <div>
                <Title>{hit.name}</Title>
              </div>
              <div className="map-popover__address">
                {hit.streetAddress}, {hit.city}, {hit.state} {hit.zip}
              </div>
              <div className="map-popover__get-directions">Get Directions</div>
              <div className="map-popover__need">
                <GmapsTypeIcon
                  includeText
                  allGmapsTypes={hit.allGmapsTypes}
                  selectedPin={hit.objectID}
                />
              </div>
              <div className="place__info">
                <div className="place__info-eligibility">
                  Access by: <span className="bold-text">in-person</span>
                  <div>(requires registration or proof of eligibility)</div>
                </div>
                <div className="place__info-times">
                  <div>
                    Seniors/Disabled:{" "}
                    <span className="bold-text">8:00 am - 9:00 am</span>
                  </div>
                  <div>
                    General public:{" "}
                    <span className="bold-text">12:00 pm - 2:00 pm</span>
                  </div>
                  <div>
                    Homeless:{" "}
                    <span className="bold-text">4:00 pm - 5:00 pm</span>
                  </div>
                </div>
                <div className="place__info-contact">
                  <div>
                    Phone: <span className="bold-text">{hit.publicPhones}</span>
                  </div>
                  <div>
                    Email:{" "}
                    <a href={`mailto:${hit.publicEmails}`}>
                      {hit.publicEmails}
                    </a>
                  </div>
                  <div>
                    Websites: <a href={`${hit.websites}`}>{hit.websites}</a>
                  </div>
                  <div>Social media: www.facebook.com/EPLA915/</div>
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  )
}

export default Marker
