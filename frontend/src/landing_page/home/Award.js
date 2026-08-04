import React from 'react';
function Award() {
    return ( 
        <div className='container mt-5 '>
            <div className='row'>
                <div className='col-6'>
                    <img src='media/photos/largestBroker.svg'/>
                </div>
                <div className='col-6 mt-3 p-5'>
                    <h1>Largest stock broker in India</h1>
                    <p>2+ million TradeNova clients contribute to over 15% of all retail order volumes in India by trading and investing in:</p>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    Futures and Options
                                </li>
                                <li>
                                    Commodity derivatives
                                </li>
                                <li>
                                    Currency derivatives
                                </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    Stocks & IPOs
                                </li>
                                <li>
                                    Direct mutual funds
                                </li>
                                <li>
                                   Bonds and Govt. Securities
                                </li>
                            </ul>
                        </div>

                    </div>
                    <img  src='media/photos/pressLogos.png' style={{width:"90%"}}/>
                </div>
            </div>
        </div>
     );
}

export default Award;