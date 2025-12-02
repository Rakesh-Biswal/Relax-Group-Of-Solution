"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Search, Loader, CheckCircle, AlertCircle, CreditCard, ChevronDown } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { generateQuotationPDF } from '@/utils/pdfGenerator'
import { generateReceiptPDF } from '@/utils/pdfGenerator'

export default function DocumentDownloadPage() {
    const [documentId, setDocumentId] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("") // "fetching", "extracting", "creating", "downloading", "success", "error"
    const [error, setError] = useState("")
    const [documentType, setDocumentType] = useState("") // "quotation", "receipt"
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

    // Parse URL parameters on component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const receiptParam = urlParams.get('receipt')
        const quotationParam = urlParams.get('quotation')
        
        if (receiptParam) {
            setDocumentType("receipt")
            setDocumentId(receiptParam.toUpperCase())
        } else if (quotationParam) {
            setDocumentType("quotation")
            setDocumentId(quotationParam.toUpperCase())
        }
    }, [])

    const handleDownload = async (e) => {
        e.preventDefault()

        if (!documentId.trim()) {
            setError("Please enter a document ID")
            return
        }

        if (!documentType) {
            setError("Please select document type")
            return
        }

        setLoading(true)
        setError("")
        setStatus("fetching")

        try {
            let data;
            
            if (documentType === "quotation") {
                // Fetch quotation data
                const response = await fetch(`${API_URL}/api/quotations/number/${documentId.trim().toUpperCase()}`)
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "Quotation not found. Please check the ID.")
                }
                data = await response.json()
                setStatus("creating")
                await new Promise(resolve => setTimeout(resolve, 1200))
                await generateQuotationPDF(data)
            } else if (documentType === "receipt") {
                // Fetch receipt data
                const response = await fetch(`${API_URL}/api/money-receipts/number/${documentId.trim().toUpperCase()}`)
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "Receipt not found. Please check the ID.")
                }
                data = await response.json()
                setStatus("creating")
                await new Promise(resolve => setTimeout(resolve, 1200))
                await generateReceiptPDF(data)
            }

            setStatus("downloading")
            await new Promise(resolve => setTimeout(resolve, 500))

            setStatus("success")
            setTimeout(() => {
                setStatus("")
                setDocumentId("")
            }, 2000)

        } catch (err) {
            setError(err.message)
            setStatus("error")
        } finally {
            setLoading(false)
        }
    }

    const getStatusMessage = () => {
        switch (status) {
            case "fetching":
                return { message: "Fetching document details...", color: "text-blue-600" }
            case "extracting":
                return { message: "Extracting document data...", color: "text-blue-600" }
            case "creating":
                return { message: "Creating PDF document...", color: "text-purple-600" }
            case "downloading":
                return { message: "Downloading your document...", color: "text-green-600" }
            case "success":
                return { message: "Download completed successfully!", color: "text-green-600" }
            case "error":
                return { message: error, color: "text-red-600" }
            default:
                return { message: "", color: "" }
        }
    }

    const statusInfo = getStatusMessage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full mb-6">
                            <FileText size={20} />
                            <span className="font-semibold">Download Your Documents</span>
                        </div>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Enter your document ID below to download a detailed PDF copy of your quotation or payment receipt.
                            Perfect for records, approvals, or sharing.
                        </p>
                    </motion.div>
                </section>

                {/* Document Download Form */}
                <section className="max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                    >
                        <form onSubmit={handleDownload} className="space-y-6">
                            {/* Document Type Selector */}
                            <div>
                                <label htmlFor="documentType" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Document Type
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setDocumentType("quotation")}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${documentType === "quotation" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText size={24} className={documentType === "quotation" ? "text-blue-600" : "text-gray-400"} />
                                            <span className={`font-medium ${documentType === "quotation" ? "text-blue-700" : "text-gray-600"}`}>
                                                Quotation
                                            </span>
                                            <p className="text-xs text-gray-500 text-center">
                                                Starts with RQ (e.g., RQ0001)
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setDocumentType("receipt")}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${documentType === "receipt" ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <CreditCard size={24} className={documentType === "receipt" ? "text-green-600" : "text-gray-400"} />
                                            <span className={`font-medium ${documentType === "receipt" ? "text-green-700" : "text-gray-600"}`}>
                                                Receipt
                                            </span>
                                            <p className="text-xs text-gray-500 text-center">
                                                Starts with MR (e.g., MR0001)
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Input Field */}
                            <div>
                                <label htmlFor="documentId" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Document ID
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        id="documentId"
                                        type="text"
                                        value={documentId}
                                        onChange={(e) => setDocumentId(e.target.value.toUpperCase())}
                                        placeholder={
                                            documentType === "quotation" 
                                                ? "Enter quotation ID (e.g., RQ0001)"
                                                : documentType === "receipt"
                                                ? "Enter receipt ID (e.g., MR0001)"
                                                : "Select document type first"
                                        }
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-lg font-medium"
                                        disabled={loading || !documentType}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    {documentType === "quotation" 
                                        ? "Find your quotation ID in the email we sent you, or contact our support team."
                                        : documentType === "receipt"
                                        ? "Find your receipt ID in the payment confirmation message we sent you."
                                        : "Please select whether you want to download a quotation or receipt."
                                    }
                                </p>
                            </div>

                            {/* Status Display */}
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className={`p-4 rounded-2xl border-2 ${status === "error" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {status === "success" ? (
                                            <CheckCircle className="text-green-600" size={24} />
                                        ) : status === "error" ? (
                                            <AlertCircle className="text-red-600" size={24} />
                                        ) : (
                                            <Loader className="animate-spin text-blue-600" size={24} />
                                        )}
                                        <div>
                                            <p className={`font-semibold ${statusInfo.color}`}>
                                                {statusInfo.message}
                                            </p>
                                            {status === "fetching" && (
                                                <p className="text-sm text-blue-600 mt-1">Searching our database...</p>
                                            )}
                                            {status === "extracting" && (
                                                <p className="text-sm text-blue-600 mt-1">Organizing your document details...</p>
                                            )}
                                            {status === "creating" && (
                                                <p className="text-sm text-purple-600 mt-1">Generating professional PDF format...</p>
                                            )}
                                            {status === "downloading" && (
                                                <p className="text-sm text-green-600 mt-1">Almost ready! Preparing download...</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Download Button */}
                            <motion.button
                                type="submit"
                                disabled={loading || !documentId.trim() || !documentType}
                                className={`w-full bg-gradient-to-r text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:cursor-not-allowed ${!documentType ? 'from-gray-400 to-gray-500' : documentType === 'quotation' ? 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' : 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'}`}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin" size={24} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Download size={24} />
                                        {documentType === "quotation" ? "Download Quotation" : "Download Receipt"}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-4xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Quotations</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Download detailed quotations with pricing breakdown, services included, and terms & conditions.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Complete pricing breakdown</li>
                                <li>• Service details and timeline</li>
                                <li>• Terms and conditions</li>
                                <li>• 30-day validity period</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <CreditCard className="text-green-600" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Payment Receipts</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Download official payment receipts with transaction details, payment modes, and service dates.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>• Payment amount and mode</li>
                                <li>• Transaction reference number</li>
                                <li>• Service schedule dates</li>
                                <li>• Official company stamp</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Help Section */}
                <section className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
                        <p className="text-gray-600 mb-6">
                            If you're having trouble finding your document ID or downloading your files, 
                            our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+919777012315"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                📞 Call Support: +91 97770 12315
                            </a>
                            <a
                                href="mailto:bookrelaxpackers@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-xl hover:bg-cyan-700 transition-colors"
                            >
                                ✉️ Email Support
                            </a>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-10"></div>
            </div>
        </div>
    )
}