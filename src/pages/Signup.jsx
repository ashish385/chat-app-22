import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";



const Signup = () => {
  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  }

  const [formdata, setFormdata] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata, [name]: value
    })
    console.log(formdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = formdata.firstName + " " + formdata.lastName;

    console.log("Printing all data");
    if (!formdata.firstName  || !formdata.email || !formdata.password || !formdata.password || !formdata.gender) {
      alert("Required all field!")
      return;
    }
    
    try {
      const res = await createUserWithEmailAndPassword(auth, formdata.email, formdata.password);
      console.log(res.user);
       await updateProfile(auth.currentUser, {
         displayName:displayName
      })
      
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        displayName:displayName,
        email: formdata.email,
        dateOfBirth: formdata.dateOfBirth,
        gender: formdata.gender,
        uid: user.uid,
        timestamp: new Date(),
      });

      await setDoc(doc(db,"userChats",user.uid),{})
      toast.success("Sign up successfully!");
      setFormdata("");
      navigate("/login")
     
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    }
    
    
  }


  return (
    <>
      <div className="w-full h-auto flex justify-center items-center  ">
        <div className="w-full flex flex-col gap-2 items-center px-4 md:px-0 ">
          <img
            src="data:image/png;base64,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"
            alt="facebook-logo"
            className="w-[13rem]"
          />

          <div className="w-full sm:w-3/4  md:w-5/12 flex flex-col gap-2  border rounded-lg  pt-3  mb-5 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
            <div className="border-b-2 pb-2">
              <h1 className="text-center text-black font-semibold">
                Create a new account
              </h1>
              <p className="text-center text-gray-500">It's quick and easy</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 px-4">
                <div className="w-full flex justify-between">
                  <input
                    type="text"
                    name="firstName"
                    value={formdata.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className=" w-[48%] px-3 py-2 text-sm border-[1.5px] rounded-md outline-none focus:ring-[1px] ring-gray-400 focus:text-gray-800"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formdata.lastName}
                    onChange={handleChange}
                    placeholder="Lastname"
                    className="peer w-[48%] px-3 py-2 border rounded-md outline-none focus:ring-1 ring-gray-400 focus:text-gray-800"
                  />
                </div>
                <label htmlFor="email">
                  <input
                    required
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    placeholder="Mobile number or email address"
                    className="peer w-full px-3 py-2  border-[1.5px] rounded-md outline-none focus:ring-1 ring-gray-400 focus:text-gray-800"
                  />
                  <p className=" hidden peer-invalid:block   text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                  <p className=" hidden peer-valid:block  text-green-600 text-sm">
                    Correct email address.
                  </p>
                </label>
                <label htmlFor="password">
                  <input
                    required
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="peer w-full px-3 py-2  border-[1.5px] rounded-md outline-none focus:ring-1 ring-gray-400 focus:text-gray-800"
                  />
                  <p className="hidden peer-invalid:block  text-pink-600 text-sm">
                    password 6-9,a-z,A-Z, special character
                  </p>
                  <p className=" hidden peer-valid:block text-green-600 text-sm">
                    Correct password format.
                  </p>
                </label>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-500">Date of Birth</span>
                  <label htmlFor="dob">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formdata.dateOfBirth}
                      onChange={handleChange}
                      className="peer w-full px-3 py-2  border-[1.5px] rounded-md outline-none focus:ring-1 ring-gray-400 focus:text-gray-800"
                    />
                  </label>
                </div>
                <div htmlFor="gender" className="fle flex-col gap-1">
                  <span className="text-gray-500">Gender</span>
                  <div className="flex w-full gap-2 ">
                    <label
                      htmlFor="female"
                      className="flex border flex-1 px-3 py-1 rounded-md justify-between shadow-lg"
                    >
                      <span>Female</span>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value={"female"}
                        onChange={handleChange}
                        checked={formdata.gender === "female"}
                      />
                    </label>
                    <label
                      htmlFor="male"
                      className="flex border flex-1 px-3 py-1 rounded-md justify-between shadow-lg"
                    >
                      <span>Male</span>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value={"male"}
                        onChange={handleChange}
                        checked={formdata.gender === "male"}
                      />
                    </label>
                    <label
                      htmlFor="custom"
                      className="flex border flex-1 px-3 py-1 rounded-md justify-between shadow-lg"
                    >
                      <span>Custom</span>
                      <input
                        type="radio"
                        id="custom"
                        name="gender"
                        value={"custom"}
                        onChange={handleChange}
                        checked={formdata.gender === "custom"}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-[.9rem]">
                  People who use our service may have uploaded your contant
                  information to facebook.
                  <Link className="text-blue-500 hover:text-blue-700 hover:underline">
                    Learn more
                  </Link>
                </p>
                <p className="text-[.9rem]">
                  By clicking Sign Up, you are agree to our
                  <Link className="text-blue-500 hover:text-blue-700 hover:underline">
                    Terms, Privacy Policy
                  </Link>
                  and{" "}
                  <Link className="text-blue-500 hover:text-blue-700 hover:underline">
                    Cookies Policy.
                  </Link>
                  You may receive SMS notification from us and can opt out any
                  time.
                </p>

                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <Link to={"/"} className="text-center pb-2">
              <span className="text-blue-500 hover:text-blue-700 hover:underline">
                Already have an account?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
