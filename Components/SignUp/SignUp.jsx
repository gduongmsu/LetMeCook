import React, { useState } from 'react'
import './SignUp.css'


const SignUp = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className="text">Sign In</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <input type="user" placeholder='User Id'></input>
            </div>
            <div className="input">
                <input type="email" placeholder='Email'></input>
            </div>
            <div className="input">
                <input type="password" placeholder='Password'></input>
            </div>
        </div>
        <div className="forgot-password">Lost Password?</div>
        <div className="submit-container">
            <div className="submit">Sign Up</div>
            <div className="submit">Login</div>
        </div>
    </div>
  )
}

export default SignUp
