import React, { useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import styled from "styled-components";
import { InputGroup, FormControl } from "react-bootstrap";

import searchIcon from "../../assets/images/search@3x.png";
import logo from  "../../assets/images/ProjectEndingHunger.png";
import "bootstrap/dist/css/bootstrap.min.css";

import { SetLocation } from "./types";
import Menu from "./Menu";

const TopBarContainer = styled("div")`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  background-color: #ffffff;
  height: 76px;
  padding: 14px 25px;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 1000;
`;

const Suggestions = styled("div")`
  border-radius: 0 0 10px 10px;
  position: absolute;
  z-index: 1000;
  background: white;
  width: 100%;
`;

const Suggestion = styled("div")`
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  cursor: pointer;
  padding: 5px;

  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const NavigationBar = styled("div")`
  display: flex;
  flex: 1;
  justify-content: center;
  z-index: 1000;
  height: 48px;
`;

const SearchBar = styled("div")`
  border-radius: 23px;
  height: 48px;
  max-width: 584px;
  position: relative;
  width: 100%;
`;

const BrandLogo = styled("img")`
  width: 160px;
`;

type SearchBarProps = {
  setLocation: SetLocation;
};

export default ({ setLocation }: SearchBarProps) => {
  const [locationSearch, setLocationSearch] = useState("");

  const handleSelect = async (locationSelected: string) => {
    setLocationSearch(locationSelected);
    const geo = await geocodeByAddress(locationSelected);
    setLocation(await getLatLng(geo[0]));
  };

  return (
    <TopBarContainer>
      <BrandLogo alt="Project Ending Hunger Logo" src={logo} />
      <PlacesAutocomplete
        value={locationSearch}
        onChange={setLocationSearch}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <NavigationBar>
            <SearchBar>
              <img
                className="search-icon"
                alt="search"
                style={{ width: 24 }}
                src={searchIcon}
              />
              <form>
                <InputGroup>
                  <FormControl
                    id="location"
                    placeholder="Enter Charity Name, Address, City, or Zip Code"
                    {...getInputProps()}
                  />
                  {/* <InputGroup.Append>
                    <Button variant="info">Search</Button>
                  </InputGroup.Append> */}
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
              </form>
            </SearchBar>
          </NavigationBar>
        )}
      </PlacesAutocomplete>
      <Menu />
    </TopBarContainer>
  );
};
