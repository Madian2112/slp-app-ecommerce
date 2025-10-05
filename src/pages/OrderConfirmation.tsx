"use client"

import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useOrders } from "../../lib/orders-context"

export default function OrderConfirmation() {
  const params = useParams()
  const navigate = useNavigate()
  const { orders } = useOrders()

  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return <div>Pedido no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center pb-16">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
        <h1 className="text-2xl font-bold mb-4">¡Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-6">
          Tu pedido {order.id} ha sido confirmado exitosamente.
          Recibirás un email con los detalles de tu compra.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="font-semibold">Total Pagado</p>
          <p className="text-2xl font-bold text-primary">${order.total}</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => navigate(`/order/${order.id}`)}>
            Ver Detalles del Pedido
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/catalog")}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  )
}
