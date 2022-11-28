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
    <article className='gift-item'>
      <div className='gift-data'>
        <img
          alt={name}
          src={
            image !== ''
              ? image
              : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
          }
        />
        <div>
          <div className='gift-description'>
            <h3>{name}</h3>
            <span className='gift-quantity'>(x {quantity})</span>
            <span>${totalPrice}</span>
          </div>
          <div className='gift-addressee'>
            <span>{addressee}</span>
          </div>
        </div>
      </div>
      <div className='gift-actions'>
        <button title='Editar' onClick={() => handleClickEdit(id)}>
          E
        </button>
        <button title='Duplicar' onClick={() => handleClickDuplicate(id)}>
          D
        </button>
        <button title='Eliminar' onClick={() => deleteItem(id)}>
          X
        </button>
      </div>
    </article>
  )
}
