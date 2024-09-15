"use client"

import React from 'react';
import  Wrapper from '../Wrapper';
import { useRouter } from "next/navigation";


// Mock data for characters
const characters = [
  {
    id: 1,
    name: 'Dionysus',
    image: '/assets/characters/dionysus.png'
  },
  {
    id: 2,
    name: 'Winnie',
    image: '/assets/characters/winnie.png'
  },
  {
    id: 3,
    name: 'Zeke',
    image: '/assets/characters/zeke.png'
  },
  {
    id: 4,
    name: 'Wikipedia',
    image: '/assets/characters/wikipedia.png'
  },
  {
    id: 5,
    name: 'Cliford',
    image: '/assets/characters/cliford.png'
  },
  {
    id: 6,
    name: 'Mr. Pi',
    image: '/assets/characters/mrpi.png'
  },
];


export default function CharacterMenu() {
  const router = useRouter();

  const handleClose = () => {
    console.log("Close button clicked");
    router.push("/"); // Navigate to the home page
  };

  return (
    <Wrapper onClose={handleClose}>
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center mb-6">Characters</h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={character.image} alt={character.name} />
            <div className="flex justify-center px-6 py-4 bg-gray-300">
              <div className="font-bold text-xl mb-2">{character.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Wrapper>
  );
}
