import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PostCard from '../components/PostCard'

const postMock = {
  id: 1,
  title: '¿Cuál es la mejor equipación?',
  content: 'Opinión sobre camisetas...',
  username: 'elmenor_offi',
  created_at: '2025-08-25T10:00:00Z',
  replies_count: 9
}

describe('PostCard', () => {
  it('renderiza el título del post', () => {
    render(<BrowserRouter><PostCard post={postMock} /></BrowserRouter>)
    expect(screen.getByText(/cu[aá]l es la mejor equipaci[oó]n/i)).toBeInTheDocument()
  })

  it('renderiza el nombre del autor', () => {
    render(<BrowserRouter><PostCard post={postMock} /></BrowserRouter>)
    expect(screen.getByText(/elmenor_offi/i)).toBeInTheDocument()
  })

  it('renderiza el número de respuestas', () => {
    render(<BrowserRouter><PostCard post={postMock} /></BrowserRouter>)
    expect(screen.getByText(/9/i)).toBeInTheDocument()
  })

  it('tiene contenedor clickable para ver el detalle', () => {
    const { container } = render(<BrowserRouter><PostCard post={postMock} /></BrowserRouter>)
    expect(container.querySelector('article, [onClick], a')).toBeTruthy()
  })
})
