import React, { createContext, useReducer,useState,useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import PlaceOrders from './components/pages/PlaceOrders';
import Service from './components/pages/Service';
import Footer from './components/pages/Footer';
import Login from './components/pages/Login';
import { SignUp } from './components/pages/SignUp';
import Track from './components/pages/Track';
import Contact from './components/pages/Contact';
import CalculateCost from './components/pages/CalculateCost';
import { OrderStatus } from './components/pages/OrdrerStatus';
import UploadDoc from './components/pages/UploadDoc';
import OtpEmail from './components/pages/OtpEmail';
import Otp from './components/pages/Otp';
import Vendor from './components/pages/Vendor';
import ResetPassword from './components/pages/ResetPassword';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initialState,reducer } from './reducer/UseReducer';



export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  const token = localStorage.getItem('token');

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("https://cmsfronttt.onrender.com/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, [token]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailVerified, setEmailVerified]=useState(false);
  const [isOtpVerified,setOtpVerified]=useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const setEmailVer=boolean=>{
    setEmailVerified(boolean);
  }

  const setOtpVer=boolean=>{
    setOtpVerified(boolean);
  }

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar setAuth={setAuth}/>
    <switch>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/Services" exact element={<Service/>}/>
      <Route path="/Contact" exact element={<Contact/>}/>
      <Route exact path="/User"
        element={
        isAuthenticated?(
           <Navigate to="/PlaceOrders"/>
        ):(
          <Login setAuth={setAuth}/>
        )
        }
        />
      <Route exact path="/SignUp"
      element={
        isAuthenticated?(
          <Navigate to="/PlaceOrders"/>
        ):(
          <SignUp setAuth={setAuth}/>
        )
        }
        />
      <Route exact path="/PlaceOrders"
         element={
        isAuthenticated?(
          <PlaceOrders/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
      <Route exact path="/OrderPlacement"
         element={
        isAuthenticated?(
          <CalculateCost/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
      <Route exact path="/Track"
         element={
        isAuthenticated?(
          <Track/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
      <Route exact path="/Vendor"
         element={
        isAuthenticated?(
          <Vendor/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
       <Route exact path="/OrderStatus"
         element={
        isAuthenticated?(
          <OrderStatus/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
      <Route exact path="/UploadDoc"
         element={
        isAuthenticated?(
          <UploadDoc/>
        ):(
          <Navigate to="/User"/>
        )
        }
      />
      <Route exact path="/OtpEmail"
         element={
          <OtpEmail setEmailVer={setEmailVer}/>
        }
      />
      <Route exact path="/Otp"
         element={
        (isEmailVerified ?<Otp setOtpVer={setOtpVer}/>:
          <Navigate to="/OtpEmail"/>
        )
        }
      />

<Route exact path="/resetPassword"
         element={
        (isEmailVerified && isOtpVerified) ?<ResetPassword/>:
          <Navigate to="/Otp"/>
        }
      />

    </Routes>
    </switch>

    <Footer/>
    <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />

    </UserContext.Provider>
    </>
  );
}

export default App;