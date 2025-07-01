import React from 'react'
import loginImg from "../assets/login.png"
import Template from "../Components/Template"

const Login = ({setIsLoggedIn}) => {
  return (
     <Template
        title="Welcome Back"
        desc1='Build Skills for Today, Tomorrow and beyond'
        desc2="Education to future-proof your career"
        image={loginImg}
        formType="login"
        setIsLoggedIn = {setIsLoggedIn}

     />
  )
}

export default Login