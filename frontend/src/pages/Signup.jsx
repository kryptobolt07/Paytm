import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottonWarning } from "../components/BottonWarning"
import { InputBox } from "../components/InputBox"


export const Signup = () =>{

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    return <>
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create the account"} />
                <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>{
                    setFirstName(e.target.value)
                }} />
                <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
                <InputBox label={"Email"} placeholder={"gohilmanav2005@gmail.com"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <InputBox label={"Password"} placeholder={"123456"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <Button label={"Sign up"} 
                    onClick={async () => {
                        try {
                            const response = await axios.post(`VITE_BACKEND_API_URL/api/v1/user/signup`, {
                                username,
                                firstName,
                                lastName,
                                password
                            },{
                                headers: {
                                    'Content-Type': 'application/json'  
                            }});
                    
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                    
                        } catch (error) {
                            const errorMessage = error.response?.data?.message || error.message;
                            console.error("Signup failed:", errorMessage);
                            alert(`Signup failed: ${errorMessage}`);
                        }
                    }}
                />

                <BottonWarning  label={"Already have an account?"} buttonText={"Sign in"} to={'/signin'} />
            </div>

        </div>
    </div>
    </>
}