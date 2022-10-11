import styles from './OptionsDisplay.module.css'

export function OptionsDisplay({ options, setOptions }) {
	return (
		<div className={styles.optionsDisplayContainer}>
			{options.map((option, i) => {
				return (
					<div className={styles.option} key={i}>
						<div className={styles.name}>{option.name}</div>
						{option.type === 'boolean' && <input type='checkbox' />}
						{option.type === 'select' && (
							<select name='' id=''>
								{option.possibleValues.map((possibleValue) => <option key={possibleValue}>{possibleValue}</option>)}
							</select>
						)}
					</div>
				)
			})}
		</div>
	)
}
