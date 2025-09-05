'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Search, Heart, Star, Plus, Phone } from 'lucide-react'
import { d1Client } from '../lib/cloudflare-d1'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category_name: string
  farm_name: string
  is_available: boolean
}

interface Category {
  id: number
  name: string
  icon: string
  color: string
}

export default function DelisFoodMarket() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        d1Client.getProducts(),
        d1Client.getCategories()
      ])
      setProducts(productsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Erreur chargement données:', error)
      // Données de démo si D1 ne répond pas
      setProducts([
        {
          id: 1,
          name: 'Pommes Bio',
          description: 'Pommes biologiques françaises de première qualité',
          price: 3.50,
          image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
          category_name: 'Fruits',
          farm_name: 'Ferme du Soleil',
          is_available: true
        },
        {
          id: 2,
          name: 'Pain de Campagne',
          description: 'Pain artisanal au levain naturel',
          price: 4.20,
          image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
          category_name: 'Boulangerie',
          farm_name: 'Boulangerie Traditionnelle',
          is_available: true
        },
        {
          id: 3,
          name: 'Fromage de Chèvre',
          description: 'Fromage de chèvre fermier AOP',
          price: 8.90,
          image_url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
          category_name: 'Fromages',
          farm_name: 'Chèvrerie des Collines',
          is_available: true
        }
      ])
      setCategories([
        { id: 1, name: 'Fruits', icon: '🍎', color: '#ff6b6b' },
        { id: 2, name: 'Boulangerie', icon: '🥖', color: '#feca57' },
        { id: 3, name: 'Fromages', icon: '🧀', color: '#48dbfb' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_name === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch && product.is_available
  })

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const orderViaWhatsApp = () => {
    if (cart.length === 0) return
    
    let message = "🛒 *Commande DELIS FOOD MARKET*\n\n"
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.price}€\n`
    })
    
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    message += `\n💰 *Total: ${total.toFixed(2)}€*\n\n`
    message += "Merci de confirmer ma commande ! 😊"
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/33123456789?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Chargement des produits frais...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3">
                <span className="text-2xl font-bold text-white">🥬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  DELIS FOOD MARKET
                </h1>
                <p className="text-sm text-gray-600">Produits frais et de qualité</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={orderViaWhatsApp}
                className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-200 delis-glow"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">{cart.length}</span>
              </button>
              <button className="bg-white hover:bg-green-50 text-green-600 p-2 rounded-full border border-green-200 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher des produits frais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 pb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white delis-glow'
                : 'bg-white/80 text-gray-700 hover:bg-green-50'
            }`}
          >
            Tous les produits
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-green-600 text-white delis-glow'
                  : 'bg-white/80 text-gray-700 hover:bg-green-50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
                    }}
                  />
                  <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-lg transition-all duration-200">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.farm_name}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-yellow-700">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      {product.price.toFixed(2)}€
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-green-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2">
                <span className="text-xl font-bold text-white">🥬</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                DELIS FOOD MARKET
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Votre épicerie de proximité pour des produits frais et de qualité
            </p>
            <div className="flex justify-center space-x-6">
              <button 
                onClick={orderViaWhatsApp}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>Commande WhatsApp</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              © 2025 DELIS FOOD MARKET - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
