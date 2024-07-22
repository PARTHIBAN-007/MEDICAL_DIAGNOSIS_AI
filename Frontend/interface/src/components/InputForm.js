import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/predict', null, {
        params: {
          symptoms: symptoms.trim().split(',').map(symptom => symptom.trim()).join(','),
        }
      });
      setPrediction(response.data);
      // Clear symptoms after prediction
      setSymptoms('');
    } catch (error) {
      setError('Error predicting disease.');
      console.error('Error predicting disease:', error);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setPrediction(null);
    setError('');
  };

  const parseRecommendedDiet = (dietString) => {
    try {
      return JSON.parse(dietString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing recommended diet:', error);
      return [];
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Disease Prediction</h2>

      {/* Conditional rendering based on prediction state */}
      {prediction ? (
        <div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Predicted Disease: {prediction.predicted_disease}</h3>
            <p className="text-gray-700">{prediction.description}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Precautions:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {prediction.precautions[0].map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Recommended Diet:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {parseRecommendedDiet(prediction.recommended_diet[0]).map((diet, index) => (
                <li key={index}>{diet}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">Workout:</h4>
            <p className="text-gray-700">{prediction.workout}</p>
          </div>

          {/* Reset button shown after prediction */}
          <div className="text-center">
            <button
              onClick={handleReset}
              className="inline-block px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Symptoms (comma separated):</span>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
          <button
            type="submit"
            className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 focus:bg-indigo-600"
          >
            Predict
          </button>
        </form>
      )}
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default InputForm;
