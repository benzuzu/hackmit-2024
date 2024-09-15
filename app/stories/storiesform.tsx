import { useState } from 'react';
import { Wrapper } from '../wrapper';

export function StoryForm() {
  const [formData, setFormData] = useState({
    title: '',
    character: '',
    friend: '',
    description: '',
  });

  const friendsList = ["Clinton", "Greg", "Hannah", "Jennifer", "Marianna", "Pascal", "Savannah"]; // Example friends list
  const charactersList = ["Cliford", "Dionysus", "Mr. Pi", "Stacey", "Wikipedia", "Winnie", "Zeke"]; // Example friends list

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you can handle form submission, e.g., posting to a backend server
  };

  const handleClose = () => {
    console.log("Close button clicked");
    // Handle close action, e.g., resetting state or hiding the component
  };

  return (
    <Wrapper onClose={handleClose}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Create a Story</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter the story title"
            />
          </div>

          {/* Character */}
          <div>
            <label htmlFor="character" className="block text-lg font-semibold mb-2">Character</label>
            <select
              id="character"
              name="character"
              value={formData.character}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select a character</option>
              {charactersList.map((character, index) => (
                <option key={index} value={character}>{character}</option>
              ))}
            </select>
          </div>

          {/* Friend */}
          <div>
            <label htmlFor="friend" className="block text-lg font-semibold mb-2">Friend</label>
            <select
              id="friend"
              name="friend"
              value={formData.friend}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Invite a friend</option>
              {friendsList.map((friend, index) => (
                <option key={index} value={friend}>{friend}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold mb-2">Intentions</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Set your intentions for the story"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}