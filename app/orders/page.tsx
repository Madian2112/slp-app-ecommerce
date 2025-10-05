"use client"

import Link from "next/link"
import { ArrowLeft, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/orders-context"

export default function OrdersPage() {
  const { orders } = useOrders()

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
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Link href="/catalog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Mis Pedidos</h1>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No tienes pedidos</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tus pedidos aparecerán aquí después de realizar una compra
            </p>
            <Link href="/catalog">
              <Button className="mt-6">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Comenzar a Comprar
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container px-4 py-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/order/${order.id}`}>
                <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 overflow-x-auto">
                    {order.items.slice(0, 3).map((item) => (
                      <div
                        key={item.product.id}
                        className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                      >
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="container flex h-16 items-center justify-around px-4">
          <Link href="/catalog" className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="h-6 w-6" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 text-muted-foreground">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xs">Carrito</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1">
            <Package className="h-6 w-6" />
            <span className="text-xs font-medium">Pedidos</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
