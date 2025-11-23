"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, FileText, Calendar, CreditCard } from 'lucide-react'

export default function MoneyReceiptForm({ isOpen, onClose, quotation, onSave, mode = 'create', moneyReceipt }) {
    const [formData, setFormData] = useState({
        serviceDate: '',
        totalAmount: '',
        receiptType: 'Advance',
        receivedAmount: '',
        paymentMode: 'Cash',
        notes: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    useEffect(() => {
        if (moneyReceipt && isOpen) {
            console.log('Loading money receipt data:', moneyReceipt)
            const processedReceipt = {
                serviceDate: moneyReceipt.serviceDate ? new Date(moneyReceipt.serviceDate).toISOString().split('T')[0] : '',
                totalAmount: moneyReceipt.totalAmount?.toString() || '',
                receiptType: moneyReceipt.receiptType || 'Advance',
                receivedAmount: moneyReceipt.receivedAmount?.toString() || '',
                paymentMode: moneyReceipt.paymentMode || 'Cash',
                notes: moneyReceipt.notes || ''
            }
            setFormData(processedReceipt)
        } else if (quotation && isOpen) {
            // Set default values from quotation
            setFormData({
                serviceDate: '',
                totalAmount: quotation.totalAmount?.toString() || '',
                receiptType: 'Advance',
                receivedAmount: '',
                paymentMode: 'Cash',
                notes: ''
            })
        }
    }, [moneyReceipt, quotation, isOpen])

    // Helper function to convert string to number
    const toNumber = (value) => {
        if (value === '' || value === null || value === undefined) return 0
        const num = parseFloat(value)
        return isNaN(num) ? 0 : num
    }

    // Safe trim function
    const safeTrim = (value) => {
        return value ? value.toString().trim() : ''
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Auto-calculate received amount based on receipt type
        if (field === 'receiptType') {
            const totalAmount = toNumber(formData.totalAmount)
            let receivedAmount = 0
            
            if (value === 'Advance') {
                receivedAmount = Math.round(totalAmount * 0.2) // 20% advance
            } else if (value === 'Half Payment') {
                receivedAmount = Math.round(totalAmount * 0.5) // 50% half payment
            } else if (value === 'Full Payment') {
                receivedAmount = totalAmount // 100% full payment
            }
            
            setFormData(prev => ({
                ...prev,
                receiptType: value,
                receivedAmount: receivedAmount.toString()
            }))
        }
    }

    const handleNumericInputChange = (field, value) => {
        // Allow only numbers, decimal point, and empty string
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            handleInputChange(field, value)
        }
    }

    const handleSave = async () => {
        if (isSubmitting) return
        
        setIsSubmitting(true)
        console.log('Saving money receipt...', formData)
        
        try {
            // Validate required fields
            if (!safeTrim(formData.serviceDate)) {
                alert('Service date is required')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.totalAmount) || toNumber(formData.totalAmount) <= 0) {
                alert('Total amount is required and must be greater than 0')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.receivedAmount) || toNumber(formData.receivedAmount) <= 0) {
                alert('Received amount is required and must be greater than 0')
                setIsSubmitting(false)
                return
            }
            if (toNumber(formData.receivedAmount) > toNumber(formData.totalAmount)) {
                alert('Received amount cannot be greater than total amount')
                setIsSubmitting(false)
                return
            }

            // Prepare data for API
            const dataToSave = {
                quotation: quotation._id,
                serviceDate: formData.serviceDate,
                totalAmount: toNumber(formData.totalAmount),
                receiptType: formData.receiptType,
                receivedAmount: toNumber(formData.receivedAmount),
                paymentMode: formData.paymentMode,
                customer: {
                    name: quotation.customer.name,
                    gender: quotation.customer.gender,
                    phone: quotation.customer.phone,
                    email: quotation.customer.email || '',
                    address: quotation.customer.address
                },
                fromLocation: quotation.fromLocation,
                toLocation: quotation.toLocation,
                notes: safeTrim(formData.notes)
            }

            console.log('Data to save:', JSON.stringify(dataToSave, null, 2))

            const url = mode === 'edit' 
                ? `${API_URL}/api/money-receipts/${moneyReceipt._id}`
                : `${API_URL}/api/money-receipts`
            
            const method = mode === 'edit' ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
                credentials: 'include'
            })

            const responseData = await response.json()
            console.log('Server response:', responseData)

            if (response.ok) {
                console.log('✅ Money receipt saved successfully')
                onSave(responseData)
                onClose()
            } else {
                console.error('❌ Server error:', responseData)
                alert(`Error saving money receipt: ${responseData.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('❌ Network error:', error)
            alert('Network error saving money receipt: ' + error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isFullscreen ? 'py-2' : ''}`}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`bg-white rounded-2xl shadow-2xl flex flex-col ${isFullscreen ? 'w-full h-full max-h-full' : 'max-w-2xl w-full max-h-[90vh]'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <CreditCard className="text-green-600" size={24} />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {mode === 'edit' ? 'Edit Money Receipt' : 'Create Money Receipt'}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {mode === 'edit' ? `Editing ${moneyReceipt?.receiptNumber}` : `For ${quotation.quotationNumber}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                            >
                                {isFullscreen ? '⤵️' : '⤴️'}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="space-y-6">
                            {/* Customer & Quotation Info */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                    <FileText className="text-blue-600" size={20} />
                                    Reference Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Customer</p>
                                        <p className="font-semibold">{quotation.customer.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Quotation</p>
                                        <p className="font-semibold">{quotation.quotationNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">From</p>
                                        <p className="font-semibold">{quotation.fromLocation}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">To</p>
                                        <p className="font-semibold">{quotation.toLocation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                    <CreditCard className="text-green-600" size={20} />
                                    Payment Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Service Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.serviceDate}
                                            onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Amount *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="₹ 0"
                                            value={formData.totalAmount}
                                            onChange={(e) => handleNumericInputChange('totalAmount', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Receipt Type *
                                        </label>
                                        <select
                                            value={formData.receiptType}
                                            onChange={(e) => handleInputChange('receiptType', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        >
                                            <option value="Advance">Advance</option>
                                            <option value="Half Payment">Half Payment</option>
                                            <option value="Full Payment">Full Payment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Received Amount *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="₹ 0"
                                            value={formData.receivedAmount}
                                            onChange={(e) => handleNumericInputChange('receivedAmount', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.receiptType === 'Advance' && 'Typically 20% of total amount'}
                                            {formData.receiptType === 'Half Payment' && 'Typically 50% of total amount'}
                                            {formData.receiptType === 'Full Payment' && '100% of total amount'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Payment Mode *
                                        </label>
                                        <select
                                            value={formData.paymentMode}
                                            onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="PhonePe">PhonePe</option>
                                            <option value="Google Pay">Google Pay</option>
                                            <option value="Paytm">Paytm</option>
                                            <option value="Net Banking">Net Banking</option>
                                            <option value="UPI Transfer">UPI Transfer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            rows="3"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            placeholder="Any additional notes about this payment..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-white sticky bottom-0">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={20} />
                            {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update' : 'Create'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}