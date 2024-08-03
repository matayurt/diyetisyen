import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const authHandler = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', { email, password })
      localStorage.setItem('user', JSON.stringify(res.data))
      setUser(res.data)
      navigate("/")
    } catch (err) {
      console.error(err.response.data)
    }
  }

  return (
    <>
      <form onSubmit={authHandler}>
        <label>Giriş Yap</label>
        <input type="email" name='email' value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='E-mail'/>
        <input type="password" name='password' value={password} required onChange={(e) => setPassword(e.target.value)} placeholder='Şifre' />
        <button type='submit'>Giriş Yap</button>
      </form>
    </>
  )
}

export default LoginForm