import React from 'react'
import { useState, useEffect } from 'react';
import './OrderStatus.css';


function OrderStatus() {
  const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://cmsfronttt.onrender.com/orders/checkstatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);


      return (
          <div className='order-container'>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Pickup Location</th>
              <th>Destination Location</th>
              <th>Weight</th>
              <th>Goods Type</th>
            </tr>
          </thead>
          <tbody>
          {data.map(datas => (
              <tr key={datas._id}>
                <td>{datas._id}</td>
                <td>{datas.pickup}</td>
                <td>{datas.drop}</td>
                <td>{datas.weight}</td>
                <td>{datas.typeofGood}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      );
    }

export {OrderStatus}