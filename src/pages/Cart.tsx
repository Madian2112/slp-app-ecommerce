"use client"

import { useCart } from "../../lib/cart-context"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">Agrega algunos productos para comenzar</p>
          <Button onClick={() => navigate("/catalog")}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Carrito de Compras</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? "producto" : "productos"} en tu carrito
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-lg border p-4">
              <img
                src={item.product.images[0] || "/placeholder.svg"}
                alt={item.product.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{item.product.category}</p>
                <p className="font-bold">${item.product.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 pb-20">
          <Button className="w-full" onClick={() => navigate("/checkout")}>
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  )
}
