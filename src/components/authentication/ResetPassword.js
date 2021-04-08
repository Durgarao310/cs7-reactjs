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
                        <section className="hero is-primary is-fullheight">
                    <div className="hero-body">
                      <div className="container">
                        <div className="columns is-centered">
                          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <div class={error ? "notification is-warning" : ""}>
                                {error}{success}
                                </div>
                            <form onSubmit={resetPasswordHandler} className="box">
                              <div className="field">
                                <label htmlFor="" className="label">Password</label>
                                <div className="control has-icons-left">
                                  <input type="password" onChange={passwordHandler} placeholder="********" value={password} className="input" required />
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                  </span>
                                </div>
                              </div>
                              <div className="field">
                                <input type="button" value="ForgotPassword" className="button is-success" />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                </section>
                        <form onSubmit={resetPasswordHandler}>
                            <input type="password" value={password} onChange={passwordHandler} placeholder="passwordd" />
                            <input value="submit" type="submit" />
                        </form>
                </div>
            }
        </div>
    )
}