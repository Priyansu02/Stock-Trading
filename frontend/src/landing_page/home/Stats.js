import React from 'react';

function Stats() {
    return ( 
        <div className='container mt-5 p-5'>
            <div className='row' p-5>
                <div className='col-6' p-5>
                    <h1 className='mb-5 fs-2'>Trust with confidence</h1>


                    <h2 className='fs-4'>Customer-first always</h2>
                    <p className='text-muted'> That's why 1.3+crore customers trust TradeNova with ₹3.5+ lakh crore worth of equity investment</p>
                    <h2 className='fs-4'>No spam or gimmicks</h2>
                    <p className='text-muted'>No gimmiks,spam,"gamification", or annoying push notification . High quality apps that you use at your pace, the way you like.</p>
                    <h2 className='fs-4'>The TradeNova universe</h2>
                    <p className='text-muted'>Not just an app , but a whole ecosystem, Our investments in 30+ fintech startups offer you tailored services specific to your needs</p>
                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>With initiatives like Nudge and kill Switch ,we don't just facilitate transactions , but actively help you do better with your money</p>
                </div>
                <div className='col-6 p-5'>
                    <img src='media/photos/ecosystem.png' style={{width:"85%"}}/>
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products →</a>
                        <a href='' style={{textDecoration:"none"}}>Try Kite Demo →</a>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Stats;