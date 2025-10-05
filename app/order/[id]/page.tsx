"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/orders-context"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { orders } = useOrders()

  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pedido no encontrado</h2>
          <Button className="mt-4" onClick={() => router.push("/orders")}>
            Ver Todos los Pedidos
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "processing":
        return "En Proceso"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Detalle del Pedido</h1>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="space-y-6">
          {/* Order Status */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{order.id}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <h3 className="font-semibold">Dirección de Envío</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Productos</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-balance">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">Resumen del Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${(order.total - 5.99).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-medium">$5.99</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
