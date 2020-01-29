import React, { useState } from "react";
import MessageForm from "./components/MessageForm";
import MessageFilter from "./components/MessageFilter";
import Body from "./components/Body";
import "./App.css";

let counter = 103;

function App() {
  const [user] = useState([
    { id: 0, name: "euhna", photo: "http://placekitten.com/g/101/100" },
    { id: 1, name: "sana", photo: "http://placekitten.com/g/102/100" },
    { id: 2, name: "sinb", photo: "http://placekitten.com/g/103/100" },
    { id: 3, name: "yerin", photo: "http://placekitten.com/g/104/100" },
    { id: 4, name: "nayeon", photo: "http://placekitten.com/g/105/100?" }
  ]);

  const [post, setPost] = useState([
    {
      id: 2,
      name: "sinb",
      photo: "http://placekitten.com/g/103/100",
      message: "eeeeeeeeeeeeeeeeeeeeeee",
      date: "1/1/2020",
      time: "4:11 pm",
      likes: 2,
      reply: [],
      messageToggle: false,
      postId: 100,
      emote: [],
      emoteToggle: false
    },
    {
      id: 4,
      name: "nayeon",
      photo: "http://placekitten.com/g/105/100",
      message: "nnnnnnnnnnnnnnnnnnnnnnn",
      date: "1/11/2020",
      time: "6:21 pm",
      likes: 1,
      reply: [],
      messageToggle: false,
      postId: 101,
      emote: [],
      emoteToggle: false
    },
    {
      id: 1,
      name: "sana",
      photo: "http://placekitten.com/g/102/100",
      message: "ssssssssssssssssssssss",
      date: "1/6/2020",
      time: "2:11 pm",
      likes: 11,
      reply: [],
      messageToggle: false,
      postId: 102,
      emote: [],
      emoteToggle: false
    }
  ]);

  const [filter, setFilter] = useState("");
  const [filterByName, setFilterByName] = useState("");

  const addMessage = (input, index, time, date) => {
    let newPost = {};

    user.map(ele => {
      if (ele.id === parseInt(index)) {
        newPost = {
          id: ele.id,
          name: ele.name,
          photo: ele.photo,
          message: input,
          date: date,
          time: time,
          likes: 0,
          reply: [],
          messageToggle: false,
          postId: ++counter,
          emote: [],
          emoteToggle: false
        };
      }

      return newPost;
    });
    let newMessage = [newPost, ...post];

    setPost(newMessage);
  };

  const getFilter = filter => {
    if (filter === "--------") {
      setFilter("");
      setFilterByName("");
    } else if (filter === "likes") {
      setFilter("likes");
      setFilterByName("");
    } else if (filter === "date") {
      setFilter("date");
      setFilterByName("");
    } else if (filter === "username") {
      setFilterByName("euhna");
      setFilter("");
    }
  };

  const getFilterByName = filter => {
    setFilterByName(filter);
  };

  const getLike = vote => {
    post.map(ele => {
      if (ele.postId === parseInt(vote)) {
        ele.likes += 1;
      }

      return post;
    });
    setPost([...post]);
  };

  const getEmoteToggle = onOff => {
    post.map(ele => {
      if (ele.postId === parseInt(onOff)) {
        ele.emoteToggle = !ele.emoteToggle;
      }

      return post;
    });
    setPost([...post]);
  };

  const getEmoticons = (value, userId) => {
    let emoticons = { name: value, count: 1 };

    post.map(ele => {
      if (ele.postId === parseInt(userId)) {
        ele.emote.find(icon => {
          if (icon.name === value) {
            icon.count += 1;
          }

          return ele.emote;
        });
        if (ele.emote.length <= 0) {
          ele.emote.push(emoticons);
        }
      }

      return post;
    });

    setPost([...post]);
  };

  const getMessageToggle = onOff => {
    post.map(ele => {
      if (ele.postId === parseInt(onOff)) {
        ele.messageToggle = !ele.messageToggle;
      }

      return post;
    });
    setPost([...post]);
  };

  const getReply = (dataId, value, name, time, date) => {
    let newReply = {};

    post.map((ele, imdex) => {
      if (ele.postId === parseInt(dataId)) {
        newReply = {
          message: value,
          name: name,
          time: time,
          date: date
        };

        ele.reply.push(newReply);
      }

      return post;
    });
    setPost([...post]);
  };

  return (
    <div className="App">
      <MessageForm user={user} addMessage={addMessage} />
      <MessageFilter user={user} getFilter={getFilter} getFilterByName={getFilterByName} />
      <Body
        user={user}
        post={post}
        filter={filter}
        filterByName={filterByName}
        getLike={getLike}
        getEmoteToggle={getEmoteToggle}
        getEmoticons={getEmoticons}
        getMessageToggle={getMessageToggle}
        getReply={getReply}
      />
    </div>
  );
}

export default App;
