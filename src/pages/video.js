
import React, { useRef } from 'react';

const VideoUploader = () => {
  const fileRef = useRef(null);

  const handleUpload = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('audioFile', fileRef.current.files[0]);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      console.log('response', response)
      // if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'converted.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      // } else {
        // console.error('Failed to convert audio');
      // }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div>

      <form onSubmit={handleUpload}>
        <input type="file" ref={fileRef} accept="" required />
        <button type="submit" className='p-2 bg-green-500 text-white'>Download</button>
      </form>
    </div>
  );
};

export default VideoUploader;