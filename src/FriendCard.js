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
  
`;

const Subhead = styled.div`
  padding-left: 24px;
  padding-top: 8px;
  font-size: 60px;
  font-weight: 300;
  color: ${props => props.color};
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
  background-color: #0874FC;
  color: white;
  border-radius: 60px;
  padding: 24px;
`;



function FriendCard(props) {
  const { conversation: {name, friend_messages, your_messages}} = props.data;
  const friendshipScore = friend_messages/your_messages;
  return (
    <Container>
      <Header>{name}</Header>
      {
        friend_messages/your_messages<1 ? 
         <Subhead color="red"> {friendshipScore} </Subhead> :
         <Subhead color="white"> {friendshipScore} </Subhead>
    }
      
    </Container>
  );
}

export default FriendCard;
