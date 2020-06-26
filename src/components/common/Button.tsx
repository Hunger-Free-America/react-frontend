import styled from "styled-components";

const getWidth = (size = "medium") => ({ small: "53.5px", medium: "107px", large: "244px" }[size]);

interface ButtonProps {
  border?: boolean;
  size?: string;
  primary?: boolean;
  width?: string;
};

const Button = styled.button<ButtonProps>`
  background: ${({ primary }) => primary ? 'transparent' : '#0093d7'};
  border: ${({ border }) => border ? 'solid 1px #979797' : '#0093d7'};
  border-radius: 23px;
  color: ${({ primary }) => primary ? '#262626' : '#fff'};
  font-weight: bold;
  height: 40px;
  padding-top: 1px;
  text-transform: uppercase;
  width: ${({ size, width }) => width || getWidth(size)};

  &:active, &:focus, &:hover {
    background: ${({ primary }) => primary ? '#f6f6f6' : '#045f8a'};
    border: ${({ border }) => border ? 'solid 1px #979797' : 'none'};
    color: ${({ primary }) => primary ? '#262626' : '#fff'};
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export default Button;