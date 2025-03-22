import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";


export const Users = () =>{

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect( ()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user/bulk?filter=`+filter)
            .then(response =>(
                setUsers(response.data.user)
            ))
    } ,[filter])



    return <>
    <div className="font-bold mt-6 mx-4 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={(e)=>{
            setFilter(e.target.value)
        }} type="text" placeholder="Search users...." className="w-full px-2 py-1 border rounded-md border-slate-200 mx-4"></input>    
    </div>
    <div>
        {users.map(user => <User user={user} />)}
    </div>
    </>
    
}


function User({user}){
    const navigate = useNavigate();

    return<div className="flex justify-center">
        <div className="flex">
            <div className="rounded-full h-12 w-12 text-white bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e)=>{
               navigate("/send?id=" + user._id + "&name=" + user.firstName) 
            }} label="Send Money"/>
        </div>
    </div>
}