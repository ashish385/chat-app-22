import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import { AuthContext } from "../auth/AuthContext";

const SearchUser = () => {
 const [username, setUsername] = useState("");
 const [user, setUser] = useState(null);
 const [err, setErr] = useState(false);

 const { currentUser } = useContext(AuthContext);

 const handleSearch = async () => {
   const collection_ref =   collection(db, "users");
   console.log(collection_ref);
   const q = query(collection_ref, where("displayName", "==", username));

   console.log(q);
  

   try {
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       setUser(doc.data());
       console.log("user",user);
     });
   } catch (err) {
     setErr(true);
   }
 };

 const handleKey = (e) => {
   e.code === "Enter" && handleSearch();
  };
  
 

 const handleSelect = async () => {
   //check whether the group(chats in firestore) exists, if not create
   const combinedId =
     currentUser.uid > user.uid
       ? currentUser.uid + user.uid
       : user.uid + currentUser.uid;
   console.log(combinedId);
   console.log("curr", currentUser.uid);
   console.log("user",user.uid);
   try {
     const res = await getDoc(doc(db, "chats", combinedId));

     if (!res.exists()) {
       //create a chat in chats collection
       const getChat = await setDoc(doc(db, "chats", combinedId), { messages: [] });
       console.log("getchat",getChat);

       //create user chats
       const updateCurr = await updateDoc(doc(db, "userChats", currentUser.uid), {
         [combinedId + ".userInfo"]: {
           uid: user.uid,
           displayName: user.displayName,
          //  photoURL: user.photoURL,
         },
         [combinedId + ".date"]: serverTimestamp(),
       });

       console.log("updateCurr", updateCurr);

       const updateUser = await updateDoc(doc(db, "userChats", user.uid), {
         [combinedId + ".userInfo"]: {
           uid: currentUser.uid,
           displayName: currentUser.displayName,
          //  photoURL: currentUser.photoURL,
         },
         [combinedId + ".date"]: serverTimestamp(),
       });
       console.log("updateUser", updateUser);
     }
     console.log("sb shi hai");
   } catch (err) {
     console.log("err",err);
   }

   setUser(null);
   setUsername("");
 };

  return (
    <div>
      <div className="px-4 py-2">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-1 md:pl-6 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <div className="flex justify-center items-center py-4 bg-green-400">
          {err && <span className="text-red-500">{err}</span>}

          {/* <img src="" alt="" /> */}
          {user && (
            <>
              <div
                onClick={handleSelect}
                className={`${
                  !user ? "appearance-none h-0" : "block cursor-pointer  "
                }`}
              >
                {/* <img src={user.photoURL} alt="" /> */}
                <span>{user.displayName}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
