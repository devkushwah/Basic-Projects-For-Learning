import React from 'react'
import signupImg from "../assets/signup.png"
import Template from "../Components/Template"

const Signup = ({setIsLoggedIn}) => {
  return (
     <Template
        title="Join the millions learning to code with StudyNotion with Free"
        desc1='Build Skills for Today, Tomorrow and beyond'
        desc2="Education to future-proof your career"
        image={signupImg}
        formType="signup"
        setIsLoggedIn = {setIsLoggedIn}

     />
  )
}

export default Signup