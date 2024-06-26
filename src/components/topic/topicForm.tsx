'use client'
import React, { useState, useEffect } from 'react';
import { Categories } from '@prisma/client'; // Adjust this import as needed

interface NewTopicFormProps {
  onSubmit: (formData: {
    title: string;
    description: string;
    categoryIds: string[];
    parentId: string | null;
  }) => void;
  parentId?: string | null; // Make parentId optional in props
}

const NewTopicForm: React.FC<NewTopicFormProps> = ({ onSubmit, parentId = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [possibleTopicIds, setPossibleTopicIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form inputs
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    // Call onSubmit callback with form data including parentId
    onSubmit({ title, description, categoryIds: selectedCategories, parentId });
    // Reset form fields
    setTitle('');
    setDescription('');
    setSelectedCategories([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCategories(selectedOptions);
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories((prevSelected) => prevSelected.filter((id) => id !== categoryId));
  };
  return (
    <div className="flex justify-center items-center h-full text-black">
      <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
        {/* Hidden field for parentId */}
        <input type="hidden" name="parentId" value={parentId || ''} />

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category Tags:</label>
          <h5 className="-mt-2">Ctrl + Click for Multiple</h5>
          <select
            multiple
            id="category"
            value={selectedCategories}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-purple-300 focus:outline-none focus:border-purple-500 text-gray-700"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Selected Categories:</label>
          <ul className="flex flex-wrap justify-evenly text-gray-700">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((cat) => cat.id === categoryId);
              return (
                <li key={categoryId} onDoubleClick={() => handleRemoveCategory(categoryId)}>
                  {category ? category.name : 'Unknown Category'}
                </li>
              );
            })}
          </ul>
        </div>
        <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-6">Add Topic</button>
      </form>
    </div>
  );
};

export default NewTopicForm;
