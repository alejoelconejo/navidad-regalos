import React from 'react'
import { GiftType } from '../Gift/Gift'
import './Form.css'

interface Props {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleModalClose: () => void
  giftForm: GiftType
  getRandomGift: () => void
}

export const Form = ({
  handleSubmit,
  handleChange,
  handleModalClose,
  giftForm,
  getRandomGift,
}: Props) => {
  return (
    <form className='form-gift' onSubmit={handleSubmit}>
      <div className='form-name'>
        <label>
          Regalo
          <div className='form-name-input'>
            <input
              type='text'
              name='name'
              className='input-gift'
              placeholder='Nombre'
              maxLength={30}
              value={giftForm.name}
              onChange={handleChange}
              required
              autoFocus
            />
            <button
              onClick={getRandomGift}
              type='button'
              className='button-random'
            >
              ¡Sorpréndeme!
            </button>
          </div>
        </label>
      </div>
      <label>
        Cantidad
        <input
          type='number'
          name='quantity'
          className='input-gift'
          value={giftForm.quantity}
          onChange={handleChange}
          min='1'
          required
        />
      </label>
      <label>
        Precio
        <input
          type='number'
          name='price'
          className='input-gift'
          value={giftForm.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Imagen
        <input
          type='text'
          name='image'
          className='input-gift'
          placeholder='https://image.png'
          value={giftForm.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Destinatario
        <input
          type='text'
          name='addressee'
          className='input-gift'
          placeholder='Nombre'
          value={giftForm.addressee}
          onChange={handleChange}
          required
        />
      </label>
      <div className='form-buttons'>
        <button
          className='form-close'
          type='button'
          onClick={() => handleModalClose()}
        >
          Cerrar
        </button>
        <button className='form-save' type='submit'>
          Guardar
        </button>
      </div>
    </form>
  )
}
