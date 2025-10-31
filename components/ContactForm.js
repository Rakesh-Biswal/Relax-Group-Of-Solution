"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, Phone, MapPin, User, Truck, X, Home, MessageCircle, Check, AlertCircle, Globe, Star, Shield, Clock } from "lucide-react"

// Popup Component
function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Choosing RelaxGroup!
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for choosing RealxGroup for your shifting/Packers movers service.
            Stay tuned, we will reply within 10 minutes with a professional quote
            tailored to your moving needs.
          </p>

          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Marketing Popup Component
function MarketingPopup({ isOdia, onGetQuote, onClose }) {
  return (
    <motion.div
      className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-blue-100 max-w-md w-full mx-4 overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header with Close Button */}

        {/* Content */}
        <div className="p-6">
          {/* Main Offer */}
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-3">
              {isOdia ? "🏠 ଘର ବଦଳାଇବା ଚାହୁଁଛନ୍ତି?" : "🏠 Planning to Move?"}
            </h4>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {isOdia 
                ? "ସହଜ ଏବଂ ସୁରକ୍ଷିତ ଘରବଦଳ ପାଇଁ ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ। ବସ୍ତୁ ସଂରକ୍ଷଣରୁ ଲକ୍ଷ୍ୟସ୍ଥଳରେ ପହଞ୍ଚିବା ପର୍ଯ୍ୟନ୍ତ ଆମେ ଆପଣଙ୍କ ସହିତ ଅଛୁ!"
                : "You can now book your moving quote online — quick, easy & secure!"}
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <motion.button
              onClick={onGetQuote}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                <span className="text-lg">
                  {isOdia ? "ବିନା ମୂଲ୍ୟରେ କୋଟ୍ ପାଆନ୍ତୁ" : "Book Online"}
                </span>
              </div>
            </motion.button>
            
            <p className="text-center text-xs text-gray-500">
              {isOdia ? "କେବଳ 2 ମିନିଟ୍ ସମୟ ନେବ | 30 ମିନିଟ୍ ମଧ୍ୟରେ ରେସ୍ପୋନ୍ସ" : "Takes 2 mins • Get response in 30 mins"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Chat Message Component
function ChatMessage({ message, isUser, timestamp, isError = false }) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isError 
          ? 'bg-red-100 text-red-800 border border-red-200'
          : isUser 
          ? 'bg-green-500 text-white rounded-br-md'
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          {isError && <AlertCircle size={16} />}
          <p className="text-sm">{message}</p>
        </div>
        <div className={`text-xs mt-1 ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
          {timestamp}
        </div>
      </div>
    </motion.div>
  )
}

// Option Button Component
function OptionButton({ option, selected, onClick, isOdia = false }) {
  const odiaLabels = {
    "One BHK": "ଏକ ବିଛନା ଘର",
    "Two BHK": "ଦୁଇ ବିଛନା ଘର",
    "Three BHK": "ତିନି ବିଛନା ଘର",
    "Villa": "ବଡ଼ ଘର",
    "Office": "ଅଫିସ୍",
    "Bike/Car": "ବାଇକ୍/ଗାଡ଼ି",
    "Others": "ଅନ୍ୟାନ୍ୟ"
  }

  const displayOption = isOdia ? odiaLabels[option] || option : option

  return (
    <motion.button
      type="button"
      onClick={() => onClick(option)}
      className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
        selected === option
          ? 'border-green-500 bg-green-50 text-green-700'
          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{displayOption}</span>
        {selected === option && <Check size={16} className="text-green-500" />}
      </div>
    </motion.button>
  )
}

// Language Toggle Component
function LanguageToggle({ isOdia, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe size={16} />
      <span>{isOdia ? "Odia" : "English"}</span>
      <div className={`w-6 h-4 rounded-full transition-all duration-300 ${isOdia ? 'bg-green-500' : 'bg-gray-300'}`}>
        <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 transform ${isOdia ? 'translate-x-3' : 'translate-x-0.5'}`}></div>
      </div>
    </motion.button>
  )
}

