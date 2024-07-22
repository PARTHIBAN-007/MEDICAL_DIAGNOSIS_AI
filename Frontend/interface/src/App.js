import React from 'react';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Medical Diagnosis App</h1>
        <InputForm />
      </div>
    </div>
  );
}

export default App;
