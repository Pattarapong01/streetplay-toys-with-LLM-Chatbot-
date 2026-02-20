import { useState, createContext, useContext, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Instagram, Twitter, Facebook, Youtube, Heart, Star, ChevronRight, Plus, Minus, Trash2, Package, Clock, CreditCard, MapPin, LogOut } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
// Product Data
const products = [
  {
    id: 1,
    name: 'GRAFFITI ROBOT',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=600&fit=crop',
    category: 'Tech',
    tag: 'HOT DROP',
    rating: 4.9,
    reviews: 234,
    stock: 12,
    description: 'Remote-controlled graffiti robot with LED lights and spray can attachment. Kids can create awesome street art masterpieces!',
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=800&fit=crop'
  },
  {
    id: 2,
    name: 'STREET SKATER PRO',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=600&h=600&fit=crop',
    category: 'Action',
    tag: 'BEST SELLER',
    rating: 4.8,
    reviews: 567,
    stock: 8,
    description: 'Pro-level skateboard with custom street art graphics. Features durable wheels perfect for tricks!',
    images: [
      'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1548278914-d0cbdd7a9a11?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=1200&h=800&fit=crop'
  },
  {
    id: 3,
    name: 'NEON NINJA SET',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop',
    category: 'Action',
    tag: 'NEW',
    rating: 4.7,
    reviews: 189,
    stock: 25,
    description: 'Glow-in-the-dark ninja action figures with LED weapons. Perfect for nighttime adventures!',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200&h=800&fit=crop'
  },
  {
    id: 4,
    name: 'URBAN ART KIT',
    price: 59.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
    category: 'Arts',
    tag: 'SALE',
    rating: 4.9,
    reviews: 412,
    stock: 30,
    description: 'Complete street art supply kit with spray paints, stencils, and canvas. Unleash your creativity!',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=800&fit=crop'
  },
  {
    id: 5,
    name: 'SPRAY CAN SPEAKER',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    category: 'Tech',
    tag: 'LIMITED',
    rating: 4.6,
    reviews: 156,
    stock: 5,
    description: 'Bluetooth speaker disguised as a spray can. Epic sound with street style!',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&h=800&fit=crop'
  },
  {
    id: 6,
    name: 'STICKER BOMB PACK',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop',
    category: 'Arts',
    tag: 'VIRAL',
    rating: 4.8,
    reviews: 892,
    stock: 100,
    description: '500+ street art stickers featuring urban designs. Perfect for customizing anything!',
    images: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop'
  },
  {
    id: 7,
    name: 'GRAFFITI DINO',
    price: 69.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    category: 'Action',
    tag: 'HOT',
    rating: 4.9,
    reviews: 321,
    stock: 18,
    description: 'Dinosaur toy with removable graffiti skin. Mix and match designs!',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop'
  },
  {
    id: 8,
    name: 'SKATE PARK RAMP',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=600&h=600&fit=crop',
    category: 'Action',
    tag: 'PREMIUM',
    rating: 5.0,
    reviews: 78,
    stock: 3,
    description: 'Full-size indoor skate ramp with custom urban graphics. Hours of fun!',
    images: [
      'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=800&h=800&fit=crop',
    ],
    lifestyle: 'https://images.unsplash.com/photo-1520045864981-8c7874ed8e54?w=1200&h=800&fit=crop'
  }
];


const categories = ['All', 'Tech', 'Action', 'Arts'];

// Types
interface CartItem {
  product: typeof products[0];
  quantity: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
}

// Context
interface AppContextType {
  cart: CartItem[];
  addToCart: (product: typeof products[0]) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  user: User | null;
  setUser: (user: User | null) => void;
  selectedProduct: typeof products[0] | null;
  setSelectedProduct: (product: typeof products[0] | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Header Component
function Header() {
  const { setCartOpen, setSearchOpen, setAuthModalOpen, cart, user, setCurrentPage } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-street-black/95 backdrop-blur-sm shadow-hard-lime' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 bg-street-lime flex items-center justify-center transform -rotate-3">
              <span className="font-graffiti text-2xl text-street-black">SP</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-graffiti text-xl text-street-lime">STREETPLAY</h1>
              <p className="text-xs text-street-grey -mt-1">TOYS FOR THE WILD</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Shop', 'Drops', 'Collections', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className="text-white hover:text-street-lime transition-colors font-bold uppercase tracking-wider text-sm"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Search, Cart, Auth */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-street-lime transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:text-street-lime transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-street-pink text-white text-xs font-bold flex items-center justify-center rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="p-2 hover:text-street-lime transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="btn-street text-sm py-2 px-4 hidden sm:block"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:text-street-lime transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-up">
            <nav className="flex flex-col gap-4">
              {['Shop', 'Drops', 'Collections', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-street-lime transition-colors font-bold uppercase tracking-wider text-left"
                >
                  {item}
                </button>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="btn-street text-sm py-2 px-4 w-full"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  const { setCurrentPage, setSelectedProduct } = useApp();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-street-black via-transparent to-street-black z-10" />
        <div className="absolute inset-0 spray-effect" />

        {/* Animated Graffiti Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#CCFF00" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-street-lime/30 rotate-12 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border-2 border-street-pink/30 -rotate-12 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-street-lime/10 rotate-45" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-4 inline-block">
          <span className="bg-street-pink text-white px-4 py-1 font-bold text-sm uppercase tracking-widest">
            New Drop Available
          </span>
        </div>

        <h2 className="graffiti-text text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          PLAY
          <span className="block gradient-text">WITHOUT</span>
          LIMITS
        </h2>

        <p className="text-xl md:text-2xl text-street-grey mb-8 max-w-2xl mx-auto">
          Premium toys for kids who dare to be different. Street-inspired. Culturally loud. Unapologetically fun.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage('shop')}
            className="btn-street text-lg"
          >
            Shop Now
          </button>
          <button
            onClick={() => {
              const product = products[0];
              setSelectedProduct(product);
              setCurrentPage('product');
            }}
            className="btn-street-secondary text-lg"
          >
            View Featured
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16">
          {[
            { value: '50K+', label: 'Happy Kids' },
            { value: '200+', label: 'Products' },
            { value: '4.9', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-graffiti text-3xl md:text-4xl text-street-lime">{stat.value}</div>
              <div className="text-street-grey text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-8 h-8 text-street-lime rotate-90" />
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product }: { product: typeof products[0] }) {
  const { addToCart, setSelectedProduct, setCurrentPage } = useApp();

  return (
    <div className="card-street group cursor-pointer product-card-hover overflow-hidden" onClick={() => {
      setSelectedProduct(product);
      setCurrentPage('product');
    }}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-street-concrete">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover product-image transition-transform duration-500"
        />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span className="bg-street-lime text-street-black px-3 py-1 font-bold text-xs uppercase tracking-wider">
              {product.tag}
            </span>
          </div>
        )}

        {/* Sale Tag */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-street-pink text-white px-3 py-1 font-bold text-xs uppercase tracking-wider">
              SALE
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="add-to-cart-btn absolute bottom-4 left-4 right-4 btn-street text-center text-sm py-2"
        >
          Add to Cart
        </button>

        {/* Quick View */}
        <div className="absolute inset-0 bg-street-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 text-white font-bold uppercase tracking-wider text-sm">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-street-lime transition-colors glitch-hover">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-street-lime">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
        </div>

        <p className="text-street-grey text-sm mb-3">{product.category}</p>

        <div className="flex items-center gap-3">
          <span className="font-bold text-xl text-street-lime">${product.price}</span>
          {product.originalPrice && (
            <span className="text-street-grey line-through text-sm">${product.originalPrice}</span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-street-concrete">
            <div
              className="h-full bg-street-lime"
              style={{ width: `${(product.stock / 30) * 100}%` }}
            />
          </div>
          <span className="text-xs text-street-grey">{product.stock} left</span>
        </div>
      </div>
    </div>
  );
}

// Products Section
function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="graffiti-text text-4xl md:text-6xl text-white mb-4">
            THE <span className="text-stroke-lime">DROPS</span>
          </h2>
          <p className="text-street-grey text-lg max-w-2xl mx-auto">
            Fresh arrivals that drop harder than your morning alarm
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-street-lime text-street-black shadow-hard-lime'
                  : 'bg-street-concrete text-white hover:bg-street-lime hover:text-street-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="masonry-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Detail Page
function ProductDetail() {
  const { selectedProduct, addToCart, setCurrentPage } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-street-grey hover:text-street-lime transition-colors mb-8"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-street-carbon mb-4 overflow-hidden">
              <img
                src={selectedProduct.images[selectedImage] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 flex-shrink-0 border-2 transition-all ${
                    selectedImage === i ? 'border-street-lime' : 'border-street-concrete hover:border-street-grey'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Lifestyle Image */}
            <div className="mt-8">
              <h3 className="font-graffiti text-xl text-street-lime mb-4">THE VIBE</h3>
              <div className="aspect-video bg-street-carbon overflow-hidden">
                <img
                  src={selectedProduct.lifestyle}
                  alt="Lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {selectedProduct.tag && (
                <span className="bg-street-lime text-street-black px-3 py-1 font-bold text-sm uppercase">
                  {selectedProduct.tag}
                </span>
              )}
              <span className="text-street-grey uppercase tracking-wider">{selectedProduct.category}</span>
            </div>

            <h1 className="font-graffiti text-4xl md:text-5xl text-white mb-4">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-street-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-street-grey'}`} />
                ))}
                <span className="ml-2 font-bold">{selectedProduct.rating}</span>
              </div>
              <span className="text-street-grey">({selectedProduct.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-bold text-4xl text-street-lime">${selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-2xl text-street-grey line-through">${selectedProduct.originalPrice}</span>
                  <span className="bg-street-pink text-white px-3 py-1 font-bold text-sm">
                    SAVE ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(0)}
                  </span>
                </>
              )}
            </div>

            <p className="text-street-grey text-lg mb-8 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Stock Indicator */}
            <div className="bg-street-carbon p-4 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">Availability:</span>
                <span className="text-street-lime font-bold">{selectedProduct.stock > 10 ? 'In Stock' : `Only ${selectedProduct.stock} left!`}</span>
              </div>
              <div className="w-full h-2 bg-street-concrete">
                <div
                  className="h-full bg-street-lime transition-all"
                  style={{ width: `${(selectedProduct.stock / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border-2 border-street-concrete">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:text-street-lime transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 font-bold text-xl text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:text-street-lime transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(selectedProduct);
                  }
                }}
                className="btn-street flex-1 text-lg"
              >
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                'Free Shipping',
                'Secure Payment',
                'Easy Returns',
                'Gift Wrapping'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-street-grey">
                  <div className="w-2 h-2 bg-street-lime" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="font-graffiti text-3xl text-white mb-8">
            COMPLETE THE <span className="text-stroke-lime">LOOK</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.id !== selectedProduct.id).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Drawer
function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useApp();

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-street-black/70 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-street-concrete">
            <h2 className="font-graffiti text-2xl text-street-lime">YOUR BAG</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:text-street-lime transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-street">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-street-concrete mx-auto mb-4" />
                <p className="text-street-grey text-lg">Your bag is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="btn-street mt-6"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-street-black p-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{item.product.name}</h3>
                      <p className="text-street-lime font-bold">${item.product.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-street-concrete hover:bg-street-lime hover:text-street-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-street-concrete hover:bg-street-lime hover:text-street-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-street-pink hover:text-white transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-street-concrete bg-street-black">
              <div className="flex items-center justify-between mb-4">
                <span className="text-street-grey">Total</span>
                <span className="font-bold text-2xl text-street-lime">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-street w-full text-lg">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Search Modal
function SearchModal() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, setSelectedProduct, setCurrentPage } = useApp();

  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.slice(0, 6);

  if (!searchOpen) return null;

  return (
    <div className="modal-overlay flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-street-carbon border-2 border-street-lime shadow-neon-lime animate-bounce-in">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-6 h-6 text-street-lime" />
            <input
              type="text"
              placeholder="Find the heat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-xl font-bold placeholder:text-street-grey/50 focus:outline-none"
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)}>
              <X className="w-6 h-6 text-street-grey hover:text-white" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto scrollbar-street">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product');
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="flex items-center gap-3 p-3 bg-street-black hover:bg-street-concrete transition-colors text-left"
              >
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                <div>
                  <h4 className="font-bold text-white">{product.name}</h4>
                  <p className="text-street-lime font-bold">${product.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Auth Modal
function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    setUser({
      id: '1',
      email,
      name: name || email.split('@')[0]
    });
    setAuthModalOpen(false);
  };

  return (
    <div className="modal-overlay flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-street-carbon border-2 border-street-lime shadow-neon-lime animate-bounce-in relative">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-street-grey hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-street-lime mx-auto flex items-center justify-center transform -rotate-3 mb-4">
              <span className="font-graffiti text-3xl text-street-black">SP</span>
            </div>
            <h2 className="font-graffiti text-3xl text-white">
              {authMode === 'login' ? 'WELCOME BACK' : 'JOIN THE CREW'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-street w-full"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-street w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-street w-full"
              required
            />
            <button type="submit" className="btn-street w-full text-lg">
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-street-grey">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-street-lime ml-2 font-bold hover:underline"
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard
function Dashboard() {
  const { user, setUser, setCurrentPage, cart } = useApp();
  const [activeTab, setActiveTab] = useState('orders');

  const orders: Order[] = [
    {
      id: 'SP-001',
      date: '2024-01-15',
      total: 249.98,
      status: 'delivered',
      items: [{ product: products[0], quantity: 2 }]
    },
    {
      id: 'SP-002',
      date: '2024-01-20',
      total: 89.99,
      status: 'shipped',
      items: [{ product: products[1], quantity: 1 }]
    },
    {
      id: 'SP-003',
      date: '2024-01-25',
      total: 159.99,
      status: 'processing',
      items: [{ product: products[2], quantity: 1 }]
    }
  ];

  if (!user) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-24 h-24 text-street-concrete mx-auto mb-6" />
          <h2 className="font-graffiti text-3xl text-white mb-4">LOGIN REQUIRED</h2>
          <p className="text-street-grey mb-8">Login to access your dashboard</p>
          <button onClick={() => setCurrentPage('home')} className="btn-street">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-graffiti text-4xl text-white mb-2">
              WELCOME, <span className="text-stroke-lime">{user.name.toUpperCase()}</span>
            </h1>
            <p className="text-street-grey">{user.email}</p>
          </div>
          <button
            onClick={() => {
              setUser(null);
              setCurrentPage('home');
            }}
            className="flex items-center gap-2 text-street-pink hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-street-carbon border-2 border-street-concrete p-6">
              <div className="w-20 h-20 bg-street-lime mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-street-black" />
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'orders', icon: Package, label: 'My Orders' },
                  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                  { id: 'address', icon: MapPin, label: 'Addresses' },
                  { id: 'payment', icon: CreditCard, label: 'Payment' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 p-3 transition-all ${
                      activeTab === item.id
                        ? 'bg-street-lime text-street-black font-bold'
                        : 'text-street-grey hover:text-white hover:bg-street-concrete'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-graffiti text-2xl text-white mb-6">YOUR ORDERS</h2>
                {orders.map((order) => (
                  <div key={order.id} className="bg-street-carbon border-2 border-street-concrete p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-street-lime font-bold">#{order.id}</span>
                        <span className="text-street-grey ml-4">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 font-bold text-sm uppercase ${
                          order.status === 'delivered' ? 'bg-street-lime text-street-black' :
                          order.status === 'shipped' ? 'bg-blue-500 text-white' :
                          'bg-street-pink text-white'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-bold text-xl text-white">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {order.items.map((item, i) => (
                        <img
                          key={i}
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-graffiti text-2xl text-white mb-6">YOUR WISHLIST</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-street-carbon border-2 border-street-concrete p-6">
                <h2 className="font-graffiti text-2xl text-white mb-6">SAVED ADDRESSES</h2>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-street-concrete mx-auto mb-4" />
                  <p className="text-street-grey">No addresses saved yet</p>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-street-carbon border-2 border-street-concrete p-6">
                <h2 className="font-graffiti text-2xl text-white mb-6">PAYMENT METHODS</h2>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-street-concrete mx-auto mb-4" />
                  <p className="text-street-grey">No payment methods saved yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-street-carbon border-t-2 border-street-concrete">
      {/* Sticker Bomb Section */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-20">
          {Array(20).fill(0).map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 bg-street-lime rotate-${Math.floor(Math.random() * 4) * 45}`}
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-street-lime flex items-center justify-center transform -rotate-3">
                <span className="font-graffiti text-2xl text-street-black">SP</span>
              </div>
              <div>
                <h3 className="font-graffiti text-xl text-street-lime">STREETPLAY</h3>
              </div>
            </div>
            <p className="text-street-grey text-sm">
              Premium toys for kids who dare to be different. Street-inspired. Culturally loud.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-street-grey hover:text-street-lime transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-street-grey hover:text-street-lime transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-street-grey text-sm mb-4">Get the latest drops and exclusive offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="input-street flex-1"
              />
              <button className="btn-street ml-2">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-street-concrete">
          {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-12 h-12 bg-street-concrete flex items-center justify-center hover:bg-street-lime hover:text-street-black transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-street-grey text-sm">
            &copy; 2024 StreetPlay. All rights reserved. Made with love and street art.
          </p>
        </div>
      </div>
    </footer>
  );
}


// Main App
function App() {
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    user,
    setUser,
    selectedProduct,
    setSelectedProduct,
    currentPage,
    setCurrentPage,
  };

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen relative"> {/* เติม relative เพื่อให้ปุ่มเกาะขอบจอได้แม่นยำ */}
        <Header />

        {currentPage === 'home' && (
          <>
            <Hero />
            <ProductsSection />
          </>
        )}

        {currentPage === 'product' && <ProductDetail />}
        {currentPage === 'dashboard' && <Dashboard />}

        {/* --- วางตรงนี้เพื่อให้เห็นทุกหน้า หรือวางใน currentPage === 'home' เท่านั้นก็ได้ครับ --- */}
        <ChatWidget /> 
        
        <Footer />
        <CartDrawer />
        <SearchModal />
        <AuthModal />
      </div>
    </AppContext.Provider>
  );
}

export default App;


