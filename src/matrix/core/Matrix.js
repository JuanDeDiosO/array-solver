// @ts-check

export class Matrix {
  /**
   * Create a instance of matrix
   * @param {Array<[]>} matrix
   */
  constructor (matrix) {
    this.Matrix = [...matrix]
  }

  /**
   * This method use the multiplier that contains a number or a fraction to multiply the row corresponding to the index provider by the rowToMultiply
   * @param {{indexOfRowToMultiply: number, multiplier: number}} params
   * @returns {Array<number>}
   */
  multiplyRow ({ indexOfRowToMultiply, multiplier }) {
    const arrayOfRowToMultiply = this.Matrix[indexOfRowToMultiply]

    const newArrayOfRow = []

    for (let i = 0; i < arrayOfRowToMultiply.length; i++) {
      const element = arrayOfRowToMultiply[i]

      newArrayOfRow.push(element * multiplier)
    }

    return newArrayOfRow
  }

  /**
   * Description
   * @param { {indexOfFirstRowToSum: number, secondRowToSum: Array<string>}} params
   * @returns {Array<string>}
   */
  addRows ({ indexOfFirstRowToSum, secondRowToSum }) {
    const arrayOfFirstRowToSum = this.Matrix[indexOfFirstRowToSum]

    const newArrayOfRow = []

    for (let i = 0; i < arrayOfFirstRowToSum.length; i++) {
      const firstElement = arrayOfFirstRowToSum[i]
      const secondElement = secondRowToSum[i]

      newArrayOfRow.push(firstElement + secondElement)
    }

    return newArrayOfRow
  }

  /**
   * Return actual state of instance of Matrix
   * @returns {Array<[]>}
   */
  getMatrix () {
    return this.Matrix
  }
  /**
   * This method use a index of row to set and the mew Row
   * @param {{indexOfRowToSet: number, newRow: []}} params
   * @returns {void}
   */
  setRow ({ indexOfRowToSet, newRow }) {
    this.Matrix[indexOfRowToSet] = newRow
  }
}
