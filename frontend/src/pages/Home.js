import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";


const Home=()=> {
  
    const [data,setData]=useState([]);
    const loadData=async ()=>{
        const respond = await axios.get("http://localhost:5000/api/get");
        setData(respond.data);
    };

    useEffect(()=>{
        loadData();
    },[]);

    const deleteContact=(id)=>{
        if(window.confirm("Are you sure that you wanted to delete that contant?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("contact deleted successfully");
            setTimeout(()=>loadData(),500);
        }
    }


    return (

    <div style={{marginTop:"100px"}}>
        <Link to="/addcontact">
        <button className='btn btn-contact'>Add Contact</button>
        </Link>
        
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item,index)=>{
                        return(
                            <tr key={item.id}>
                                <th style={{textAlign:"left"}}>{index+1}</th>
                                <td style={{textAlign:"left"}}>{item.name}</td>
                                <td style={{textAlign:"left"}}>{item.email}</td>
                                <td style={{textAlign:"left"}}>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                } 
            </tbody>
        </table>
        
    </div>
  )
}


export default Home;
