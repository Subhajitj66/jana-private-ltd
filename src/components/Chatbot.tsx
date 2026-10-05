"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, MessageCircle } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const FAQ_RESPONSES = [
  { keywords: ["price", "cost", "rate", "money", "much do you pay", "how much", "quote"], answer: "Our prices vary based on the quality and quantity of your used cooking oil, but we always pay highly competitive rates! Please fill out the Trade form or message us on WhatsApp for an exact quote." },
  { keywords: ["sell", "collection", "pickup", "give", "dispose", "give oil", "take my oil"], answer: "To sell your used cooking oil, simply fill out the 'Trade With Us' form on our website or contact us via WhatsApp. We will schedule a fast, hassle-free pickup from your location." },
  { keywords: ["buy", "purchase", "biodiesel", "get oil", "need oil", "bulk"], answer: "We supply high-quality, processed used cooking oil for biodiesel production and other industrial uses. Please use our Trade form to request a bulk purchase." },
  { keywords: ["contact", "phone", "call", "whatsapp", "number", "email", "reach", "support"], answer: "You can reach us directly via WhatsApp or Phone at +91 89814 29492, or email us at janaprivateltd@gmail.com." },
  { keywords: ["minimum", "quantity", "liters", "litre", "amount", "kg"], answer: "We accept various quantities, but typically we prefer collections of at least 20-50 liters to make the logistics efficient. Contact us if you have smaller recurring amounts!" },
  { keywords: ["who are you", "what is", "janaoilgreen", "jana oil green", "jana oil", "about", "what do you do", "mission", "vision"], answer: "JanaOilGreen is India's No.1 trusted marketplace to buy and sell used cooking oil. We help restaurants and food businesses dispose of waste oil responsibly and help buyers acquire traceable supply for sustainable energy solutions like biodiesel." },
  { keywords: ["owner", "founder", "subhajit", "jana", "director", "biswajit", "team", "who owns", "ceo", "md"], answer: "JanaOilGreen is proudly founded by Subhajit Jana (Founder & Business Owner). Our Managing Director is Biswajit Jana. Our team is dedicated to creating a transparent, highly rewarding ecosystem for used cooking oil recycling across India." },
  { keywords: ["where", "location", "address", "state", "india", "operate", "cities", "delhi", "mumbai", "kolkata"], answer: "We operate as a trusted marketplace across India! Whether you are in Delhi, Maharashtra, West Bengal, or beyond, just fill out the Trade form with your state and city, and we'll arrange the logistics." },
  { keywords: ["why", "benefit", "trusted", "safe", "legal", "certificate", "compliance", "paperwork"], answer: "Trading with us guarantees your oil is handled legally and sustainably. We provide completely transparent paperwork, timely B2B pickups, and strict compliance so you know exactly where your oil goes." },
  { keywords: ["hi", "hello", "hey", "help", "good morning", "good evening", "greetings"], answer: "Hello there! 👋 Welcome to JanaOilGreen. You can ask me about our prices, how to sell oil, our minimum quantity, or our company mission!" }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! 👋 Welcome to JanaOilGreen. How can I help you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    // Simulate bot thinking and replying
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botAnswer = "I'm not completely sure about that. For detailed inquiries, please reach out to us directly via WhatsApp at +91 89814 29492!";
      
      for (const faq of FAQ_RESPONSES) {
        if (faq.keywords.some(kw => lowerText.includes(kw))) {
          botAnswer = faq.answer;
          break;
        }
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botAnswer, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col border border-gray-100 mb-2 transform origin-bottom-right transition-all duration-300">
          {/* Header */}
          <div className="bg-[#efb632] p-4 flex justify-between items-center text-gray-900">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <h3 className="font-bold">JanaOilGreen Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-md transition-colors">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'bot' ? 'bg-white border border-gray-100 self-start text-gray-800 rounded-tl-sm' : 'bg-[#efb632] text-gray-900 self-end rounded-tr-sm'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => handleSend("What are your prices?")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">Prices?</button>
                <button onClick={() => handleSend("How do I sell oil?")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">Sell Oil</button>
                <button onClick={() => handleSend("Contact Support")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors">Contact</button>
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }} className="flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#efb632] text-gray-900"
              />
              <button type="submit" disabled={!inputText.trim()} className="bg-[#efb632] hover:bg-[#dca324] text-gray-900 p-2 rounded-xl disabled:opacity-50 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/918981429492?text=Hi%20JanaOilGreen,%20I%20have%20an%20inquiry." 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20b858] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center group relative"
        >
          <MessageCircle size={28} />
          <span className="absolute right-16 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        {/* Chatbot Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#efb632] hover:bg-[#dca324] text-gray-900 p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center group relative"
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
          {!isOpen && (
            <span className="absolute right-16 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Ask Chatbot
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
