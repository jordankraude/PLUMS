'use client';
import React from 'react';
import EditImageButton from './editImageButton';
import DeleteImageButton from './deleteImageButton';

function ImageCard({ imageUrl, onEdit, onDelete }) {
  return (
    <div>
      <img src={imageUrl} alt="Image" />
      <EditImageButton onClick={onEdit} />
      <DeleteImageButton onClick={onDelete} />
    </div>
  );
}

export default ImageCard;