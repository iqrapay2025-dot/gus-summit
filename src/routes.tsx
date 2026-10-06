import { createBrowserRouter, Link } from 'react-router'
import { Layout } from './components/Layout'
import { Container, LinkButton } from './components/ui'

const NotFound = () => (
  <Container className="py-24 text-center">
    <h1 className="font-display text-4xl font-semibold text-gus-orange">Page not found</h1>
    <p className="mb-6 mt-2">Let&apos;s get you back home, sister. <Link to="/" className="underline">Home</Link></p>
    <LinkButton to="/">Back to Home</LinkButton>
  </Container>
)

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).default }) },
      { path: 'about', lazy: async () => ({ Component: (await import('./pages/About')).default }) },
      { path: 'summit', lazy: async () => ({ Component: (await import('./pages/Summit')).default }) },
      { path: 'register', lazy: async () => ({ Component: (await import('./pages/Register')).default }) },
      { path: 'ticket', lazy: async () => ({ Component: (await import('./pages/Ticket')).default }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).default }) },
      { path: '*', Component: NotFound },
    ],
  },
])
