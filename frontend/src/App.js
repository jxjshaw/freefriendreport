import React from 'react';
import logo from './smarticon.gif';
import './App.css';
import FriendCard from './FriendCard.js'
import FRIENDREPORTJSON from './data.js'



function App() {

    function ParseFriendReportJson() {
        var data = [];
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
            data.push({
                "conversation" : {
                    "name" : friend,
                    "friend_messages" : num_friend_messages,
                    "your_messages" : num_your_messages
                }
            });
        });
        return data;
    }
    

    const data = ParseFriendReportJson();
    const listItems = data.map((d) => <li key={d["conversation"].name}> {d["conversation"].friend_messages}</li>);

  return (
    <div className="App">
        
        <h1>Freefriendsreport.com <img src={logo} width="80" height="" className="App-logo" alt="logo" /></h1>
        <h4>The ONLY free source for finding out who your real friends are</h4>

        <p>
        The Centre for Digitally Transmitted Relationships <br/><br/>

        Ever been left on read? <br/>
        Ever felt like you reached out more than they did? <br/>
        Ever been the person to not text back? <br/>

        Time to expose your text based relationships.  <br/>

        You've been here. <br/>

        This is you, in blue. <br/>

        And this is your friend in grey. <br/>

        Our service allows you to see all your messaging history in an accurate stream of blue to grey ratio to see who initiated first, who initiated more, who lost interest <br/>
        </p>
        
        {
             
            // const items =data.map((d) => {
            //     const val= Object.values(d)[0];
            //     return (<li>{val.name}</li>)
            //   });
              
        }
        
        {listItems}
        
        <FriendCard> </FriendCard>
      
    </div>
  );
}


export default App;
