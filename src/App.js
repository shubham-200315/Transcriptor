import React from 'react';
import TranscriptEditor from './transcriptEditor/TranscriptEditor';

const initialTranscript = [
  { word: 'Hello', start_time: 0, duration: 500 },
  { word: 'world', start_time: 500, duration: 700 },
  { word: 'This', start_time: 1200, duration: 300 },
  { word: 'is', start_time: 1500, duration: 200 },
  { word: 'a', start_time: 1700, duration: 100 },
  { word: 'test', start_time: 1800, duration: 400 },
  { word: 'transcript', start_time: 2200, duration: 600 },
  { word: 'for', start_time: 2800, duration: 200 },
  { word: 'playback', start_time: 3000, duration: 500 },
  { word: 'and', start_time: 3500, duration: 250 },
  { word: 'editing', start_time: 3750, duration: 800 },
  { word: 'features.', start_time: 4550, duration: 650 },
  // Additional words with their respective start times and durations
  { word: 'This', start_time: 5200, duration: 300 },
  { word: 'is', start_time: 5500, duration: 200 },
  { word: 'a', start_time: 5700, duration: 100 },
  { word: 'larger', start_time: 5800, duration: 400 },
  { word: 'example', start_time: 6200, duration: 500 },
  { word: 'to', start_time: 6700, duration: 200 },
  { word: 'demonstrate', start_time: 6900, duration: 600 },
  { word: 'extended', start_time: 7500, duration: 400 },
  { word: 'transcript', start_time: 7900, duration: 600 },
  { word: 'with', start_time: 8500, duration: 200 },
  { word: 'more', start_time: 8700, duration: 300 },
  { word: 'words.', start_time: 9000, duration: 500 },
  { word: 'Feel', start_time: 9500, duration: 300 },
  { word: 'free', start_time: 9800, duration: 200 },
  { word: 'to', start_time: 10000, duration: 100 },
  { word: 'test', start_time: 10100, duration: 400 },
  { word: 'with', start_time: 10500, duration: 200 },
  { word: 'various', start_time: 10700, duration: 300 },
  { word: 'texts.', start_time: 11000, duration: 500 },
];

function App() {
  return (
    <div className="relative overflow-hidden h-screen bg-gradient-to-br from-white via-gray-100 to-purple-50 text-gray-800 p-6">
      {/* Wavy Background */}
      <div className="absolute inset-x-0 bottom-0 -z-10">
        <div className="w-full h-32 bg-white absolute bottom-0 clip-wavy"></div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center z-10">
        <h1 className="text-4xl font-bold mb-4 text-purple-900">ViralCut</h1>
        <p className="text-lg mb-8 text-center text-gray-700">
          Create viral short videos for your brand in minutes! <br />
          ViralCut helps you create studio-quality short videos using AI, designed to follow social media trends.
        </p>
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <TranscriptEditor initialTranscript={initialTranscript} />
        </div>
        <div className="mt-8 p-6 w-full max-w-3xl bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">App Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-700">
              <span className="font-semibold">Space bar</span> is used to play and pause.
            </li>
            <li className="text-gray-700">
              On clicking any word after pausing, you can <span className="font-semibold">edit the word</span> and start playing from there.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
