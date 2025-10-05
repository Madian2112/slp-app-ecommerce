"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotal } = useCart()

  const subtotal = getTotal()
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Carrito de Compras</h1>
          </div>
        </header>
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Trash2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
            <p className="mt-2 text-sm text-muted-foreground">Agrega productos para comenzar tu compra</p>
            <Button className="mt-6" onClick={() => router.push("/catalog")}>
              Explorar Productos
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Carrito de Compras</h1>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-lg border p-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                <img
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-balance">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-md border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
        <div className="container space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={() => router.push("/checkout")}>
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  )
}
