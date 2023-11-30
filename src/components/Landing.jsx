import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import "./Landing.css"


const Landing = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const navigate=useNavigate();
    const {authState}=useContext(AuthContext)

     const getData=()=>{
        axios
        .get("http://localhost:3000/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));  
     }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let found = users.find((user) => user.name === name)
        if(found){
            authState.isAuth=true
            authState.name=name
            navigate("/dashboard")
        }else{
            alert("User not found")
        }
    };

    useEffect(()=>{
        getData()
    },[])

  
   
    return (
      <div className='landing'>
        <h2>Landing Page</h2>

        <form onSubmit={handleSubmit} className='loginForm'>
                <label> Enter Name: </label>
                <input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                id='nameInput'
                />
                <br/><br/>
                <input type='submit' id='submit' value="Submit"/>
        </form>
      </div>
    );
  };


export default Landing