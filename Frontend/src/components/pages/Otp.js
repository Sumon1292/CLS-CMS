import React, { useState } from 'react'
import './Otp.css'
import { useNavigate } from 'react-router-dom';

function Otp({setOtpVer}) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
        const response = await fetch("https://fronter.onrender.com/auth/validateotp", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp})
        });
        const data = await response.json();
        console.log(data);
        if (data.res) {
          setOtpVer(true);
          navigate('/resetPassword');
        } else {
          setErrorMessage(data.message);
        }
        setSuccessMessage(data.message);
      } catch (error) {
        setErrorMessage(error.message);
      }
  }

  return (
            <>
            <div className='one'>
                    <h1>ENTER VALID OTP</h1>
                </div>
                <form className='form-otp' onSubmit={handleLogin}>
                    <div className='otp-form'>
                        <input type="email" className='otp-email' placeholder='Email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className='otp-form'>
                        <input type="text" className='otp-email' placeholder='OTP' value={otp} onChange={(event) => setOtp(event.target.value)}  required/>
                    </div>
                    <div className='otp-form'>
                        <button type='submit' class="otp-next-btn" role="button">Next</button>
                    </div>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </>
  )
}

export default Otp;