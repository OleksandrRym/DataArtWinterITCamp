import React, { useState, useEffect, useCallback } from 'react';
const endpint ='https://teehee.dev/api/joke'

const JokeCard = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpint);
      if (!response.ok) {
      throw new Error('Failed to fetch joke');
      }
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-md rounded-xl border border-gray-200">
    {loading && <div className="text-center text-gray-500">wait</div>}
    {error && <div className="text-red-600 text-center font-medium">Err: {error}</div>}
    {joke && (
      <>
        <h2 className="text-xl font-bold mb-4 text-gray-900">{joke.question}</h2>
        <p className="mb-5 text-gray-700 italic">{joke.answer}</p>
        <div className="flex justify-end">
          <button
            onClick={fetchJoke}
            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            next
          </button>
        </div>
      </>
    )}
  </div>
  );
};

export default JokeCard;
