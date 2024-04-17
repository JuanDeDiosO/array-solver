// @ts-check

import Fraction from 'fraction.js'
import { Flow } from './flows/core/Flow.js'

export class Main {
  static ABC = 'abcdefghijklmnopqrstuvwxyz'
  /** @type {Flow} */
  static Flow

  constructor () {
    Main.Flow = new Flow()

    this.startFlow()
  }

  /**
   * Initialize flow
   * @returns {Promise}
   */
  async startFlow () {
    const flow = Main.Flow

    // Make a question to long of the array
    /** @type {{ rows: number, columns: number }[]} */
    const [{ rows, columns }] = await flow.question(
      {
        type: 'input',
        message: 'Cuantas filas debe tener',
        default: '3x3',
        validate: userInput => {
          if (!userInput.includes('x')) {
            return ['El formato debe ser {Filas}x{Columnas}']
          }

          const rows = userInput.split('x')[0]
          const columns = userInput.split('x')[1]

          if (isNaN(Number(rows)) || isNaN(Number(columns))) {
            return ['Las filas y columnas deben ser números']
          }
          return true
        }
      },
      answer => {
        // @ts-ignore
        const rows = answer.split('x')[0]
        // @ts-ignore
        const columns = answer.split('x')[1]
        return { rows, columns }
      }
    )

    // Set columns and row properties to show in a table
    const [vRows, vColumns] = this.setVisualTable(rows, columns)

    // Creates a table for the user enter the data
    const [arrResult] = await flow.questionTable(
      {
        message: `Matriz ${rows}x${columns}`,
        infoMessage:
          "Utiliza 'd' para representar division '/', utiliza 'n' para representar '-'",
        rows: vRows.visualRows,
        columns: vColumns.visualColumns
      },
      userInput =>
        userInput.map((row, i) => {
          const objOP = { nf: Main.ABC[i] }
          let i2 = 0
          for (const key in row) {
            if (key === 'nf') continue

            i2++
            if (row[key].includes('d') | row[key].includes('n')) {
              objOP[`x${i2}`] = row[key].replace(/d/g, '/').replace(/n/g, '-')
              continue
            } else {
              objOP[`x${i2}`] = row[key]
              continue
            }
          }

          return objOP
        })
    )
    const [isArrayIdentity] = await flow.question({
      type: 'confirm',
      message: 'Es una matriz identidad?',
      default: 'y'
    })

    let array
    if (isArrayIdentity) {
      array = this.getArrayIdentity(arrResult)
    } else {
      array = arrResult
    }
    console.table(await array)

    let shouldContinue = true
    do {
      const [rowToWork] = await flow.question({
        type: 'list',
        message: '¿Con cual fila desea trabajar?',
        choices: vRows.visualDescRows
      })

      const [operation] = await flow.question({
        type: 'list',
        message: '¿Que operación desea realizar?',
        choices: [
          {
            name: 'Suma',
            value: '+',
            short: `sumar f_${rowToWork + 1} con ...`
          },
          {
            name: 'Reciproco',
            value: '*',
            short: `dividir ... entre f_${rowToWork + 1}`
          },
          { name: 'Terminar', value: 'exit', short: 'end' }
        ]
      })

      /** @type {{indexOfRowToSum?: number, rowToSum?: {}, multiplier?: string}} */
      if (operation === '+') {
        const [indexOfRowToSum] = await flow.question({
          type: 'list',
          message: '¿Cuál fila desea sumar?',
          choices: vRows.visualDescRows
        })

        // Preguntar por el multiplicador
        const [multiplier] = await flow.question({
          type: 'input',
          message: '¿Con cuánto deseas multiplicar la fila a sumar?'
        })

        const rowToSum = this.multiplyRow({
          arrayToWork: array,
          rowToWork: indexOfRowToSum,
          ops: { multiplier }
        })[0]

        array[rowToWork] = this.addRow({
          array,
          rowToWork,
          ops: {
            rowToSum
          }
        })[0]

        console.table(await array)
      } else if (operation === '*') {
        const [multiplier] = await flow.question({
          type: 'input',
          message: 'Ingrese el co-factor con el que desea trabajar'
        })

        const newRow = this.multiplyRow({
          arrayToWork: array,
          rowToWork,
          ops: { multiplier }
        })[0]

        array[rowToWork] = newRow
        console.table(await array)
      } else {
        shouldContinue = false
      }
    } while (shouldContinue)
  }

