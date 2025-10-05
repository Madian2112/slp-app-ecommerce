"use client"

import type React from "react"

import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-balance line-clamp-2">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            <Button size="sm" onClick={handleQuickAdd}>
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
