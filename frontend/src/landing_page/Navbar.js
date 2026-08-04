import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (  
        
             <nav class="navbar navbar-expand-lg bg-body-tertiary bg-light border-bottom">
            <div class="container">
                <Link className="navbar-brand" to="/">
                    
                    <img src='media/photos/tradeNova.png' style={{width:"30%"}} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav  mb-lg-0">


                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/signup">Signup</Link>
                    </li>


                   <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/about">About</Link>
                    </li>


                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/product">Product</Link>
                    </li>


                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/pricing">Pricing</Link>
                    </li>
                    
                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/support">Support</Link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    
                </form>
                </div>
            </div>
            </nav>
        
    );
}

export default Navbar;