import React, { useContext, useEffect, useState } from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../auth/ChatContext';
import { db, storage } from '../Firebase';

const SendMessage = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  
  const handleSend = async () => {
    // if (img) {
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //       console.log(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // } else {
    //   await updateDoc(doc(db, "chats", data.chatId), {
    //     messages: arrayUnion({
    //       id: uuid(),
    //       text,
    //       senderId: currentUser.uid,
    //       date: Timestamp.now(),
    //     }),
    //   });
    // }

   const updateCurrDoc = await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
   });
    
    console.log("updateCurrDoc", updateCurrDoc);

   const updateUserDoc = await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
   });
    console.log("updateUserDoc", updateUserDoc);

    setText("");
    setImg(null);
  };


  return (
    <div>
      <footer className="absolute bottom-0 left-0 z-20 w-full p-4  border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-[#052b65]  dark:border-gray-600">
        <ul className=" w-full flex flex-wrap items-center mt-3 text-sm md:text-lg font-medium  text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="flex flex-none gap-1 md:gap-4 px-6  md:text-2xl">
            <BsEmojiSmile className=" cursor-pointer" />
            <HiOutlinePlus className=" cursor-pointer" />
          </li>
          <li className="flex-1 px-6">
            <form className="flex justify-between">
              <label className="w-full relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
                <input
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  className=" placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-1  md:pl-6 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                  placeholder="Type a message"
                  type="text"
                  // name="search"
                />
              </label>
              <button
                type="submit" 
                onClick={handleSend}
                className="text-2xl ml-4 w-10 h-10 pl-3 hover:opacity-10 hover:bg-gray-50 hover:text-[#052b65] rounded-full"
              >
                <IoMdSend className=" cursor-pointer " />
              </button>
            </form>
          </li>
          {/* <li className="flex-none px-6 text-2xl"></li> */}
        </ul>
      </footer>
    </div>
  );
}

export default SendMessage
