export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  ingredients: string[];
  image: string;
  gridImage: string;
  sliderImage: string;
  accentColor: string;
  badge: string;
  rating: number;
  reviewCount: number;
  category: ProductCategory;
};

export type ProductCategory = "blend" | "rub" | "seasoning";

export type GiftSet = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  productIds: string[];
  image: string;
  badge?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export const products: Product[] = [
  {
    id: "mediterranean-magic",
    slug: "mediterranean-magic",
    name: "Mediterranean Magic",
    price: 14,
    description:
      "A sun-drenched blend of oregano, basil, thyme, and rosemary with a hint of lemon zest. Perfect for grilled vegetables, pasta, and seafood.",
    longDescription:
      "Inspired by the vibrant flavors of the Greek isles and Italian countryside, Mediterranean Magic captures the essence of sun-drenched herb gardens. Each jar is carefully blended with premium oregano, sweet basil, aromatic thyme, and fragrant rosemary, finished with a bright hint of lemon zest. Use it to elevate grilled vegetables, toss with pasta, season seafood, or create the perfect marinade.",
    ingredients: [
      "Oregano",
      "Basil",
      "Thyme",
      "Rosemary",
      "Garlic",
      "Lemon Zest",
      "Sea Salt",
      "Black Pepper",
    ],
    image: "/images/products/mediterranean-slider.png",
    gridImage: "/images/products/mediterranean-grid.png",
    sliderImage: "/images/products/mediterranean-slider.png",
    accentColor: "#D4A84B",
    badge: "BLEND",
    rating: 4.9,
    reviewCount: 312,
    category: "blend",
  },
  {
    id: "smoky-bbq-rub",
    slug: "smoky-bbq-rub",
    name: "Smoky BBQ Rub",
    price: 12,
    description:
      "A bold Texas-style rub with smoked paprika, brown sugar, cumin, and cayenne. Ideal for ribs, brisket, and grilled meats.",
    longDescription:
      "Born from the legendary pitmasters of Texas, our Smoky BBQ Rub delivers deep, complex flavor that transforms any cut of meat. Featuring premium smoked paprika, dark brown sugar for caramelization, earthy cumin, and a kick of cayenne pepper. Rub generously on ribs, brisket, chicken, or pork shoulder before slow smoking or grilling for competition-worthy results.",
    ingredients: [
      "Smoked Paprika",
      "Brown Sugar",
      "Cumin",
      "Garlic Powder",
      "Onion Powder",
      "Cayenne Pepper",
      "Black Pepper",
      "Sea Salt",
    ],
    image: "/images/products/bbq-slider.png",
    gridImage: "/images/products/bbq-grid.png",
    sliderImage: "/images/products/bbq-slider.png",
    accentColor: "#8B4513",
    badge: "RUB",
    rating: 4.8,
    reviewCount: 256,
    category: "rub",
  },
  {
    id: "asian-fusion",
    slug: "asian-fusion",
    name: "Asian Fusion",
    price: 14,
    description:
      "A harmonious five-spice blend with star anise, Sichuan pepper, ginger, and sesame. Perfect for stir-fries, noodles, and dumplings.",
    longDescription:
      "Our Asian Fusion blend brings together the ancient wisdom of Chinese five-spice with modern culinary flair. Featuring fragrant star anise, numbing Sichuan pepper, warming ginger, toasted sesame, and aromatic cinnamon. This versatile blend is perfect for stir-fries, noodle dishes, dumpling fillings, marinades, and even adds an unexpected twist to desserts.",
    ingredients: [
      "Star Anise",
      "Sichuan Pepper",
      "Ginger",
      "Toasted Sesame",
      "Cinnamon",
      "Cloves",
      "Fennel Seeds",
      "Sea Salt",
    ],
    image: "/images/products/asian-slider.png",
    gridImage: "/images/products/asian-grid.png",
    sliderImage: "/images/products/asian-slider.png",
    accentColor: "#C41E3A",
    badge: "BLEND",
    rating: 4.9,
    reviewCount: 189,
    category: "blend",
  },
  {
    id: "tuscan-herb",
    slug: "tuscan-herb",
    name: "Tuscan Herb Blend",
    price: 14,
    description:
      "A classic Italian herb blend with sage, oregano, marjoram, and sun-dried tomato. The taste of the Italian countryside in every pinch.",
    longDescription:
      "Transport your kitchen to the rolling hills of Tuscany with our signature herb blend. A carefully balanced combination of earthy sage, robust oregano, delicate marjoram, and sweet sun-dried tomato flakes. Perfect for rustic bread dipping oils, roasted chicken, tomato sauces, focaccia, and any dish that calls for authentic Italian flavor.",
    ingredients: [
      "Sage",
      "Oregano",
      "Marjoram",
      "Sun-Dried Tomato",
      "Garlic",
      "Basil",
      "Red Pepper Flakes",
      "Sea Salt",
    ],
    image: "/images/products/tuscan-slider.png",
    gridImage: "/images/products/tuscan-grid.png",
    sliderImage: "/images/products/tuscan-slider.png",
    accentColor: "#6B8E23",
    badge: "BLEND",
    rating: 4.8,
    reviewCount: 278,
    category: "blend",
  },
  {
    id: "everything-bagel",
    slug: "everything-bagel",
    name: "Everything Bagel",
    price: 10,
    description:
      "The classic everything bagel seasoning with sesame, poppy, garlic, onion, and flaky sea salt. Sprinkle on anything and everything.",
    longDescription:
      "Our take on the beloved classic takes this everyday seasoning to artisan heights. A generous blend of toasted sesame seeds, crunchy poppy seeds, crispy garlic flakes, sweet onion, and premium flaky sea salt. Goes beyond bagels — sprinkle on avocado toast, cream cheese, roasted vegetables, eggs, popcorn, or use as a finishing seasoning on any savory dish.",
    ingredients: [
      "Sesame Seeds",
      "Poppy Seeds",
      "Garlic Flakes",
      "Onion Flakes",
      "Flaky Sea Salt",
      "Black Sesame Seeds",
    ],
    image: "/images/products/everything-bagel-slider.png",
    gridImage: "/images/products/everything-bagel-grid.png",
    sliderImage: "/images/products/everything-bagel-slider.png",
    accentColor: "#C4A35A",
    badge: "SEASONING",
    rating: 4.9,
    reviewCount: 421,
    category: "seasoning",
  },
  {
    id: "moroccan-blend",
    slug: "moroccan-blend",
    name: "Moroccan Ras el Hanout",
    price: 16,
    description:
      "An exotic North African blend of over a dozen spices including cinnamon, cardamom, coriander, and rose petals. Perfect for tagines and couscous.",
    longDescription:
      "Ras el Hanout, meaning 'head of the shop,' represents the finest spices a merchant has to offer. Our artisan version blends over a dozen premium spices including warm cinnamon, floral cardamom, bright coriander, fragrant rose petals, earthy turmeric, and nutmeg. Use in traditional tagines, couscous, roasted lamb, or stir into soups and stews for complex, warming flavor.",
    ingredients: [
      "Cinnamon",
      "Cardamom",
      "Coriander",
      "Rose Petals",
      "Turmeric",
      "Nutmeg",
      "Cumin",
      "Ginger",
      "Black Pepper",
      "Cloves",
      "Allspice",
      "Sea Salt",
    ],
    image: "https://images.pexels.com/photos/6808985/pexels-photo-6808985.jpeg?auto=compress&cs=tinysrgb&w=800",
    gridImage: "https://images.pexels.com/photos/6808985/pexels-photo-6808985.jpeg?auto=compress&cs=tinysrgb&w=600",
    sliderImage: "https://images.pexels.com/photos/6808985/pexels-photo-6808985.jpeg?auto=compress&cs=tinysrgb&w=800",
    accentColor: "#B8860B",
    badge: "BLEND",
    rating: 4.7,
    reviewCount: 143,
    category: "blend",
  },
];

