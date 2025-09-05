'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Settings, Package, FolderOpen, Users, BarChart3, Save, X } from 'lucide-react'
import { d1Client } from '../src/lib/cloudflare-d1'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category_id: number
  farm_id: number
  is_available: boolean
  category_name?: string
  farm_name?: string
}

interface Category {
  id: number
  name: string
  icon: string
  color: string
}

interface Farm {
  id: number
  name: string
  description: string
  location: string
  contact: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [modalType, setModalType] = useState<'product' | 'category' | 'farm'>('product')

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
      setFarms([
        { id: 1, name: 'Ferme du Soleil', description: 'Production bio locale', location: 'France', contact: 'contact@fermedusoleil.fr' },
        { id: 2, name: 'Boulangerie Traditionnelle', description: 'Pain artisanal', location: 'Paris', contact: 'info@boulangerie.fr' }
      ])
    } catch (error) {
      console.error('Erreur chargement:', error)
      // Données de démo pour l'admin
      setProducts([
        { id: 1, name: 'Pommes Bio', description: 'Pommes biologiques françaises', price: 3.50, image_url: '', category_id: 1, farm_id: 1, is_available: true, category_name: 'Fruits', farm_name: 'Ferme du Soleil' },
        { id: 2, name: 'Pain de Campagne', description: 'Pain artisanal au levain', price: 4.20, image_url: '', category_id: 2, farm_id: 2, is_available: true, category_name: 'Boulangerie', farm_name: 'Boulangerie Traditionnelle' }
      ])
      setCategories([
        { id: 1, name: 'Fruits', icon: '🍎', color: '#ff6b6b' },
        { id: 2, name: 'Boulangerie', icon: '🥖', color: '#feca57' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const openModal = (type: 'product' | 'category' | 'farm', item?: any) => {
    setModalType(type)
    setEditingItem(item || null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
  }

  const handleSave = async (formData: any) => {
    try {
      if (modalType === 'product') {
        if (editingItem) {
          // Modifier produit existant
          setProducts(products.map(p => p.id === editingItem.id ? { ...p, ...formData } : p))
        } else {
          // Nouveau produit
          const newProduct = { ...formData, id: Date.now() }
          setProducts([...products, newProduct])
        }
      } else if (modalType === 'category') {
        if (editingItem) {
          setCategories(categories.map(c => c.id === editingItem.id ? { ...c, ...formData } : c))
        } else {
          const newCategory = { ...formData, id: Date.now() }
          setCategories([...categories, newCategory])
        }
      }
      closeModal()
    } catch (error) {
      console.error('Erreur sauvegarde:', error)
    }
  }

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return
    
    try {
      if (type === 'product') {
        setProducts(products.filter(p => p.id !== id))
      } else if (type === 'category') {
        setCategories(categories.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Erreur suppression:', error)
    }
  }

  const tabs = [
    { id: 'products', name: 'Produits', icon: Package, count: products.length },
    { id: 'categories', name: 'Catégories', icon: FolderOpen, count: categories.length },
    { id: 'farms', name: 'Fermes', icon: Users, count: farms.length },
    { id: 'settings', name: 'Paramètres', icon: Settings, count: null },
    { id: 'stats', name: 'Statistiques', icon: BarChart3, count: null }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du panel admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 rounded-lg p-2">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin DELIS FOOD MARKET</h1>
                <p className="text-gray-600">Panneau d'administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                En ligne
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-80px)]">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </div>
                    {tab.count !== null && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des Produits</h2>
                <button
                  onClick={() => openModal('product')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouveau Produit</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Package className="w-5 h-5 text-green-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category_name || 'Non défini'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.price}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.is_available ? 'Disponible' : 'Indisponible'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal('product', product)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('product', product.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des Catégories</h2>
                <button
                  onClick={() => openModal('category')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle Catégorie</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">
                            {products.filter(p => p.category_id === category.id).length} produits
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal('category', category)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('category', category.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres de la Boutique</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la boutique
                    </label>
                    <input
                      type="text"
                      defaultValue="DELIS FOOD MARKET"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro WhatsApp
                    </label>
                    <input
                      type="text"
                      defaultValue="+33123456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Votre épicerie de proximité pour des produits frais et de qualité"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Modifier' : 'Nouveau'} {modalType === 'product' ? 'Produit' : 'Catégorie'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const data = Object.fromEntries(formData.entries())
              handleSave(data)
            }}>
              {modalType === 'product' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={editingItem?.name || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description || ''}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editingItem?.price || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Image</label>
                    <input
                      name="image_url"
                      type="url"
                      defaultValue={editingItem?.image_url || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {modalType === 'category' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={editingItem?.name || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icône (emoji)</label>
                    <input
                      name="icon"
                      type="text"
                      defaultValue={editingItem?.icon || '📦'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                    <input
                      name="color"
                      type="color"
                      defaultValue={editingItem?.color || '#22c55e'}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
