export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') date = new Date(date)
  return date.toLocaleString('default', dateSettings)
}

const dateSettings: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}
