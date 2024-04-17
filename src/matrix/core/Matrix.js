export class Matrix {
  Matrix

  /**
   * Create a instance of matrix
   * @param {Array<[]>} matrix
   * @returns {void}
   */
  constructor (matrix) {
    this.Matrix = matrix
  }

  /**
   * This method use the multiplier that contains a number or a fraction to multiply the row corresponding to the index provider by the rowToMultiply
   * @param {{rowToMultiply: number, multiplier: string}} params
   * @returns {any}
   */
  multiplyRow ({ rowToMultiply, multiplier }) {
    const arrayOfRowToMultiply = this.Matrix[rowToMultiply]

    const newArrayOfRow = []

    for (let i = 0; i < arrayOfRowToMultiply.length; i++) {
      const element = arrayOfRowToMultiply[i]

      newArrayOfRow.push(element * multiplier)
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
   * @param {{rowToSet: number, newRow: []}} params
   * @returns {void}
   */
  setRow ({ rowToSet, newRow }) {
    this.Matrix[rowToSet] = newRow
  }
}
