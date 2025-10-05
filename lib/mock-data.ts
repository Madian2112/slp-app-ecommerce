export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  rating: number
  reviews: number
  stock: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Auriculares Inalámbricos Premium",
    description:
      "Auriculares con cancelación de ruido activa, batería de 30 horas y sonido de alta fidelidad. Perfectos para música, llamadas y entretenimiento.",
    price: 149.99,
    category: "Electrónica",
    images: ["/black-wireless-headphones.png", "/headphones-side-view.png", "/headphones-case.png"],
    rating: 4.5,
    reviews: 328,
    stock: 45,
  },
  {
    id: "2",
    name: "Smartwatch Deportivo",
    description:
      "Reloj inteligente con monitor de frecuencia cardíaca, GPS integrado y resistencia al agua. Ideal para deportistas y vida activa.",
    price: 199.99,
    category: "Electrónica",
    images: ["/smartwatch-sport-black.jpg", "/smartwatch-display.jpg", "/smartwatch-wrist.jpg"],
    rating: 4.7,
    reviews: 512,
    stock: 28,
  },
  {
    id: "3",
    name: "Cámara Instantánea Retro",
    description:
      "Cámara de fotos instantáneas con diseño vintage. Captura y imprime tus momentos favoritos al instante.",
    price: 89.99,
    category: "Electrónica",
    images: ["/instant-camera-pink.jpg", "/vintage-polaroid.png", "/instant-photo.jpg"],
    rating: 4.3,
    reviews: 156,
    stock: 67,
  },
  {
    id: "4",
    name: "Mochila Urbana Impermeable",
    description:
      "Mochila moderna con compartimento para laptop, puerto USB y material resistente al agua. Perfecta para el día a día.",
    price: 59.99,
    category: "Accesorios",
    images: ["/backpack-black-modern.jpg", "/laptop-backpack.png", "/backpack-compartments.jpg"],
    rating: 4.6,
    reviews: 892,
    stock: 120,
  },
  {
    id: "5",
    name: "Zapatillas Running Pro",
    description:
      "Zapatillas deportivas con tecnología de amortiguación avanzada y diseño transpirable. Ideales para correr largas distancias.",
    price: 129.99,
    category: "Deportes",
    images: ["/running-shoes-blue.jpg", "/sport-sneakers.jpg", "/athletic-shoes.png"],
    rating: 4.8,
    reviews: 1024,
    stock: 85,
  },
  {
    id: "6",
    name: "Botella Térmica Inteligente",
    description:
      "Botella de acero inoxidable con pantalla LED que muestra la temperatura. Mantiene bebidas frías 24h y calientes 12h.",
    price: 39.99,
    category: "Hogar",
    images: ["/smart-water-bottle.jpg", "/thermal-bottle-steel.jpg", "/insulated-bottle.jpg"],
    rating: 4.4,
    reviews: 267,
    stock: 156,
  },
  {
    id: "7",
    name: "Lámpara LED Escritorio",
    description:
      "Lámpara de escritorio con 3 niveles de brillo, puerto USB para carga y diseño minimalista. Perfecta para estudiar o trabajar.",
    price: 34.99,
    category: "Hogar",
    images: ["/desk-lamp-led-white.jpg", "/modern-desk-light.jpg", "/study-lamp.jpg"],
    rating: 4.5,
    reviews: 445,
    stock: 92,
  },
  {
    id: "8",
    name: "Teclado Mecánico RGB",
    description:
      "Teclado gaming mecánico con switches azules, iluminación RGB personalizable y reposamuñecas incluido.",
    price: 119.99,
    category: "Electrónica",
    images: [
      "/mechanical-keyboard-rgb.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    rating: 4.7,
    reviews: 678,
    stock: 54,
  },
]
