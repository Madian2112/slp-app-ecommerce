"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "./mock-data"

interface OrderItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: "confirmed" | "processing" | "shipped" | "delivered"
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
  }
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Order) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (order: Order) => {
    setOrders((currentOrders) => [order, ...currentOrders])
  }

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider")
  }
  return context
}
