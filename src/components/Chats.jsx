import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import SendMessage from './SendMessage';
import { ChatContext } from '../auth/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    console.log(data.chatId);
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      console.log("doc",doc.data());
      doc.exists() && setMessages(doc.data().messages);
      console.log("chat-data-messages",messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log("messages", messages);
  return (
    <div>
      <div className="  h-[90vh]  bg-gray-100 ">
        <ChatHeader />
        <div className="px-4 h-[60vh] w-full  overflow-y-auto">
          {messages.map((m) => (
            <Chat message={m} key={m.id} />
          ))}
          <SendMessage messages={ messages} />
        </div>
      </div>
    </div>
  );
}

export default Chats
