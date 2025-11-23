"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Edit, FileText, User, Phone, Mail, MapPin, Calendar,
  Truck, Package, Calculator, Download, CreditCard, Trash2, ChevronDown, Share2
} from 'lucide-react'
import QuotationForm from './QuotationForm'
import { generateQuotationPDF, generateReceiptPDF } from '@/utils/pdfGenerator'
import MoneyReceiptForm from './MoneyReceiptForm'

export default function QuotationView({ quotation, onBack, onUpdate, onDelete }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [showMoneyReceiptForm, setShowMoneyReceiptForm] = useState(false)
  const [moneyReceipts, setMoneyReceipts] = useState([])
  const [selectedMoneyReceipt, setSelectedMoneyReceipt] = useState(null)

  // Dropdown states
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false)

  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  useEffect(() => {
    if (quotation?._id) {
      fetchMoneyReceipts()
    }
  }, [quotation])

  const fetchMoneyReceipts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/money-receipts/quotation/${quotation._id}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const receipts = await response.json()
        setMoneyReceipts(receipts)
      }
    } catch (error) {
      console.error('Error fetching money receipts:', error)
    }
  }

  const handleCreateMoneyReceipt = () => {
    setSelectedMoneyReceipt(null)
    setShowMoneyReceiptForm(true)
  }

  const handleEditMoneyReceipt = (receipt) => {
    setSelectedMoneyReceipt(receipt)
    setShowMoneyReceiptForm(true)
  }

  const handleMoneyReceiptSave = (savedReceipt) => {
    fetchMoneyReceipts()
  }

  const handleEditQuotation = () => {
    setShowEditForm(true)
  }

  const handleDownloadQuotation = async () => {
    setGeneratingPDF(true)
    try {
      await generateQuotationPDF(quotation)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setGeneratingPDF(false)
      setShowDownloadDropdown(false)
    }
  }

  const handleDownloadReceipt = async () => {
    if (moneyReceipts.length > 0) {
      setGeneratingPDF(true)
      try {
        await generateReceiptPDF(moneyReceipts[0])
      } catch (error) {
        console.error('Receipt PDF generation failed:', error)
        alert('Failed to generate receipt PDF. Please try again.')
      } finally {
        setGeneratingPDF(false)
        setShowDownloadDropdown(false)
      }
    }
  }

  const handleDeleteQuotation = async () => {
    if (window.confirm('Are you sure you want to delete this quotation? This action cannot be undone.')) {
      try {
        await onDelete(quotation._id)
      } catch (error) {
        console.error('Error deleting quotation:', error)
        alert('Failed to delete quotation')
      }
    }
    setShowDeleteDropdown(false)
  }

  const handleDeleteReceipt = async () => {
    if (moneyReceipts.length > 0) {
      if (window.confirm('Are you sure you want to delete the money receipt? This action cannot be undone.')) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/money-receipts/${moneyReceipts[0]._id}`, {
            method: 'DELETE',
            credentials: 'include'
          })
          if (response.ok) {
            fetchMoneyReceipts()
            alert('Money receipt deleted successfully')
          } else {
            alert('Failed to delete money receipt')
          }
        } catch (error) {
          console.error('Error deleting money receipt:', error)
          alert('Failed to delete money receipt')
        }
      }
    }
    setShowDeleteDropdown(false)
  }

  // WhatsApp Sharing Functions with Download Links
const shareQuotation = () => {
  const message = `Hello ${quotation.customer.name},

Thank you for your quotation request with Relax Packers & Movers! We've prepared your personalized quotation.

📄 Download your quotation here:
https://packers.relaxgroup.in/download-quotation?quotation=${quotation.quotationNumber}

Quotation Details:
• Reference: ${quotation.quotationNumber}
• Amount: ₹${quotation.totalAmount?.toLocaleString('en-IN')}
• Route: ${quotation.fromLocation} to ${quotation.toLocation}
• Valid Until: ${new Date(new Date(quotation.quotationDate).setDate(new Date(quotation.quotationDate).getDate() + 30)).toLocaleDateString('en-IN')}

For any queries, call us at +91 97770 12315

Best regards,
Relax Packers & Movers Team`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/91${quotation.customer.phone}?text=${encodedMessage}`, '_blank');
  setShowShareDropdown(false);
}

