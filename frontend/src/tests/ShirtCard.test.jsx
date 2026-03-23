
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ShirtCard from '../components/ShirtCard'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, token: null })
}))

vi.mock('../components/FavoriteButton', () => ({
  default: () => null
}))

const shirtMock = {
  id_shirts: 1,
  name: 'Camiseta Ajax 2025',
  team: 'Ajax',
  league: 'Eredivisie',
  season: '2024-25',
  image_url: 'https://example.com/ajax.jpg',
  price: 89.99
}

describe('ShirtCard', () => {
  it('renderiza el nombre de la camiseta', () => {
    render(<BrowserRouter><ShirtCard shirt={shirtMock} /></BrowserRouter>)
    expect(screen.getByText(/ajax/i)).toBeInTheDocument()
  })

  it('renderiza el equipo', () => {
    render(<BrowserRouter><ShirtCard shirt={shirtMock} /></BrowserRouter>)
    expect(screen.getByText(/ajax/i)).toBeInTheDocument()
  })

  it('renderiza el precio', () => {
    render(<BrowserRouter><ShirtCard shirt={shirtMock} /></BrowserRouter>)
    expect(screen.getByText(/€/i)).toBeInTheDocument()
  })

  it('tiene un enlace o botón para ver el detalle', () => {
    const { container } = render(<BrowserRouter><ShirtCard shirt={shirtMock} /></BrowserRouter>)
    expect(screen.queryByRole('link') || screen.queryByRole('button') || container.querySelector('[style*="cursor"]')).toBeTruthy()
  })
})
