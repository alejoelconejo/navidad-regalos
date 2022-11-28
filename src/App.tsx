import { useEffect, useRef } from 'react'
import Modal from 'react-modal'
import ReactToPrint from 'react-to-print'

import { Snowflakes } from './components/Snowflakes/Snowflakes'
import { nanoid } from 'nanoid'
import { Gift } from './components/Gift/Gift'
import { Form } from './components/Form/Form'
import { MusicButton } from './components/MusicButton/MusicButton'
import { useModal } from './hooks/useModal'
import { useGifts } from './hooks/useGifts'
import { getTotalPrice } from './utils/getTotalPrice'
import { useForm } from './hooks/useForm'

export interface GiftType {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  addressee: string
}

const INITIAL_FORM = {
  name: '',
  id: nanoid(),
  quantity: 1,
  price: 0,
  image: '',
  addressee: '',
}

function App() {
  const [giftsList, setGiftsList, { deleteItem }] = useGifts()

  const [giftForm, setGiftForm, { getRandomGift, submitForm }] = useForm()

  const [modalIsOpen, toggleModal] = useModal(false)

  const giftsRef = useRef(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setGiftForm((previousForm) => {
      return { ...previousForm, [name]: value }
    })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    submitForm(event, giftsList, setGiftsList)
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
        <header>
          <h1>🎁 ¡Regalos de Navidad!</h1>
          <MusicButton />
        </header>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          contentLabel='Gift Form'
          className='modal'
          overlayClassName='modal-overlay'
        >
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleModalClose={handleModalClose}
            giftForm={giftForm}
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
          <p className='gifts-total'>Total: ${getTotalPrice(giftsList)}</p>
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
