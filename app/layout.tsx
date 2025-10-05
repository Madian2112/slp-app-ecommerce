import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { OrdersProvider } from "@/lib/orders-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "TiendaApp - Tu Tienda Online",
  description: "Aplicación de e-commerce móvil con catálogo de productos, carrito de compras y gestión de pedidos",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body>
        <CartProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </CartProvider>
      </body>
    </html>
  )
}
