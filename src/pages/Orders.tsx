"use client"

import { useOrders } from "../../lib/orders-context"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { ShoppingBag } from "lucide-react"

export default function Orders() {
  const { orders } = useOrders()
  const navigate = useNavigate()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">No tienes pedidos aún</h1>
          <p className="text-muted-foreground mb-6">Realiza tu primera compra para ver tus pedidos aquí</p>
          <Button onClick={() => navigate("/catalog")}>
            Explorar Productos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
          <p className="text-muted-foreground">
            {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">Pedido {order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status === "confirmed" ? "Confirmado" : "Pendiente"}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                Ver Detalles
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
