import { LessonDisplay } from './LessonDisplay'
import words from './words'
import { OptionsDisplay } from './OptionsDisplay'
import { useState, useEffect } from 'react'
import { Keyboard } from './Keyboard'
function App() {
	// * State
	const [ options, setOptions ] = useState([
		{ name: 'skipSpaces', type: 'boolean', value: 'false' },
		{ name: 'keyboardLayout', type: 'select', value: 'false', possibleValues: [ 'qwerty', 'colemak-dh' ] }
	])
	const defaultLessonProgress = { wordIndex: 0, keyIndex: 0 }
	const [ textareaContent, setTextareaContent ] = useState('')
	const [ lessonProgress, setLessonProgress ] = useState(defaultLessonProgress)
	const [ lesson, setLesson ] = useState([])
	const [ wrongKey, setWrongKey ] = useState(false)

	useEffect(() => {
		setLesson(getWords('e'))
	}, [])

	// * Get Words
	function getNumberOfOccurancesOfLetterInWord(word, letter) {
		const regex = new RegExp(letter, 'g')
		const occurances = word.match(regex) || []
		return occurances.length
	}
	function getWords(focusLetter) {
		const randomWords = []
		const wordsArr = Object.values(words)
		const numWords = 5
		let ratioOfFocusLetterToRestOfLetters = 1
		for (let i = 0; i < numWords; i++) {
			const wordIndexCeiling = 1000 //? how rare should word pool get
			const randomIndex = () => Math.floor(Math.random() * Math.max(wordIndexCeiling, wordsArr.length))
			function getRandomWord() {
				const candidate = wordsArr[randomIndex()]
				const occurances = getNumberOfOccurancesOfLetterInWord(candidate, focusLetter)
				console.log(occurances)
				if (occurances > ratioOfFocusLetterToRestOfLetters) {
					ratioOfFocusLetterToRestOfLetters += 0.5
					return candidate
				} else
					// if (candidate.includes(focusLetter)) return candidate
					return getRandomWord()
			}
			randomWords.push(getRandomWord())
		}
		return randomWords.join(' #').split('#')
	}

	// * Reset
	function resetLesson() {
		setLessonProgress(defaultLessonProgress)
		setLesson(getWords('e'))
		setTextareaContent('')
	}

	// * Keyboard Input
	function handleKeyDown(event) {
		const keyPressed = event.key
		if (event.ctrlKey || event.metaKey) return
		checkKey(keyPressed)
	}

	// * Logic

	function checkKey(keyPressed) {
		const { wordIndex, keyIndex } = lessonProgress
		const advanceKeyWithinWord = () => setLessonProgress({ wordIndex, keyIndex: keyIndex + 1 })
		const advanceToNextWord = () => setLessonProgress({ wordIndex: wordIndex + 1, keyIndex: 0 })

		const correctKeyWasPressed = keyPressed === lesson[wordIndex][keyIndex]
		if (correctKeyWasPressed) {
			setWrongKey(false)
			setTextareaContent(textareaContent + keyPressed)
			if (lesson[wordIndex].charAt(keyIndex + 1)) advanceKeyWithinWord()
			else if (lesson[wordIndex + 1]) advanceToNextWord()
			else {
				//? end of lesson, need to trigger fn to generate new one
				resetLesson() //! placeholder, just restarts current lesson
			}
		} else setWrongKey(true)
	}
	return (
		<div id='App'>
			<LessonDisplay lesson={lesson} lessonProgress={lessonProgress} wrongKey={wrongKey} />
			<textarea autoFocus onKeyDown={handleKeyDown} value='' cols='50' width='100%' placeholder='click here to use' />
			<OptionsDisplay options={options} setOptions={setOptions} />
			<Keyboard />
		</div>
	)
}

export default App
