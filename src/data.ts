import { Product, Order, User } from "./types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "LJ-FB-PL-001",
    name: "Midnight Emerald Pure Linen",
    category: "Pure Linen",
    pricePerMeter: 1299,
    description:
      "100% GOTS certified organic flax. A rich, deep forest weave with a signature crisp hand-feel that softens beautifully over time.",
    images: [
      "https://i.pinimg.com/736x/46/7f/bb/467fbbfc124782fe7799553fffef10cf.jpg",
      "https://i.pinimg.com/1200x/08/99/8c/08998c7b67e00de01109c8b94fbdec9e.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m", "10m"],
    colors: ["Deep Forest", "Sage", "Moss"],
    weight: "Midweight",
    // stockInMeters: 450,
    inventory: [
      { color: "Deep Forest", length: 1, stock: 50 },
      { color: "Deep Forest", length: 2.5, stock: 30 },
      { color: "Deep Forest", length: 5, stock: 20 },
      { color: "Deep Forest", length: 10, stock: 10 },

      { color: "Ivory White", length: 1, stock: 40 },
      { color: "Ivory White", length: 2.5, stock: 25 },
    ],
    careInstructions:
      "Cold wash. Iron while damp to maintain the characteristic linen luster.",
    weaveType: "Plain Weave",
  },
  {
    id: "2",
    sku: "LJ-FB-BL-002",
    name: "Sand Drift Linen-Silk Blend",
    category: "Linen Blends",
    pricePerMeter: 2499,
    discountPrice: 1999,
    description:
      "A luxurious blend of 70% Linen and 30% Mulberry Silk. Offers a subtle sheen and fluid drape, ideal for occasion wear.",
    images: [
      "https://i.pinimg.com/1200x/64/7a/52/647a521e39a4d76d900b58e9a8e8da31.jpg",
      "https://i.pinimg.com/736x/07/8c/02/078c02bac819a1ba4bbce3dd0784882f.jpg",
    ],
    availableLengths: ["1m", "3m", "5m"],
    colors: ["Champagne", "Oyster", "Rose Gold"],
    weight: "Lightweight",
    stockInMeters: 120,
    careInstructions:
      "Dry clean recommended. Or very gentle hand wash in silk detergent.",
    weaveType: "Sateen Weave",
  },
  {
    id: "3",
    sku: "LJ-FB-PL-003",
    name: "Terracotta Rust Linen-Cotton",
    category: "Linen Blends",
    pricePerMeter: 1450,
    description:
      "55% Linen, 45% Organic Cotton. This blend offers the structural integrity of linen with the soft, breathable comfort of cotton.",
    images: [
      "https://i.pinimg.com/1200x/53/e2/85/53e2858deb1c1d45bc0a07ddfe1481f5.jpg",
      "https://i.pinimg.com/1200x/f5/f0/54/f5f054b426117608d25a287a631f9098.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m"],
    colors: ["Rust", "Clay", "Burnt Orange"],
    weight: "Midweight",
    stockInMeters: 300,
    careInstructions: "Machine wash cold. Tumble dry low or line dry in shade.",
    weaveType: "Twill Weave",
  },
  {
    id: "4",
    sku: "LJ-FB-HL-004",
    name: "Pure Ivory Home Linen",
    category: "Home Linen",
    pricePerMeter: 3200,
    description:
      "Heavyweight, ultra-durable linen fabric designed specifically for curtains, table runners, and bedding.",
    images: [
      "https://i.pinimg.com/1200x/a6/d7/18/a6d7189dbc2f1172d086e3dd73134e3e.jpg",
      "https://i.pinimg.com/1200x/e1/88/66/e188663f832bde19a1103a014142546b.jpg",
      "https://i.pinimg.com/1200x/49/4f/0e/494f0e4bff7d9b0f7129039abb030fd8.jpg",
    ],
    availableLengths: ["5m", "10m", "25m"],
    colors: ["Pure Ivory", "Oatmeal", "Charcoal"],
    weight: "Heavyweight",
    stockInMeters: 800,
    careInstructions:
      "Machine washable on gentle cycle. Ideal for heavy-use home textiles.",
    weaveType: "Basket Weave",
  },
  {
    id: "5",
    sku: "LJ-FB-PL-005",
    name: "Natural Flax Herringbone",
    category: "Pure Linen",
    pricePerMeter: 1850,
    description:
      "A classic herringbone weave in undyed, natural flax. This fabric celebrates the raw, earthy aesthetic of traditional European linen.",
    images: [
      "https://i.pinimg.com/1200x/ec/ad/a2/ecada29b3a85750be1a8f9688beb1a2f.jpg",
      "https://i.pinimg.com/736x/38/d6/06/38d6060d017ee2890f3a622dffe785ce.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m", "10m"],
    colors: ["Natural", "Ecru", "Stone"],
    weight: "Midweight",
    stockInMeters: 280,
    careInstructions: "Hand wash or machine wash on delicate. Avoid bleach.",
    weaveType: "Herringbone Weave",
  },
  {
    id: "6",
    sku: "LJ-FB-BL-006",
    name: "Midnight Navy Linen Sateen",
    category: "Linen Blends",
    pricePerMeter: 2100,
    discountPrice: 1750,
    description:
      "High-density linen with a sateen finish. This blend has a remarkable depth of color and a smooth, cool-to-the-touch surface.",
    images: [
      "https://i.pinimg.com/1200x/3e/aa/10/3eaa107736ccafd47f855a237089278b.jpg",
      "https://i.pinimg.com/1200x/6d/27/4b/6d274b300139b8cd7be1f90a1de35ac5.jpg",
      "https://i.pinimg.com/1200x/39/43/0b/39430b90f7d8bb35adb89e369929379b.jpg",
    ],
    availableLengths: ["1m", "3m", "5m"],
    colors: ["Midnight", "Ink", "Deep Teal"],
    weight: "Midweight",
    stockInMeters: 200,
    careInstructions: "Iron on reverse side to maintain the sateen sheen.",
    weaveType: "Sateen Weave",
  },
  {
    id: "7",
    sku: "LJ-FB-PL-007",
    name: "Sky Blue Chambray Linen",
    category: "Pure Linen",
    pricePerMeter: 1350,
    description:
      "Lightweight and airy, this chambray linen features a white weft for a soft, mottled sky-blue appearance. Perfect for summer shirts.",
    images: [
      "https://i.pinimg.com/1200x/d2/ed/4a/d2ed4aa6eb943ce90ac6fd4b4cae5f3d.jpg",
      "https://i.pinimg.com/1200x/ab/e5/23/abe52324b56af09220c506fbb75d9acb.jpg",
      "https://i.pinimg.com/1200x/c1/60/39/c16039e3926e564798ac5bd3eb04ebee.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m"],
    colors: ["Sky Blue", "Cloud", "Azure"],
    weight: "Lightweight",
    stockInMeters: 550,
    careInstructions:
      "Cold machine wash. Air dry recommended to prevent excessive wrinkling.",
    weaveType: "Chambray Weave",
  },
  {
    id: "8",
    sku: "LJ-FB-HL-008",
    name: "Charcoal Slub Home Linen",
    category: "Home Linen",
    pricePerMeter: 2800,
    description:
      "A textured, heavyweight fabric with natural slubbing. Ideal for upholstery, heavy cushions, and rustic home accents.",
    images: [
      "https://i.pinimg.com/736x/0e/2b/a6/0e2ba625e6b101d58c2f949ec8071d5a.jpg",
      "https://i.pinimg.com/736x/0e/2b/a6/0e2ba625e6b101d58c2f949ec8071d5a.jpg",
    ],
    availableLengths: ["5m", "10m", "15m"],
    colors: ["Charcoal", "Slate", "Steel"],
    weight: "Heavyweight",
    stockInMeters: 400,
    careInstructions:
      "Professional cleaning recommended for large upholstered pieces.",
    weaveType: "Plain Weave with Slubs",
  },
  {
    id: "9",
    sku: "LJ-FB-PL-009",
    name: "Ochre Gold Linen Voile",
    category: "Pure Linen",
    pricePerMeter: 1600,
    description:
      "Sheer, lightweight linen voile with a beautiful transparency. Often used for light curtains or layered apparel.",
    images: [
      "https://i.pinimg.com/1200x/73/b3/45/73b345f62e6390686817a4fd3a43146b.jpg",
      "https://i.pinimg.com/736x/2b/71/ad/2b71ad5ea063fd3d46ff212d22eb6d2f.jpg",
      "https://i.pinimg.com/1200x/36/01/d4/3601d4453b5f0415f50b9eb92a5851a3.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m", "10m"],
    colors: ["Ochre", "Saffron", "Honey"],
    weight: "Lightweight",
    stockInMeters: 320,
    careInstructions:
      "Gently hand wash. Handle with care due to its delicate weave.",
    weaveType: "Voile Weave",
  },
  {
    id: "10",
    sku: "LJ-FB-BL-010",
    name: "Rosewood Linen-Bamboo",
    category: "Linen Blends",
    pricePerMeter: 1950,
    description:
      "A sustainable mix of linen and bamboo viscose. Extremely soft with natural anti-bacterial properties and a silky drape.",
    images: [
      "https://i.pinimg.com/1200x/53/e6/b4/53e6b406f06c6cb4d5bd5a2af8c97814.jpg",
      "https://i.pinimg.com/1200x/f2/ce/52/f2ce52ff532053209f270a5ea714af51.jpg",
      "https://i.pinimg.com/736x/0c/03/fc/0c03fc96c297ecf5ff6b49eb1ae0c23c.jpg",
    ],
    availableLengths: ["1m", "3m", "5m"],
    colors: ["Rosewood", "Dusty Rose", "Petal"],
    weight: "Lightweight",
    stockInMeters: 150,
    careInstructions: "Wash cold with mild detergent. Lay flat to dry.",
    weaveType: "Plain Weave",
  },
  {
    id: "11",
    sku: "LJ-FB-PL-011",
    name: "Celadon Mint Pure Linen",
    category: "Pure Linen",
    pricePerMeter: 1550,
    description:
      "A refreshing, ethereal light green loomed from 100% organic flax. This lightweight weave offers a signature crispness that drapes with elegant ease.",
    images: [
      "https://i.pinimg.com/1200x/05/aa/f4/05aaf4c00dbf6c1886dcf5ac6c161c79.jpg",
      "https://i.pinimg.com/736x/85/49/50/85495030aeaa7e132bcdcbce55ed1c3f.jpg",
      "https://i.pinimg.com/1200x/b4/b0/5e/b4b05ea34404dc8dc7d8c7685c290766.jpg",
    ],
    availableLengths: ["1m", "2.5m", "5m", "10m"],
    colors: ["Celadon Mint", "Light Sage", "Seafoam"],
    weight: "Lightweight",
    stockInMeters: 220,
    careInstructions:
      "Cold wash on gentle cycle. Use eco-friendly detergent. Air dry in shade to preserve the delicate mint hue.",
    weaveType: "Plain Weave",
  },
  {
    id: "12",
    sku: "LJ-FB-HL-012",
    name: "Slate Lavender Home Linen",
    category: "Home Linen",
    pricePerMeter: 2950,
    description:
      "A sophisticated dark pastel lavender with a heavy, textured weave. This organic flax fabric provides a moody yet soft aesthetic, perfect for dramatic drapery or heirloom-quality upholstery.",
    images: [
      "https://beddie.com.au/cdn/shop/files/Screenshot_2025-01-03_at_1.42.08_pm.png?v=1735873951&width=1952",
      "https://i.pinimg.com/1200x/ae/7a/e4/ae7ae4c222a6a5c016133f5ba6f7bc36.jpg",
    ],
    availableLengths: ["5m", "10m", "15m"],
    colors: ["Slate Lavender", "Dusty Plum", "Shadow Rose"],
    weight: "Heavyweight",
    stockInMeters: 310,
    careInstructions:
      "Professional clean recommended for large panels. Machine wash cold for small items.",
    weaveType: "Heavy Plain Weave",
  },
];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-9921",
    customerName: "Aarav Sharma",
    date: "2026-05-15",
    total: 3499,
    status: "Tailoring",
    shippingAddress: "123 Green Valley, Bangalore, India",
    tailoringJobId: "TJ-101",
    items: [],
  },
  {
    id: "ORD-9940",
    customerName: "Kabir Singh",
    date: "2026-05-25",
    total: 9500,
    status: "Delivered",
    shippingAddress: "202 Jubilee Hills, Hyderabad, India",
    tailoringJobId: "TJ-105",
    items: [],
  },
];

export const SAMPLE_CUSTOMERS: User[] = [
  {
    id: "C-001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "customer",
    isVip: true,
  },
  {
    id: "C-002",
    name: "Isha Gupta",
    email: "isha@example.com",
    role: "customer",
  },
  {
    id: "C-003",
    name: "Vikram Malhotra",
    email: "vikram@example.com",
    role: "customer",
  },
  {
    id: "C-004",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    role: "customer",
    isVip: true,
  },
  {
    id: "C-005",
    name: "Kabir Singh",
    email: "kabir@example.com",
    role: "customer",
  },
  {
    id: "C-006",
    name: "Meera Kapoor",
    email: "meera@example.com",
    role: "customer",
    isVip: true,
  },
  {
    id: "C-007",
    name: "Arjun Das",
    email: "arjun@example.com",
    role: "customer",
  },
];
