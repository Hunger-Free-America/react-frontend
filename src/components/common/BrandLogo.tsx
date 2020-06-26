import React from "react";
import styled from "styled-components";
import logo from  "../../assets/images/ProjectEndingHunger.png";

const BrandLogo = styled.img`
  width: 160px;

  @media (max-width: 400px) {
    position: absolute;
    width: 87px;
  }
`;

export default () => <BrandLogo alt="Project Ending Hunger Logo" src={logo} />;