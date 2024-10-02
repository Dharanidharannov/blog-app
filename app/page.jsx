import React from "react";
import Link from "next/link";


function Home(){
  return(
    <div>
      <nav>
           <Link href="/signup" className="mr-20 ml-96">SignUp</Link>
           <Link href="/SignIn">Login in</Link>
      </nav>
    </div>
  )
}

export default Home;
