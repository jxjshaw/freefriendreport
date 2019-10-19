import React from 'react';
import logo from './smarticon.gif';
import './App.css';
import FRIENDREPORTJSON from './data.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>Freefriendsreport.com</h1>
        <h4>The ONLY free source for finding out who your real friends are</h4>
        <img src={logo} width="150" height="" className="App-logo" alt="logo" />
       
      </header>
    </div>
  );
}

function ParseFriendReportJson() {
    FRIENDREPORTJSON["conversations"].forEach(function(conversation) {
        var friend = conversation["title"]
        var num_friend_messages = 0;
        var num_your_messages = 0;
        conversation["messages"].forEach(function(message) {
            if (message['text']) {
                if (message['sender'] === 'Kevin Sun') {
                    num_friend_messages += message['text'].length;
                } else {
                    num_your_messages += message['text'].length;
                }
            }
        });
        console.log(friend + "---- your friend sent " + num_friend_messages + ": you sent " + num_your_messages);
    });
}
ParseFriendReportJson()

export default App;
