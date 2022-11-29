import React, { useEffect, useState } from 'react'
import { GiftType } from '../components/Gift/Gift'

interface giftActions {
  deleteItem: (id: string) => void
}

interface useGifts {
  (): [
    GiftType[],
    React.Dispatch<React.SetStateAction<GiftType[]>>,
    giftActions
  ]
}

export const useGifts: useGifts = () => {
  const [giftsList, setGiftsList] = useState<GiftType[]>(
    () => JSON.parse(localStorage.getItem('giftsList')!) || []
  )
  useEffect(() => {
    localStorage.setItem('giftsList', JSON.stringify(giftsList))
  }, [giftsList])

  const deleteItem: giftActions['deleteItem'] = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

  return [giftsList, setGiftsList, { deleteItem }]
}
