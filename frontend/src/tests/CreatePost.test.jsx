import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreatePost from '../pages/CreatePost'

describe('CreatePost', () => {
  it('renderiza el formulario de crear post', () => {
    const { container } = render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )

    expect(container.querySelector('form')).toBeTruthy()
  })

  it('tiene campo para el título', () => {
    const { container } = render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )

    expect(
      screen.queryByLabelText(/t[ií]tulo/i) ||
      screen.queryByPlaceholderText(/t[ií]tulo/i) ||
      container.querySelector('input[type="text"]')
    ).toBeTruthy()
  })

  it('tiene campo para el cuerpo del mensaje', () => {
    const { container } = render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )

    expect(
      screen.queryByLabelText(/contenido|mensaje/i) ||
      screen.queryByPlaceholderText(/contenido|mensaje/i) ||
      container.querySelector('textarea')
    ).toBeTruthy()
  })

  it('tiene botón PUBLICAR POST', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )

    expect(screen.getByText(/publicar post/i)).toBeInTheDocument()
  })

  it('tiene botón ADJUNTAR ARCHIVO', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    )

    expect(screen.getByText(/adjuntar archivo/i)).toBeInTheDocument()
  })
})
