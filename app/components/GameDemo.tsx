"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


const prefixes = ['un', 'pre', 're', 'dis', 'in', 'over', 'ex', 'co', 'sub', 'anti', 'bo'];
const suffixes = ['ing', 'able', 'ful', 'less', 'ness', 'tion', 'ment', 'ity', 'ous', 'ly', 'ear'];

const commonEnglishWords = [
  'able', 'about', 'across', 'after', 'against', 'along', 'among', 'around', 'before', 'behind',
  'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'inside', 'outside', 'under',
  'above', 'action', 'activity', 'addition', 'adjust', 'advance', 'afraid', 'again', 'agree', 'allow',
  'answer', 'appear', 'apple', 'arrive', 'artist', 'attack', 'attend', 'balance', 'banana', 'battle',
  'beauty', 'become', 'before', 'begin', 'behind', 'belief', 'belong', 'better', 'between', 'beyond',
  'bigger', 'biggest', 'billion', 'black', 'blood', 'board', 'body', 'bone', 'book', 'born',
  'both', 'bottom', 'box', 'boy', 'brain', 'break', 'bring', 'brother', 'budget', 'build',
  'building', 'business', 'button', 'call', 'camera', 'campaign', 'cancer', 'candidate', 'capital', 'captain',
  'career', 'careful', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'century', 'certain',
  'challenge', 'chance', 'change', 'character', 'charge', 'check', 'child', 'choice', 'choose', 'church',
  'citizen', 'city', 'civil', 'claim', 'class', 'clear', 'clearly', 'close', 'coach', 'cold',
  'college', 'color', 'come', 'comfort', 'common', 'community', 'company', 'compare', 'computer', 'concern',
  'condition', 'conference', 'consider', 'consumer', 'contain', 'continue', 'control', 'cost', 'could', 'country',
  'couple', 'course', 'court', 'cover', 'create', 'crime', 'cultural', 'culture', 'current', 'customer',
  'walking', 'talking', 'running', 'amazing', 'beautiful', 'wonderful', 'powerful', 'fearful', 'careful', 'helpful',
  'unhappy', 'unreal', 'remake', 'rethink', 'disable', 'dislike', 'increase', 'invisible', 'overdo', 'overflow',
  'export', 'exclaim', 'coexist', 'cooperate', 'subway', 'subtotal', 'antiwar', 'antivirus', 'happiness', 'goodness',
  'action', 'reaction', 'completion', 'agreement', 'enjoyment', 'clarity', 'quality', 'unity', 'curious', 'dangerous',
  'work', 'play', 'time', 'money', 'love', 'hate', 'happy', 'sad', 'good', 'bad',
  'easy', 'hard', 'fast', 'slow', 'hot', 'cold', 'big', 'small', 'tall', 'short',
  'friend', 'enemy', 'family', 'parent', 'child', 'baby', 'adult', 'man', 'woman', 'person',
  'people', 'world', 'country', 'nation', 'city', 'town', 'village', 'house', 'home', 'room',
  'table', 'chair', 'desk', 'bed', 'door', 'window', 'wall', 'floor', 'ceiling', 'roof',
  'garden', 'park', 'tree', 'flower', 'grass', 'plant', 'animal', 'bird', 'fish', 'dog',
  'cat', 'food', 'water', 'drink', 'meal', 'breakfast', 'lunch', 'dinner', 'fruit', 'vegetable',
  'meat', 'cheese', 'bread', 'butter', 'sugar', 'salt', 'milk', 'coffee', 'tea', 'juice',
  'school', 'student', 'teacher', 'lesson', 'class', 'subject', 'study', 'learn', 'education', 'knowledge',
  'job', 'office', 'company', 'business', 'worker', 'boss', 'manager', 'meeting', 'project', 'report',
  'travel', 'trip', 'journey', 'holiday', 'vacation', 'visit', 'flight', 'train', 'bus', 'car',
  'walk', 'run', 'jump', 'swim', 'dance', 'sing', 'play', 'read', 'write', 'speak',
  'listen', 'hear', 'see', 'look', 'watch', 'feel', 'touch', 'smell', 'taste', 'think',
  'know', 'understand', 'remember', 'forget', 'decide', 'choose', 'help', 'need', 'want', 'wish',
  'hope', 'dream', 'plan', 'try', 'practice', 'learn', 'achieve', 'succeed', 'fail', 'problem',
  'solution', 'question', 'answer', 'example', 'idea', 'thought', 'opinion', 'view', 'news', 'story',
  'history', 'future', 'present', 'past', 'today', 'tomorrow', 'yesterday', 'morning', 'afternoon', 'evening',
  'night', 'day', 'week', 'month', 'year', 'hour', 'minute', 'second', 'moment', 'time',
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'white', 'black',
  'gray', 'bright', 'dark', 'light', 'shiny', 'dull', 'pretty', 'ugly', 'smart', 'clever',
  'stupid', 'wise', 'young', 'old', 'new', 'ancient', 'modern', 'fresh', 'rotten', 'healthy',
  'sick', 'strong', 'weak', 'rich', 'poor', 'expensive', 'cheap', 'free', 'busy', 'quiet',
  'loud', 'silent', 'noisy', 'peaceful', 'angry', 'calm', 'nervous', 'relaxed', 'excited', 'bored',
  'tired', 'awake', 'asleep', 'hungry', 'thirsty', 'full', 'empty', 'clean', 'dirty', 'wet',
  'dry', 'hard', 'soft', 'heavy', 'light', 'deep', 'shallow', 'high', 'low', 'long',
  'short', 'thick', 'thin', 'wide', 'narrow', 'straight', 'curved', 'round', 'square', 'flat',
  'sharp', 'dull', 'smooth', 'rough', 'broken', 'fixed', 'closed', 'open', 'public', 'private',
  'personal', 'general', 'special', 'normal', 'strange', 'usual', 'unusual', 'common', 'rare', 'typical',
  'different', 'similar', 'same', 'opposite', 'correct', 'incorrect', 'right', 'wrong', 'true', 'false',
  'real', 'fake', 'natural', 'artificial', 'possible', 'impossible', 'probable', 'unlikely', 'lucky', 'unlucky',
  'safe', 'dangerous', 'secure', 'risky', 'careful', 'careless', 'useful', 'useless', 'necessary', 'unnecessary',
  'important', 'unimportant', 'serious', 'funny', 'sad', 'happy', 'angry', 'pleased', 'satisfied', 'disappointed',
  'proud', 'ashamed', 'confident', 'shy', 'brave', 'afraid', 'kind', 'cruel', 'polite', 'rude',
  'friendly', 'unfriendly', 'patient', 'impatient', 'generous', 'selfish', 'honest', 'dishonest', 'loyal', 'disloyal'
];

