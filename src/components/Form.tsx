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
      <button>Agregar</button>
    </form>
  )
}
