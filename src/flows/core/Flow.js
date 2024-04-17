/// <reference path="./types.d.ts" />
// @ts-check

import inquirer from 'inquirer'
import TableInput from 'inquirer-table-input'

export class Flow {
  static instance

  constructor () {
    if (Flow.instance) {
      return Flow.instance
    }

    Flow.instance = this

    // @ts-ignore
    inquirer.registerPrompt('table', TableInput)
  }

  /**
   * Start a table with properties
   * @param {QuestionProps} props
   * @param {(answer: string | number) => any} transformsAnswer
   * @returns {Promise<any>}
   */
  async question (props, transformsAnswer = answer => answer) {
    // @ts-ignore
    const { answerName } = await inquirer.prompt({
      ...props,
      name: 'answerName'
    })

    const transformerAnswer = transformsAnswer(answerName)

    return [transformerAnswer]
  }

  /**
   * Start a question with table
   * @param {TableQuestionProps} props
   * @param {(answer: Array<object>) => Array<any>} transformsAnswer
   * @returns {Promise<object[]>}
   */
  async questionTable (props, transformsAnswer = answer => answer) {
    const {
      table: { result }
    } = await inquirer.prompt({
      ...props,
      // @ts-ignore
      type: 'table',
      name: 'table',
      freezeColumns: 1,
      validate: () => false
    })

    const transformerAnswer = transformsAnswer(result)

    return [transformerAnswer]
  }
}
