import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../../App';
import { toast } from "react-toastify";

function CalculateCost() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [orderData, setOrderData] = useState({
    pickup: '',
    drop: '',
    weight: '',
    typeofGood: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem('token');
  const handleSubmit = (event) => {
    console.log(orderData);
    event.preventDefault();
    console.log(token);

    fetch('https://fronter.onrender.com/placeorder/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    })
      .then((response) => {
        if (response.ok) {
          dispatch({ type: 'USER', payload: true });
          navigate('/Vendor');
          toast.success("Order Saved Successful")
        } else {
          console.log('not able to show');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="one">
        <h1>Enter Pickup and Destination Location</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-l">
            <select
              id="pickup"
              className="email-l lar"
              name="pickup"
              value={orderData.pickup}
              onChange={handleChange}
              required
            >
              <option value="">---Pickup Location---</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          <div className="form-l">
            <select
              id="destination"
              className="email-l lar"
              name="drop"
              value={orderData.drop}
              onChange={handleChange}
              required
            >
              <option value="">---Drop Location---</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          <div className="form-l">
            <input
              type="text"
              className="email-l"
              value={orderData.weight}
              name="weight"
              placeholder="Enter Weight in KG"
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-l'>
            <select id="typeofGood" name="typeofGood"  className="email-l lar" onChange={handleChange} required>
              <option value="">---Good Type---</option>
              <option value="Medical Cares">Medical Cares</option>
              <option value="Food and Beverages">Food and Beverages</option>
              <option value="Hazardous">Hazardous</option>
              <option value="Apparel">Apparel</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div className='form-l'>
            <input type="submit" value="Submit" className='submit-f'/>
          </div>
          
        </form>
      </div>
   </div>
  
    
  )
}

export default CalculateCost;