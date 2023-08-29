import React, { createContext, useContext } from 'react'
import { ChatContext } from '../auth/ChatContext';
import { AuthContext } from '../auth/AuthContext';

const ChatHeader = () => {
  const { data } = useContext(ChatContext);
  //  console.log("chat-data", data.user.displayName);
  
  return (
    <div>
      <div className="w-full border-2 shadow-lg ">
        <div className="group flex gap-2 items-center rounded-lg px-2 py-2 hover:bg-gray-100">
          <img
            className="shrink-0 h-11 w-11 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhtmBqlJilp6X2q2XsYxJ9DVYb_F8x17DjIOJcHtT&s"
            alt=""
          />
          <div className="ltr:ml-3 rtl:mr-3">
            <p className="text-sm font-medium text-slate-700 ">
              {data.user?.displayName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader