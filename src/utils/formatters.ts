import { format } from 'date-fns'

export const dateFormat = (date: string | Date) => {
  return typeof date === 'string'
    ? format(date, 'yyyy/MM/dd')
    : format(new Date(date), 'yyyy/MM/dd')
}
