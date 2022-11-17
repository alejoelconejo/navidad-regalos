import { GiftType } from '../App'

interface Props extends GiftType {
  setGiftsList: React.Dispatch<React.SetStateAction<GiftType[]>>
}

export const Gift = ({ id, name, quantity, setGiftsList }: Props) => {
  const handleClickDelete = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

  return (
    <article className='gift-article'>
      <h3>{name}</h3>
      <span>{quantity}</span>
      <button onClick={() => handleClickDelete(id)}>X</button>
    </article>
  )
}
