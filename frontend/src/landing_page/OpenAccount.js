import React from 'react';
import {Link} from 'react-router-dom';
function OpenAccount() {
    return ( 
        <div className='container p-5'>
            <div className='row text-center p-5' >
                
                <h1 className='mt-5'>Open a TradeNova account</h1>
                <p>
                    Modern platform and apps, 0 invenstments,and flat 20 intraday and F&O trades.
                </p>
                               <Link
                    to="/signup"
                    className="btn btn-primary fs-5 p-2"
                    style={{ width: "20%", margin: "auto" }}
                    >
                    Sign up now
                </Link>

            </div>
        </div>
     );
}

export default OpenAccount;