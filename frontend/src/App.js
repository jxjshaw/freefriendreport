import React from 'react';
import logo from './smarticon.gif';
import './App.css';
import FriendCard from './FriendCard.js'

function App() {
  return (
    <div className="App">
        
        <h1>Freefriendsreport.com <img src={logo} width="80" height="" className="App-logo" alt="logo" /></h1>
        <h4>The ONLY free source for finding out who your real friends are</h4>
        


        <FriendCard/>
      
    </div>
  );
}

export default App;
