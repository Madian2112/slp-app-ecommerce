"use client"

import { ProductCard } from "../../components/product-card"
import { products } from "../../lib/mock-data"

export default function Catalog() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
          <p className="text-muted-foreground">
            Descubre nuestra amplia selección de productos
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
