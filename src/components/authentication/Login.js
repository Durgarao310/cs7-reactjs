import React, { useState } from "react"
import axios from "../../http" 
import Loading from "./../loading"
import { Link } from "react-router-dom";


export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const passwordHandler = (e) =>{
        setPassword(e.target.value)
    }

    const loginHandler = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError('');
        try {
            const {data} = await axios.post("auth/login",{email, password})
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
        setPassword("")
        setEmail("")
    }
    return (
        <div>
            {loading ? <Loading/> :
                <section className="hero is-primary is-fullheight">
                    <div className="hero-body">
                      <div className="container">
                        <div className="columns is-centered">
                          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <form action="" className="box">
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
                              <p className="has-text-link"><Link to="/forgotpassword">Forgotpassword</Link></p>
                              <div className="field">
                                <input type="button" value="Login" className="button is-success" />
                              </div>
                                <p>Don't have an account? <Link className="has-text-link" to="/register">Register</Link></p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                </section>
            }
        </div>
    )
}