import ColumnProps from './interfaces/ColumnProps'
import UserProps from './interfaces/UserProps'
import ImageProps from './interfaces/ImageProps'
export const objToArr = <T>(obj: {[key: string]: T}): Array<T> => {
  return Object.keys(obj).map(key => obj[key])
}

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>): { [key: string]: T } => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}

export function addColumnAvatar (data: ColumnProps | UserProps, width: number, height: number):void {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}

export function generateFitUrl (data: ImageProps, width: number, height: number, format = ['m_pad']): void {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}
