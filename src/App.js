import React from 'react';
import logo from './smarticon.gif';
import './App.css';
// import FriendCard from './FriendCard.js';
// import FRIENDREPORTJSON from './data.json';
import Instructions from './Instructions.js';
import FileReader from './file-reader.js'


function App() {

  return (
    <div className="App">
        <div>         
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
            
            Your TOTAL score = aka the aggregate
        </div>

        <Instructions/>

    
        <FileReader/>
        
        <form action="https://www.facebook.com/dyi?x=Adm94qWFKLgs1TQe">
            <input type="submit" value="download messenger data"/>
        </form>
    </div>
  );
}


export default App;
