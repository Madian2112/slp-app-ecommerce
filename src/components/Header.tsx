"use client"

import { ShoppingCart, Store } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { useCart } from "../../lib/cart-context"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { items, total } = useCart()
  const navigate = useNavigate()

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <h1 className="text-lg font-semibold">TiendaApp</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/orders")}>
            Mis Pedidos
          </Button>

          <Button variant="outline" onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Carrito
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
