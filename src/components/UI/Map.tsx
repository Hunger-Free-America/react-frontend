import styled from "styled-components"
import React, { useState } from "react"
import algoliasearch from "algoliasearch/lite"
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom"
import {
  Control,
  GeoSearch,
  GoogleMapsLoader,
} from "react-instantsearch-dom-maps"

import TopBar from "./TopBar"
import Marker from "./Marker"
import { Location } from "./types"
import { HitComponent } from "../common/Hit"
import filterIcon from "../../assets/filter.png"
import mapIcon from "../../assets/map.png"
import listIcon from "../../assets/list.png"
import LocationProvider from "../../contexts/LocationContext"
import { IconButton as FilterButton, MapListButton } from "../common/Button"
import { useWindowSize } from '../common/MediaQuery';

export const MapContainer = styled.div`
  height: calc(100vh - 71px);
  position: absolute;
  right: 0;
  top: 71px;
  width: calc(100vw - 430px);


  @media (min-width: 980px) {
    // position: absolute;
    // right: 0;
    // top: 71px;
    width: calc(100vw - 430px);
  }
  @media (max-width: 575px) {
    top: 0;
    position: relative;
    height: calc(96vh - 76px);
    width: 100%;
  }
`

const Filter = styled.div`
  align-content: center;
  align-items: center;
  background: white;
  border-bottom: 1px solid lightgray;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  height: 92px;
  // position: absolute;
  padding: 17.5px 30px;
  top: 70px;
  width: 414px;
  z-index: 500;
  justify-content: space-between;

  @media (max-width: 575px) {
    width: 100%;
  }
`
export const ResultsList = styled.div`
  background: white;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.3);
  display: block;
  height: calc(100vh - (70px + 92px));
  overflow: scroll;
  top: calc(70px + 92px);
  width: 414px;
  z-index: 1000;

  @media (max-width: 575px) {
    width: 100%;
    height: calc(100vh - (70px + 150px));

  }
`

const US_LOCATION = { lat: 40.413993, lng: -99.034504 }
const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_INDEX,
  REACT_APP_ALGOLIA_READ_ONLY_API_KEY,
  REACT_APP_GOOGLE_MAPS_API_KEY,
} = process.env
const searchClient = algoliasearch(
  REACT_APP_ALGOLIA_APPLICATION_ID!,
  REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
)

type Map = {
  defaultLocation?: Location
}

export default ({ defaultLocation }: Map) => {
  const [location, setLocation] = useState<Location>(
    defaultLocation || US_LOCATION
  )
  const mq = useWindowSize();
  const mdScreen = mq.width < 575
  let [show, setShow] = useState(true)

  return (
    <LocationProvider>
      <GoogleMapsLoader
        apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
        endpoint={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}>
        {(google: any) => (
          <InstantSearch
            searchClient={searchClient}
            indexName={REACT_APP_ALGOLIA_INDEX!}>
            {location ? (
              <Configure
                aroundLatLng={`${location.lat}, ${location.lng}`}
                aroundRadius="all"
              />
            ) : (
              <Configure aroundLatLngViaIP />
            )}

            <div className="search-container">
              <TopBar setLocation={setLocation} />

              <Filter>
                <FilterButton
                  border
                  primary
                  width="122px"
                  alt="filter"
                  src={filterIcon}>
                  Filter
                </FilterButton>
                {mdScreen ? <MapListButton
                  border
                  primary
                  width="122px"
                  alt="map/list"
                  src={show === true ? listIcon : mapIcon}
                  onClick={() => setShow(!show)}
                  toggle={show} >
                    {show ? 'map' : 'list'}
                  </MapListButton>
                  : <div></div>}
              </Filter>
              { !mdScreen || show ?
               <MapContainer>
                <GeoSearch
                  google={google}
                  zoomControlOptions={{
                    position: google.maps.ControlPosition.RIGHT_TOP,
                  }}
                  streetViewControl={true}>
                  {({ hits }) => (
                    <div>
                      <Control />
                      {hits.map((hit, index) => (
                        <Marker index={index} key={hit.objectID} hit={hit} />
                      ))}
                    </div>
                  )}
                </GeoSearch>
              </MapContainer>
              : <div></div> }
              { !mdScreen || !show ? 
              <ResultsList>
                <Hits hitComponent={HitComponent} />
              </ResultsList> : <div></div> }
            </div>
          </InstantSearch>
        )}
      </GoogleMapsLoader>
    </LocationProvider>
  )
}