import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import ReactToPrint from 'react-to-print'

import { Snowflakes } from './components/Snowflakes/Snowflakes'
import { nanoid } from 'nanoid'
import { Gift } from './components/Gift/Gift'
import { Form } from './components/Form/Form'
import { MusicButton } from './components/MusicButton/MusicButton'
import { useModal } from './hooks/useModal'

export interface GiftType {
  id: string
  name: string
  quantity: number
  price: number
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
  price: 0,
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

  const [modalIsOpen, toggleModal] = useModal(false)

  const giftsRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('giftsList', JSON.stringify(giftsList))
  }, [giftsList])

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
    const actualGift = giftsList.find((gift) => gift.id === id)
    setGiftForm(actualGift!)
    toggleModal()
  }

  const handleClickDuplicate = (id: string) => {
    const actualGift = giftsList.find((gift) => gift.id === id)
    setGiftForm({ ...actualGift!, id: nanoid() })
    toggleModal()
  }

  const deleteItem = (id: string) => {
    setGiftsList((previousList) =>
      previousList.filter((gift) => gift.id !== id)
    )
  }

  const getRandomGift = () => {
    const randomGiftNum = Math.floor(Math.random() * randomGifts.length)
    setGiftForm((previousForm) => {
      return { ...previousForm, name: randomGifts[randomGiftNum] }
    })
  }

  const handleModalClose = () => {
    toggleModal()
    setGiftForm({ ...INITIAL_FORM, id: nanoid() })
  }

  const getTotalPrice = () => {
    let result = 0
    giftsList.forEach((gift) => {
      result += gift.price * gift.quantity
    })
    return result
  }

  useEffect(() => {
    Modal.setAppElement('body')
  })

  return (
    <>
      <Snowflakes />
      <main>
        <header>
          <h1>🎁 ¡Regalos de Navidad!</h1>
          <MusicButton />
        </header>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          contentLabel='Gift Form'
          // style={customStyles}
          className='modal'
          overlayClassName='modal-overlay'
        >
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            giftForm={giftForm}
            toggleModal={toggleModal}
            getRandomGift={getRandomGift}
          />
        </Modal>
        <button className='button-add-gift' onClick={toggleModal}>
          Agregar regalo
        </button>
        <section className='gifts' ref={giftsRef}>
          {giftsList.length ? (
            giftsList.map((gift) => (
              <Gift
                key={gift.id}
                deleteItem={deleteItem}
                handleClickEdit={handleClickEdit}
                handleClickDuplicate={handleClickDuplicate}
                gift={gift}
              />
            ))
          ) : (
            <p className='empty-list'>
              No hay regalos todavía... apurate a pedir el tuyo! ☝️
            </p>
          )}
          <p className='gifts-total'>Total: ${getTotalPrice()}</p>
        </section>
        <div className='buttons-home-bottom'>
          <button className='reset-button' onClick={() => setGiftsList([])}>
            Borrar todo
          </button>
          <ReactToPrint
            trigger={() => <button>Lista de compras</button>}
            content={() => giftsRef.current}
          />
        </div>
      </main>
    </>
  )
}

export default App
