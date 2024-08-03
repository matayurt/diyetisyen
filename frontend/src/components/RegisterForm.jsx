import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = ({ setUser }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const registerHandler = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:5001/api/users/register`, { name, email, password })
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            navigate('/');
        } catch (err) {
            console.error('Registration failed. Please check your details.', err.response.data)
        }
    }

  return (
    <>
        <form onSubmit={registerHandler}>
            <label>Kayıt Ol</label>
            <input type="name" name='name' value={name}  onChange={(e) => setName(e.target.value)} placeholder='İsim' required/>
            <input type="email" name='email' value={email}  onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' required/>
            <input type="password" name='password' value={password}  onChange={(e) => setPassword(e.target.value)} placeholder='Şifre' required/>
            <button type='submit'>Register</button>
        </form>
    </>
  )
}

export default RegisterForm