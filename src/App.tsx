import { useEffect, useState } from 'react'
import { Snowflakes } from './components/Snowflakes'
import { nanoid, random } from 'nanoid'
import { Gift } from './components/Gift'
import { Form } from './components/Form'
import Modal from 'react-modal'

export interface GiftType {
  id: string
  name: string
  quantity: number
  image: string
  addressee: string
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const INITIAL_FORM = {
  name: '',
  id: nanoid(),
  quantity: 1,
  image: '',
  addressee: '',
}

const randomGifts = [
  'Medias',
  'Bufanda',
  'Pelota',
  'Zapatillas',
  'Zapatos',
  'Vestido',
]

function App() {
  const [giftsList, setGiftsList] = useState<GiftType[]>(
    () => JSON.parse(localStorage.getItem('giftsList')!) || []
  )

  const [giftForm, setGiftForm] = useState<GiftType>({
    ...INITIAL_FORM,
    id: nanoid(),
  })

  const [modalIsOpen, setModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('giftsList', JSON.stringify(giftsList))
  }, [giftsList])

  const toggleModal = () => {
    setModalOpen(!modalIsOpen)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setGiftForm((previousForm) => {
      return { ...previousForm, [name]: value }
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (giftsList.find((gift) => gift.id === giftForm.id)) {
      setGiftsList((previousList) =>
        previousList.filter((gift) => gift.id !== giftForm.id)
      )
    }
    setGiftsList((previousList) => [...previousList, giftForm])
    setGiftForm({ ...INITIAL_FORM, id: nanoid() })
    toggleModal()
  }

  const handleClickEdit = (id: string) => {
    setGiftForm(giftsList.find((gift) => gift.id === id))
    toggleModal()
  }

  const deleteItem = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

  const getRandomGift = () => {
    const randomGiftNum = Math.floor(Math.random() * randomGifts.length)
    console.log(randomGifts[randomGiftNum])
    setGiftForm((previousForm) => {
      return { ...previousForm, name: randomGifts[randomGiftNum] }
    })
  }

  const handleModalClose = () => {
    toggleModal()
    setGiftForm({ ...INITIAL_FORM, id: nanoid() })
  }

  useEffect(() => {
    Modal.setAppElement('body')
  })

  return (
    <>
      <Snowflakes />
      <main>
        <h1>🎁 ¡Regalos de Navidad!</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            giftForm={giftForm}
            toggleModal={toggleModal}
            getRandomGift={getRandomGift}
          />
        </Modal>
        <button className='button-add-gift' onClick={() => setModalOpen(true)}>
          Agregar regalo
        </button>
        <section className='gifts'>
          {giftsList.length ? (
            giftsList.map(({ name, id, quantity, image, addressee }) => (
              <Gift
                key={id}
                name={name}
                id={id}
                quantity={quantity}
                image={image}
                addressee={addressee}
                deleteItem={deleteItem}
                handleClickEdit={handleClickEdit}
              />
            ))
          ) : (
            <p className='empty-list'>
              No hay regalos todavía... apurate a pedir el tuyo! ☝️
            </p>
          )}
        </section>
        <button className='reset-button' onClick={() => setGiftsList([])}>
          Borrar todo
        </button>
      </main>
    </>
  )
}

export default App
