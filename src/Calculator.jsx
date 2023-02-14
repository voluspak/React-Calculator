import { useState } from 'react'
import { evaluate } from 'mathjs'
import styles from './calculator.module.css'

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export const equal = '='
export const del = 'Delete'

const groups = [
  [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0]
  ],
  [
    ['+', '-', '('],
    ['*', '/', ')'],
    ['.']
  ]
]
export const operations = ['+', '-', '*', '/']

export const Calculator = () => {
  const [value, setValue] = useState('')
  const createHandler = (button) => setValue(value.concat(button))

  return (
    <section className={styles.calculatorContainer}>
      <h1 className={styles.calcTitle}>Calculator</h1>
      <input value={value} readOnly className={styles.numDisplay} />
      <div className={styles.btnGroups}>
        <div role='grid'>
          {groups[0].map((row, i) => (
            <div key={i} role='row' className={styles.btnNum}>
              {row.map((num) => (
                <button className={styles.btn} onClick={() => createHandler(num)} key={num}>{num}</button>
              ))}
            </div>
          ))}
        </div>
        <div role='grid'>
          <button className={styles.btn} onClick={() => setValue('')}>{del}</button>
          {groups[1].map((row, i) => (
            <div key={i} role='row' className={styles.btnOp}>
              {row.map((op, i) => (
                <button className={styles.btn} key={i + 10} onClick={() => createHandler(op)}>{op}</button>
              ))}
            </div>
          ))}
          <button className={styles.btn} onClick={() => setValue(evaluate(value))}>{equal}</button>
        </div>
      </div>
    </section>
  )
}
