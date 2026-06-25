import React from 'react';
import Hero from './Hero';
import Award from './Award';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';

import Navbar from '../Navbar';
import OpenAccount from '../OpenAccount';
import Footer from '../footer';

function Homepage() {
    return (  
        <>
        
        <Hero />
        <Award />
        <Stats />
        <Pricing />
        <Education />
        <OpenAccount />
        
        </>
    );
}

export default Homepage;