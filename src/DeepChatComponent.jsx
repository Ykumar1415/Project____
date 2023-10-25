// DeepChatComponent.js
import React from "react";
import { DeepChat } from "deep-chat-react";

const DeepChatComponent = ({ onNewMessage }) => {
  let initialMessages = [
    { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "I am doing very well!" }
  ]

  return (
    <DeepChat
    // onNewMessage={onNewMessage}
      demo={true}
      style={{ borderRadius: "10px" }}
      textInput={{ placeholder: { text: "Welcome to the demo!" } }}
      initialMessages={initialMessages}
    />
  );
};

export default DeepChatComponent;
