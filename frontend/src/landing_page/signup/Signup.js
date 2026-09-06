import axios from "axios";
import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

function Signup() {

    const[formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const navigate= useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword){
            alert("please fill all the fields");
            return;
        }

        if(formData.password !== formData.confirmPassword){
            alert("password does not match");
            return;
        }

        if(formData.password.length < 8){
            alert("enter a valid password");
            return;
        }

        try{
            const response= await axios.post(
                "https://stock-trading-bksj.onrender.com/newUser",
                {
                    name:formData.name,
                    email:formData.email,
                    password:formData.password,
                }
            );

            alert("Account created Successfully");
            //console.log(response.data);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
             
            navigate("/login");

        }catch(e){
            console.error(e);
            alert("Signup Failed");
        }
    }

    return ( <>
     <h2 className="text-center mt-5">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4">
                        <input type="textform-control "
                         className="mb-3"
                          placeholder="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />

                        <input type="email"
                         className="form-control  mb-3"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />

                        <input type="password"
                         className="form-control  mb-3"
                          placeholder="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        /> 

                        <input type="password" 
                         className="form-control  mb-3"
                          placeholder="confirm password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />

                        <button  type="submit" className="btn btn-primary w-100 mt-3">sign up</button>

                        <p className="text-center mt-3">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </> );
}

export default Signup;