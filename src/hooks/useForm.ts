import { nanoid } from 'nanoid'
import { useState } from 'react'
import { GiftType } from '../components/Gift/Gift'

import randomGifts from '../data/randomGifts.json'

interface formActions {
  getRandomGift: () => void
  submitForm: (
    event: React.FormEvent,
    list: GiftType[],
    setList: React.Dispatch<React.SetStateAction<GiftType[]>>
  ) => void
}

interface useForm {
  (): [GiftType, React.Dispatch<React.SetStateAction<GiftType>>, formActions]
}

export const INITIAL_FORM = {
  name: '',
  id: nanoid(),
  quantity: 1,
  price: 0,
  image: '',
  addressee: '',
}

export const useForm: useForm = () => {
  const [giftForm, setGiftForm] = useState<GiftType>({
    ...INITIAL_FORM,
    id: nanoid(),
  })

  const getRandomGift = () => {
    const randomGiftNum = Math.floor(Math.random() * randomGifts.length)
    setGiftForm((previousForm) => {
      return { ...previousForm, name: randomGifts[randomGiftNum] }
    })
  }

  const submitForm: formActions['submitForm'] = (event, list, setList) => {
    event.preventDefault()
    if (list.find((gift) => gift.id === giftForm.id)) {
      setList((previousList) =>
        previousList.filter((gift) => gift.id !== giftForm.id)
      )
    }
    setList((previousList) => [...previousList, giftForm])
    setGiftForm({ ...INITIAL_FORM, id: nanoid() })
  }

  return [giftForm, setGiftForm, { getRandomGift, submitForm }]
}
