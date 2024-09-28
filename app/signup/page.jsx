"use client"
import React, { useState } from "react";
import SignupService from "@/Services/Signup.service";



function Signup(){
    const [username,setUsername] = useState('')
    const []

    return(
        <div>
                <div className="bg-blue-600 w-96 rounded-xl ml-96 mt-40  h-auto p-5">
                <h2 className="mb-5 ml-32 font-semibold">SignUp Form</h2>

<form action="">
    <label className="ml-14" htmlFor="">Username:</label><br />
    <input type="text" placeholder="username" className="ml-20 rounded p-2 mt-2"  /> <br />
    <label className="ml-14" htmlFor="">Email:</label><br />
    <input type="email" placeholder="email" className="ml-20 rounded p-2 mt-2"  />
    <label className="ml-14" htmlFor="">Password:</label><br />
    <input type="text" placeholder="password" className="ml-20 rounded p-2 mt-2" /> <br />
    <button className="bg-teal-400 rounded-xl p-2 mt-5 ml-32 " type="submit">Submit</button>
</form>
                </div>
        </div>
    )
}
export default Signup;