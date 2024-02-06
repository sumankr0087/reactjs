import React from "react";
import {Link} from "react-router-dom"

function Home() {
  return (
   <>
   <header>
    <a href="#">logo</a>
    <nav>
        <ul>
            <li><Link to="/">Home</Link>
</li>
            <li><Link to="/about">About</Link>
</li>
        </ul>
    </nav>
   </header>
   </>
  );
}

export default Home;
