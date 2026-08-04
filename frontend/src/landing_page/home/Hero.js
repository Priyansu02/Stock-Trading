import React from 'react';
import {Link} from "react-router-dom";
function Hero() {
    return ( 
        
        <div className='container p-5'>
            <div className='row text-center p-5' >
                <img src='media/photos/homeHero.png' alt='Hero' className='mb-5'/>
                <h1 className='mt-5'>Invest in everything</h1>
                <p>
                    Online platform to invest in stocks, derivates,mutual funds ,and more.
                </p>
                <Link
                    to="/signup"
                    className="btn btn-primary fs-5 p-2"
                    style={{ width: "20%", margin: "auto" }}
                    >
                    Sign up
                </Link>

            </div>
        </div>
        
     );
}

export default Hero;
