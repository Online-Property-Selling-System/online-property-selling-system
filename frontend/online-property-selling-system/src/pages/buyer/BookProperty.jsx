import React from 'react'
import { useParams } from 'react-router-dom'

const BookProperty = () => {
  const { id } = useParams()
  return (
    <div>
      <h3>Book Property</h3>
      <p>Booking flow for property id: {id} (placeholder).</p>
    </div>
  )
}

export default BookProperty
