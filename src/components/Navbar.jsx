import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';

const Navbar = () => {


  return (
    <>
      <div className="w-full flex justify-between items-center px-4 py-4 bg-cyan-900 text-white">
        <div className="text-lg font-bold ">Chat-App</div>
        <div>
 
            <button
            type="button"
            onClick={() => signOut(auth)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2"
            >
              Log out
            </button>

        </div>
      </div>
    </>
  );
}

export default Navbar
