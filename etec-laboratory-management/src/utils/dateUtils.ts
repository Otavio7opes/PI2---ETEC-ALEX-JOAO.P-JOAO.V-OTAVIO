import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? parse(date, 'dd/MM/yyyy', new Date()) : date
  return format(dateObj, formatStr, { locale: ptBR })
}

export const formatTime = (time: string): string => {
  return time
}

