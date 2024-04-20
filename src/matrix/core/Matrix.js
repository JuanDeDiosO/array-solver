// @ts-check

export class Matrix {
  /**
   * Create a instance of matrix
   * @param {Array<number[]>} matrix
   */
  constructor (matrix) {
    this.Matrix = [...matrix]
  }

  /**
   * Extends the matrix according to what is decided
   * @param {{isIdentity: boolean, matrixToExtend?: Array<[]>}} options
   * @return {[newMatrix: Array<number[]>, indexToStartExtendedColumns: number]}
   */
  extendMatrix ({ isIdentity = false, matrixToExtend = [] }) {
    const rowsLength = this.Matrix.length

    let indexToStartExtendedColumns = 0
    /** @type {Array<number[]>} */
    const newMatrix = []

    if (isIdentity) {
      this.Matrix.forEach((row, index) => {
        /** @type {number[]} */
        const newRow = [...row]

        indexToStartExtendedColumns = indexToStartExtendedColumns || row.length

        for (let i = 0; i < rowsLength; i++) {
          const element = i === index ? 1 : 0
          newRow.push(element)
        }
        newMatrix.push(newRow)
      })
    } else if (matrixToExtend.length >= 1) {
      // TODO: make feature
    }

    return [newMatrix, indexToStartExtendedColumns]
  }

  /**
   * Use the multiplier that contains a number or a fraction to multiply the row corresponding to the index provider by the rowToMultiply
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
   * Add the index of row provider with the array provider
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
}
