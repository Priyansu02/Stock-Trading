import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

        const[formData, setFormData]=useState({
           
            email:"",
            password:"",
            
        });

    
        const handleChange = (e)=>{
            setFormData({
                ...formData,
                [e.target.name]:e.target.value,
            });
        };

        const navigate=useNavigate();
    
        const handleSubmit= async (e)=>{
            e.preventDefault();
    
            if( !formData.email || !formData.password ){
                alert("please fill all the fields");
                return;
            }
    
            // if(formData.password !== formData.value){
            //     alert("password does not match");
            //     return;
            // }
    
            if(formData.password.length < 8){
                alert("enter a valid password");
                return;
            }

            //console.log(formData);

            try{
                const response= await axios.post(
                    "http://localhost:3002/login",
                    {
                        email: formData.email,
                        password: formData.password,

                        
                    }
                );

                alert("Login Successfully");
                
                //console.log(response.data);

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(response.data.user)
                );

                window.location.href = "http://localhost:3001";

            }catch(error){
                console.error(error);
                alert("Invalid Email or Password");
            }
        }
    return (<>

        <h2 className="text-center mt-5">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4">
                        

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

                       

                        <button  type="submit" className="btn btn-primary w-100 mt-3">Login</button>

                        <p className="text-center mt-3">
                           Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </>)
}

export default Login;