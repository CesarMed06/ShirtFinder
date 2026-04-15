import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: null, token: null })
}))

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Home', () => {
  it('renderiza la página Home sin errores', () => {
    const { container } = render(<BrowserRouter><Home /></BrowserRouter>)
    expect(container).toBeTruthy()
  })

  it('muestra el título principal', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(screen.getByText(/viste la historia del fútbol/i)).toBeInTheDocument()
  })

  it('muestra el botón de explorar catálogo', () => {
    render(<BrowserRouter><Home /></BrowserRouter>)
    expect(screen.getByText(/explorar cat[aá]logo/i)).toBeInTheDocument()
  })
})