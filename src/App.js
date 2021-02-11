import React, { useState, useEffect } from "react";
import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import "./App.css";
import Message from "./components/Message";
import firebase from "firebase/app";
import db from "./firebase/config";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 監聽 Cloud Firestore 獲取實時更新 (documents)
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const name = prompt("Please enter your name");
    setUsername(name);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      user: username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTimeout(() => {
      const chat = document.querySelector("#chat");
      chat.scrollTo({ behavior: "smooth", top: chat.scrollHeight });
    }, 50);

    setInput("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <img
            className="app__logo"
            src="Logo_Messenger_NewBlurple-399x399-1.png"
            alt="Logo_Messenger_NewBlurple-399×399"
          />
          <h1 className="app__title">Messenger</h1>
          <h2 className="app__subtitle">
            Welcome <span className="username">{username} 🙌</span>
          </h2>
        </div>
        <div id="chat" className="body">
          <FlipMove>
            {messages.map(({ id, data }) => (
              <Message key={id} username={username} data={data} />
            ))}
          </FlipMove>
        </div>
        <div className="footer">
          <form className="app__form">
            <FormControl className="app__formControl">
              <InputLabel>Enter a message...</InputLabel>
              <Input
                className="app__input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton
                className="app__iconButton"
                type="submit"
                color="primary"
                variant="contained"
                onClick={sendMessage}
                disabled={!input}
              >
                <Send />
              </IconButton>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
