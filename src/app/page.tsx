"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Droplet, Leaf, Recycle, Phone, Mail, MapPin, CheckCircle2, 
  ChevronRight, Menu, X, Scale, CreditCard, ShieldCheck, ChevronDown, 
  Globe, Building2, Clock, Map, FlaskConical, FileText, Shield, BarChart3, Star
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Chatbot from "@/components/Chatbot";

// Reusable Accordion Component
const AccordionItem = ({ title, defaultOpen = false }: { title: string, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-lg text-gray-900 flex items-center gap-3">
          {title.includes('Policy') || title.includes('Terms') ? <FileText className="text-emerald-700" size={20} /> : null}
          {title}
        </span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600">
              <p>Please contact us directly for detailed information regarding this section. We ensure complete transparency for all our partners.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [transactionType, setTransactionType] = useState<"sell" | "buy">("sell");
  const [formData, setFormData] = useState({
    name: "", company: "", phone: "", state: "", city: "", quantity: "", details: ""
  });

  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Initialize language from Google Translate cookie if present
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match) {
      // eslint-disable-next-line
      setLanguage(match[1].toUpperCase());
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    const val = selectedLang === 'EN' ? '/en/en' : `/en/${selectedLang.toLowerCase()}`;
    document.cookie = `googtrans=${val}; path=/`;
    document.cookie = `googtrans=${val}; domain=.${window.location.hostname}; path=/`;
    window.location.reload();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello JanaOilGreen! I am placing an order to ${transactionType === 'sell' ? 'Sell' : 'Buy'} Used Oil.
*Name:* ${formData.name}
*Company:* ${formData.company}
*Phone:* ${formData.phone}
*Location:* ${formData.city}, ${formData.state}
*Quantity:* ${formData.quantity}
*Details:* ${formData.details}`;

    const whatsappNumber = "918981429492"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f0f4f0]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-black/20 backdrop-blur-sm py-5'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isScrolled ? 'bg-emerald-700' : 'bg-emerald-500'}`}>
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              JanaOil<span className={isScrolled ? 'text-emerald-700' : 'text-emerald-400'}>Green</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <a href="#" className={`font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}>Home</a>
            <a href="#pricing" className={`font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}>Products + Prices</a>
            <a href="#about" className={`font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}>About Us</a>
            <a href="#faq" className={`font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`}>FAQ</a>
            
            {/* Language Selector */}
            <div className={`flex items-center gap-1 border rounded-full px-3 py-1.5 ${isScrolled ? 'border-gray-300 text-gray-700' : 'border-white/40 text-white'}`}>
              <Globe size={16} />
              <select 
                value={language} 
                onChange={handleLanguageChange}
                className="bg-transparent focus:outline-none text-sm font-medium appearance-none cursor-pointer pr-4 relative"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${isScrolled ? '%23374151' : '%23FFFFFF'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', backgroundSize: '1em 1em' }}
              >
                <option value="EN" className="text-gray-900">English</option>
                <option value="HI" className="text-gray-900">हिंदी (Hindi)</option>
                <option value="BN" className="text-gray-900">বাংলা (Bengali)</option>
                <option value="TA" className="text-gray-900">தமிழ் (Tamil)</option>
                <option value="TE" className="text-gray-900">తెలుగు (Telugu)</option>
                <option value="MR" className="text-gray-900">मराठी (Marathi)</option>
                <option value="GU" className="text-gray-900">ગુજરાતી (Gujarati)</option>
                <option value="KN" className="text-gray-900">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            <a href="#trade" className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg ${isScrolled ? 'bg-[#efb632] text-gray-900' : 'bg-[#efb632] text-gray-900'}`}>
              Trade Oil
            </a>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 space-y-2">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-semibold py-3 flex items-center gap-3 border-b border-gray-100"><ChevronRight size={18} className="text-[#efb632]" /> Home</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-semibold py-3 flex items-center gap-3 border-b border-gray-100"><ChevronRight size={18} className="text-[#efb632]" /> Products + Prices</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-semibold py-3 flex items-center gap-3 border-b border-gray-100"><ChevronRight size={18} className="text-[#efb632]" /> About Us</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-semibold py-3 flex items-center gap-3 border-b border-gray-100"><ChevronRight size={18} className="text-[#efb632]" /> Contact Us</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-semibold py-3 flex items-center gap-3 border-b border-gray-100"><ChevronRight size={18} className="text-[#efb632]" /> FAQ</a>
                
                <div className="pt-6">
                  <a href="#trade" onClick={() => setMobileMenuOpen(false)} className="w-full flex justify-center items-center px-6 py-4 rounded-xl font-bold text-lg bg-[#efb632] hover:bg-[#dca324] text-gray-900 shadow-md transition-colors">
                    Trade Oil
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] py-32 pt-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/oil-collection.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 container mx-auto px-6 md:px-12 text-left mt-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md">
              <span className="text-emerald-300 font-semibold text-sm tracking-wider uppercase">Sustainable Energy Solutions</span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              India&apos;s No.1 trusted marketplace <br />
              <span className="text-emerald-400">to buy and sell used cooking oil.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
              Simplify your used cooking oil trade in India. We help sellers move oil through an organised channel and help buyers enquire about traceable supply.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a href="#trade" className="px-8 py-4 bg-[#efb632] hover:bg-[#dca324] text-gray-900 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(239,182,50,0.4)]">
                Start Trading <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Transaction Form Section (Moved to be First) */}
      <section id="trade" className="py-24 bg-[#f0f4f0]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-emerald-700 font-bold tracking-wider uppercase mb-2">Trade With Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Buy or Sell Used Oil</h3>
            <p className="text-gray-600 text-lg">Get the best market prices instantly. Fill out the form below and connect with us directly on WhatsApp.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-gray-100">
            <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-8">
              <button 
                onClick={() => setTransactionType("sell")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-lg transition-all ${
                  transactionType === "sell" ? "bg-[#efb632] text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Scale size={20} /> Sell Used Oil
              </button>
              <button 
                onClick={() => setTransactionType("buy")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-lg transition-all ${
                  transactionType === "buy" ? "bg-[#efb632] text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Droplet size={20} /> Buy Used Oil
              </button>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">Your name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">Company or organisation</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">Phone number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">State / Union Territory</label>
                  <select required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none appearance-none">
                    <option value="" disabled>Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">City or district</label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-900 font-medium">Approximate quantity (in liters)</label>
                  <input type="text" placeholder="e.g. 200 liters" required value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-900 font-medium">Additional details (optional)</label>
                <textarea rows={4} placeholder="Oil type, quality expectations, schedule or other requirements" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="w-full bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#efb632]/50 focus:border-[#efb632] outline-none resize-none" />
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button type="submit" className="w-full bg-[#efb632] hover:bg-[#dca324] text-gray-900 text-xl font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                  Place Order <ArrowRight />
                </button>
                <a href="https://wa.me/918981429492?text=Hi%20JanaOilGreen,%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="w-full bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-200 text-lg font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Phone size={20} /> Contact us on WhatsApp
                </a>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By continuing, you agree to be contacted about this enquiry and accept our <a href="#policies" className="underline hover:text-gray-800">Terms</a> and <a href="#policies" className="underline hover:text-gray-800">Privacy</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-[#efb632] font-bold tracking-wider uppercase mb-4">About JanaOilGreen</h2>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Connecting used oil with its next responsible use.
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                JanaOilGreen is being built to simplify used cooking oil trade in India. The aim is to help sellers move oil through an organised channel and help buyers enquire about traceable supply without audience labels or complicated onboarding.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Every enquiry begins with practical details—location, volume, quality and schedule—so both sides can make an informed decision.
              </p>

              {/* Leadership Profiles */}
              <div className="space-y-4">
                {/* Founder Profile */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                  <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image 
                      src="/founder.jpg" 
                      alt="Subhajit Jana - Founder" 
                      width={200} 
                      height={200} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Subhajit+Jana&background=047857&color=fff&size=200';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Subhajit Jana</h4>
                    <p className="text-emerald-700 font-semibold mb-3">Founder & Business Owner</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      &quot;My mission is to create a seamless, transparent, and highly rewarding ecosystem for used cooking oil recycling across India.&quot;
                    </p>
                  </div>
                </div>

                {/* Managing Director Profile */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                  <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image 
                      src="/managing-director.jpg" 
                      alt="Managing Director" 
                      width={200} 
                      height={200} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Biswajit+Jana&background=047857&color=fff&size=200';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Biswajit Jana</h4>
                    <p className="text-emerald-700 font-semibold mb-3">Managing Director</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      &quot;Driving operational excellence to ensure our partners always receive reliable, compliant, and timely service.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <Recycle className="text-emerald-700 mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Circular</h4>
                <p className="text-gray-500">Waste-to-resource approach</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <Building2 className="text-emerald-700 mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">B2B</h4>
                <p className="text-gray-500">Trade-focused service</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="text-emerald-700 mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">Responsive</h4>
                <p className="text-gray-500">Clear enquiry follow-up</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <Map className="text-emerald-700 mb-4" size={32} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">India</h4>
                <p className="text-gray-500">State-based enquiries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Compliance (Dark Section with liquid-membrane video) */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Animation Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-[#0a1f14]/80 z-10" />
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/liquid-membrane.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container relative z-20 mx-auto px-6 md:px-12 text-center">
          <h2 className="text-[#efb632] font-bold tracking-wider uppercase mb-4">Quality & Compliance</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Built around traceability <br/>and responsible trade</h3>
          <p className="text-gray-400 text-lg mb-16 max-w-3xl mx-auto">
            Final specifications and documents are agreed for each transaction; claims are never assumed before verification.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
            <div className="bg-[#122b1c] rounded-2xl p-8 border border-gray-800 hover:border-emerald-700/50 transition-colors">
              <FlaskConical className="text-[#efb632] mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Quality review</h4>
              <p className="text-gray-400 leading-relaxed">Condition, water, impurities and other agreed indicators are reviewed for each trade.</p>
            </div>
            <div className="bg-[#122b1c] rounded-2xl p-8 border border-gray-800 hover:border-emerald-700/50 transition-colors">
              <FileText className="text-[#efb632] mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Clear records</h4>
              <p className="text-gray-400 leading-relaxed">Weight, source or destination, invoice and supporting trade details can be recorded.</p>
            </div>
            <div className="bg-[#122b1c] rounded-2xl p-8 border border-gray-800 hover:border-emerald-700/50 transition-colors">
              <Shield className="text-[#efb632] mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Responsible handling</h4>
              <p className="text-gray-400 leading-relaxed">Collection, storage and transport are planned around applicable safety and regulatory requirements.</p>
            </div>
            <div className="bg-[#122b1c] rounded-2xl p-8 border border-gray-800 hover:border-emerald-700/50 transition-colors">
              <BarChart3 className="text-[#efb632] mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Supply planning</h4>
              <p className="text-gray-400 leading-relaxed">Recurring requirements can be coordinated against available volume and logistics.</p>
            </div>
          </div>
          
          <div className="bg-[#192f1b] border border-[#2b442d] rounded-xl p-6 text-left">
            <p className="text-gray-300">
              <strong className="text-white">Verification note:</strong> Licences, registrations, service coverage and certifications must be confirmed with JanaOilGreen before contracting. No placeholder claim on this page should be treated as proof.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sell Pricing */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
              <Scale className="text-emerald-700 mb-6" size={40} />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Sell pricing</h3>
              <p className="text-gray-600 mb-8 text-lg">Your quote is based on quantity, oil condition, collection frequency and pickup distance.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Spot or recurring collection</li>
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Weight recorded at handover</li>
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Payment terms confirmed before pickup</li>
              </ul>
              <a href="#trade" onClick={() => setTransactionType('sell')} className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-50 rounded-full px-6 py-3 font-semibold text-gray-900 transition-colors">
                Request current price <ArrowRight size={18} />
              </a>
            </div>
            
            {/* Buy Pricing */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
              <Droplet className="text-emerald-700 mb-6" size={40} />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Buy pricing</h3>
              <p className="text-gray-600 mb-8 text-lg">Bulk price depends on tested quality, required quantity, packaging, delivery point and current market rates.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Spot or contract supply</li>
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Quality terms agreed in advance</li>
                <li className="flex gap-3 text-gray-700"><CheckCircle2 className="text-emerald-700 shrink-0" size={24}/> Logistics quoted separately where applicable</li>
              </ul>
              <a href="#trade" onClick={() => setTransactionType('buy')} className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-50 rounded-full px-6 py-3 font-semibold text-gray-900 transition-colors">
                Request current price <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Reviews Section */}
      <section className="py-24 bg-[#f0f4f0]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <h2 className="text-[#efb632] font-bold tracking-wider uppercase mb-2">Partner Reviews</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted by businesses across India</h3>
              
              <div className="flex items-center gap-4">
                <div className="text-5xl md:text-6xl font-bold text-gray-900">4.7</div>
                <div>
                  <div className="flex text-[#efb632] mb-1">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <div className="relative">
                      <Star size={20} className="text-gray-300" />
                      <div className="absolute top-0 left-0 overflow-hidden w-[70%]">
                        <Star fill="currentColor" size={20} className="text-[#efb632]" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">Average rating from our B2B partners</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Review 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex text-[#efb632] mb-4">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  &quot;JanaOilGreen has completely transformed how we handle our used cooking oil. Pickups are always on time, and the pricing is very competitive. Highly recommended!&quot;
                </p>
                <div>
                  <h4 className="font-bold text-gray-900">Rajiv Mehta</h4>
                  <p className="text-sm text-gray-500">Restaurant Chain Owner</p>
                </div>
              </div>
              
              {/* Review 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex text-[#efb632] mb-4">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <div className="relative">
                    <Star size={16} className="text-gray-300" />
                    <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
                      <Star fill="currentColor" size={16} className="text-[#efb632]" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  &quot;Transparent paperwork and very professional handling. We appreciate their commitment to sustainable recycling and circular economy.&quot;
                </p>
                <div>
                  <h4 className="font-bold text-gray-900">Anjali Sharma</h4>
                  <p className="text-sm text-gray-500">Food Manufacturing Plant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#e8f0e8]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-[#efb632] font-bold tracking-wider uppercase mb-2">FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently asked questions</h3>
          </div>
          
          <div className="bg-transparent">
            <AccordionItem title="What type of oil can I sell?" defaultOpen />
            <AccordionItem title="Is there a minimum quantity?" />
            <AccordionItem title="How is the price decided?" />
            <AccordionItem title="Can I request recurring supply?" />
            <AccordionItem title="Which states do you serve?" />
            <AccordionItem title="What documents are provided?" />
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section id="policies" className="py-24 bg-[#e8f0e8] border-t border-[#d8e3d8]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Clear terms for every enquiry</h3>
            <p className="text-gray-600 text-lg">These policies apply to quotation-based enquiries and accepted transactions made with JanaOilGreen.</p>
          </div>
          
          <div className="bg-transparent mt-12 border-t border-gray-200">
            <AccordionItem title="Privacy Policy" />
            <AccordionItem title="Terms & Conditions" />
            <AccordionItem title="Refund / Cancellation Policy" />
            <AccordionItem title="Digital Delivery / Access Policy" />
          </div>
          
          <p className="text-sm text-gray-500 mt-12 text-center">
            Policy text is a practical website summary and should be reviewed against your verified business details and local legal requirements before launch.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t-4 border-[#efb632]">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-8 w-8 text-emerald-500" />
                <span className="text-3xl font-bold tracking-tight text-white">JanaOil<span className="text-emerald-500">Green</span></span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">Leading the way in sustainable cooking oil recycling. Buy and sell with confidence.</p>
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800 w-fit">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500">
                    <Image src="/founder.jpg" alt="Subhajit Jana" width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Business Owner</span>
                    <span className="text-white font-semibold">Subhajit Jana</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800 w-fit">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500">
                    <Image src="/managing-director.jpg" alt="Managing Director" width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Managing Director</span>
                    <span className="text-white font-semibold">Biswajit Jana</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-800 pb-3">Company Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Home</a></li>
                <li><a href="#pricing" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Products + Prices</a></li>
                <li><a href="#about" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> About Us</a></li>
                <li><a href="#contact" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-800 pb-3">Legal & Policies</h4>
              <ul className="space-y-3">
                <li><a href="#policies" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Privacy Policy</a></li>
                <li><a href="#policies" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Terms & Conditions</a></li>
                <li><a href="#policies" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Refund/Cancellation Policy</a></li>
                <li><a href="#policies" className="hover:text-[#efb632] transition-colors flex items-center gap-2"><ChevronRight size={14}/> Digital Delivery/Access Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-800 pb-3">Contact Information</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#efb632] shrink-0 mt-1" />
                  <span className="text-gray-300">123 Eco Way, Innovation Park<br/>Kolkata, WB 700001</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone size={20} className="text-[#efb632] shrink-0" />
                  <a href="tel:+918981429492" className="text-white font-medium group-hover:text-[#efb632] transition-colors">+91 8981429492</a>
                </li>
                <li className="flex items-center gap-3 group">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
                  <a href="https://wa.me/918981429492" target="_blank" className="text-white font-medium group-hover:text-[#efb632] transition-colors">+91 8981429492</a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail size={20} className="text-[#efb632] shrink-0" />
                  <a href="mailto:janaprivateltd@gmail.com" className="text-white font-medium group-hover:text-[#efb632] transition-colors">janaprivateltd@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} JanaOilGreen. Owned by Subhajit Jana. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={14} /> Secure Payments
              </span>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center"><CreditCard size={18} className="text-white" /></div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-xs text-white italic">UPI</div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-xs text-white">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot & WhatsApp */}
      <Chatbot />
    </main>
  );
}
