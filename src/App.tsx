import { useState, useEffect, useCallback } from 'react';
import words from './wordList.json';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

export default function App() {

  const [wordToGuess, setWordToGuess] = useState( () => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter( (eachLetter) => !wordToGuess.includes(eachLetter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every( (eachLetter) => guessedLetters.includes(eachLetter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isWinner || isLoser) return; 
  
      const key = e.key;
  
      if (!key.match(/^[a-z]$/)) return;
  
      e.preventDefault();
      addGuessedLetter(key);
    };
  
    document.addEventListener("keypress", handler);
  
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [isWinner, isLoser, addGuessedLetter]);
  

  return (
    <div style={{maxWidth: "800px", display: "flex", flexDirection: "column", gap: "2rem", margin: "0 auto", alignItems: "center", border: "2px solid black"}}>
      <div style={{fontSize: "2rem", textAlign: "center"}}> {isWinner && "Winner"} 
        {isLoser && "Loser"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style= {{ alignSelf: "stretch" }}>
        <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter( (eachLetter) => wordToGuess.includes(eachLetter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
      </div>
    </div>
  )
}

