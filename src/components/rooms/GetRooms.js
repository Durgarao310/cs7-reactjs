import React, { useState, useEffect } from "react"
import axios from "../../http" 
import Loading from "./../loading"


export default function GetRooms(){
    const [rooms, setRooms] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        const getAllRooms = async() =>{
            try {
                setLoading(true)
                const {data} = await axios.get("rooms")
                setRooms(data.data)
                console.log(data.data)
                setLoading(false)
            } catch (error) {
                setError(error.response.data.error)
            }
            setError("")
        }
        getAllRooms()
    },[])

    const nameHandler = (e) =>{
        setName(e.target.value)
    }

    const roomHandler = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError('');
        try {
            const {data} = await axios.post("rooms",{name})
            setLoading(false)
            setRooms([data.data, ...rooms])
            console.log(data)
        } catch (error) {
            setError(error.response.data.error)
            setLoading(false)
            setTimeout(() => {
                setError("")
            }, 7000);
        }
        setName("")
    }
    return (
        <div>
            {loading ? <Loading/> :
                    <div>
                        {error}
                        {rooms.length}
                        <form onSubmit={roomHandler}>
                            <input type="text" value={name} onChange={nameHandler} placeholder="room name" />
                            <input value="submit" type="submit" />
                        </form>
                </div>
            }
        </div>
    )
}