type GameStatus = 'idle' | 'playing' | 'gameover';

export default function GameDemo() {
  const [lives, setLives] = useState(3);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [currentAffix, setCurrentAffix] = useState<string>('');
  const [isPrefix, setIsPrefix] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState(7);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setLives(3);
    setScore(0);
    setGameTime(0);
    setGameStatus('playing');
    setUserInput('');
    setErrorMessage('');
    generateNewAffix();
    
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    gameTimerRef.current = setInterval(() => {
      setGameTime(prev => prev + 1);
    }, 1000);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const endGame = () => {
    setGameStatus('gameover');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
  };

  const generateNewAffix = () => {
    setTimeLeft(7);
    setUserInput('');
    setErrorMessage('');
    
    const usePrefix = Math.random() > 0.5;
    setIsPrefix(usePrefix);
    
    if (usePrefix) {
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      setCurrentAffix(randomPrefix);
    } else {
      const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      setCurrentAffix(randomSuffix);
    }
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          loseLife();
          return 7;
        }
        return prev - 1;
      });
    }, 1000);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const loseLife = () => {
    // Clear the existing timer first to prevent multiple calls
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        endGame();
        return 0;
      } else {
        setTimeout(() => generateNewAffix(), 0);
        return newLives;
      }
    });
  };
  
  const checkAnswer = () => {
    const trimmedInput = userInput.trim().toLowerCase();
    
    if (!trimmedInput) {
      setErrorMessage('Enter a word!');
      return;
    }
    
    let isValid = false;
    if (isPrefix) {
      isValid = trimmedInput.startsWith(currentAffix) && 
                trimmedInput !== currentAffix && 
                trimmedInput.length > currentAffix.length;
    } else {
      isValid = trimmedInput.endsWith(currentAffix) && 
                trimmedInput !== currentAffix && 
                trimmedInput.length > currentAffix.length;
    }
    
    const wordToCheck = isPrefix ? 
      trimmedInput.substring(currentAffix.length) : 
      trimmedInput.substring(0, trimmedInput.length - currentAffix.length);
    
    const isRealWord = commonEnglishWords.includes(wordToCheck) || 
                       commonEnglishWords.includes(trimmedInput);
    
    if (isValid && isRealWord) {
      setScore(prev => prev + 1);
      setErrorMessage('');
      generateNewAffix();
    } else if (!isValid) {
      setErrorMessage(`Word must ${isPrefix ? 'start with' : 'end with'} "${currentAffix}"`);
    } else {
      setErrorMessage('Enter a valid English word');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameStatus === 'playing') {
      checkAnswer();
    }
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-4"> 
      
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md display flex flex-col items-center">
        <Image src={"/word-boom-logo.png"} alt='Word-Boom logo' height={100} width={300}/>
        
        {gameStatus === 'idle' ? (
          <div className="text-center display flex flex-col items-center gap-5">
            <p className="mb-4 text-gray-700">
              Create a word with the given prefix or suffix within 7 seconds. You have 3 lives!
            </p>
            <button 
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : gameStatus === 'playing' ? (
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <span className="font-bold text-gray-700">Lives: </span>
                <span className="ml-2">
                  {'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}
                </span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Score: </span>
                <span>{score}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-center mb-2">
                <span className="text-gray-700 font-bold">Total time: </span>
                <span className='text-zinc-700'>{formatTime(gameTime)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-orange-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 7) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-600 mt-1">
                {timeLeft} seconds remaining
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-orange-100 rounded-lg text-center">
              <p className="text-gray-700 text-sm">{isPrefix ? 'Prefix' : 'Suffix'}</p>
              <p className="text-2xl font-bold text-orange-600">
                {isPrefix ? `${currentAffix}...` : `...${currentAffix}`}
              </p>
            </div>
            
            <div className="mb-4">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter a word..."
                className="w-full p-2 border-2 border-orange-300 rounded focus:outline-none focus:border-orange-500 text-zinc-500"
                autoFocus
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            
            <button 
              onClick={checkAnswer}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Game Over!</h2>
            <p className="mb-2 text-gray-700">
              <span className="font-bold">Your score: </span>
              <span>{score}</span>
            </p>
            <p className="mb-6 text-gray-700">
              <span className="font-bold">Total time: </span>
              <span>{formatTime(gameTime)}</span>
            </p>
            <button 
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}