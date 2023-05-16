import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <>
        <div class="contact-container">
      <div class="form-contact">
        <div class="contact-info">
          <h3 class="title">Let's get in touch</h3>
          <p class="reach">
            Reach out to us and we will assist you as soon as possible!
          </p>

          <div class="info">
            <div class="contact-information">
              <img src="images/map-pin.png" class="contact-icon" alt="" />
              <p>IndiQube Grape Gardens, Koramangala, Bangalore -560095</p>
            </div>
            <div class="contact-information">
              <img src="images/envelope.png" class="contact-icon" alt="" />
              <p>customercare@bharatxpress.com</p>
            </div>
            <div class="contact-information">
              <img src="images/phone-call.png" class="contact-icon" alt="" />
              <p>+080-1234567890</p>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <span class="circle one"></span>
          <span class="circle two"></span>

          <form action='/'  autocomplete="on" className='cont-form'>
            <h3 class="title">Contact Us</h3>
            <div class="contact-input-container">
              <input className='contact-input'
                type="text"
                name="name"
                class="cont-input"
                placeholder="Username"
                required
              />
       
            </div>
            <div class="contact-input-container">
              <input className='contact-input'
                type="email"
                name="email"
                class="cont-input"
                placeholder="Email"
                required
              />
     
            </div>
            <div class="contact-input-container">
              <input className='contact-input'
                type="tel"
                name="phone"
                class="cont-input"
                placeholder="Phone"
                required
              />

      
            </div>
            <div class="contact-input-container textarea">
              <textarea
                name="message"
                class="cont-input"
                placeholder="Message/Issue"
                required
              ></textarea>
     
            </div>
            <input className='contact-input' type="submit" value="Send" class="btn"/>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact;