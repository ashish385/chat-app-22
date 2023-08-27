import React from 'react'
import Navbar from '../components/Navbar'
import ChatUser from '../components/ChatUser'
import Chats from '../components/Chats'

const Dashboard = () => {
  return (
    <>
      <div className="fixed w-full">
        <Navbar />
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <ChatUser />
          </div>
          <div className="col-span-2">
            <Chats />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard
