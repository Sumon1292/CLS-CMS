import React, { useState } from 'react'
import './Otp.css'
import { useNavigate } from 'react-router-dom';

function OtpEmail({setEmailVer}) {
     const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  async function handleSendOtp(event) {
    event.preventDefault();

    fetch("https://fronter.onrender.com/auth/forgotpassword", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})

    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);

        if(data.success){
            setSuccessMessage(data.message);
            setEmailVer(true);
            navigate('/Otp')
        }else{
          setErrorMessage(data.message);
        }
      })
       .catch (error=>{
      setErrorMessage(error.response.data.message);
      });
    }

  return (
            <>
            <div className='one'>
                    <h1>ENTER YOUR EMAIL</h1>
                </div>
                <form className='form-otp' onSubmit={handleSendOtp}>
                    <div className='otp-form'>
                        <input type="email" className='otp-email' placeholder='Email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
                    </div>
                    <div className='otp-form'>
                        <button type='submit' class="otp-next-btn" role="button">Get OTP</button>
                    </div>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}
            </>
  )
}

export default OtpEmail;