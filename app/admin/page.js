"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, LogOut, Search, Calendar, User, Phone, MapPin, Menu, X, BarChart3, IndianRupee, Building2 } from 'lucide-react'
import AdminAuth from '@/components/AdminAuth'
import QuotationForm from '@/components/QuotationForm'
import QuotationView from '@/components/QuotationView'

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQuotationForm, setShowQuotationForm] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/check`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        setAuthenticated(true)
        fetchQuotations()
      } else {
        setAuthenticated(false)
      }
    } catch (error) {
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuotations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/quotations`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setQuotations(data)
      }
    } catch (error) {
      console.error('Error fetching quotations:', error)
    }
  }

  const handleLogin = () => {
    setAuthenticated(true)
    fetchQuotations()
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthenticated(false)
      setQuotations([])
      setMobileMenuOpen(false)
    }
  }

  const handleQuotationSave = (quotation) => {
    if (selectedQuotation) {
      // Update existing quotation
      setQuotations(prev => prev.map(q => q._id === quotation._id ? quotation : q))
    } else {
      // Add new quotation
      setQuotations(prev => [quotation, ...prev])
    }
    setShowQuotationForm(false)
    setSelectedQuotation(null)
  }

  const filteredQuotations = quotations.filter(quotation =>
    quotation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.customer.phone.includes(searchTerm)
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <AdminAuth onLogin={handleLogin} />
  }

  if (selectedQuotation) {
    return (
      <QuotationView
        quotation={selectedQuotation}
        onBack={() => setSelectedQuotation(null)}
        onUpdate={handleQuotationSave}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FileText className="text-white" size={20} />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Manage quotations</p>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowQuotationForm(true)}
                className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Plus size={18} />
                <span>New Quota</span>
                
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 sm:hidden"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Desktop logout */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden bg-white border-t border-gray-200 py-3 px-3 space-y-2"
            >
              <div className="text-sm font-medium text-gray-500 mb-2">Admin Menu</div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors p-2 text-sm font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-blue-600">{quotations.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Quotes</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-green-600">
                  {quotations.filter(q => q.totalAmount > 50000).length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Premium</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-purple-600">
                  {new Set(quotations.map(q => q.fromLocation)).size}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Cities</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="text-orange-600" size={20} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-orange-600">
                  ₹{(quotations.reduce((sum, q) => sum + q.totalAmount, 0) / 100000).toFixed(1)}L
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, phone, or quote number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Quotations List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden px-0 sm:px-2">
          {filteredQuotations.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <FileText className="mx-auto text-gray-300" size={48} />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No quotations found</h3>
              <p className="mt-2 text-gray-500 text-sm">
                {quotations.length === 0 ? 'Get started by creating your first quotation.' : 'No quotations match your search.'}
              </p>
              {quotations.length === 0 && (
                <button
                  onClick={() => setShowQuotationForm(true)}
                  className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Plus size={18} />
                  Create First Quotation
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredQuotations.map((quotation, index) => (
                <motion.div
                  key={quotation._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-gray-50 cursor-pointer active:bg-gray-100 transition-colors"
                  onClick={() => setSelectedQuotation(quotation)}
                >
                  <div className="flex items-start justify-between">
                    {/* Left side - Customer Info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <FileText className="text-blue-600" size={18} />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm truncate">
                            {quotation.customer.gender === 'Male' ? 'Mr.' : 'Ms.'} {quotation.customer.name}
                          </h3>
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium hidden xs:inline-block">
                            {quotation.quotationNumber}
                          </span>
                        </div>
                        
                        {/* Mobile optimized info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone size={12} />
                            <span className="truncate">{quotation.customer.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin size={12} />
                            <span className="truncate">
                              {quotation.fromLocation} → {quotation.toLocation}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar size={12} />
                            <span>{new Date(quotation.quotationDate).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Price */}
                    <div className="text-right ml-3 flex-shrink-0">
                      <div className="text-base font-bold text-blue-600 whitespace-nowrap">
                        ₹{(quotation.totalAmount / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                        {quotation.quotationNumber}
                      </div>
                      <div className="text-xs text-gray-500 sm:hidden">
                        {new Date(quotation.quotationDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Additional info for larger screens */}
                  <div className="hidden sm:flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {quotation.quotationNumber}
                    </span>
                    <span>•</span>
                    <span>Created: {new Date(quotation.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 z-30 sm:hidden">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuotationForm(true)}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Plus size={24} />
          </motion.button>
        </div>
      </main>

      {/* Quotation Form */}
      <QuotationForm
        isOpen={showQuotationForm}
        onClose={() => {
          setShowQuotationForm(false)
          setSelectedQuotation(null)
        }}
        quotation={selectedQuotation}
        onSave={handleQuotationSave}
        mode={selectedQuotation ? 'edit' : 'create'}
      />
    </div>
  )
}