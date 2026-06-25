import React from 'react';

function Team() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div>
                    <h1 className='fs-2 text-center mt-5 mb-5'>
                        Founder
                    </h1>
                </div>
                <div className=' row p5 border-top mt-5 text-muted' style={{lineHeight:"1.8", fontSize:"1.2rem"}}>
                    <div className='col-6 p-5 text-center mt-5'>
                       <img src='media/photos/nithinkamath.jpg' style={{borderRadius:"100%", width:"60%"}}/>
                       <h4 className='mt-3'>
                        Nithin Kamath
                       </h4>
                       <h5>Founder,CEO</h5>
                    </div>
                    <div className='col-6 mt-5 '>
                       <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>

                       <p> He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

                        <p>Playing basketball is his zen.</p>

                        <p>Connect on <a style={{textDecoration:"none"}} href=''>Homepage</a>  <a href='' style={{textDecoration:"none"}}>Twitter</a></p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Team;