import { GiftType } from '../App'

export const getTotalPrice = (list: GiftType[]) => {
  let result = 0
  list.forEach((item) => {
    result += item.price * item.quantity
  })
  return result
}
