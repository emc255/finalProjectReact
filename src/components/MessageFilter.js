import React, { useState } from "react";

function MessgeFilter(props) {
  const [filterByUserName, setUserFilterByUserName] = useState("");

  const filterChoice = [
    { id: 10, name: "--------" },
    { id: 12, name: "username" },
    { id: 13, name: "likes" },
    { id: 14, name: "date" }
  ];

  const filterCheckUserName = value => {
    if (value === "username") {
      props.getFilter(value);
    }

    setUserFilterByUserName(value);
  };

  const filterCheck = value => {
    if (value === "--------") {
      props.getFilter(value);
      setUserFilterByUserName("");
    } else if (value === "likes") {
      props.getFilter(value);
      setUserFilterByUserName("");
    } else if (value === "date") {
      props.getFilter(value);
      setUserFilterByUserName("");
    }
  };

  return (
    <div className="fixed-container">
      <div className="filter-container">
        <span>filter by : </span>

        <select
          onChange={e => {
            e.target.value === "username" ? filterCheckUserName(e.target.value) : filterCheck(e.target.value);
          }}
        >
          {filterChoice.map(ele => (
            <option key={ele.id} value={ele.name}>
              {ele.name}
            </option>
          ))}
        </select>
        <Form filterByUserName={filterByUserName} user={props.user} getFilterByName={props.getFilterByName} />
      </div>
    </div>
  );
}

export default MessgeFilter;

function Form(props) {
  if (props.filterByUserName === "") {
    return <div></div>;
  } else {
    return (
      <div className="username-filter-select">
        {
          <select
            onChange={e => {
              props.getFilterByName(e.target.value);
            }}
          >
            {props.user.map(ele => (
              <option key={ele.id} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
        }
      </div>
    );
  }
}
