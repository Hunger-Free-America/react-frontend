import styled from "styled-components";
import React, { useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import Button from "../common/Button";

const Title = styled.div`
  color: #333f48;
  letter-spacing: 0.36px;
  font-size: 24px;
  font-weight: 700;
  height: 47px;
  width: 244px;
`;

const Content = styled.div`
  color: #333f48;
  letter-spacing: 0.31px;
  line-height: 1.15;
  font-size: 15px;
  font-weight: 400;
  height: 379px;
  padding-right: 11px;
  text-align: justify;
  width: 448px;
`;

interface IProps {
  style?: object;
  title: string;
  name: string;
}

const InfoPopover: React.FC<IProps> = (props) => {
  const { title, name } = props;
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <Button primary onClick={handleClick}>{title}</Button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        rootClose
        onHide={handleClick}
      >
        <Popover id="popover-contained" className={`pop-over-${name}`}>
          <Popover.Content>
            <Title>{`${title} Us`}</Title>
            <Content>{props.children}</Content>
          </Popover.Content>
        </Popover>
      </Overlay>
    </>
  );
};

export default InfoPopover;
