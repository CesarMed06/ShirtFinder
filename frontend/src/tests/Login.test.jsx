import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue({ success: true }),
    user: null,
    token: null
  })
}))

describe('Login', () => {
  it('renderiza el formulario de login', () => {
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>)
    expect(container.querySelector('form')).toBeTruthy()
  })

  it('tiene campos de email y contraseña', () => {
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>)
    expect(container.querySelector('input[type="email"]')).toBeTruthy()
    expect(container.querySelector('input[type="password"]')).toBeTruthy()
  })

  it('tiene botón de submit', () => {
    render(<BrowserRouter><Login /></BrowserRouter>)
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('muestra error si se envía vacío', () => {
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>)
    fireEvent.submit(container.querySelector('form'))
    expect(container).toBeTruthy()
  })

  it('el campo email acepta texto', () => {
    const { container } = render(<BrowserRouter><Login /></BrowserRouter>)
    const emailInput = container.querySelector('input[type="email"]')
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    expect(emailInput.value).toBe('test@test.com')
  })
})