export const giftSets: GiftSet[] = [
  {
    id: "starter-set",
    name: "The Starter Set",
    description:
      "Perfect introduction to artisan spices. Includes three of our most popular blends in beautiful gift packaging.",
    price: 34,
    originalPrice: 40,
    productIds: ["mediterranean-magic", "smoky-bbq-rub", "everything-bagel"],
    image: "https://images.pexels.com/photos/1516424/pexels-photo-1516424.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Best Seller",
  },
  {
    id: "explorer-set",
    name: "The Explorer Set",
    description:
      "For the adventurous cook. A curated selection of globally-inspired blends to take your palate on a journey.",
    price: 52,
    originalPrice: 62,
    productIds: ["mediterranean-magic", "asian-fusion", "tuscan-herb", "moroccan-blend"],
    image: "https://images.pexels.com/photos/2039570/pexels-photo-2039570.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Most Popular",
  },
  {
    id: "ultimate-collection",
    name: "The Ultimate Collection",
    description:
      "The complete Spice & Soul experience. All six artisan blends in a premium wooden gift crate.",
    price: 72,
    originalPrice: 86,
    productIds: [
      "mediterranean-magic",
      "smoky-bbq-rub",
      "asian-fusion",
      "tuscan-herb",
      "everything-bagel",
      "moroccan-blend",
    ],
    image: "https://images.pexels.com/photos/1516423/pexels-photo-1516423.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const subscribeFAQs: FAQ[] = [
  {
    question: "How does the subscription work?",
    answer:
      "Choose your favorite blends, select a delivery frequency that works for you, and we'll ship them right to your door. You'll save up to 15% on every order, and shipping is always free.",
  },
  {
    question: "Can I change my blends or frequency?",
    answer:
      "Absolutely! You can update your blend selection, change delivery frequency, or skip a shipment anytime from your account dashboard. Changes take effect on your next scheduled delivery.",
  },
  {
    question: "Is there a commitment or contract?",
    answer:
      "No commitment at all. You can pause or cancel your subscription anytime with no fees or penalties. We believe in earning your loyalty with great flavor, not fine print.",
  },
  {
    question: "What if I don't like a blend?",
    answer:
      "We stand behind every jar. If you're not completely satisfied, reach out to our team and we'll make it right with a replacement or full refund — no questions asked.",
  },
  {
    question: "Do subscriptions include free shipping?",
    answer:
      "Yes! All subscription orders ship free within the continental United States. International subscribers receive discounted shipping rates.",
  },
  {
    question: "Can I send a subscription as a gift?",
    answer:
      "Yes! Our subscriptions make wonderful gifts. During checkout, simply enter the recipient's shipping address and add a personalized gift message.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, count);
}
