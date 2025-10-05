"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/mock-data"

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">TiendaApp</h1>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="container px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Todos", "Electrónica", "Ropa", "Hogar", "Deportes"].map((category) => (
            <Button
              key={category}
              variant={category === "Todos" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container px-4 pb-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="container flex h-16 items-center justify-around px-4">
          <Link href="/catalog" className="flex flex-col items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="text-xs font-medium">Inicio</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center gap-1 text-muted-foreground">
            <ShoppingCart className="h-6 w-6" />
            <span className="text-xs">Carrito</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="h-6 w-6" />
            <span className="text-xs">Pedidos</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
