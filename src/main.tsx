import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../styles/globals.css'
import App from './App'
import { CartProvider } from '../lib/cart-context'
import { OrdersProvider } from '../lib/orders-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </CartProvider>
  </StrictMode>,
)
