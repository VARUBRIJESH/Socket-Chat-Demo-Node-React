import "./App.css";
import React, { useState } from "react";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:5000";

const App = () => {
  const socket = socketClient(SERVER);
  const [file, setFile] = useState(null)
  const onChangeFileInput = (e) => {
    setFile(e.target.value)
    console.log('e.target.value :: ', e.target.value);
  }

  const messages = document.getElementById("messages");
  socket.on("chat_message", function (msg) {
    console.log("----- chat_message event received -----", msg);
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgValue = document.getElementById("msg").value;
    const userName = document.getElementById("user").value;
    if (userName && msgValue && msgValue.trim() !== "") {
      console.log("----- chat_message event fired -----");
      const msg = `${userName} : ${msgValue}`;
      socket.emit("chat_message", msg);
      document.getElementById("msg").value = "";
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h3>Chat Demo with Node and Express</h3>
      </header>
      <ul id="messages"></ul>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name and Send Message:
          <input
            id="user"
            style={{ margin: "5px" }}
            placeholder="Your Name..."
          />
          <input
            id="msg"
            style={{ margin: "15px" }}
            placeholder="Enter Message..."
          />
          <input
            type="file"
            name="file"
            onChange={onChangeFileInput}
            style={{ margin: "15px" }}
            placeholder="Enter Message..."
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
