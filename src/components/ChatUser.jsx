import React, { useContext, useEffect, useState } from 'react'
import User from './User'
import SearchUser from './SearchUser'
import { AuthContext } from '../auth/AuthContext';


const ChatUser = () => {
  
  return (
    <>
      <div className="hidden md:block h-[86vh]  bg-gray-200 overflow-y-scroll">
        <SearchUser />
        <div>
          <User />
        </div>
      </div>
    </>
  );
}

export default ChatUser