  /**
   * Description
   * @param {number} rows
   * @param {number} columns
   * @returns {[{ visualRows: [], visualDescRows: [] }, { visualColumns: object }]}
   */
  setVisualTable (rows, columns) {
    const visualColumns = []
    const visualTextColumns = []
    for (let i = 0; i <= columns; i++) {
      if (i === 0) visualColumns.push({ name: '', value: 'nf' })
      else {
        visualColumns.push({ name: `x${i}`, value: `x${i}`, editable: 'text' })
        visualTextColumns[i - 1] = ''
      }
    }

    const visualRows = []
    const visualDescRows = []
    for (let i = 0; i < rows; i++) {
      visualRows.push([Main.ABC[i], ...visualTextColumns])

      visualDescRows.push({
        name: Main.ABC[i],
        value: i,
        short: `f_${i + 1} ...`
      })
    }

    return [
      // @ts-ignore
      { visualRows, visualDescRows },
      // @ts-ignore
      { visualColumns, visualTextColumns }
    ]
  }

  /**
   * this method will no longer be used in the future.
   * @param {{arrayToWork: object[], rowToWork: number, ops: {multiplier?: string} }} props
   * @returns {[resultTransformer: {} ]}
   */
  multiplyRow ({ arrayToWork, rowToWork, ops: { multiplier = '' } }) {
    const array = arrayToWork
    const row = array[rowToWork]
    const resultTransformed = { nf: Main.ABC[rowToWork] }
    let i = 1
    let y = 0

    for (const column in row) {
      if (Main.ABC.includes(row[column])) continue
      const numberToFraction = new Fraction(row[column])

      const inputToFraction = new Fraction(multiplier)
      const resultOfOP = numberToFraction.mul(inputToFraction)

      if (column.includes('x')) {
        resultTransformed[`x${i}`] = resultOfOP.toFraction()
        y++
      } else {
        resultTransformed[`i${i - y}`] = resultOfOP.toFraction()
      }

      i++
    }

    return [resultTransformed]
  }

  /**
   * Description
   * @param {{array: object[], rowToWork: number, ops: {rowToSum?: {}} }} props
   * @returns {[resultTransformer: {} ]}
   */
  addRow ({ array, rowToWork, ops: { rowToSum = {} } }) {
    const row = array[rowToWork]
    const resultTransformed = { nf: Main.ABC[rowToWork] }
    let i = 1
    let y = 0
    for (const column in row) {
      if (Main.ABC.includes(row[column])) continue
      const numberToFraction = new Fraction(row[column])

      const inputToFraction = new Fraction(rowToSum[column])
      const resultOfOP = numberToFraction.add(inputToFraction)

      if (column.includes('i')) {
        resultTransformed[`i${i - y}`] = resultOfOP.toFraction()
      } else {
        resultTransformed[`x${i}`] = resultOfOP.toFraction()
        y++
      }
      i++
    }

    return [resultTransformed]
  }

  getArrayIdentity (matrizExistente) {
    const numFilas = matrizExistente.length

    // Crear una nueva matriz con las filas existentes más las filas de identidad adicionales
    const matrizIdentidad = []

    // Agregar columnas de identidad a cada fila existente
    matrizExistente.forEach((fila, index) => {
      const nuevaFila = { ...fila }
      for (let i = 1; i <= numFilas; i++) {
        nuevaFila[`i${i}`] = i === index + 1 ? '1' : '0' // Valor de identidad: '1' si es la diagonal principal, '0' en otro caso
      }
      matrizIdentidad.push(nuevaFila)
    })

    return matrizIdentidad
  }
}
