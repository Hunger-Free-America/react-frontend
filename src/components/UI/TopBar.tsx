import React from "react";
import styled from "styled-components";

import Menu from "./Menu";
import Search from "./Search";
import { SetLocation } from "./types";
import BrandLogo from "../common/BrandLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";

const Container = styled("div")`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2) !important;
  display: flex;
  padding: 5px 0 0;
  // position: absolute;
  top: 0;
  width: 100%;
  // height: 75px;
  z-index: 1000;

  @media (max-width: 400px) {
    // height: 150px;
  }
`;

type TopBarProps = {
  setLocation: SetLocation;
};

export default ({ setLocation }: TopBarProps) => {
  return (
    <Container>
      <Navbar className="w-100" expand="sm">
        <BrandLogo />
        <Search setLocation={setLocation} />
        <Menu />
      </Navbar>
    </Container>
  );
};