const shareReceipt = () => {
  if (moneyReceipts.length > 0) {
    const receipt = moneyReceipts[0];
    const message = `Hello ${quotation.customer.name},

Thank you for your payment! Here's your payment receipt details.

💰 Download your payment receipt here:
https://packers.relaxgroup.in/download-quotation?receipt=${receipt.receiptNumber}

Payment Receipt Summary:
• Receipt No: ${receipt.receiptNumber}
• Amount Paid: ₹${receipt.receivedAmount?.toLocaleString('en-IN')}
• Payment Type: ${receipt.receiptType}
• Payment Mode: ${receipt.paymentMode}
• Service Date: ${formatDate(receipt.serviceDate)}
• Quotation Reference: ${quotation.quotationNumber}

For any queries about your receipt, call us at +91 97770 12315

Best regards,
Relax Packers & Movers Team`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/91${quotation.customer.phone}?text=${encodedMessage}`, '_blank');
    setShowShareDropdown(false);
  }
}

  const calculateTotals = () => {
    const householdCharge = quotation.transportation.householdGoods?.charge || 0
    const vehicleCharge = quotation.transportation.vehicle?.charge || 0
    const transportTotal = quotation.transportation.type === 'household' ? householdCharge : vehicleCharge

    const servicesTotal =
      (quotation.services.packing || 0) +
      (quotation.services.unpacking || 0) +
      (quotation.services.loading || 0) +
      (quotation.services.unloading || 0) +
      (quotation.services.stabilization || 0) +
      (quotation.services.additionalCharge || 0) +
      (quotation.services.electricalService?.charge || 0)

    const subtotal = transportTotal + servicesTotal

    return {
      transportTotal,
      servicesTotal,
      subtotal,
      totalAmount: quotation.totalAmount
    }
  }

  const totals = calculateTotals()

  // Filter active services (excluding electrical service which is handled separately)
  const activeServices = Object.entries(quotation.services)
    .filter(([key, value]) => {
      if (key === 'electricalService') return false
      if (key === 'additionalCharge') return value > 0
      return value > 0
    })

  // Check if electrical service is active
  const hasElectricalService = quotation.services.electricalService &&
    (quotation.services.electricalService.disconnect || quotation.services.electricalService.reconnect) &&
    quotation.services.electricalService.charge > 0

  // Get transportation type display name
  const getTransportationTypeDisplay = () => {
    return quotation.transportation.type === 'household' ? 'Household Goods' : 'Vehicle'
  }

  // Get transportation details based on type
  const getTransportationDetails = () => {
    if (quotation.transportation.type === 'household') {
      return quotation.transportation.householdGoods
    } else {
      return quotation.transportation.vehicle
    }
  }

  const handleUpdate = (updatedQuotation) => {
    onUpdate(updatedQuotation)
    setShowEditForm(false)
  }

  const transportationDetails = getTransportationDetails()

  const hasReceipts = moneyReceipts.length > 0

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Share Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium text-sm"
              >
                <Share2 size={18} />
                Share
                <ChevronDown size={16} />
              </button>
              
              {showShareDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={shareQuotation}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
                  >
                    <FileText size={16} />
                    Share Quotation
                  </button>
                  {hasReceipts && (
                    <button
                      onClick={shareReceipt}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg flex items-center gap-2"
                    >
                      <CreditCard size={16} />
                      Share Receipt
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Create Receipt Button */}
            <button
              onClick={handleCreateMoneyReceipt}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors shadow-sm font-medium text-sm"
            >
              <CreditCard size={18} />
              + Receipt
            </button>
          </div>
        </div>

        {/* Quotation Dashboard View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quotation Amount</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₹{quotation.totalAmount?.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-blue-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
                    {quotation.customer.name}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="text-green-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Route</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {quotation.fromLocation} → {quotation.toLocation}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="text-purple-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valid Until</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {new Date(new Date(quotation.quotationDate).setDate(new Date(quotation.quotationDate).getDate() + 30)).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-orange-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Customer & Details */}
            <div className="xl:col-span-1 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <User className="text-blue-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
                  </div>
                  <button
                    onClick={handleEditQuotation}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {quotation.customer.gender === 'Male' ? 'Mr.' : 'Ms./Mrs.'} {quotation.customer.name}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                    <span className="text-sm">{quotation.customer.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <span className="text-sm">{quotation.customer.phone}</span>
                  </div>
                  {quotation.customer.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      <span className="text-sm">{quotation.customer.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rest of the left column remains same */}
              {/* Moving Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="text-green-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Moving Details</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">From</p>
                    <p className="font-semibold text-gray-900">{quotation.fromLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">To</p>
                    <p className="font-semibold text-gray-900">{quotation.toLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Transportation Type</p>
                    <p className="font-semibold text-gray-900">{getTransportationTypeDisplay()}</p>
                  </div>

                  {/* Household Goods Details */}
                  {quotation.transportation.type === 'household' && quotation.transportation.householdGoods?.volume && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Household Volume</p>
                      <p className="font-semibold text-gray-900">{quotation.transportation.householdGoods.volume}</p>
                    </div>
                  )}

                  {/* Vehicle Details */}
                  {quotation.transportation.type === 'vehicle' && quotation.transportation.vehicle?.vehicleType && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Vehicle Type</p>
                      <p className="font-semibold text-gray-900">{quotation.transportation.vehicle.vehicleType}</p>
                    </div>
                  )}

                  {/* Distance (common for both types) */}
                  {transportationDetails?.approxDistance && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Approx Distance</p>
                      <p className="font-semibold text-gray-900">{transportationDetails.approxDistance}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quotation Meta */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-purple-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Quotation Details</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium">{quotation.quotationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date Issued:</span>
                    <span className="font-medium">{formatDate(quotation.quotationDate)}</span>
                  </div>
                  {quotation.nextCallingDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Follow-up Date:</span>
                      <span className="font-medium">{formatDate(quotation.nextCallingDate)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Services */}
            <div className="xl:col-span-2 space-y-6">
              {/* Pricing Breakdown */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calculator className="text-purple-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Price Breakdown</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {/* Transportation Section */}
                    <div className="flex justify-between items-start py-3 border-b border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {getTransportationTypeDisplay()} Transportation
                        </p>

                        {/* Household Goods Details */}
                        {quotation.transportation.type === 'household' && (
                          <div className="text-sm text-gray-600 mt-1 space-y-1">
                            {quotation.transportation.householdGoods?.volume && (
                              <p>Volume: {quotation.transportation.householdGoods.volume}</p>
                            )}
                            {quotation.transportation.householdGoods?.approxDistance && (
                              <p>Distance: {quotation.transportation.householdGoods.approxDistance}</p>
                            )}
                          </div>
                        )}

                        {/* Vehicle Details */}
                        {quotation.transportation.type === 'vehicle' && (
                          <div className="text-sm text-gray-600 mt-1 space-y-1">
                            {quotation.transportation.vehicle?.vehicleType && (
                              <p>Vehicle Type: {quotation.transportation.vehicle.vehicleType}</p>
                            )}
                            {quotation.transportation.vehicle?.approxDistance && (
                              <p>Distance: {quotation.transportation.vehicle.approxDistance}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="font-bold text-blue-600 text-lg">
                        ₹{transportationDetails?.charge?.toLocaleString('en-IN') || '0'}
                      </p>
                    </div>

                    {/* Additional Services */}
                    {activeServices.length > 0 && (
                      <div className="py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 mb-3">Additional Services</p>
                        <div className="space-y-2 ml-4">
                          {activeServices.map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-gray-700 capitalize">
                                {key === 'additionalCharge' ? 'Additional Charge' : key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="font-semibold">₹{value.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Electrical Service */}
                    {hasElectricalService && (
                      <div className="py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 mb-3">Electrical Services</p>
                        <div className="space-y-2 ml-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-gray-700">
                                {quotation.services.electricalService.disconnect && quotation.services.electricalService.reconnect
                                  ? 'Electrical Disconnect & Reconnect'
                                  : quotation.services.electricalService.disconnect
                                    ? 'Electrical Disconnect'
                                    : 'Electrical Reconnect'
                                }
                              </span>
                            </div>
                            <span className="font-semibold">
                              ₹{quotation.services.electricalService.charge.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Services Total */}
                    {(activeServices.length > 0 || hasElectricalService) && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-semibold text-gray-700">Services Total</span>
                        <span className="font-bold text-blue-600">₹{totals.servicesTotal.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {/* Subtotal */}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Subtotal</span>
                      <span className="font-bold text-blue-600">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Taxes */}
                    <div className="space-y-2">
                      {quotation.taxes.fov.amount > 0 && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-700">CGST @{quotation.taxes.fov.percentage}%</span>
                          <span className="font-semibold text-red-600">₹{quotation.taxes.fov.amount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {quotation.taxes.surcharge.amount > 0 && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-700">SGST @{quotation.taxes.surcharge.percentage}%</span>
                          <span className="font-semibold text-red-600">₹{quotation.taxes.surcharge.amount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {quotation.taxes.gst.amount > 0 && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-700">IGST @{quotation.taxes.gst.percentage}%</span>
                          <span className="font-semibold text-red-600">₹{quotation.taxes.gst.amount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 text-lg">Grand Total</span>
                        <span className="font-bold text-blue-700 text-xl">
                          ₹{quotation.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {quotation.notes && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-orange-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-800">Special Instructions</h3>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{quotation.notes}</p>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Delete Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDeleteDropdown(!showDeleteDropdown)}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                      <ChevronDown size={14} />
                    </button>

                    {showDeleteDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <button
                          onClick={handleDeleteQuotation}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg flex items-center gap-2 text-red-600"
                        >
                          <FileText size={16} />
                          Delete Quotation
                        </button>
                        {hasReceipts && (
                          <button
                            onClick={handleDeleteReceipt}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg flex items-center gap-2 text-red-600"
                          >
                            <CreditCard size={16} />
                            Delete Receipt
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Download Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium text-sm"
                    >
                      <Download size={18} />
                      Download
                      <ChevronDown size={16} />
                    </button>

                    {showDownloadDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <button
                          onClick={handleDownloadQuotation}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Quotation
                        </button>
                        {hasReceipts && (
                          <button
                            onClick={handleDownloadReceipt}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg flex items-center gap-2"
                          >
                            <CreditCard size={16} />
                            Receipt
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {moneyReceipts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Money Receipts</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {moneyReceipts.length} receipt{moneyReceipts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {moneyReceipts.map((receipt) => (
                      <div key={receipt._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{receipt.receiptNumber}</p>
                          <p className="text-sm text-gray-600">
                            {receipt.receiptType} • ₹{receipt.receivedAmount?.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(receipt.receiptDate).toLocaleDateString('en-IN')} • {receipt.paymentMode}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEditMoneyReceipt(receipt)}
                          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Form */}
      <QuotationForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        quotation={quotation}
        onSave={handleUpdate}
        mode="edit"
      />

      <MoneyReceiptForm
        isOpen={showMoneyReceiptForm}
        onClose={() => setShowMoneyReceiptForm(false)}
        quotation={quotation}
        onSave={handleMoneyReceiptSave}
        moneyReceipt={selectedMoneyReceipt}
        mode={selectedMoneyReceipt ? 'edit' : 'create'}
      />

    </div>
  )
}