import { useState } from 'react'

export const useModal = (initialState = false): [boolean, () => void] => {
  const [modalIsOpen, setModalOpen] = useState(initialState)

  const toggleModal = () => {
    setModalOpen(!modalIsOpen)
  }

  return [modalIsOpen, toggleModal]
}
