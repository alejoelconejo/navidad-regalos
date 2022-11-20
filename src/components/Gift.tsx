import { GiftType } from '../App'

interface Props extends GiftType {
  handleClickEdit: (id: string) => void
  deleteItem: (id: string) => void
}

export const Gift = ({
  id,
  name,
  quantity,
  image,
  addressee,
  deleteItem,
  handleClickEdit,
}: Props) => {
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
      <span>{quantity}</span>
      <span>{addressee}</span>
      <button onClick={() => handleClickEdit(id)}>E</button>
      <button onClick={() => deleteItem(id)}>X</button>
    </article>
  )
}
