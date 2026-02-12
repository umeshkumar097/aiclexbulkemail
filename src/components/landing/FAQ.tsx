import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FAQ() {
  const faqs = [
    {
      q: "What is bulk email marketing software?",
      a: "Bulk email marketing software allows you to send mass email campaigns to a large list of contacts. Aiclex Mail Engine takes it further by adding AI-powered lead scoring and sales intelligence."
    },
    {
      q: "How does email open tracking work?",
      a: "We embed an invisible pixel in outgoing emails. When the recipient views the email, the pixel loads, and we record the open event, time, and location."
    },
    {
      q: "Is this cold email software?",
      a: "Yes! Aiclex is designed specifically for cold outreach. We include warm-up features, spam rotation, and delivery optimization to ensure your cold emails land in the primary inbox."
    },
    {
      q: "Does it support Amazon SES?",
      a: "Absolutely. You can connect Amazon SES, SendGrid, Mailgun, or your own SMTP server for maximum deliverability and lowest cost."
    },
    {
      q: "Can agencies resell this?",
      a: "Yes, our Agency plan supports white-labeling, allowing you to present the dashboard to your clients under your own brand."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white text-slate-600 leading-relaxed border-t border-slate-200">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
