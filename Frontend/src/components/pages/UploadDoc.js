import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function UploadDoc() {
  const navigate = useNavigate();
  const [aadharId, setAadharId] = useState('');
  const [file, setFile] = useState(null);

  const handleAadharIdChange = (event) => {
    setAadharId(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('aadharId', aadharId);
    formData.append('file', file);

    fetch('https://fronter.onrender.com/customers/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('File uploaded successfully!');
          navigate('/OrderPlacement');
          toast.success("Upload Successful")

          // Add code to handle successful upload (e.g. redirect to another page)
        } else {
          console.log('File not uploaded.');
          // Add code to handle failed upload (e.g. display error message)
        }
      })
      .catch((error) => {
        console.error('Error uploading file', error);
        // Add code to handle error (e.g. display error message)
      });
  };

  return (
    <>
      <div className='one'>
        <h1>Upload Documents</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-l'>
            <input
              type='text'
              className='email-l'
              name='aadharId'
              value={aadharId}
              placeholder='GST Number'
              onChange={handleAadharIdChange}
              pattern='^\d{15}$'
              title='Please enter valid Aadhaar ID'
              required
            />
          </div>
          <div className='form-l'>
            <input
              type='file'
              className='email-l'
              name='file'
              accept='.pdf,.doc,.docx'
              onChange={handleFileChange}
              required
            />
          </div>
          <div className='form-l'>
            <input type='submit' value='SUBMIT' className='submit-f' />
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
    </>
  );
}

export default UploadDoc;