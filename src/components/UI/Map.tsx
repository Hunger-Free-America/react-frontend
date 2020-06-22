import algoliasearch from "algoliasearch/lite";
import React, { useState } from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import {
  GeoSearch,
  Control,
  GoogleMapsLoader,
  Marker as OriginalMarker,
} from "react-instantsearch-dom-maps";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import SearchBar from "./SearchBar";
import { Location } from "./types";

const FilterButton = styled(Button)`
  background-color: #fafafa;
  border: solid 1px #979797;
  border-radius: 23px;
  color: #262626;
  font-weight: bolder;
  height: 40px;
  text-transform: uppercase;
  width: 122px;
`;

const MapContainer = styled("div")`
  width: 100vw;

  @media (min-width: 980px) {
    position: absolute;
    right: 0;
    top: 76px;
    width: calc(100vw -  430px);
  }
`;

const Marker = styled(OriginalMarker)`
  height: 100px;
  width: 100px;
  background: black;
`;

const ResultsList = styled("div")`
  display: none;

  @media (min-width: 980px) {
    background: white;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    display: block;
    height: calc(100vh - 76px);
    left: 0;
    overflow: scroll;
    position: absolute;
    top: 76px;
    width: 430px;
    z-index: 500;
  }
`;

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID!,
  process.env.REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
);
const US_LOCATION = { lat: 40.413993, lng: -99.034504 };

type Map = {
  defaultLocation?: Location;
};

type THitComponent = {
  hit: {
    city?: string;
    name?: string;
    state?: string;
    streetAddress?: string;
    zip?: string;
  };
};

const getAddress = (hit: any) => {
  const { city, state, streetAddress, zip } = hit;
  return [city, state, streetAddress, zip].join(", ");
};

const HitComponent = ({ hit }: THitComponent) => (
  <>
    <div className="hit-name">{hit.name}</div>
    <div>{getAddress(hit)}</div>
  </>
);

export default ({ defaultLocation }: Map) => {
  const [location, setLocation] = useState<Location>(
    defaultLocation || US_LOCATION
  );

  return (
    <GoogleMapsLoader
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      endpoint={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
    >
      {(google: any) => (
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.REACT_APP_ALGOLIA_INDEX!}
        >
          {location ? (
            <Configure
              aroundLatLng={`${location.lat}, ${location.lng}`}
              aroundRadius="all"
            />
          ) : (
            <Configure aroundLatLngViaIP />
          )}

          <div className="search-container">

            <SearchBar setLocation={setLocation} />

            <ResultsList className="left-panel">
              <div className="ais-Hits-item">
                <FilterButton>Filter</FilterButton>
              </div>
              <Hits hitComponent={HitComponent} />
            </ResultsList>
            
            <MapContainer className="right-panel">
              <div id="map">
                <GeoSearch
                  google={google}
                  zoomControlOptions={{
                    position: google.maps.ControlPosition.RIGHT_TOP,
                  }}
                  streetViewControl={true}
                >
                  {({ hits }) => (
                    <div>
                      <Control />
                      {hits.map((hit) => (
                        <Marker key={hit.objectID} hit={hit} />
                      ))}
                    </div>
                  )}
                </GeoSearch>
              </div>
            </MapContainer>
          </div>
        </InstantSearch>
      )}
    </GoogleMapsLoader>
  );
};
