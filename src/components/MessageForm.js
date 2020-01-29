import React, { useState } from "react";

function MessageForm(props) {
  const [value, setValue] = useState("");
  const [username, setUserName] = useState(0);

  const submit = e => {
    e.preventDefault();

    const timestamp = new Date();

    if (value === "") {
      return;
    } else {
      props.addMessage(value, username, timestamp.toLocaleTimeString(), timestamp.toLocaleDateString());

      setValue("");
    }
  };

  const getIndex = e => {
    if (!e.target.value) {
      setUserName(0);
    } else {
      setUserName(e.target.value);
    }
  };

  return (
    <div className="fixed-container">
      <div className="outer-header">
        <div className="header">
          <i className="fab fa-twitter"></i>
          <form onSubmit={submit}>
            <input
              className="message-input"
              type="text"
              value={value}
              placeholder="message goes here..."
              onChange={e => setValue(e.target.value)}
            />
            <select className="username-select" onChange={getIndex}>
              {props.user.map(ele => (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>
            <button className="message-btn">post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageForm;
