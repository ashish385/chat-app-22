import React, { useContext, useEffect, useState } from 'react'
import User from './User'
import SearchUser from './SearchUser'
import AllUsers from './AllUsers';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';


const ChatUser = () => {
  const [allChat, setAllChat] = useState(true)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
      // console.log("userChats1==>", users);
    });
    return unsub;
  }, []);

  // console.log("users ->",users);
  
  return (
    <>
      <div className="hidden md:block h-[86vh]  bg-gray-200 ">
        <SearchUser />
        <div className="relative w-full flex justify-around bg-blue-400 px-2 py-2  ">
          <div
            className="bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer"
            onClick={() => setAllChat(true)}
          >
            Active Chats
          </div>
          <div
            className="bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer"
            onClick={() => setAllChat(false)}
          >
            All Chats
          </div>
        </div>
        <div className="flex flex-col h-[55vh]  overflow-y-auto ">
          {allChat && (
              <User /> 
          )}
          {!allChat && (
            <div className="max-h-[55vh] overflow-y-auto bg-white px-4 py-2">
              {users.length > 0 &&
                users.map((user, i) => {
                  return <AllUsers key={JSON.stringify(i)} user={user} />;
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatUser
