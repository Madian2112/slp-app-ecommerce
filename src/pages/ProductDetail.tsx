"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useCart } from "../../lib/cart-context"
import { products } from "../../lib/mock-data"

export default function ProductDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    navigate("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Detalle del Producto</h1>
        </div>
      </header>

      {/* Product Images */}
      <div className="container px-4 py-6">
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="container space-y-6 px-4">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-balance">{product.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${product.price}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reseñas)
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Descripción</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>

        <div>
          <h3 className="font-semibold">Disponibilidad</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0 ? (
              <span className="text-green-600">En stock ({product.stock} unidades)</span>
            ) : (
              <span className="text-red-600">Agotado</span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 border-t bg-background p-4">
        <div className="container flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
