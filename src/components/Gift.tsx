import { GiftType } from '../App'

interface Props {
  id: string
  name: string
  setGiftsList: React.Dispatch<React.SetStateAction<GiftType[]>>
}

export const Gift = ({ id, name, setGiftsList }: Props) => {
  const handleClickDelete = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

  return (
    <article className='gift-article'>
      <h3>{name}</h3>
      <button onClick={() => handleClickDelete(id)}>X</button>
    </article>
  )
}
