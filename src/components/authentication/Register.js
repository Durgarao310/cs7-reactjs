import React, { useState } from "react"
import axios from "../../http"
import Loading from "./../loading"
import { Link } from "react-router-dom";




export default function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const nameHandler = (e) =>{
        setName(e.target.value)
    }

    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const passwordHandler = (e) =>{
        setPassword(e.target.value)
    }

    const registerHandler = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError('');
        try {
            const {data} = await axios.post("auth/register",{name, email, password})
            console.log(name, email, password)
            localStorage.setItem("authToken", data.token)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setError(error.response.data.error)
            setLoading(false)
            setTimeout(() => {
                setError("")
            }, 7000);
        }
        setName("")
        setPassword("")
        setEmail("")
    }
    return (
        <div>
            {loading ? <Loading /> :
                    <div>
                        <section className="hero is-primary is-fullheight">
                    <div className="hero-body">
                      <div className="container">
                        <div className="columns is-centered">
                          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <form action="" onSubmit={registerHandler} className="box">
                            <div className="field">
                                <label htmlFor="" className="label">Name</label>
                                <div className="control has-icons-left">
                                  <input type="text" onChange={nameHandler} placeholder="Name" value={name} className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-globe"></i>
                                  </span>
                                </div>
                              </div>
                              <div className="field">
                                <label htmlFor="" className="label">Email</label>
                                <div className="control has-icons-left">
                                  <input type="email" onChange={emailHandler} placeholder="e.g. example@gmail.com" value={email} className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                  </span>
                                </div>
                              </div>
                              <div className="field">
                                <label htmlFor="" className="label">Password</label>
                                <div className="control has-icons-left">
                                  <input type="password" onChange={passwordHandler} placeholder="*******" value={password} className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                  </span>
                                </div>
                              </div>

                              <div className="field">
                                <input type="button" value="Register" className="button is-success" />
                              </div>
                              <p>Do you have an account? <Link className="has-text-link" to="/login">Login</Link></p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                </section>
                </div>
            }
        </div>
    )
}