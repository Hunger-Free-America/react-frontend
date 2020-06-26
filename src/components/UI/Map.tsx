import styled from "styled-components";
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { Configure, Hits, InstantSearch } from "react-instantsearch-dom";
import { Control, GeoSearch, GoogleMapsLoader, Marker as OriginalMarker } from "react-instantsearch-dom-maps";

import TopBar from "./TopBar";
import { Location } from "./types";
import FilterButton from "../common/Button";

const Marker = styled(OriginalMarker)`
  height: 100px;
  width: 100px;
  background: black;
`;

const MapContainer = styled.div`
  height: calc(100vh - 76px);
  width: 100vw;

  @media (min-width: 980px) {
    position: absolute;
    right: 0;
    top: 76px;
    width: calc(100vw -  430px);
  }
`;

const ResultsList = styled.div`
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

const US_LOCATION = { lat: 40.413993, lng: -99.034504 };
const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_INDEX,
  REACT_APP_ALGOLIA_READ_ONLY_API_KEY,
  REACT_APP_GOOGLE_MAPS_API_KEY,
} = process.env;
const searchClient = algoliasearch(
  REACT_APP_ALGOLIA_APPLICATION_ID!,
  REACT_APP_ALGOLIA_READ_ONLY_API_KEY!
);

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
  const { city, streetAddress } = hit;
  return [streetAddress, city].join(", ");
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
      apiKey={REACT_APP_GOOGLE_MAPS_API_KEY}
      endpoint={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
    >
      {(google: any) => (
        <InstantSearch
          searchClient={searchClient}
          indexName={REACT_APP_ALGOLIA_INDEX!}
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

            <TopBar setLocation={setLocation} />

            <ResultsList>
              <div className="ais-Hits-item">
                <FilterButton primary border width="122px">Filter</FilterButton>
              </div>
              <Hits hitComponent={HitComponent} />
            </ResultsList>
            
            <MapContainer>
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
            </MapContainer>
          </div>
        </InstantSearch>
      )}
    </GoogleMapsLoader>
  );
};
