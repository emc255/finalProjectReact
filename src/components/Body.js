import React, { useState } from "react";

function Body(props) {
  let arr = [...props.post];

  if (props.filter === "") {
    arr = [...props.post];
  } else if (props.filter === "likes") {
    arr = arr.sort((a, b) => b.likes - a.likes);
  } else if (props.filter === "date") {
    arr = arr.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (props.filterByName.length > 0) {
    arr = [...props.post].filter(ele => ele.name === props.filterByName);
  }

  if (arr.length > 0) {
    return (
      <div className="message-container">
        {arr.map((ele, index) => (
          <div className="message-box" key={index}>
            <div className="user-photo">
              <img src={ele.photo} alt="kitty" />
            </div>
            <div className="message-content-container">
              <p className="line user-name">{ele.name}</p>
              <p className="line date">{ele.date}</p>
              <span>@</span>
              <p className="line time">{ele.time}</p>
              <p>{ele.message}</p>
              <i className="far fa-thumbs-up" data-id={ele.postId} onClick={e => props.getLike(e.target.dataset.id)}>
                {ele.likes}
              </i>
              <DisplayEmotes emotes={ele.emote} />
              <div>
                <Emotes ele={ele.emoteToggle} id={ele.postId} getEmoticons={props.getEmoticons} />
                <button data-id={ele.postId} onClick={e => props.getEmoteToggle(e.target.dataset.id)}>
                  emotes
                </button>
                <button data-id={ele.postId} onClick={e => props.getMessageToggle(e.target.dataset.id)}>
                  reply
                </button>
                <MessageToggle
                  id={ele.postId}
                  ele={ele.messageToggle}
                  user={props.user}
                  reply={ele.reply}
                  getReply={props.getReply}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default Body;

function Emotes(props) {
  if (props.ele) {
    return (
      <div>
        <i
          className="far fa-smile-beam"
          data-id={props.id}
          data-name="far fa-smile-beam"
          onClick={e => {
            props.getEmoticons(e.target.dataset.name, e.target.dataset.id);
          }}
        ></i>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function DisplayEmotes(props) {
  if (props.emotes.length > 0) {
    return (
      <div>
        {props.emotes.map((ele, index) => (
          <i key={index} className={ele.name}>
            {ele.count}
          </i>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

function MessageToggle(props) {
  const [value, setValue] = useState("");
  const [username, setUserName] = useState("euhna");
  const [dataId, setDataId] = useState(0);

  const submit = e => {
    e.preventDefault();

    const timestamp = new Date();

    if (value === "") {
      return;
    } else {
      props.getReply(dataId, value, username, timestamp.toLocaleTimeString(), timestamp.toLocaleDateString());

      setValue("");
    }
  };

  const getIndex = e => {
    setUserName(e.target.value);
  };

  const setMsg = (msg, msgId) => {
    setValue(msg);
    setDataId(msgId);
  };

  if (props.ele) {
    return (
      <div>
        <form onSubmit={submit}>
          <input
            type="text"
            data-id={props.id}
            value={value}
            placeholder="reply..."
            onChange={e => setMsg(e.target.value, e.target.dataset.id)}
          />
          <select onChange={getIndex}>
            {props.user.map(ele => (
              <option key={ele.id} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
          <button>reply</button>
        </form>
        <Reply reply={props.reply} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function Reply(props) {
  if (props.reply.length > 0) {
    return (
      <div>
        {props.reply.map((ele, index) => (
          <div key={index}>
            <p>{ele.name}</p>
            <p>{ele.date}</p>
            <p>{ele.time}</p>
            <p>{ele.message}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
