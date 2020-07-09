import React from "react";
import styled from "styled-components";
import logo from  "../../assets/images/HFA_logo.png";

const BrandLogo = styled.img`
  width: 250px;

  @media (max-width: 400px) {
    position: absolute;
    width: 190px;
  }
`;

export default () => <BrandLogo alt="Project Ending Hunger Logo" src={logo} />;