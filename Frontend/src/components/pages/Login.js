import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';

function Login({setAuth}) {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [LoginData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prevFormData) => ({

            ...prevFormData,

            [name]: value,

        }));


    };
    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(LoginData);

        fetch("https://fronter.onrender.com/auth/login", {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify(LoginData)

        })
            .then(response => response.json())
            .then(data => {
                if (data.hash_res) {
                    localStorage.setItem('token', data.User.token);
                    dispatch({ type: "USER", payload: true });
                    setAuth(true);
                    toast.success("Login successful");
                }
                else {
                    navigate('/User');
                    toast.error("Login unsuccessful");
                }

            })
            .catch(error => {

                console.error('Error registering user:', error);
            });

    };

    return (
        <>
            <div className='container'>

                <div className='one'>
                    <h1>USER LOGIN</h1>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='form-l'>
                                <input type="email" className='email-l' placeholder='Email' name='email' value={LoginData.email} onChange={handleChange} required />
                            </div>
                            <div className='form-l'>
                                <input type="password" className='email-l' placeholder='Password' name='password' value={LoginData.password} onChange={handleChange} required />
                            </div>
                            <div className="frgt-password">
                                <small><Link id='line' className="link1" to="/OtpEmail">Forgot Password?</Link></small>
                            </div>
                            <div className='two'>
                                <h3>Don't have an account? : <Link className="link" to="/SignUp">Sign Up</Link></h3>
                            </div>
                            <div className='form-l'>
                                <input type="submit" value="LOG IN" className='submit-f' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;