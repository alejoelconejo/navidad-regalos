import React from 'react'
import { GiftType } from '../App'

interface Props {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  giftForm: GiftType
  toggleModal: () => void
}

export const Form = ({
  handleSubmit,
  handleChange,
  giftForm,
  toggleModal,
}: Props) => {
  return (
    <form className='form-gift' onSubmit={handleSubmit}>
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
        className='input-gift'
        value={giftForm.quantity}
        onChange={handleChange}
        min='1'
        required
      />
      <input
        type='text'
        name='image'
        className='input-gift'
        placeholder='https://image.png'
        value={giftForm.image}
        onChange={handleChange}
      />
      <input
        type='text'
        name='addressee'
        className='input-gift'
        placeholder='Destinatario'
        value={giftForm.addressee}
        onChange={handleChange}
        required
      />
      <div className='form-buttons'>
        <button className='form-close' onClick={() => toggleModal()}>
          Cerrar
        </button>
        <button className='form-save'>Guardar</button>
      </div>
    </form>
  )
}
