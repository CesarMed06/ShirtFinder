import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Register from '../components/Register'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ register: vi.fn(), user: null })
}))

describe('Register', () => {
  it('renderiza el formulario de registro', () => {
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>)
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('tiene campos de nombre, email y contraseña', () => {
    const { container } = render(<BrowserRouter><Register /></BrowserRouter>)
    expect(container.querySelector('input[name="username"]')).toBeTruthy()
    expect(container.querySelector('input[type="email"]')).toBeTruthy()
    expect(container.querySelector('input[type="password"]')).toBeTruthy()
  })

  it('tiene botón de submit', () => {
    render(<BrowserRouter><Register /></BrowserRouter>)
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('muestra el título de registro', () => {
    render(<BrowserRouter><Register /></BrowserRouter>)
    expect(screen.getByRole('heading', { name: /crear cuenta/i })).toBeInTheDocument()
  })
})
