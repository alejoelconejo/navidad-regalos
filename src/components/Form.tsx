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
        placeholder='Regalo'
        maxLength={30}
        onChange={handleChange}
        value={giftForm.name}
        required
        autoFocus
      />
      <button>Agregar</button>
    </form>
  )
}
