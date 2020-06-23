import React, { useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import styled from "styled-components";

const ButtonContainer = styled("div")``;

const StyledButton = styled(Button)`
  background: transparent;
  border-radius: 23px;
  color: #262626;
  padding-top: 9px;

  &:active, &:focus, &:hover {
    background: #f6f6f6;
    border: none;
    color: #000000;
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

interface IProps {
  style?: object;
  title: string;
}

const InfoPopover: React.FC<IProps> = (props) => {
  const { style, title } = props;
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <ButtonContainer style={style}>
      <StyledButton variant="secondary" onClick={handleClick}>
        {title}
      </StyledButton>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        rootClose
        onHide={handleClick}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">{title}</Popover.Title>
          <Popover.Content>{props.children}</Popover.Content>
        </Popover>
      </Overlay>
    </ButtonContainer>
  );
};

export default InfoPopover;
