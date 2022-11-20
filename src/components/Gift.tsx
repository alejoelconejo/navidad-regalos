import { GiftType } from '../App'

interface Props extends GiftType {
  setGiftsList: React.Dispatch<React.SetStateAction<GiftType[]>>
  handleClickEdit: (id: string) => void
}

export const Gift = ({
  id,
  name,
  quantity,
  image,
  addressee,
  setGiftsList,
  handleClickEdit,
}: Props) => {
  const handleClickDelete = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

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
      <button onClick={() => handleClickDelete(id)}>X</button>
    </article>
  )
}
