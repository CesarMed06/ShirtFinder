import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Forum from '../pages/Forum'

describe('Forum', () => {
  it('renderiza el título del foro o sección', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] })
    })

    render(
      <BrowserRouter>
        <Forum />
      </BrowserRouter>
    )

    expect(screen.getByText(/foro shirtfinder|foro/i)).toBeInTheDocument()
  })

  it('renderiza sin errores cuando no hay posts', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] })
    })

    render(
      <BrowserRouter>
        <Forum />
      </BrowserRouter>
    )

    expect(screen.getByText(/elige un apartado para empezar|no hay posts/i)).toBeInTheDocument()
  })

  it('muestra el botón de crear post', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] })
    })

    render(
      <BrowserRouter>
        <Forum />
      </BrowserRouter>
    )

    expect(screen.getByText(/crear post/i)).toBeInTheDocument()
  })
})
