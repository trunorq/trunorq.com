"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
type FAQItem = {
    question: string
    answer: string
}
type FAQSectionProps = {
    title?: string
    faqs?: FAQItem[]
}
const defaultFAQs: FAQItem[] = [
    {
        question: "What is Trunorq and what is LeadSync?",
        answer:
            "Trunorq is a CRM operations company that helps B2B and B2C teams power up their CRM — cleaning dirty data, enriching contacts, attributing revenue to campaigns, analyzing pipeline bottlenecks, and automating workflows. LeadSync is our flagship tool — a lead sync discrepancy detector that audits leads between ad platforms (Google Ads, with Meta and WhatsApp on the roadmap) and CRM systems (HubSpot, with Zoho and Salesforce planned) to find where leads go missing.",
    },
    {
        question: "How does the 4-strategy matching engine work?",
        answer:
            "LeadSync uses four strategies to match leads between your ad platform and CRM: (1) GCLID matching — the gold standard for Google Ads attribution, (2) Email matching — cross-referencing contact emails, (3) Phone matching — for leads captured via calls or forms, and (4) Timestamp + Campaign matching — a fuzzy match that pairs conversion timing with campaign data. Combined, these strategies achieve 98.7% accuracy in identifying discrepancies.",
    },
    {
        question: "What platforms are supported and what reports does LeadSync generate?",
        answer:
            "Currently, LeadSync supports Google Ads as an ad platform source and HubSpot as the CRM destination. We're building integrations for Meta Ads, WhatsApp Business, Zoho CRM, and Salesforce. LeadSync generates 5 detailed CSV reports: matched leads, missing leads, delayed leads, duplicate contacts, and campaign summaries — all downloadable instantly.",
    },
]
export const FAQSection = ({ title = "Frequently asked questions", faqs = defaultFAQs }: FAQSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <section className="w-full py-24 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column - Title */}
                    <div className="lg:col-span-4">
                        <h2
                            className="text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-24"
                            style={{
                                fontFamily: "var(--font-figtree), Figtree",
                                fontWeight: "400",
                                fontSize: "40px",
                            }}
                        >
                            {title}
                        </h2>
                    </div>

                    {/* Right Column - FAQ Items */}
                    <div className="lg:col-span-8">
                        <div className="space-y-0">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                                        aria-expanded={openIndex === index}
                                    >
                                        <span
                                            className="text-lg leading-7 text-[#202020] pr-8"
                                            style={{
                                                fontFamily: "var(--font-figtree), Figtree",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{
                                                rotate: openIndex === index ? 45 : 0,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: [0.4, 0, 0.2, 1],
                                            }}
                                            className="flex-shrink-0"
                                        >
                                            <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 pr-12">
                                                    <p
                                                        className="text-lg leading-6 text-[#666666]"
                                                        style={{
                                                            fontFamily: "var(--font-figtree), Figtree",
                                                        }}
                                                    >
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
