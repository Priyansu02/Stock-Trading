import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepage from './landing_page/home/Homepage';
import AboutPage from './landing_page/about/AboutPage';
import PricingPage from './landing_page/Pricing/PricingPage';
import ProductPage from './landing_page/products/ProductsPage';
import Signup from './landing_page/signup/Signup';
import SupportPage from './landing_page/support/SupportPage';
import Footer from './landing_page/footer';
import Navbar from './landing_page/Navbar';
import NotFound from './landing_page/NotFound';
import Login from './landing_page/login/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path='/' element={<Homepage/>} />
         <Route path='/about' element={<AboutPage/>} />
         <Route path='/pricing' element={<PricingPage/>} />
         <Route path='/product' element={<ProductPage/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/login' element={<Login/>}/>
         <Route path='/support' element={<SupportPage/>} />
         <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
  </BrowserRouter>
);
