import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
import { ChatContext } from '../auth/ChatContext';

const User = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);

   useEffect(() => {
     const getChats = () => {
       const unsub = onSnapshot(
         doc(db, "userChats", currentUser.uid),
         (doc) => {
           setChats(doc.data());
           console.log("chats",chats );
         }
       );

       return () => {
         unsub();
       };
     };

     currentUser.uid && getChats();
   }, [currentUser.uid]);

   const handleSelect = (u) => {
     dispatch({ type: "CHANGE_USER", payload: u });
   };

  // console.log(chats);
  // console.log(Object.entries(chats));
  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="group flex gap-2 items-center rounded-lg px-2 py-2 hover:bg-gray-100 shadow-lg"
          >
            <img
              className="shrink-0 h-11 w-11 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhtmBqlJilp6X2q2XsYxJ9DVYb_F8x17DjIOJcHtT&s"
              alt=""
            />
            <div className="ltr:ml-3 rtl:mr-3">
              <p className="text-sm font-medium text-slate-700 ">
                {chat[1].userInfo.displayName}
                {/* <span>Ashish</span> */}
              </p>
              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </>
  );
}

export default User
