"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Search, Loader, CheckCircle, AlertCircle } from "lucide-react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function QuotationDownloadPage() {
    const [quotationId, setQuotationId] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("") // "fetching", "extracting", "creating", "downloading", "success", "error"
    const [error, setError] = useState("")
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const handleDownload = async (e) => {
        e.preventDefault()

        if (!quotationId.trim()) {
            setError("Please enter a quotation ID")
            return
        }

        setLoading(true)
        setError("")
        setStatus("fetching")

        try {
            // Step 1: Fetch quotation data by quotationNumber
            setStatus("fetching")

            const response = await fetch(`${API_URL}/api/quotations/number/${quotationId.trim().toUpperCase()}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Quotation not found. Please check the ID.")
            }

            const quotation = await response.json()

            // Step 2: Extract data
            setStatus("extracting")
            await new Promise(resolve => setTimeout(resolve, 800))

            // Step 3: Create PDF
            setStatus("creating")
            await new Promise(resolve => setTimeout(resolve, 1200))

            // Step 4: Download PDF
            setStatus("downloading")
            await new Promise(resolve => setTimeout(resolve, 600))

            // Generate and download PDF using your existing function
            await generateQuotationPDF(quotation)

            setStatus("success")
            setTimeout(() => {
                setStatus("")
                setQuotationId("")
            }, 2000)

        } catch (err) {
            setError(err.message)
            setStatus("error")
        } finally {
            setLoading(false)
        }
    }

    // Mock PDF generation function (you'll replace this with your actual PDF generator)
    const generateQuotationPDF = async (quotation) => {
        // This would be your actual PDF generation logic
        console.log("Generating PDF for:", quotation)

        // For demo purposes, create a simple PDF download
        const pdfBlob = new Blob([`Quotation: ${quotation.quotationNumber}`], { type: 'application/pdf' })
        const url = URL.createObjectURL(pdfBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `Quotation-${quotation.quotationNumber}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const getStatusMessage = () => {
        switch (status) {
            case "fetching":
                return { message: "Fetching quotation details...", color: "text-blue-600" }
            case "extracting":
                return { message: "Extracting quotation data...", color: "text-blue-600" }
            case "creating":
                return { message: "Creating PDF document...", color: "text-purple-600" }
            case "downloading":
                return { message: "Downloading your quotation...", color: "text-green-600" }
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

            <main className="container mx-auto px-4 py-8 mt-20">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full mb-6">
                            <FileText size={20} />
                            <span className="font-semibold">Download Your Quotation</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            Get Your Quotation
                            <span className="block">PDF Instantly</span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Enter your quotation ID below to download a detailed PDF copy of your quotation.
                            Perfect for records, approvals, or sharing with family.
                        </p>
                    </motion.div>
                </section>

                {/* Quotation Download Form */}
                <section className="max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                    >
                        <form onSubmit={handleDownload} className="space-y-6">
                            {/* Input Field */}
                            <div>
                                <label htmlFor="quotationId" className="block text-sm font-semibold text-gray-700 mb-3">
                                    Quotation ID
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        id="quotationId"
                                        type="text"
                                        value={quotationId}
                                        onChange={(e) => setQuotationId(e.target.value.toUpperCase())}
                                        placeholder="Enter your quotation ID (e.g., RQ0001)"
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-lg font-medium"
                                        disabled={loading}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Find your quotation ID in the email we sent you, or contact our support team.
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
                                                <p className="text-sm text-blue-600 mt-1">Organizing your quotation details...</p>
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
                                disabled={loading || !quotationId.trim()}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:cursor-not-allowed"
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
                                        Download Quotation
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Download Your Quotation?</h2>
                        <p className="text-gray-600 text-lg">
                            Get instant access to your detailed moving quotation in professional PDF format
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FileText,
                                title: "Complete Details",
                                description: "Full breakdown of services, charges, taxes, and terms in one document"
                            },
                            {
                                icon: Download,
                                title: "Instant Access",
                                description: "Download immediately after entering your quotation ID"
                            },
                            {
                                icon: CheckCircle,
                                title: "Professional Format",
                                description: "Ready-to-print PDF perfect for approvals and records"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="text-white" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Help Section */}
                <section className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help Finding Your Quotation ID?</h3>
                        <p className="text-gray-600 mb-6">
                            Check your email inbox for the quotation we sent you, or contact our support team for assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Support
                            </motion.button>
                            <motion.button
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Resend Quotation
                            </motion.button>
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