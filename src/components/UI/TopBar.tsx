import React from "react";
import styled from "styled-components";

import Menu from "./Menu";
import Search from "./Search";
import { SetLocation } from "./types";
import BrandLogo from "../common/BrandLogo";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled("div")`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  padding: 14px 25px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 400px) {
    height: 120px;
  }
`;

type TopBarProps = {
  setLocation: SetLocation;
};

export default ({ setLocation }: TopBarProps) => {
  return (
    <Container>
      <BrandLogo />
      <Search setLocation={setLocation} />
      <Menu />
    </Container>
  );
};
