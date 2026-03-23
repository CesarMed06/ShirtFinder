import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, token: null })
}))

describe('Home', () => {
  it('renderiza la página Home sin errores', () => {
    const { container } = render(<BrowserRouter><Home /></BrowserRouter>)
    expect(container).toBeTruthy()
  })

  it('muestra el título principal', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(screen.getByText(/shirtfinder/i)).toBeInTheDocument()
  })

  it('muestra el botón de explorar catálogo', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(screen.getByText(/explorar cat[aá]logo/i)).toBeInTheDocument()
  })
})
