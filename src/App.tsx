import { useState } from 'react'
import { Snowflakes } from './components/Snowflakes'
import { nanoid } from 'nanoid'
import { Gift } from './components/Gift'
import { Form } from './components/Form'

export interface GiftType {
  id: string
  name: string
}

const INITIAL_GIFTS = [
  { id: nanoid(), name: 'Gorra' },
  { id: nanoid(), name: 'Camiseta' },
  { id: nanoid(), name: 'T.E.G.' },
]

function App() {
  const [giftsList, setGiftsList] = useState<GiftType[]>(INITIAL_GIFTS)

  const [giftForm, setGiftForm] = useState<GiftType>({ name: '', id: nanoid() })

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
    setGiftForm({ name: '', id: nanoid() })
  }

  return (
    <>
      <Snowflakes />
      <main>
        <h1>🎁 ¡Regalos de Navidad!</h1>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          giftForm={giftForm}
        />
        <section className='gifts'>
          {giftsList.length ? (
            giftsList.map(({ name, id }) => (
              <Gift key={id} name={name} id={id} setGiftsList={setGiftsList} />
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
