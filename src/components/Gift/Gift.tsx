import './Gift.css'

export interface GiftType {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  addressee: string
}

interface Props {
  gift: GiftType
  handleClickEdit: (id: string) => void
  handleClickDuplicate: (id: string) => void
  deleteItem: (id: string) => void
}

export const Gift = ({
  gift: { price, quantity, image, name, addressee, id },
  deleteItem,
  handleClickEdit,
  handleClickDuplicate,
}: Props) => {
  const totalPrice = price * quantity

  return (
    <article className='gift-article'>
      <img
        src={
          image !== ''
            ? image
            : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
        }
      />
      <h3>{name}</h3>
      <span>x {quantity}</span>
      <span>{totalPrice}</span>
      <span>{addressee}</span>
      <button onClick={() => handleClickEdit(id)}>E</button>
      <button onClick={() => handleClickDuplicate(id)}>D</button>
      <button onClick={() => deleteItem(id)}>X</button>
    </article>
  )
}
