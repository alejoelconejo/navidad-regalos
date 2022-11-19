import { useEffect, useState } from 'react'
import { Snowflakes } from './components/Snowflakes'
import { nanoid } from 'nanoid'
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

function App() {
  const [giftsList, setGiftsList] = useState<GiftType[]>(
    () => JSON.parse(localStorage.getItem('giftsList')!) || []
  )

  const [giftForm, setGiftForm] = useState<GiftType>({
    name: '',
    id: nanoid(),
    quantity: 1,
    image: '',
    addressee: '',
  })

  const [modalIsOpen, setModalOpen] = useState(false)

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
    if (
      giftsList.find(
        (gift) => gift.name.toLowerCase() === giftForm.name.toLowerCase()
      )
    ) {
      window.alert('El regalo ya está en la lista. ¡Elegí otro!')
      return
    }
    setGiftsList((previousList) => [...previousList, giftForm])
    setGiftForm({
      name: '',
      id: nanoid(),
      quantity: 1,
      image: '',
      addressee: '',
    })
    setModalOpen(false)
  }

  return (
    <>
      <Snowflakes />
      <main>
        <h1>🎁 ¡Regalos de Navidad!</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            giftForm={giftForm}
          />
        </Modal>
        <button onClick={() => setModalOpen(true)}>Agregar regalo</button>
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
                setGiftsList={setGiftsList}
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
