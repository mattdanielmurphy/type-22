import styles from './LessonDisplay.module.css'

export function LessonDisplay({ lesson, lessonProgress, wrongKey }) {
	return (
		<div>
			{lesson.map((word, i) => {
				return (
					<div className={styles.word} key={i}>
						{word.split('').map((key, j) => {
							//? check if current key being printed below is the "active" key
							//? meaning it is the next key to be pressed
							const isActiveKey = i === lessonProgress.wordIndex && j === lessonProgress.keyIndex
							return (
								<span
									key={j}
									className={isActiveKey ? wrongKey ? styles.wrongKey : styles.activeKey : styles.inactiveKey}
								>
									{key}
								</span>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
