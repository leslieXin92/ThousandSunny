export interface IDateCell {
  type: 'prev-month' | 'current-month' | 'next-month',
  isSelected: boolean,
  day: string,
  date: Date
}
