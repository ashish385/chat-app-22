import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase";
import { ChatContext } from "../auth/ChatContext";

const AllUsers = (props) => {
  const { user } = props;
  console.log("User===>", user);
  console.log("userInfo", Object.entries(user));
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log("chats", chats);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

 

   const handleSelect = async (u) => {
     //check whether the group(chats in firestore) exists, if not create
     const combinedId =
       currentUser.uid > user.uid
         ? currentUser.uid + user.uid
         : user.uid + currentUser.uid;
     console.log(combinedId);
     console.log("curr", currentUser.uid);
     console.log("user", user.uid);
     try {
       const res = await getDoc(doc(db, "chats", combinedId));

       if (!res.exists()) {
         //create a chat in chats collection
         const getChat = await setDoc(doc(db, "chats", combinedId), {
           messages: [],
         });
         console.log("getchat", getChat);

         //create user chats
         const updateCurr = await updateDoc(
           doc(db, "userChats", currentUser.uid),
           {
             [combinedId + ".userInfo"]: {
               uid: user.uid,
               displayName: user.displayName,
               //  photoURL: user.photoURL,
             },
             [combinedId + ".date"]: serverTimestamp(),
           }
         );

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
       console.log("err", err);
     }

       console.log("u==========>", u);
       dispatch({ type: "CHANGE_USER", payload: u });
       console.log(u);
   };
  return (
    <>
      <div
        onClick={() => handleSelect(user)}
        className="group flex gap-2 items-center rounded-lg px-2 py-2 hover:bg-gray-100 shadow-lg"
      >
        <img
          className="shrink-0 h-11 w-11 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhtmBqlJilp6X2q2XsYxJ9DVYb_F8x17DjIOJcHtT&s"
          alt=""
        />
        <div className="ltr:ml-3 rtl:mr-3">
          <p className="text-sm font-medium text-slate-700 ">
            <span>{user?.displayName}</span>
          </p>
          {/* <p className="text-sm font-medium text-slate-500 group-hover:text-slate-400">
            ff
          </p> */}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
