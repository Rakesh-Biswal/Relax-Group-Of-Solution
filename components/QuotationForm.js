"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, FileText, User, Phone, MapPin, Calendar, Truck, Package, Calculator } from 'lucide-react'

export default function QuotationForm({ isOpen, onClose, quotation, onSave, mode = 'create' }) {
    const [formData, setFormData] = useState({
        customer: {
            name: '',
            gender: 'Male',
            phone: '',
            email: '',
            address: ''
        },
        transportation: {
            type: 'household', // 'household' or 'vehicle'
            householdGoods: {
                volume: '',
                approxDistance: '',
                charge: ''
            },
            vehicle: {
                vehicleType: '',
                approxDistance: '',
                charge: ''
            }
        },
        services: {
            packing: '',
            unpacking: '',
            loading: '',
            unloading: '',
            stabilization: '',
            additionalCharge: '',
            electricalService: {
                disconnect: false,
                reconnect: false,
                charge: ''
            }
        },
        taxes: {
            fov: { percentage: '', amount: 0 },
            surcharge: { percentage: '', amount: 0 },
            gst: { percentage: '', amount: 0 }
        },
        fromLocation: '',
        toLocation: '',
        quotationDate: new Date().toISOString().split('T')[0],
        nextCallingDate: '',
        notes: ''
    })

    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    useEffect(() => {
        if (quotation && isOpen) {
            console.log('Loading quotation data:', quotation)
            const processedQuotation = {
                customer: {
                    name: quotation.customer?.name || '',
                    gender: quotation.customer?.gender || 'Male',
                    phone: quotation.customer?.phone || '',
                    email: quotation.customer?.email || '',
                    address: quotation.customer?.address || ''
                },
                transportation: {
                    type: quotation.transportation?.type || 'household',
                    householdGoods: {
                        volume: quotation.transportation?.householdGoods?.volume || '',
                        approxDistance: quotation.transportation?.householdGoods?.approxDistance || '',
                        charge: quotation.transportation?.householdGoods?.charge?.toString() || ''
                    },
                    vehicle: {
                        vehicleType: quotation.transportation?.vehicle?.vehicleType || '',
                        approxDistance: quotation.transportation?.vehicle?.approxDistance || '',
                        charge: quotation.transportation?.vehicle?.charge?.toString() || ''
                    }
                },
                services: {
                    packing: quotation.services?.packing?.toString() || '',
                    unpacking: quotation.services?.unpacking?.toString() || '',
                    loading: quotation.services?.loading?.toString() || '',
                    unloading: quotation.services?.unloading?.toString() || '',
                    stabilization: quotation.services?.stabilization?.toString() || '',
                    additionalCharge: quotation.services?.additionalCharge?.toString() || '',
                    electricalService: {
                        disconnect: quotation.services?.electricalService?.disconnect || false,
                        reconnect: quotation.services?.electricalService?.reconnect || false,
                        charge: quotation.services?.electricalService?.charge?.toString() || ''
                    }
                },
                taxes: {
                    fov: {
                        percentage: quotation.taxes?.fov?.percentage?.toString() || '',
                        amount: quotation.taxes?.fov?.amount || 0
                    },
                    surcharge: {
                        percentage: quotation.taxes?.surcharge?.percentage?.toString() || '',
                        amount: quotation.taxes?.surcharge?.amount || 0
                    },
                    gst: {
                        percentage: quotation.taxes?.gst?.percentage?.toString() || '',
                        amount: quotation.taxes?.gst?.amount || 0
                    }
                },
                fromLocation: quotation.fromLocation || '',
                toLocation: quotation.toLocation || '',
                quotationDate: quotation.quotationDate ? new Date(quotation.quotationDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                nextCallingDate: quotation.nextCallingDate ? new Date(quotation.nextCallingDate).toISOString().split('T')[0] : '',
                notes: quotation.notes || ''
            }
            setFormData(processedQuotation)
        } else if (isOpen) {
            // Reset form for new quotation
            setFormData({
                customer: {
                    name: '',
                    gender: 'Male',
                    phone: '',
                    email: '',
                    address: ''
                },
                transportation: {
                    type: 'household',
                    householdGoods: {
                        volume: '',
                        approxDistance: '',
                        charge: ''
                    },
                    vehicle: {
                        vehicleType: '',
                        approxDistance: '',
                        charge: ''
                    }
                },
                services: {
                    packing: '',
                    unpacking: '',
                    loading: '',
                    unloading: '',
                    stabilization: '',
                    additionalCharge: '',
                    electricalService: {
                        disconnect: false,
                        reconnect: false,
                        charge: ''
                    }
                },
                taxes: {
                    fov: { percentage: '', amount: 0 },
                    surcharge: { percentage: '', amount: 0 },
                    gst: { percentage: '', amount: 0 }
                },
                fromLocation: '',
                toLocation: '',
                quotationDate: new Date().toISOString().split('T')[0],
                nextCallingDate: '',
                notes: ''
            })
        }
    }, [quotation, isOpen])

    // Helper function to convert string to number (handles empty strings)
    const toNumber = (value) => {
        if (value === '' || value === null || value === undefined) return 0
        const num = parseFloat(value)
        return isNaN(num) ? 0 : num
    }

    // Safe trim function to handle undefined/null values
    const safeTrim = (value) => {
        return value ? value.toString().trim() : ''
    }

    const calculateTotals = () => {
        try {
            // Convert all string values to numbers for calculation
            const householdCharge = toNumber(formData.transportation.householdGoods.charge)
            const vehicleCharge = toNumber(formData.transportation.vehicle.charge)
            const transportTotal = formData.transportation.type === 'household' ? householdCharge : vehicleCharge
            
            const servicesTotal = 
                toNumber(formData.services.packing) +
                toNumber(formData.services.unpacking) +
                toNumber(formData.services.loading) +
                toNumber(formData.services.unloading) +
                toNumber(formData.services.stabilization) +
                toNumber(formData.services.additionalCharge) +
                toNumber(formData.services.electricalService.charge)
            
            const subtotal = transportTotal + servicesTotal

            // Calculate taxes using proper numeric conversion
            const fovPercentage = toNumber(formData.taxes.fov.percentage)
            const surchargePercentage = toNumber(formData.taxes.surcharge.percentage)
            const gstPercentage = toNumber(formData.taxes.gst.percentage)

            const fovAmount = Math.round(subtotal * (fovPercentage / 100))
            const surchargeAmount = Math.round(subtotal * (surchargePercentage / 100))
            const gstAmount = Math.round(subtotal * (gstPercentage / 100))

            const totalAmount = subtotal + fovAmount + surchargeAmount + gstAmount

            console.log('Calculation breakdown:', {
                transportTotal,
                servicesTotal,
                subtotal,
                fovAmount,
                surchargeAmount,
                gstAmount,
                totalAmount
            })

            return {
                transportTotal,
                servicesTotal,
                subtotal,
                fovAmount,
                surchargeAmount,
                gstAmount,
                totalAmount
            }
        } catch (error) {
            console.error('Calculation error:', error)
            return {
                transportTotal: 0,
                servicesTotal: 0,
                subtotal: 0,
                fovAmount: 0,
                surchargeAmount: 0,
                gstAmount: 0,
                totalAmount: 0
            }
        }
    }

    const totals = calculateTotals()

    // FIXED: Simplified input change handler
    const handleInputChange = (path, value) => {
        console.log('Input change:', { path, value })
        
        setFormData(prev => {
            const keys = path.split('.')
            const newData = { ...prev }
            
            let current = newData
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }
            current[keys[keys.length - 1]] = value
            
            return newData
        })
    }

    const handleNumericInputChange = (path, value) => {
        // Allow only numbers, decimal point, and empty string
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            handleInputChange(path, value)
        }
    }

    const handleCheckboxChange = (path, checked) => {
        handleInputChange(path, checked)
    }

    const handleTransportTypeChange = (type) => {
        handleInputChange('transportation.type', type)
    }

    const handleSave = async () => {
        if (isSubmitting) return
        
        setIsSubmitting(true)
        console.log('Saving quotation...', formData)
        
        try {
            // Validate required fields with safe trim
            if (!safeTrim(formData.customer.name)) {
                alert('Customer name is required')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.customer.phone)) {
                alert('Customer phone is required')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.customer.address)) {
                alert('Customer address is required')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.fromLocation)) {
                alert('From location is required')
                setIsSubmitting(false)
                return
            }
            if (!safeTrim(formData.toLocation)) {
                alert('To location is required')
                setIsSubmitting(false)
                return
            }

            // Validate transportation data based on type
            if (formData.transportation.type === 'household') {
                if (!formData.transportation.householdGoods.charge) {
                    alert('Please provide Household Goods charge amount')
                    setIsSubmitting(false)
                    return
                }
            } else {
                if (!formData.transportation.vehicle.vehicleType) {
                    alert('Please provide Vehicle Type')
                    setIsSubmitting(false)
                    return
                }
                if (!formData.transportation.vehicle.charge) {
                    alert('Please provide Vehicle charge amount')
                    setIsSubmitting(false)
                    return
                }
            }

            // Validate electrical service charge if any checkbox is checked
            if ((formData.services.electricalService.disconnect || formData.services.electricalService.reconnect) && 
                !formData.services.electricalService.charge) {
                alert('Please provide Electrical Service Charge amount')
                setIsSubmitting(false)
                return
            }

            // Prepare data for API - convert empty strings to 0 for numbers
            const dataToSave = {
                customer: {
                    name: safeTrim(formData.customer.name),
                    gender: formData.customer.gender,
                    phone: safeTrim(formData.customer.phone),
                    email: safeTrim(formData.customer.email),
                    address: safeTrim(formData.customer.address)
                },
                transportation: {
                    type: formData.transportation.type,
                    householdGoods: {
                        volume: safeTrim(formData.transportation.householdGoods.volume),
                        approxDistance: safeTrim(formData.transportation.householdGoods.approxDistance),
                        charge: toNumber(formData.transportation.householdGoods.charge)
                    },
                    vehicle: {
                        vehicleType: safeTrim(formData.transportation.vehicle.vehicleType),
                        approxDistance: safeTrim(formData.transportation.vehicle.approxDistance),
                        charge: toNumber(formData.transportation.vehicle.charge)
                    }
                },
                services: {
                    packing: toNumber(formData.services.packing),
                    unpacking: toNumber(formData.services.unpacking),
                    loading: toNumber(formData.services.loading),
                    unloading: toNumber(formData.services.unloading),
                    stabilization: toNumber(formData.services.stabilization),
                    additionalCharge: toNumber(formData.services.additionalCharge),
                    electricalService: {
                        disconnect: formData.services.electricalService.disconnect,
                        reconnect: formData.services.electricalService.reconnect,
                        charge: toNumber(formData.services.electricalService.charge)
                    }
                },
                taxes: {
                    fov: { 
                        percentage: toNumber(formData.taxes.fov.percentage), 
                        amount: totals.fovAmount 
                    },
                    surcharge: { 
                        percentage: toNumber(formData.taxes.surcharge.percentage), 
                        amount: totals.surchargeAmount 
                    },
                    gst: { 
                        percentage: toNumber(formData.taxes.gst.percentage), 
                        amount: totals.gstAmount 
                    }
                },
                fromLocation: safeTrim(formData.fromLocation),
                toLocation: safeTrim(formData.toLocation),
                quotationDate: formData.quotationDate,
                nextCallingDate: formData.nextCallingDate || undefined,
                notes: safeTrim(formData.notes),
                totalAmount: totals.totalAmount
            }

            console.log('Data to save:', JSON.stringify(dataToSave, null, 2))

            const url = mode === 'edit' ? `${API_URL}/api/quotations/${quotation._id}` : `${API_URL}/api/quotations`
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
                console.log('✅ Quotation saved successfully')
                onSave(responseData)
                onClose()
            } else {
                console.error('❌ Server error:', responseData)
                alert(`Error saving quotation: ${responseData.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('❌ Network error:', error)
            alert('Network error saving quotation: ' + error.message)
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
                    className={`bg-white rounded-2xl shadow-2xl flex flex-col ${isFullscreen ? 'w-full h-full max-h-full' : 'max-w-6xl w-full max-h-[95vh]'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-600" size={24} />
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {mode === 'edit' ? 'Edit Quotation' : 'Create New'}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {mode === 'edit' ? `Editing ${formData.quotationNumber}` : 'Create a new quotation'}
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
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Left Column - Customer & Basic Info */}
                            <div className="space-y-6">
                                {/* Customer Information */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <User size={20} className="text-blue-600" />
                                        Customer Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.customer.name}
                                                onChange={(e) => handleInputChange('customer.name', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                placeholder="Enter customer full name"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Gender *
                                                </label>
                                                <select
                                                    value={formData.customer.gender}
                                                    onChange={(e) => handleInputChange('customer.gender', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.customer.phone}
                                                    onChange={(e) => handleInputChange('customer.phone', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    placeholder="Enter phone number"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email (Optional)
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.customer.email}
                                                onChange={(e) => handleInputChange('customer.email', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                placeholder="Enter email address"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address *
                                            </label>
                                            <textarea
                                                value={formData.customer.address}
                                                onChange={(e) => handleInputChange('customer.address', e.target.value)}
                                                rows="3"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                placeholder="Enter complete address"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Dates */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <MapPin size={20} className="text-green-600" />
                                        Moving Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    From Location *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.fromLocation}
                                                    onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    placeholder="Enter starting location"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    To Location *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.toLocation}
                                                    onChange={(e) => handleInputChange('toLocation', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    placeholder="Enter destination location"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Quotation Date *
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.quotationDate}
                                                    onChange={(e) => handleInputChange('quotationDate', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Next Calling Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.nextCallingDate}
                                                    onChange={(e) => handleInputChange('nextCallingDate', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Pricing & Services */}
                            <div className="space-y-6">
                                {/* Transportation Charges */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <Truck size={20} className="text-purple-600" />
                                        Transportation Charges
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Transportation Type Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Transportation Type *
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleTransportTypeChange('household')}
                                                    className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                                                        formData.transportation.type === 'household' 
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <div className="font-semibold">Household Goods</div>
                                                    <div className="text-sm mt-1">Furniture, Belongings</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleTransportTypeChange('vehicle')}
                                                    className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                                                        formData.transportation.type === 'vehicle' 
                                                            ? 'border-green-500 bg-green-50 text-green-700' 
                                                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <div className="font-semibold">Vehicle</div>
                                                    <div className="text-sm mt-1">Car, Bike, etc.</div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Household Goods Transportation */}
                                        {formData.transportation.type === 'household' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Household Goods Details
                                                </label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Volume (e.g., 847.0 FL)"
                                                            value={formData.transportation.householdGoods.volume}
                                                            onChange={(e) => handleInputChange('transportation.householdGoods.volume', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Approx Distance"
                                                            value={formData.transportation.householdGoods.approxDistance}
                                                            onChange={(e) => handleInputChange('transportation.householdGoods.approxDistance', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Charge ₹"
                                                            value={formData.transportation.householdGoods.charge}
                                                            onChange={(e) => handleNumericInputChange('transportation.householdGoods.charge', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Vehicle Transportation */}
                                        {formData.transportation.type === 'vehicle' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Vehicle Details
                                                </label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <select
                                                            value={formData.transportation.vehicle.vehicleType}
                                                            onChange={(e) => handleInputChange('transportation.vehicle.vehicleType', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        >
                                                            <option value="">Select Vehicle</option>
                                                            <option value="Car">Car</option>
                                                            <option value="Bike">Bike</option>
                                                            <option value="Scooter">Scooter</option>
                                                            <option value="Truck">Truck</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Approx Distance"
                                                            value={formData.transportation.vehicle.approxDistance}
                                                            onChange={(e) => handleInputChange('transportation.vehicle.approxDistance', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Charge ₹"
                                                            value={formData.transportation.vehicle.charge}
                                                            onChange={(e) => handleNumericInputChange('transportation.vehicle.charge', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <Package size={20} className="text-orange-600" />
                                        Supportive Services
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            {['packing', 'unpacking', 'loading', 'unloading', 'stabilization'].map((key) => (
                                                <div key={key}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                                        {key}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="₹ 0"
                                                        value={formData.services[key]}
                                                        onChange={(e) => handleNumericInputChange(`services.${key}`, e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    />
                                                </div>
                                            ))}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Additional Charge
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="₹ 0"
                                                    value={formData.services.additionalCharge}
                                                    onChange={(e) => handleNumericInputChange('services.additionalCharge', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Electrical Service Section */}
                                        <div className="border-t pt-4 mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Electrical Service Charge
                                            </label>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.services.electricalService.disconnect}
                                                            onChange={(e) => handleCheckboxChange('services.electricalService.disconnect', e.target.checked)}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">Electrical Disconnect</span>
                                                    </label>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.services.electricalService.reconnect}
                                                            onChange={(e) => handleCheckboxChange('services.electricalService.reconnect', e.target.checked)}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">Electrical Reconnect</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Electrical Service Charge ₹"
                                                        value={formData.services.electricalService.charge}
                                                        onChange={(e) => handleNumericInputChange('services.electricalService.charge', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Taxes */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                                        <Calculator size={20} className="text-red-600" />
                                        Taxes & Charges
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CGST (%)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="0%"
                                                value={formData.taxes.fov.percentage}
                                                onChange={(e) => handleNumericInputChange('taxes.fov.percentage', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SGST (%)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="0%"
                                                value={formData.taxes.surcharge.percentage}
                                                onChange={(e) => handleNumericInputChange('taxes.surcharge.percentage', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                IGST (%)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="0%"
                                                value={formData.taxes.gst.percentage}
                                                onChange={(e) => handleNumericInputChange('taxes.gst.percentage', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-800 text-lg mb-4">Price Summary</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-600">Transportation:</span>
                                            <span className="font-semibold">₹{totals.transportTotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-600">Services:</span>
                                            <span className="font-semibold">₹{totals.servicesTotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-t border-gray-200">
                                            <span className="font-semibold">Subtotal:</span>
                                            <span className="font-semibold">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        
                                        {totals.fovAmount > 0 && (
                                            <div className="flex justify-between items-center py-1 text-red-600">
                                                <span>CGST ({toNumber(formData.taxes.fov.percentage)}%):</span>
                                                <span className="font-semibold">₹{totals.fovAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        {totals.surchargeAmount > 0 && (
                                            <div className="flex justify-between items-center py-1 text-red-600">
                                                <span>SGST ({toNumber(formData.taxes.surcharge.percentage)}%):</span>
                                                <span className="font-semibold">₹{totals.surchargeAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        {totals.gstAmount > 0 && (
                                            <div className="flex justify-between items-center py-1 text-red-600">
                                                <span>IGST ({toNumber(formData.taxes.gst.percentage)}%):</span>
                                                <span className="font-semibold">₹{totals.gstAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center py-3 border-t border-gray-300 mt-2">
                                            <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                                            <span className="text-xl font-bold text-blue-600">₹{totals.totalAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                placeholder="Any additional notes, terms, or special instructions..."
                            />
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
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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