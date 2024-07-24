import styles from "./Keyboard.module.css"

const KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

type KeyboardProps = {
  activeLetters: string[]
  inactiveLetters: string[]
  disabled?: boolean
  addGuessedLetter: (letter: string) => void
}

export default function Keyboard({ activeLetters, disabled = false, inactiveLetters, addGuessedLetter }: KeyboardProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
      {KEYS.map((eachKey) => {
        const isActive = activeLetters.includes(eachKey)
        const isInactive = inactiveLetters.includes(eachKey)
        return (
          <button onClick={() => addGuessedLetter(eachKey)} className={`${styles.btn} 
          ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
          disabled={isInactive || isActive || disabled } key={eachKey}>
            {eachKey}
          </button>
        );
      })}
    </div>
  );
}
