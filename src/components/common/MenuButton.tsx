import React from 'react'
import styled from "styled-components"

interface ButtonProps {
  border?: boolean
  size?: string
  primary?: boolean
  width?: string
  href?: string
}

const ButtonLink = styled.a<ButtonProps>`
  color: #171b50;
  font-weight: bold;
  letter-spacing: 0.8px;
  padding-top: 12px;
  text-transform: uppercase;
  width: auto;
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    color: #a50d0d;
    text-decoration: none;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

type IProps = {
  style?: object;
  title: string;
  href: string;
}

const MenuButton = (props: IProps) => {
  const { title, href } = props;

  return (
    <>
      <ButtonLink primary href={href} target="_blank" rel="noopener noreferrer">{title}</ButtonLink>
    </>
  );
};

export default MenuButton;
