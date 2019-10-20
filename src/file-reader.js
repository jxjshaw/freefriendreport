import * as React from 'react'
import {useState, useEffect} from 'react'
import FRIENDREPORTJSON from './data.json'
import FriendCard from './FriendCard.js'
import ReactDOM from 'react-dom'

function Old_ParseFriendReportJson() {
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

function ParseFriendReportJson(user, messages) {
    var data = [];
    var friend;
    var participants = messages["participants"];
    if (participants[0] === user) {
        friend = participants[1]["name"];
    } else {
        friend = participants[0]["name"];
    }
    var num_friend_messages = 0;
    var num_your_messages = 0;
    messages["messages"].forEach(function(m) {
        if (m['content']) {
            if (m['sender_name'] === user) {
                num_friend_messages += m['content'].length;
            } else {
                num_your_messages += m['content'].length;
            }
        }
    });
    data.push({
        "conversation" : {
            "name" : String(friend),
            "friend_messages" : num_friend_messages,
            "your_messages" : num_your_messages
        }
    });
    console.log(messages);
    console.log(data);
    return data;
}
    

function FileReader() {
  // var [text, setText] = useState('')
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
      var data = Old_ParseFriendReportJson();
      setListItems(data);
  }, [])

  function onChange(e) {
    const {files} = e.target
    const [file] = files

    console.log('File:', file)

    const reader = new window.FileReader()
    // reader.onload = e => setText(String(e.target.result))
    reader.onload = function(e) {
        var data = ParseFriendReportJson("Jeff Shaw", JSON.parse(String(e.target.result)));

        // var temp = data;
        setListItems(data);
    }

    reader.readAsText(file)
  }

  return (
    <div>
      <div>
        <input type="file" onChange={onChange} />
      </div>

        {listItems.map((d) => 
                <FriendCard 
                data={d} 
                key={d["conversation"].name}
            >
        </FriendCard>)}
    </div>
  )
}

// ReactDOM.render(<FileReader />, document.querySelector('#app'))

export default FileReader;