export default function ChatForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showMarketing, setShowMarketing] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [chatMessages, setChatMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOdia, setIsOdia] = useState(false)
  const chatContainerRef = useRef(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
    houseType: "",
    additionalDetails: ""
  })

  const houseTypes = ["One BHK", "Two BHK", "Three BHK", "Villa", "Office", "Bike/Car", "Others"]

  const englishSteps = [
    {
      question: "👋 Hello! Welcome to Relax Packers & Movers. What's your name?",
      field: "name",
      type: "text",
      validation: (value) => value.trim().length >= 2,
      errorMessage: (value, userName) => `😅 Oops! "${value}" doesn't look like a valid name. Please share your real name so we can assist you better!`
    },
    {
      question: (userName) => `📞 Nice to meet you, ${userName}! What's your phone number?`,
      field: "phone",
      type: "tel",
      validation: (value) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, '')),
      errorMessage: (value, userName) => `📱 Oh dear ${userName}, "${value}" doesn't seem to be a valid Indian phone number. Please enter a 10-digit number starting with 6-9!`
    },
    {
      question: (userName) => `📍 Perfect ${userName}! Where are you moving from?`,
      field: "fromLocation",
      type: "text",
      validation: (value) => value.trim().length >= 3,
      errorMessage: (value, userName) => `🗺️ Hey ${userName}, we need a proper location to plan your move. "${value}" is too short. Could you please provide the complete address?`
    },
    {
      question: (userName) => `🎯 Great ${userName}! Where would you like to move to?`,
      field: "toLocation",
      type: "text",
      validation: (value) => value.trim().length >= 3,
      errorMessage: (value, userName) => `🏁 ${userName}, we need the destination address to calculate your quote. "${value}" seems incomplete. Mind sharing the full address?`
    },
    {
      question: (userName) => `🏠 Almost done ${userName}! What type of property are you moving?`,
      field: "houseType",
      type: "options",
      options: houseTypes,
      validation: (value) => houseTypes.includes(value),
      errorMessage: (value, userName) => `🏡 ${userName}, please select one of the options above for your property type.`
    },
    {
      question: (userName) => `📝 One last thing ${userName}! Would you like to share any additional details about your move? (Optional)`,
      field: "additionalDetails",
      type: "text",
      optional: true,
      validation: () => true
    }
  ]

  const odiaSteps = [
    {
      question: "👋 ନମସ୍କାର! Relax Packers & Movers କୁ ସ୍ଵାଗତ 🙏 । ଆପଣଙ୍କ ନାମ କ'ଣ?",
      field: "name",
      type: "text",
      validation: (value) => value.trim().length >= 2,
      errorMessage: (value, userName) => `😅 ହଇରାଣ! "${value}" ଏକ ସଠିକ୍ ନାମ ପରି ଲାଗୁନାହିଁ । ଦୟାକରି ଆପଣଙ୍କ ପ୍ରକୃତ ନାମ ଦିଅନ୍ତୁ ଯେଉଁଥିରେ ଆମେ ଆପଣଙ୍କୁ ସହାୟତା କରିପାରିବା!`
    },
    {
      question: (userName) => `📞 ଆପଣଙ୍କୁ ଦେଖି ଖୁସି ହେଲା, ${userName}! ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର କ'ଣ?`,
      field: "phone",
      type: "tel",
      validation: (value) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, '')),
      errorMessage: (value, userName) => `📱 ଓହୋ ${userName}, "${value}" ଏକ ସଠିକ୍ ଭାରତୀୟ ଫୋନ୍ ନମ୍ବର ନୁହେଁ । ଦୟାକରି 6-9 ରୁ ଆରମ୍ଭ ହେଉଥିବା 10 ଅଙ୍କର ନମ୍ବର ଦିଅନ୍ତୁ!`
    },
    {
      question: (userName) => `📍 ବହୁତ ଭଲ ${userName}! ଆପଣ କେଉଁ ଜାଗାରୁ ଘରବଦଳ କରିବାକୁ ଚାହୁଁଛନ୍ତି?`,
      field: "fromLocation",
      type: "text",
      validation: (value) => value.trim().length >= 3,
      errorMessage: (value, userName) => `🗺️ ହେ ${userName}, ଆପଣଙ୍କ ଘରବଦଳ ପାଇଁ ଯୋଜନା କରିବା ପାଇଁ ଆମକୁ ଏକ ସଠିକ୍ ଜାଗା ଦରକାର । "${value}" ବହୁତ ଛୋଟ ଅଟେ । ଦୟାକରି ସମ୍ପୂର୍ଣ୍ଣ ଠିକଣା ଦିଅନ୍ତୁ?`
    },
    {
      question: (userName) => `🎯 ଅତି ଉତ୍ତମ ${userName}! ଆପଣ କେଉଁ ଜାଗାକୁ ଯିବାକୁ ଚାହୁଁଛନ୍ତି?`,
      field: "toLocation",
      type: "text",
      validation: (value) => value.trim().length >= 3,
      errorMessage: (value, userName) => `🏁 ${userName}, ଆପଣଙ୍କ କୋଟ୍ ଗଣନା କରିବା ପାଇଁ ଆମକୁ ଗନ୍ତବ୍ୟ ସ୍ଥାନ ଦରକାର । "${value}" ଅସମ୍ପୂର୍ଣ୍ଣ ଲାଗୁଛି । ସମ୍ପୂର୍ଣ୍ଣ ଠିକଣା ଦେବେ କି?`
    },
    {
      question: (userName) => `🏠 ଲଗଭଗ ଶେଷ ହୋଇଗଲା ${userName}! ଆପଣଙ୍କର କେଉଁ ପ୍ରକାର ଘର ଅଛି?`,
      field: "houseType",
      type: "options",
      options: houseTypes,
      validation: (value) => houseTypes.includes(value),
      errorMessage: (value, userName) => `🏡 ${userName}, ଦୟାକରି ଉପରେ ଥିବା ବିକଳ୍ପଗୁଡିକ ମଧ୍ୟରୁ ଗୋଟିଏ ବାଛନ୍ତୁ ।`
    },
    {
      question: (userName) => `📝 ଶେଷ ପ୍ରଶ୍ନ ${userName}! ଆପଣ ଆପଣଙ୍କ ଘରବଦଳ ବିଷୟରେ ଅଧିକ ତଥ୍ୟ ଦେବେ କି? (ଇଚ୍ଛାଧୀନ)`,
      field: "additionalDetails",
      type: "text",
      optional: true,
      validation: () => true
    }
  ]

  const steps = isOdia ? odiaSteps : englishSteps

  useEffect(() => {
    // Initialize chat with welcome message only if marketing is closed
    if (!showMarketing && chatMessages.length === 0) {
      const welcomeMessage = isOdia ? 
        "👋 ନମସ୍କାର! Relax Packers & Movers କୁ ସ୍ଵାଗତ 🙏 । ଆପଣଙ୍କ ନାମ କ'ଣ?" : 
        "👋 Hello! Welcome to Relax Packers & Movers. What's your name?"
      
      addBotMessage(welcomeMessage)
    }
  }, [isOdia, showMarketing])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const addBotMessage = (message, isError = false) => {
    const newMessage = {
      id: Date.now(),
      message,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isError
    }
    setChatMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages(prev => [...prev, newMessage])
  }

  const getUserFirstName = () => {
    return formData.name.split(' ')[0] || "there"
  }

  const handleGetQuote = () => {
    setShowMarketing(false)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() && !steps[currentStep].optional) return

    const currentField = steps[currentStep].field
    const validation = steps[currentStep].validation(inputValue)
    const userName = getUserFirstName()

    if (!validation && !steps[currentStep].optional) {
      // Show error message and ask again
      addUserMessage(inputValue)
      const errorMessage = steps[currentStep].errorMessage 
        ? steps[currentStep].errorMessage(inputValue, userName)
        : isOdia 
          ? "❌ ଦୟାକରି ସଠିକ୍ ତଥ୍ୟ ଦିଅନ୍ତୁ"
          : "❌ Please enter valid data"
      
      addBotMessage(errorMessage, true)
      setInputValue("")
      return
    }

    // Add user message and update form data
    addUserMessage(inputValue)
    setFormData(prev => ({
      ...prev,
      [currentField]: inputValue
    }))

    setInputValue("")
    
    // Move to next step or submit
    if (currentStep < steps.length - 1) {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        const nextQuestion = typeof steps[currentStep + 1].question === 'function' 
          ? steps[currentStep + 1].question(userName)
          : steps[currentStep + 1].question
        addBotMessage(nextQuestion)
        setIsTyping(false)
      }, 1000)
    } else {
      // All steps completed, submit form
      handleFormSubmit()
    }
  }

  const handleOptionSelect = (option) => {
    const currentField = steps[currentStep].field
    const userName = getUserFirstName()
    
    // Add user message
    const displayOption = isOdia ? 
      {
        "One BHK": "ଏକ ବିଛନା ଘର",
        "Two BHK": "ଦୁଇ ବିଛନା ଘର", 
        "Three BHK": "ତିନି ବିଛନା ଘର",
        "Villa": "ବଡ଼ ଘର",
        "Office": "ଅଫିସ୍",
        "Bike/Car": "ବାଇକ୍/ଗାଡ଼ି",
        "Others": "ଅନ୍ୟାନ୍ୟ"
      }[option] || option : option
    
    addUserMessage(displayOption)
    setFormData(prev => ({
      ...prev,
      [currentField]: option
    }))

    // Move to next step or submit
    if (currentStep < steps.length - 1) {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        const nextQuestion = typeof steps[currentStep + 1].question === 'function' 
          ? steps[currentStep + 1].question(userName)
          : steps[currentStep + 1].question
        addBotMessage(nextQuestion)
        setIsTyping(false)
      }, 1000)
    } else {
      handleFormSubmit()
    }
  }

  const handleFormSubmit = async () => {
    setLoading(true)
    setIsTyping(true)
    
    // Add final bot message
    const finalMessage = isOdia ? 
      "📨 ଧନ୍ୟବାଦ! ଆମେ ଆପଣଙ୍କ ଅନୁରୋଧ process କରୁଛୁ..." : 
      "📨 Thank you! We're processing your request..."
    
    addBotMessage(finalMessage)

    try {
      // Prepare Brevo email payload
      const emailPayload = {
        sender: {
          name: "Relax Packers Website",
          email: "biswalpramod3.1415@gmail.com"
        },
        to: [
          {
            email: "bookrelaxpackers@gmail.com",
            name: "Relax Packers Team"
          }
        ],
        subject: `New Moving Inquiry from ${formData.name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .detail { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
              .route { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #ff7e5f; display: flex; align-items: center; }
              .route-icon { font-size: 24px; margin-right: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚚 New Moving Inquiry</h1>
                <p>You have received a new moving request from your website</p>
              </div>
              <div class="content">
                <div class="detail">
                  <strong>👤 Customer Name:</strong> ${formData.name}
                </div>
                <div class="detail">
                  <strong>📞 Phone Number:</strong> ${formData.phone}
                </div>
                <div class="detail">
                  <strong>🏠 Property Type:</strong> ${formData.houseType}
                </div>
                <div class="route">
                  <span class="route-icon">📍</span>
                  <div>
                    <strong>Moving From:</strong> ${formData.fromLocation}<br>
                    <strong>Moving To:</strong> ${formData.toLocation}
                  </div>
                </div>
                ${formData.additionalDetails ? `
                <div class="detail">
                  <strong>📝 Additional Details:</strong> ${formData.additionalDetails}
                </div>
                ` : ''}
                <div class="footer">
                  <p>This inquiry was submitted through relaxpackers.com</p>
                  <p>📍 Relax Packers & Movers - Your Trusted Moving Partner</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      }

      // Send email using Brevo API
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
        },
        body: JSON.stringify(emailPayload),
      })

      if (response.ok) {
        setStatus("success")
        const successMessage = isOdia ? 
          "✅ ଅତି ଭଲ! ଆପଣଙ୍କର ଅନୁରୋଧ ସଫଳତାର ସହିତ ଜମା ହୋଇଛି। ଆମେ 30 ମିନିଟ୍ ମଧ୍ୟରେ ଆପଣଙ୍କୁ ଆପଣଙ୍କର କୋଟ୍ ସହିତ ଯୋଗାଯୋଗ କରିବା!" : 
          "✅ Great! Your request has been submitted successfully. We'll contact you within 30 minutes with your personalized quote."
        
        addBotMessage(successMessage)
        setTimeout(() => setShowPopup(true), 1500)
      } else {
        setStatus("error")
        const errorMessage = isOdia ? 
          "❌ ଦୁଃଖିତ, ଆପଣଙ୍କ ଅନୁରୋଧ ଜମା କରିବାରେ ତ୍ରୁଟି ଘଟିଛି। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ କିମ୍ବା ଆମକୁ ସିଧାସଳଖ ଡାକନ୍ତୁ!" : 
          "❌ Sorry, there was an error submitting your request. Please try again or call us directly."
        
        addBotMessage(errorMessage)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus("error")
      const errorMessage = isOdia ? 
        "❌ ଦୁଃଖିତ, ଆପଣଙ୍କ ଅନୁରୋଧ ଜମା କରିବାରେ ତ୍ରୁଟି ଘଟିଛି। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ!" : 
        "❌ Sorry, there was an error submitting your request. Please try again."
      
      addBotMessage(errorMessage)
    } finally {
      setLoading(false)
      setIsTyping(false)
    }
  }

  const getCurrentInputType = () => {
    return steps[currentStep].type === 'tel' ? 'tel' : 'text'
  }

  const getCurrentPlaceholder = () => {
    const step = steps[currentStep]
    if (step.type === 'tel') return isOdia ? "ଆପଣଙ୍କର 10 ଅଙ୍କର ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ" : "Enter your 10-digit phone number"
    if (step.field === 'name') return isOdia ? "ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ" : "Enter your full name"
    if (step.field === 'fromLocation') return isOdia ? "ବର୍ତ୍ତମାନର ଠିକଣା ଦିଅନ୍ତୁ" : "Enter current location"
    if (step.field === 'toLocation') return isOdia ? "ଗନ୍ତବ୍ୟ ସ୍ଥାନ ଦିଅନ୍ତୁ" : "Enter destination location"
    if (step.field === 'additionalDetails') return isOdia ? "କିଛି ବିଶେଷ ଆବଶ୍ୟକତା? (ଇଚ୍ଛାଧୀନ)" : "Any special requirements? (Optional)"
    return isOdia ? "ଆପଣଙ୍କର ଉତ୍ତର ଟାଇପ୍ କରନ୍ତୁ..." : "Type your response..."
  }

  const handleLanguageToggle = () => {
    setIsOdia(!isOdia)
    // Reset conversation when language changes
    setCurrentStep(0)
    setChatMessages([])
    setInputValue("")
    setFormData({
      name: "",
      phone: "",
      fromLocation: "",
      toLocation: "",
      houseType: "",
      additionalDetails: ""
    })
  }

  return (
    <section className="relative overflow-hidden container section mt-10 md:mt-28 lg:mt-36">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
          <MessageCircle size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Get Instant Quote</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {isOdia ? "ବିନା ମୂଲ୍ୟରେ କୋଟ୍ ପାଆନ୍ତୁ" : "Book Online"}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {isOdia ? "ଆମର ସ୍ମାର୍ଟ ଚାଟ୍ ସିଷ୍ଟମ୍ ମାଧ୍ୟମରେ ତୁରନ୍ତ ଏବଂ ସଠିକ୍ ମୂଲ୍ୟ ଜାଣିପାରିବେ" : "Get instant & accurate pricing through our smart chat system"}
        </p>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        className="max-w-2xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Elements */}
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-3xl -z-10 blur-xl"></div>

        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative ${
          showMarketing ? 'filter blur-sm' : ''
        } transition-all duration-300`}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Book a Quote</h3>
                <p className="text-green-100 text-sm">
                  {isOdia ? "Online" : "Online"}
                </p>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="absolute top-4 right-4">
              <LanguageToggle isOdia={isOdia} onToggle={handleLanguageToggle} />
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-6 bg-gray-50/50"
          >
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.message}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                  isError={msg.isError}
                />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            {steps[currentStep].type === 'options' ? (
              <div className="grid grid-cols-2 gap-2">
                {steps[currentStep].options.map((option) => (
                  <OptionButton
                    key={option}
                    option={option}
                    selected={formData.houseType}
                    onClick={handleOptionSelect}
                    isOdia={isOdia}
                  />
                ))}
              </div>
            ) : (
              <form onSubmit={handleInputSubmit} className="flex gap-2">
                <input
                  type={getCurrentInputType()}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getCurrentPlaceholder()}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  disabled={loading || showMarketing}
                />
                <motion.button
                  type="submit"
                  disabled={loading || (!inputValue.trim() && !steps[currentStep].optional) || showMarketing}
                  className="bg-green-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* Marketing Popup */}
        <AnimatePresence>
          {showMarketing && (
            <MarketingPopup 
              isOdia={isOdia} 
              onGetQuote={handleGetQuote}
              onClose={() => setShowMarketing(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Success Popup */}
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}