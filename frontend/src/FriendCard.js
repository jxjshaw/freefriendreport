import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import "./App.css";

const Header = styled.div`
  padding: 20px;
  padding-bottom: 4px;
  font-size: 32px;
  font-weight: 300;
  color: #c1c1c2;
  color: black;
`;

const Subhead = styled.div`
  padding-left: 24px;
  padding-top: 8px;
  font-size: 16px;
  opacity: 0.5;
  font-weight: 300;
  color: #c1c1c2;
  color: black;
`;

const Container = styled.div`
  position: relative;
  border-radius: 8px
  /* background-color: #08080A; */
  background-color: rgba(0,0,0,0.05);
  overflow: hidden;
  height: 300px;
  margin-top: 24px;
  margin-bottom: 24px;
`;



function FriendCard() {
  
  return (
    <Container>
      <Header>Friend name</Header>
      <Subhead>score</Subhead>
    </Container>
  );
}

export default FriendCard;
