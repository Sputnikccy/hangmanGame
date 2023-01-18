import { useEffect, useState, useCallback } from 'react'
// import sass styling
import './sass/app.scss'
import words from './wordList.json'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'


function App() {

  //track the currently random word
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  console.log(wordToGuess)

  //track which word users have guessd
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  //store incorrect letters into an array
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length>=6
  const isWinner = wordToGuess
  .split("")
  .every(letter=>guessedLetters.includes(letter)) //if every single iteration of this loop return is true, then every word return true as well
  //if every single letter is included in guessed letter, that means we have one , so we can render out the proper text based on if we've won or lost 

const addGuessedLetter = useCallback ((letter: string)=>{
 //if the letter is already guessed
 if(guessedLetters.includes(letter) || isLoser||isWinner) return

 //if the letter hasn't been guessed
 setGuessedLetters(currentLetters => [...currentLetters, letter])
 console.log(guessedLetters)
},[guessedLetters, isLoser,isWinner])//guessedLetters is the only thing this function depends on every time that changes. addGuessedLetter only changes every time when guessedLetter changes

  
// function addGuessedLetter(letter:string){
  //   //if the letter is already guessed
  //   if(guessedLetters.includes(letter)) return

  //   //if the letter hasn't been guessed
  //   setGuessedLetters(currentLetters => [...currentLetters, letter])
  //   console.log(guessedLetters)
  // }

  //when clicking on actual keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      //use regex to check if users press a letter between a-z
      if (!key.match(/^[a-z]$/)) return
      
      //if they pressed letters from a-z
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    //clear when eventListener is done 
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  return (
    <div className="app">

      <div className="message">
        {isWinner && "Winner - Refresh to try again!"}
        {isLoser && "Nice Try - Refresh to try again!"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div className="keyboardWrapper">
        <Keyboard 
        disabled={isLoser||isWinner}
        activeLetters={guessedLetters.filter(letter=>wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          />
      </div>


    </div>
  )
}

export default App
