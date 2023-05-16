import React from 'react'
import { View, Text } from 'react-native';
import { useState } from 'react';
import "./Track.css"

function Track() {
  const [trackID,setTrackID]=useState('');
  const [pickup,setPickUp]=useState('');
  const [drop,setDrop]=useState('');

  const show = () => {
      var a = document.getElementById('hidden')
      a.style.visibility = 'visible';
  }

 async function handleSubmit(event){
    event.preventDefault();

    fetch('https://fronter.onrender.com/orders/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({ID:trackID})
    }).then(response => response.json())
        .then(data => {
          setPickUp(data.pickup);
          setDrop(data.drop);
          show();
        })
        .catch(error => console.error(error));
  }


  return (
    <>
      <div className='track-container'>
        <h2 id='track-header'>ENTER YOUR TRACKING ID</h2>
        <form>
          <div className='track'>
            <input type="text" className='inp-track' placeholder='Track ID' value={trackID} onChange={(event) => setTrackID(event.target.value)} required />
          </div>
          <div className='track'>
            <input onClick={handleSubmit} type="submit" value="TRACK" className='track-btn'/>
          </div>
        </form>
        <div id="hidden" style={{visibility:"hidden"}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px', marginTop: 2, width: '100%'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <View style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>1</Text>
            </View>
            <View style={{ width: 200, height: 4, backgroundColor: 'green' }}></View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>2</Text>
            </View>
            <View style={{ width: 200, height: 4, backgroundColor: 'green' }}></View>
          </View>

          <View style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>3</Text>
          </View>
        </View>
            <p className='track-info1'>Dispatch from {pickup}</p>
            <p className='track-info2'>Shipping to {drop}</p>
            <p className='track-info3'>Delivered to {drop}</p>
        </div>
      </div>



    </>
  )
}

export default Track;