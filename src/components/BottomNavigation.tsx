"use client"

import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"

export default function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-around px-4">
        <Button
          variant={isActive("/catalog") ? "default" : "ghost"}
          size="sm"
          onClick={() => navigate("/catalog")}
          className="flex flex-col gap-1 h-auto py-2"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Inicio</span>
        </Button>

        <Button
          variant={isActive("/orders") ? "default" : "ghost"}
          size="sm"
          onClick={() => navigate("/orders")}
          className="flex flex-col gap-1 h-auto py-2"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs">Pedidos</span>
        </Button>

        <Button
          variant={isActive("/cart") ? "default" : "ghost"}
          size="sm"
          onClick={() => navigate("/cart")}
          className="flex flex-col gap-1 h-auto py-2"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">Carrito</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col gap-1 h-auto py-2"
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Perfil</span>
        </Button>
      </div>
    </nav>
  )
}
