"use client"

/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Wrapper from '../components/wrapper'

export default function CharacterForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    race: '',
    background: '',
    physicalAppearance: {
      hairColor: '',
      hairLength: '',
      eyeColor: '',
      skinTone: '',
      height: '',
      build: '',
      distinguishingFeatures: '',
    },
    challenges: '',
    strengths: '',
    characterFlaws: '',
    ambitions: '',
    fears: '',
    anythingElse: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target.dataset.type === 'physicalAppearance') {
      setFormData({
        ...formData,
        physicalAppearance: {
          ...formData.physicalAppearance,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // You can handle form submission logic here, like sending data to a backend
  };

  const handleClose = () => {
    // Handle close action, e.g., set state to hide the component
    console.log("Close button clicked");
  };

  return (
    <Wrapper onClose={handleClose}>
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Design Your Character</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your character's name"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-lg font-semibold mb-2">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer Not to Say</option>
          </select>
        </div>

        {/* Race */}
        <div>
          <label htmlFor="race" className="block text-lg font-semibold mb-2">Race/Ethnicity</label>
          <input
            type="text"
            id="race"
            name="race"
            value={formData.race}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Describe your character's race or ethnicity"
          />
        </div>

        {/* Physical Appearance */}
        <div>
          <label className="block text-lg font-semibold mb-4">Physical Appearance</label>
          
          {/* Hair Color */}
          <div className="mb-4">
            <label htmlFor="hairColor" className="block text-md mb-2">Hair Color</label>
            <select
              id="hairColor"
              name="hairColor"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.hairColor}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select hair color</option>
              <option value="black">Black</option>
              <option value="brown">Brown</option>
              <option value="blonde">Blonde</option>
              <option value="red">Red</option>
              <option value="gray">Gray</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Hair Length */}
          <div className="mb-4">
            <label htmlFor="hairLength" className="block text-md mb-2">Hair Length</label>
            <select
              id="hairLength"
              name="hairLength"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.hairLength}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select hair length</option>
              <option value="bald">Bald</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
              <option value="very long">Very Long</option>
            </select>
          </div>


          {/* Eye Color */}
          <div className="mb-4">
            <label htmlFor="eyeColor" className="block text-md mb-2">Eye Color</label>
            <select
              id="eyeColor"
              name="eyeColor"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.eyeColor}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select eye color</option>
              <option value="brown">Brown</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="hazel">Hazel</option>
              <option value="gray">Gray</option>
              <option value="amber">Amber</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Skin Tone */}
          <div className="mb-4">
            <label htmlFor="skinTone" className="block text-md mb-2">Skin Tone</label>
            <select
              id="skinTone"
              name="skinTone"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.skinTone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select skin tone</option>
              <option value="light">Light</option>
              <option value="fair">Fair</option>
              <option value="medium">Medium</option>
              <option value="olive">Olive</option>
              <option value="dark">Dark</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Height */}
          <div className="mb-4">
            <label htmlFor="height" className="block text-md mb-2">Height</label>
            <select
              id="height"
              name="height"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.height}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select height range</option>
              <option value="short">Short (under 5'5")</option>
              <option value="average">Average (5'5" - 6'0")</option>
              <option value="tall">Tall (over 6'0")</option>
            </select>
          </div>

          {/* Build */}
          <div className="mb-4">
            <label htmlFor="build" className="block text-md mb-2">Build</label>
            <select
              id="build"
              name="build"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.build}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select body build</option>
              <option value="slim">Slim</option>
              <option value="average">Average</option>
              <option value="muscular">Muscular</option>
              <option value="curvy">Curvy</option>
              <option value="stocky">Stocky</option>
            </select>
          </div>

          {/* Distinguishing Features */}
          <div className="mb-4">
            <label htmlFor="distinguishingFeatures" className="block text-md mb-2">Distinguishing Features</label>
            <input
              type="text"
              id="distinguishingFeatures"
              name="distinguishingFeatures"
              data-type="physicalAppearance"
              value={formData.physicalAppearance.distinguishingFeatures}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Describe any scars, tattoos, or other unique features"
            />
          </div>
        </div>

        {/* Challenges */}
        <div>
          <label htmlFor="challenges" className="block text-lg font-semibold mb-2">Biggest Life Challenges</label>
          <textarea
            id="challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Describe the major challenges your character has faced"
            rows={3}
          />
        </div>

        {/* Strengths */}
        <div>
          <label htmlFor="strengths" className="block text-lg font-semibold mb-2">Strengths</label>
          <textarea
            id="strengths"
            name="strengths"
            value={formData.strengths}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What are your character's greatest strengths?"
            rows={3}
          />
        </div>

        {/* Character Flaws */}
        <div>
          <label htmlFor="characterFlaws" className="block text-lg font-semibold mb-2">Character Flaws</label>
          <textarea
            id="characterFlaws"
            name="characterFlaws"
            value={formData.characterFlaws}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What are your character's biggest weaknesses or flaws?"
            rows={3}
          />
        </div>

        {/* Ambitions */}
        <div>
          <label htmlFor="ambitions" className="block text-lg font-semibold mb-2">Ambitions</label>
          <textarea
            id="ambitions"
            name="ambitions"
            value={formData.ambitions}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What are your character's main goals or ambitions in life?"
            rows={3}
          />
        </div>

        {/* Fears */}
        <div>
          <label htmlFor="fears" className="block text-lg font-semibold mb-2">Fears</label>
          <textarea
            id="fears"
            name="fears"
            value={formData.fears}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="What are your character's biggest fears?"
            rows={3}
          />
        </div>

        {/* Anything Else */}
        <div className="mb-4">
          <label htmlFor="anythingElse" className="block text-lg font-semibold mb-2">Anything Else</label>
          <textarea
            id="anythingElse"
            name="anythingElse"
            value={formData.anythingElse}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Add any other details about your character here, such as strange habits, weird lore, or anything unique."
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
