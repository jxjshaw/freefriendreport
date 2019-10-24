import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import "./App.css";

const Header = styled.div`
  padding: 20px;
  padding-bottom: 4px;
  font-size: 32px;
  font-weight: 600;
  color: #c1c1c2;
  color: white;
  z-index: 3;
  padding: 24px;
  padding-left: 40px;
  
`;

const Subhead = styled.div`
  padding-left: 24px;
  padding-top: 8px;
  font-size: 60px;
  font-weight: 300;
  color: ${props => props.color};
  z-index: 3;
  padding: 12px;
  padding-top: 8px;
  padding-left: 40px;
`;

const GhostBar = styled.div`
  height: 240px;
  background-color: rgba(255,255,255,0.8);
  background-color: #0874FC;
  width: 20%;
  width: ${props => `${props.width}%`};
  position: absolute;
  z-index: -1;
`;

const Container = styled.div`
  position: relative;
  border-radius: 8px
  /* background-color: #08080A; */
  background-color: rgba(0,0,0,0.05);
  overflow: hidden;
  height: 240px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: #0874FC;
  background-color: rgba(0,0,0,0.1);
  color: white;
  border-radius: 60px;
  z-index: -1;
`;





function FriendCard(props) {
  const { conversation: {name, friend_messages, your_messages}} = props.data;
  const friendshipScore = friend_messages/your_messages;
  const messageTotal = friend_messages + your_messages;
  return (
    <Container>
      <GhostBar
        width={friend_messages/messageTotal * 100}
      />
      <Header>{name}</Header>
      {
        friend_messages/your_messages<1 ? 
         <Subhead color="#FFC000" > {friendshipScore} </Subhead> :
         <Subhead color="white" > {friendshipScore} </Subhead>
    }
      
    </Container>
  );
}

export default FriendCard;
