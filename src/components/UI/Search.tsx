import styled from "styled-components";
import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Navbar } from 'react-bootstrap'

import { SetLocation } from "./types";
import searchIcon from "../../assets/images/search@3x.png";

const Suggestions = styled.div`
  border-radius: 0 0 10px 10px;
  // position: absolute;
  z-index: 1000;
  background: white;
  width: 100%;
`;

const Suggestion = styled.div`
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  cursor: pointer;
  padding: 5px;

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  z-index: 1000;
  height: 48px;
  min-width: 300px;

  @media (max-width: 575px) {
    margin: 15px 0 0 0;
  }

  @media (max-width: 400px) {
    position: relative;
    margin-top: 50px;
    min-width: 100%;

  }

`;

const SearchBar = styled.div`
  border-radius: 23px;
  height: 48px;
  max-width: 584px;
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.img`
  left: 10px;
  position: absolute;
  top: 13px;
  width: 24px;
  z-index: 999;

  
`;

type SearchProps = {
  setLocation: SetLocation;
};

export default ({ setLocation }: SearchProps) => {
  const [locationSearch, setLocationSearch] = useState("");

  const handleSelect = async (locationSelected: string) => {
    setLocationSearch(locationSelected);
    const geo = await geocodeByAddress(locationSelected);
    setLocation(await getLatLng(geo[0]));
  };

  return (
    <PlacesAutocomplete
      value={locationSearch}
      onChange={setLocationSearch}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Container>
            <SearchBar>
              <SearchIcon alt="search" src={searchIcon} />
              <Form>
                <InputGroup>
                  <FormControl
                    id="location"
                    placeholder="Enter any Place, Address, City, or Zip"
                    {...getInputProps()}
                  />
                </InputGroup>

                <Suggestions className="suggestions">
                  {!loading &&
                    suggestions.map((suggestion) => (
                      <Suggestion
                        {...getSuggestionItemProps(suggestion)}
                        key={suggestion.description}
                      >
                        {suggestion.description}
                      </Suggestion>
                    ))}
                </Suggestions>
              </Form>
            </SearchBar>
        </Container>
      )}
    </PlacesAutocomplete>
  );
};
