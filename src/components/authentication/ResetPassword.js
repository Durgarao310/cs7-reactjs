import React, { useState } from "react"
import axios from "../../http"
import Loading from "./../loading"
import { Link } from "react-router-dom";



export default function ResetPassword({history,match}){
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
    }

    const resetPasswordHandler = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError('');
        try {
            const {data} = await axios.put(`auth/passwordreset/${match.params.resetToken}`,{password})
            localStorage.setItem("authToken", data.token)
            setLoading(false)
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error)
            console.log(error)
            setLoading(false)
            setTimeout(() => {
                setError("")
            }, 7000);
        }
        setPassword("")
    }
    return (
        <div>
            {loading ? <Loading /> :
                    <div>
                        {error}
                        <form onSubmit={resetPasswordHandler}>
                            <input type="password" value={password} onChange={passwordHandler} placeholder="passwordd" />
                            <input value="submit" type="submit" />
                        </form>
                </div>
            }
        </div>
    )
}