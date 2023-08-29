import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../auth/ChatContext';
import moment from 'moment/moment';

const Chat = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    console.log("message", message);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (data.user.uid === message.senderId) {
    console.log("user ka id",data.user.uid," ",message?.senderId);
  }

  console.log("current id", message.id ," ",currentUser.uid);

  return (
    <div>
      <div
      // className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className={`chat ${data.user.uid === message.senderId? "chat-start":"chat-end"}`} ref={ref}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" />
              {/* <img
                src={
                  message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt=""
              /> */}
            </div>
          </div>
          <div className="chat-header  ">
            {/* {message.} */}
            <time className="text-xs opacity-50 pl-1">{moment(message.time).format("lll")} </time>
          </div>
          <div className="chat-bubble">{message.text}</div>
          {/* <div className="chat-footer opacity-50">Delivered</div> */}
        </div>
      </div>
      {/* <div className={"chat chat-end"} ref={ref}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" />
          </div>
        </div>
        <div className="chat-header  ">
          Ashish
          <time className="text-xs opacity-50 pl-1">12:45</time>
        </div>
        <div className="chat-bubble">hello</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className={"chat chat-start"}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" />
          </div>
        </div>
        <div className="chat-header">
          Ayush
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">Hii</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div> */}
    </div>
  );
};

export default Chat
