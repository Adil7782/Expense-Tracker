import { SignInButton } from '@clerk/nextjs';
import React from 'react';

const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <h1 className="text-lg">Please Sign in to continue</h1>
      <div className="mt-4">
        <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Guest;