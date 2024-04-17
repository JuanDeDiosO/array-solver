import { Matrix } from '../../core/Matrix'

describe('test in core of Matrix Class', () => {
  const MATRIX = [
    [2, 3],
    [4, 5]
  ]

  test('should return matrix when create a new instance and execute getMatrix method', () => {
    const matrix = new Matrix(MATRIX)
    expect(matrix.getMatrix()).toEqual(MATRIX)
  })
  test('should multiply first row when use corresponding method', () => {
    const EXPECTED_MATRIX = [
      [2, 3],
      [8, 10]
    ]

    const matrix = new Matrix(MATRIX)

    const newRow = matrix.multiplyRow({ rowToMultiply: 1, multiplier: 2 })
    expect(matrix.getMatrix()).toEqual(MATRIX)

    matrix.setRow({ rowToSet: 1, newRow })
    expect(matrix.getMatrix()).toEqual(EXPECTED_MATRIX)
  })
})
