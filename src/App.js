import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./components/Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    // 監聽 Cloud Firestore 獲取實時更新 (documents)
    db.collection("messages")
      .orderBy("timestamp", "desc")
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
    setInput("");
  };

  return (
    <div className="App">
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ data, id }) => (
          <Message account={username} data={data} key={id} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
