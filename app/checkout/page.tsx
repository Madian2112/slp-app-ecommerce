"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { useOrders } from "@/lib/orders-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const subtotal = getTotal()
  const shipping = 5.99
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: items,
      total: total,
      status: "confirmed" as const,
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    }

    addOrder(order)
    clearCart()
    router.push(`/order-confirmation/${order.id}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Finalizar Compra</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container px-4 py-6">
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Información de Envío</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Calle Principal 123"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Madrid"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    placeholder="28001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Información de Pago</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="cardExpiry">Fecha de Expiración</Label>
                  <Input
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    required
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-3 text-lg font-semibold">Resumen del Pedido</h2>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2">
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
          </div>
        </div>
      </form>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
        <div className="container">
          <Button className="w-full" size="lg" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? (
              "Procesando..."
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Confirmar Pago ${total.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
