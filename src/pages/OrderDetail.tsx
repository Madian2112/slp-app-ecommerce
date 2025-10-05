"use client"

import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useOrders } from "../../lib/orders-context"

export default function OrderDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const { orders } = useOrders()

  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return <div>Pedido no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Detalle del Pedido</h1>
        </div>
      </header>

      <div className="container px-4 py-6 pb-20">
        <div className="rounded-lg border p-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">Pedido {order.id}</h2>
              <p className="text-muted-foreground">
                {new Date(order.date).toLocaleDateString("es-ES")}
              </p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${
              order.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {order.status === "confirmed" ? "Confirmado" : "Pendiente"}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5" />
            <div>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4 mb-6">
          <h3 className="font-semibold mb-3">Productos</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.product.category}</p>
                  <p className="text-sm">Cantidad: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.product.price * item.quantity}</p>
                  <p className="text-sm text-muted-foreground">${item.product.price} c/u</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-3">Resumen de Pago</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${(order.total - 5.99).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
