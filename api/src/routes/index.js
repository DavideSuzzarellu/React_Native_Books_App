import { db } from '../firebase.js'
import { Router } from 'express'

const router = Router()

router.get('/books', async (req, res) => {
  try {
    const { docs } = await db.collection('books').get()
    console.log(docs)
    if (docs.empty) {
      return res.status(404).json({ error: 'No books found in the collection' })
    }
    const books = docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    res.json(books)
  } catch (error) {
    console.error('Error retrieving books:', error)
    res.status(500).json({ error: 'Error retrieving books' })
  }
})

router.get('/books/:id', async (req, res) => {
  const id = req.params.id
  try {
    const doc = await db.collection('books').doc(id).get()
    if (!doc.exists) return res.status(404).json({ error: 'Book not found' })
    res.json(doc.data())
  } catch (error) {
    console.error('Error founding book:', error)
    res.status(500).json({ error: 'Failed retrieving book' })
  }
})

router.post('/books', async (req, res) => {
  try {
    const { title, author, description, type, img, year } = req.body

    if (!title || !author || !description || !type || !img || !year) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }
    const docRef = await db.collection('books').add({
      title,
      author,
      description,
      type,
      img,
      year
    })

    const newBook = {
      id: docRef.id,
      title,
      author,
      description,
      type,
      img,
      year
    }

    res.status(201).json({ message: 'New book created', book: newBook })
  } catch (error) {
    console.error('Error during the creation:', error)
    res.status(500).json({ error: 'Error during the request' })
  }
})

router.put('/books/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  try {
    const docRef = db.collection('books').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return res.status(404).json({ error: 'Book not found' })
    }

    await docRef.update(body)

    const updatedDoc = await docRef.get()
    const updatedBook = updatedDoc.data()

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook })
  } catch (error) {
    console.error('Error updating book:', error)
    res.status(500).json({ error: 'Failed to update book' })
  }
})

router.delete('/books/:id', async (req, res) => {
  const id = req.params.id
  try {
    const docRef = db.collection('books').doc(id)
    const snapshot = await docRef.get()
    if (!snapshot.exists) {
      return res.status(404).json({ error: 'Book not found' })
    }
    await docRef.delete()
    console.log(`Book with id ${id} deleted successfully`)
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    res.status(500).json({ error: 'Failed to delete book' })
  }
})

export default router
