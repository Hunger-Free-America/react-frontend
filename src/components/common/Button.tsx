import React from "react"
import styled from "styled-components"

const getWidth = (size = "medium") =>
  ({ small: "53.5px", medium: "107px", large: "244px" }[size] || "107px")

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  border?: boolean
  primary?: boolean
  width?: string
  size?: string
  toggle?: boolean
}

const Button = styled.button<ButtonProps>`
  background: ${({ primary }) => (primary ? "transparent" : "#0093d7")};
  border: ${({ border }) => (border ? "solid 1px #979797" : "#0093d7")};
  border-radius: 23px;
  color: ${({ primary }) => (primary ? "#262626" : "#fff")};
  font-weight: bold;
  height: 40px;
  padding-top: 1px;
  text-transform: uppercase;
  width: ${({ size, width }) => width || getWidth(size)};

  &:active,
  &:focus,
  &:hover {
    background: ${({ primary }) => (primary ? "#f6f6f6" : "#045f8a")};
    border: ${({ border }) => (border ? "solid 1px #979797" : "none")};
    color: ${({ primary }) => (primary ? "#262626" : "#fff")};
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

interface IconButtonProps extends ButtonProps {
  alt?: string
  src: string
}

const Icon = styled.img`
  margin-right: 5px;
  vertical-align: sub;
`

export const IconButton = ({
  alt,
  children,
  src,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Icon alt={alt} src={src} />
      {children}
    </Button>
  )
}

interface MapListButtonProps extends ButtonProps {
  alt?: string
  src: string
}

export const MapListButton = ({
  alt,
  children,
  src,
  toggle,
  ...buttonProps
}: MapListButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Icon alt={alt} src={src} />
      {children}
    </Button>
  )
}

export default Button
