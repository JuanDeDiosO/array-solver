// @ts-check
import Fraction from 'fraction.js'

export class Matrix {
  /**
   * Create a instance of matrix
   * @param {Array<string[]>} matrix
   */
  constructor (matrix) {
    this.Matrix = matrix.map((row, index) => {
      const newRow = []
      row.forEach(element => {
        newRow.push(element.toString())
      })
      return newRow
    })
  }

  /**
   * Extends the matrix according to what is decided
   * @param {{isIdentity: boolean, matrixToExtend?: Array<string[]>}} options
   * @return {[newMatrix: Array<string[]>, indexToStartExtendedColumns: number]}
   */
  extendMatrix ({ isIdentity = false, matrixToExtend = [] }) {
    const rowsLength = this.Matrix.length

    let indexToStartExtendedColumns = 0
    /** @type {Array<string[]>} */
    const newMatrix = []

    if (isIdentity) {
      this.Matrix.forEach((row, index) => {
        /** @type {string[]} */
        const newRow = [...row]

        indexToStartExtendedColumns = indexToStartExtendedColumns || row.length

        for (let i = 0; i < rowsLength; i++) {
          const element = i === index ? '1' : '0'
          newRow.push(element)
        }
        newMatrix.push(newRow)
      })
    } else if (matrixToExtend.length >= 1) {
      this.Matrix.forEach((row, index) => {
        /** @type {string[]} */
        const newRow = [...row]

        indexToStartExtendedColumns = indexToStartExtendedColumns || row.length

        for (let i = 0; i < rowsLength - 1; i++) {
          const element = new Fraction(matrixToExtend[index][i])

          const result = element.toFraction()

          newRow.push(result)
        }
        newMatrix.push(newRow)
      })
    }

    return [newMatrix, indexToStartExtendedColumns]
  }

  /**
   * Use the multiplier that contains a number or a fraction to multiply the row corresponding to the index provider by the rowToMultiply
   * @param {{indexOfRowToMultiply: number, multiplier: number}} params
   * @returns {Array<string>}
   */
  multiplyRow ({ indexOfRowToMultiply, multiplier }) {
    const arrayOfRowToMultiply = this.Matrix[indexOfRowToMultiply]

    const newArrayOfRow = []

    for (let i = 0; i < arrayOfRowToMultiply.length; i++) {
      const element = new Fraction(arrayOfRowToMultiply[i])
      const frMultiplier = new Fraction(multiplier)

      const result = element.mul(frMultiplier)

      newArrayOfRow.push(result.toFraction())
    }

    return newArrayOfRow
  }
  /**
   * Add the index of row provider with the array provider
   * @param { {indexOfFirstRowToSum: number, secondRowToSum: Array<string>}} params
   * @returns {Array<string>}
   */
  addRows ({ indexOfFirstRowToSum, secondRowToSum }) {
    const arrayOfFirstRowToSum = this.Matrix[indexOfFirstRowToSum]

    const newArrayOfRow = []

    for (let i = 0; i < arrayOfFirstRowToSum.length; i++) {
      const firstElement = new Fraction(arrayOfFirstRowToSum[i])
      const secondElement = new Fraction(secondRowToSum[i])

      const result = firstElement.add(secondElement)
      newArrayOfRow.push(result.toFraction())
    }

    return newArrayOfRow
  }

  /**
   * Return actual state of instance of Matrix
   * @returns {Array<number[]>}
   */
  getMatrix () {
    return this.Matrix
  }
  /**
   * Use a index of row to set the mew Row
   * @param {{indexOfRowToSet: number, newRow: []}} params
   * @returns {void}
   */
  setRow ({ indexOfRowToSet, newRow }) {
    this.Matrix[indexOfRowToSet] = newRow
  }

  convertsToDisplayable () {}
}
