import React, { useState } from 'react';

function ImageForm({ onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Implement your logic for submitting the form data
    // Use the selectedFile state to send the image data
    onSubmit(selectedFile);
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleSubmit}>
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default ImageForm;
