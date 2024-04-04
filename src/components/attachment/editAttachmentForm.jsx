import React, { useState, useEffect } from 'react';

function EditAttachmentForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setAttachment(initialData.attachments || '');
    }
  }, [initialData]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description, attachments: attachment });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-gray-700 font-bold mb-2">Select Attachment:</label>
        <input
          type="text"
          id="attachment"
          value={attachment}
          onChange={handleAttachmentChange}
          className="mb-4"
        />
      </div>
      <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Save Changes</button>
    </form>
  );
}

export default EditAttachmentForm;
