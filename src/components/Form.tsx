import React from 'react'
import { GiftType } from '../App'

interface Props {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  giftForm: GiftType
}

export const Form = ({ handleSubmit, handleChange, giftForm }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        className='input-gift'
        placeholder='Regalo'
        maxLength={30}
        value={giftForm.name}
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        type='number'
        name='quantity'
        className='input-quantity'
        value={giftForm.quantity}
        onChange={handleChange}
        min='1'
        required
      />
      <input
        type='text'
        name='image'
        className='input-image'
        placeholder='https://image.png'
        value={giftForm.image}
        onChange={handleChange}
      />
      <input
        type='text'
        name='addressee'
        className='input-addressee'
        placeholder='Destinatario'
        value={giftForm.addressee}
        onChange={handleChange}
        required
      />
      <button>Agregar</button>
    </form>
  )
}
