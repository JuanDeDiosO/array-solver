/**
 * Columns of Question Table Props
 */
interface ColumnsTable {
  name: string // Visible name in the table
  value: string | number // Value in the table
  editable: 'text' | 'number' | 'decimal' // Way to format data
}

/**
 * Base Question Props
 */
interface BaseQuestionProps {
  message: string // message to show in the question
  infoMessage?: string
  default?: string // default option value
}

/**
 * Question Props
 */
// enum QuestionTypes {
//   input = 'input',
//   list = 'list',
//   text = 'text',
//   number = 'number'
// }

type QuestionTypes = 'input'|'list'|'text'|'confirm'
interface QuestionProps extends BaseQuestionProps {
  type: QuestionTypes
  validate?: (userInput: string ) => boolean | string[]
  filter?: (userInput: string | number) => boolean
  choices?: Array<object>
}

/**
 * Question Table Props
 */
interface TableQuestionProps extends BaseQuestionProps {
  columns: ColumnsTable // Visible columns props
  rows: string[][] // Visible rows props
}
