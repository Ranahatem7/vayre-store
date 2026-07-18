const products = [
  {
    name: "Oversized Cotton Tee",
    slug: "oversized-cotton-tee",
    description:
      "A relaxed-fit tee cut from heavyweight 240gsm cotton. Dropped shoulders, a boxy silhouette, and a ribbed crew neck that holds its shape wash after wash.",
    price: 450,
    category: "unisex",
    subcategory: "t-shirts",
    images: [],
    isFeatured: true,
    variants: [
      { size: "S", color: "Black", stock: 12 },
      { size: "M", color: "Black", stock: 8 },
      { size: "L", color: "Black", stock: 15 },
      { size: "S", color: "Off White", stock: 10 },
      { size: "M", color: "Off White", stock: 0 },
      { size: "L", color: "Off White", stock: 6 },
    ],
  },
  {
    name: "Essential Heavyweight Hoodie",
    slug: "essential-heavyweight-hoodie",
    description:
      "Brushed fleece interior, double-lined hood, and kangaroo pocket. Built heavy enough to hold structure without feeling stiff.",
    price: 1200,
    category: "unisex",
    subcategory: "hoodies",
    images: [],
    isFeatured: true,
    variants: [
      { size: "M", color: "Charcoal", stock: 9 },
      { size: "L", color: "Charcoal", stock: 11 },
      { size: "XL", color: "Charcoal", stock: 4 },
      { size: "M", color: "Sand", stock: 7 },
      { size: "L", color: "Sand", stock: 3 },
    ],
  },
  {
    name: "Linen Blend Shirt",
    slug: "linen-blend-shirt",
    description:
      "A breathable linen-cotton blend with a soft collar and mother-of-pearl buttons. Designed for Cairo summers.",
    price: 850,
    category: "men",
    subcategory: "shirts",
    images: [],
    isFeatured: false,
    variants: [
      { size: "S", color: "Sky", stock: 5 },
      { size: "M", color: "Sky", stock: 8 },
      { size: "L", color: "Sky", stock: 2 },
      { size: "M", color: "White", stock: 14 },
      { size: "L", color: "White", stock: 9 },
    ],
  },
  {
    name: "Wide Leg Trousers",
    slug: "wide-leg-trousers",
    description:
      "High-rise trousers with a fluid drape and pressed front seam. Falls straight from the hip for a clean line.",
    price: 980,
    category: "women",
    subcategory: "pants",
    images: [],
    isFeatured: true,
    variants: [
      { size: "XS", color: "Black", stock: 6 },
      { size: "S", color: "Black", stock: 10 },
      { size: "M", color: "Black", stock: 7 },
      { size: "S", color: "Olive", stock: 4 },
      { size: "M", color: "Olive", stock: 0 },
    ],
  },
  {
    name: "Cropped Denim Jacket",
    slug: "cropped-denim-jacket",
    description:
      "Rigid 12oz denim with a shortened body and classic point collar. Softens and fades with wear.",
    price: 1450,
    category: "women",
    subcategory: "jackets",
    images: [],
    isFeatured: false,
    variants: [
      { size: "S", color: "Mid Wash", stock: 5 },
      { size: "M", color: "Mid Wash", stock: 8 },
      { size: "L", color: "Mid Wash", stock: 3 },
    ],
  },
  {
    name: "Ribbed Knit Beanie",
    slug: "ribbed-knit-beanie",
    description:
      "Fine-gauge ribbed knit with a folded cuff and woven Vayre label. One size, generous fit.",
    price: 320,
    category: "unisex",
    subcategory: "accessories",
    images: [],
    isFeatured: false,
    variants: [
      { size: "M", color: "Black", stock: 20 },
      { size: "M", color: "Grey", stock: 16 },
      { size: "M", color: "Cream", stock: 11 },
    ],
  },
];

export default products;