import { DeepChat } from 'deep-chat-react'
import React from 'react'

function Newfile() {
  return (
    <div>
        <DeepChat
        demo={true}
        style={{ borderRadius: "10px" }}
        textInput={{ placeholder: { text: "Welcome to the demo!" } }}
        initialMessages={[ { role: "ai", text: "Hey! What would you like to buy today ?" }]}
      />
    </div>
  )
}

export default Newfile