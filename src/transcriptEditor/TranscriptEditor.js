import React, { useState, useEffect, useRef } from 'react';
const TranscriptEditor = ({ initialTranscript }) => {
    const [transcript, setTranscript] = useState(initialTranscript || []);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [editingWordIndex, setEditingWordIndex] = useState(null);
    const [editedWord, setEditedWord] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const containerRef = useRef(null);
    const timerRef = useRef(null); 

    useEffect(() => {
        if (isPlaying) {
          
            timerRef.current = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 100); 
            }, 100);
        } else {
            
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && currentWordIndex !== null && currentWordIndex < transcript.length) {
            const word = transcript[currentWordIndex];
            speakWord(word.word, word.duration, () => {
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
            });
        }
    }, [isPlaying, currentWordIndex]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handlePlayPause();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying, currentWordIndex]);

    const speakWord = (word, duration, callback) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.onend = () => {
            setTimeout(callback, duration);
        };
        speechSynthesis.speak(utterance);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            if (currentWordIndex === null || currentWordIndex >= transcript.length) {
                setCurrentWordIndex(0);
                setElapsedTime(0); 
            }
            setIsPlaying(true);
        }
    };

    const handleWordClick = (index) => {
        if (!isPlaying) {
            setCurrentWordIndex(index);
            setEditingWordIndex(index);
            setEditedWord(transcript[index].word);
            setModalVisible(true); 
        }
    };

    const handleEditChange = (e) => {
        setEditedWord(e.target.value);
    };

    const handleEditSubmit = () => {
        if (editingWordIndex !== null) {
            const updatedTranscript = transcript.map((word, index) => {
                if (index === editingWordIndex) {
                    return { ...word, word: editedWord };
                }
                return word;
            });
            setTranscript(updatedTranscript);
            setEditingWordIndex(null);
            setModalVisible(false); 
        }
    };

    const highlightWord = (index) => {
        return index === currentWordIndex ? ' border border-yellow-400 rounded-lg px-2' : '';
    };

    return (
        <div className="bg-black p-6 rounded-lg shadow-lg text-white w-3/4 relative" ref={containerRef}>
            <div className="overflow-y-auto max-h-96 space-y-2">
                <div className="mt-4 text-gray-400">
                   {(elapsedTime / 1000).toFixed(1)}s 
                </div>
                {transcript.map((wordData, index) => (
                    <span key={index} className="inline-block mr-1">
                        <span
                            className={`cursor-pointer ${highlightWord(index)}`}
                            onClick={() => handleWordClick(index)}
                        >
                            {wordData.word}
                        </span>
                    </span>
                ))}
            </div>
            
            {modalVisible && (
                <div className="absolute top-[-60px] left-0 bg-gray-900 text-white rounded-lg shadow-lg p-2 flex flex-col items-center z-10">
                    <input
                        type="text"
                        value={editedWord}
                        onChange={handleEditChange}
                        className="bg-gray-700 text-white rounded px-1 outline-none mb-2"
                        autoFocus
                    />
                    <div className="flex space-x-2">
                        <button
                            className="bg-gray-700 text-white rounded px-2 py-1"
                            onClick={() => handleEditSubmit()}
                        >
                            Correct All
                        </button>
                        <button
                            className="bg-yellow-500 text-black rounded px-2 py-1"
                            onClick={handleEditSubmit}
                        >
                            Correct
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptEditor;
