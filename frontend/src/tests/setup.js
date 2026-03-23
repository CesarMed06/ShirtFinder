import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

global.fetch = vi.fn()

vi.mock('sweetalert2', () => ({
    default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) }
}))

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '1' }),
    useLocation: () => ({ pathname: '/' }),
    Link: ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children),
    NavLink: ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children),
    BrowserRouter: ({ children }) => children
}))

vi.mock('./context/AuthContext', () => ({
    useAuth: () => ({ login: vi.fn().mockResolvedValue({ success: true }), register: vi.fn(), user: null, token: null })
}))

const localStorageMock = {
    getItem: vi.fn(() => 'fake-token'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true })

beforeEach(() => {
    fetch.mockReset()
})
