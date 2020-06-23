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

  position: absolute;
  /* including Results width */
  left: 303px;
  right: 80px;
  top: 14px;
  z-index: 1000;

  @media (max-width: 980px) {
    left: 20px;
  }
`;

const Suggestions = styled("div")`
  position: absolute;
  border: 1px solid gray;
  z-index: 1000;
  background: white;
  width: 100%;
`;

const Suggestion = styled("div")`
  border-bottom: 1px solid gray;
  padding: 5px;
  cursor: pointer;
`;

const NavigationBar = styled("div")`
  display: flex;
  justify-content: center;
  z-index: 1000;
  flex: 1;
  max-width: 584px;
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
  margin-left: 25px;
  margin-right: 99px;
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
