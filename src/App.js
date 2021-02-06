import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Message from "./components/Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { user: "Anonymous", content: "who i am?" },
  ]);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    const name = prompt("Please enter your name");
    setUsername(name);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { user: username, content: input }]);
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
      {messages.map((message, id) => (
        <Message account={username} data={message} key={id} />
      ))}
    </div>
  );
}

export default App;
