import React from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'

function Register(props) {
  const handleOnSubmit = (values) => {
    
    console.log("form values", values);
  }
  return (
    <div>
      <RegisterForm onSubmit={handleOnSubmit}/>
    </div>
  )
}

Register.propTypes = {}

export default Register
