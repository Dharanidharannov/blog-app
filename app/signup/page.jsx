import React from "react";



function Signup(){

    return(
        <div>
                <div className="bg-blue-600 w-96 rounded-xl ml-96 mt-40  h-auto p-5">
                <h2 className="mb-5 ml-32 font-semibold">SignUp Form</h2>

<form action="">
    <label className="ml-14" htmlFor="">Username:</label><br />
    <input type="text" placeholder="username" className="ml-20 rounded p-2 mt-2"  /> <br />
    <label className="ml-14" htmlFor="">Email:</label><br />
    <input type="email" placeholder="email" className="ml-20 rounded p-2 mt-2"  />
    <label htmlFor=""></label>
</form>
                </div>
        </div>
    )
}
export default Signup;