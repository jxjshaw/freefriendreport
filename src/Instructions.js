import React from 'react';
import './App.css';

import fbDownload from './images/fb-download.gif';
import unzip from './images/unzip.png';

function Instructions() {



  return (
    <div className="instructions">
        
      <h2> Getting started </h2>
      <h3> Step 1: Download your data from the facebook </h3>
      <img src={fbDownload} width="500px" />
      <h3> Step 2: Unzip the folder</h3>
      <img src={unzip} width="500px" />
      <h3> Step 3: Upload the "inbox" folder to get your FREE real friends report</h3>
        

    </div>
  );
}


export default Instructions;
