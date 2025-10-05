"use client"

import { useParams, useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/orders-context"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { orders } = useOrders()

  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-balance">¡Pedido Confirmado!</h1>
        <p className="mt-2 text-muted-foreground">Tu pedido ha sido procesado exitosamente</p>

        <div className="mt-8 rounded-lg border p-6 text-left">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Número de Pedido</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dirección de Envío</p>
              <p className="text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-sm">{order.shippingAddress.address}</p>
              <p className="text-sm">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button className="w-full" onClick={() => router.push(`/order/${order.id}`)}>
            Ver Detalles del Pedido
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/catalog")}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  )
}
