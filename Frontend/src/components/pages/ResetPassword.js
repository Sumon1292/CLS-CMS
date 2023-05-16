import React, { useState } from 'react'
import './Otp.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  async function handleResetPassword(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("https://cmsfronttt.onrender.com/auth/resetpassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if(data.result){
        setSuccessMessage(data.message);
        navigate("/User");
        toast.success("Reset Password Successful");
      }

    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
            <>
            <div className='one'>
                    <h1>RESET PASSWORD</h1>
                </div>
                <form className='form-otp' onSubmit={handleResetPassword}>
                    <div className='otp-form'>
                        <input type="email" className='otp-email' placeholder='Email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className='otp-form'>
                        <input type="text" className='otp-email' placeholder='New Password' value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    </div>
                    <div className='otp-form'>
                        <input type="text" className='otp-email' placeholder='Confirm Password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}  required/>
                    </div>
                    <div className='otp-form'>
                        <button type='submit' class="otp-next-btn" role="button">Submit</button>
                    </div>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}
            </>
  )
}

export default ResetPassword;