import React, { useState,useEffect,useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import "./Dashboard.css"
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const {authState}=useContext(AuthContext)
   const[meanage,setMeanage]=useState(null)
   const[meanscore,setMeanscore]=useState(null)
   const[modeage,setModeage]=useState(null)
   const[modescore,setModescore]=useState(null)
   const[medianscore,setMedianscore]=useState(null)
   const[medianage,setMedianage]=useState(null)


  const medianAge = user => {
    const {length} = user;
    
    user.sort((a, b) => a.age - b.age);
    
    if (length % 2 === 0) {
        setMedianage((user[Math.floor((length - 1) / 2)].age + user[length/2].age)/2) ;
    }else{
        setMedianage(user[(length - 1) / 2].age) ;
    }
  };
  const medianScore = user => {
    const {length} = user;
    
    user.sort((a, b) => a.score - b.score);
    
    if (length % 2 === 0) {
        setMedianscore((user[Math.floor((length - 1) / 2)].score + user[length/2].score)/2) ;
    }else{
        setMedianscore(user[(length - 1) / 2].score) ;
    }
  };

  const modeAge = user => {
    const mode = {};
    let max = 0, count = 0;
  
    for(let i = 0; i < user.length; i++) {
      const item = user[i].age;
      
      if(mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }
      
      if(count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }
     
    setModeage(max)
  };

  const modeScore = user => {
    const mode = {};
    let max = 0, count = 0;
  
    for(let i = 0; i < user.length; i++) {
      const item = user[i].score;
      
      if(mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }
      
      if(count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }
     
    setModescore(max) ;
  };

  const getData=()=>{
    axios
    .get("http://localhost:3000/users")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));  
 }
 useEffect(()=>{
    getData()
},[])
//  for mean calculation
const meanAge = user => {
    let totalAge = 0;
    for (let i = 0; i < user.length; i++) {
      totalAge += user[i].age;

    }
    setMeanage(Math.floor(totalAge/user.length))
  };
  const meanScore = user => {
    let totalScore=0
    for (let i = 0; i < user.length; i++) {
      totalScore +=user[i].score

    }
    setMeanscore(Math.floor(totalScore/user.length))
  };
 
 

 const handleAge=()=>{
    meanAge(users)
    medianAge(users)
    modeAge(users)
 }

const handleScore=()=>{
    meanScore(users)
    medianScore(users)
    modeScore(users)
 }

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <table border="1px" className='dashboardTable'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th onClick={handleAge}>Age</th>
                    <th onClick={handleScore}>Score</th>
                </tr>
            </thead>
            <tbody>
                {users.map((el)=>(
                <tr key={el.id} style={{ backgroundColor: el.name == authState.name ? 'green' : 'white' }}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.age}</td>
                    <td>{el.score}</td>
                </tr>))}
            </tbody>
       </table>
      
       <div className='resultTable'>
        <h3>Age Result: </h3>
        <p>Mean Age:  {meanage} </p>
        <p>Median Age:  {medianage} </p>
        <p>Mod Age: {modeage} </p>
        <h3>Score Result: </h3>
        <p>Mean Score: {meanscore} </p>
        <p>Median Score:  {medianscore} </p>
        <p>Mod Score: {modescore} </p>

       </div>
    </div>
  );
};

export default Dashboard;