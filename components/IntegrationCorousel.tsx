"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

type IntegrationApp = {
    name: string
    icon: React.ReactNode
}

type IntegrationCarouselProps = {
    buttonText?: string
    buttonHref?: string
    title?: string
    subtitle?: string
}

// --- Platform SVG Icons ---

const ZohoIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 14L4 34h5.5l2-6.5h7L16.5 34H22L15.5 14h-5zm3 9.5L15 18l1.5 5.5h-3z" fill="#E42527" />
        <path d="M26 14c-4.4 0-8 4.5-8 10s3.6 10 8 10 8-4.5 8-10-3.6-10-8-10zm0 15c-1.7 0-3-2.2-3-5s1.3-5 3-5 3 2.2 3 5-1.3 5-3 5z" fill="#F0A61C" />
        <path d="M36 14v20h5v-7h3c2.8 0 5-2.9 5-6.5S46.8 14 44 14h-8zm5 5h2c1.1 0 2 1.1 2 2.5S44.1 24 43 24h-2v-5z" fill="#3B9C3E" />
    </svg>
)

const MetaIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.878 13.088c1.781-2.574 3.96-4.088 6.622-4.088 3.81 0 6.074 2.778 8.026 6.162.355.615.698 1.252 1.034 1.876l.474.884.474-.884c.336-.624.679-1.26 1.034-1.876C30.494 11.778 32.758 9 36.568 9c4.704 0 8.502 5.484 10.146 11.436C48.534 25.53 48 31.458 48 33c0 3.336-2.568 6-5.88 6-3.858 0-6.402-3.114-8.34-5.994-.804-1.194-1.554-2.39-2.28-3.546-.264-.42-.527-.838-.785-1.247l-.025-.04-.69-1.097-.69 1.097-.025.04c-.258.409-.52.826-.785 1.247-.726 1.156-1.476 2.352-2.28 3.546C25.282 35.886 22.738 39 18.88 39c-3.312 0-5.88-2.664-5.88-6 0-1.542-.534-7.47 1.286-12.564C15.934 15.484 18.132 11.4 21.5 9.78" fill="url(#meta-grad)" />
        <defs>
            <linearGradient id="meta-grad" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0064E0" />
                <stop offset="0.4" stopColor="#0064E0" />
                <stop offset="0.83" stopColor="#0073FA" />
                <stop offset="1" stopColor="#0082FB" />
            </linearGradient>
        </defs>
    </svg>
)

const HubSpotIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.5 18.18V13.5a3.38 3.38 0 0 0 2-3.08v-.1A3.38 3.38 0 0 0 33.11 7h-.1a3.38 3.38 0 0 0-3.38 3.32v.1a3.38 3.38 0 0 0 2 3.08v4.68a10.33 10.33 0 0 0-4.7 2.33l-12.4-9.65a3.94 3.94 0 0 0 .12-.96 4 4 0 1 0-4 4 3.94 3.94 0 0 0 2.18-.66l12.18 9.48a10.42 10.42 0 0 0-.14 14.62l-3.56 3.56a3.04 3.04 0 0 0-.88-.14 3.13 3.13 0 1 0 3.13 3.13 3.04 3.04 0 0 0-.14-.88l3.52-3.52A10.39 10.39 0 1 0 34.5 18.18zm-1.44 16.84a5.94 5.94 0 1 1 0-11.88 5.94 5.94 0 0 1 0 11.88z" fill="#FF7A59" />
    </svg>
)

const GoogleAdsIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.2 42c-3.4 2-7.8.8-9.8-2.6L2.2 32c-2-3.4-.8-7.8 2.6-9.8l13.4-7.8 13.2 22.8L16.2 42z" fill="#FBBC04" />
        <path d="M31.4 37.2L18.2 14.4l13.4-7.8c3.4-2 7.8-.8 9.8 2.6l4.2 7.4c2 3.4.8 7.8-2.6 9.8L31.4 37.2z" fill="#4285F4" />
        <circle cx="11" cy="37" r="5.5" fill="#34A853" />
    </svg>
)

const RedditAdsIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#FF4500" />
        <path d="M40 24a4 4 0 0 0-6.82-2.84 19.6 19.6 0 0 0-9.18-2.82l1.84-6.2 5.02 1.18a2.8 2.8 0 1 0 .44-1.82l-5.84-1.38a1 1 0 0 0-1.16.68l-2.14 7.26c-3.6.12-6.92 1.18-9.34 2.94A4 4 0 0 0 8 24a3.96 3.96 0 0 0 1.66 3.22c-.06.42-.1.86-.1 1.3 0 5.46 7.14 9.88 15.94 9.88s15.94-4.42 15.94-9.88c0-.42-.04-.84-.1-1.24A3.98 3.98 0 0 0 40 24zM16 26a2.4 2.4 0 1 1 4.8 0A2.4 2.4 0 0 1 16 26zm13.66 6.56c-1.62 1.62-4.72 1.74-5.64 1.74s-4.04-.14-5.64-1.74a.66.66 0 0 1 0-.94.66.66 0 0 1 .94 0c1.02 1.02 3.2 1.38 4.7 1.38s3.68-.36 4.7-1.38a.66.66 0 0 1 .94 0 .68.68 0 0 1 0 .94zM31.6 28.4a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8z" fill="#FFF" />
    </svg>
)

const SalesforceIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.04 10.8a8.64 8.64 0 0 1 6.48-2.88c3.36 0 6.3 1.86 7.8 4.62a9 9 0 0 1 3.78-.84c5.04 0 9.12 4.14 9.12 9.24s-4.08 9.24-9.12 9.24a9 9 0 0 1-2.22-.28 7.38 7.38 0 0 1-6.78 4.5 7.2 7.2 0 0 1-3.24-.78 8.58 8.58 0 0 1-7.68 4.74 8.58 8.58 0 0 1-8.04-5.58 7.5 7.5 0 0 1-1.14.1c-4.2 0-7.62-3.48-7.62-7.74a7.68 7.68 0 0 1 4.44-6.96A8.1 8.1 0 0 1 5.4 16.8c0-4.62 3.72-8.34 8.28-8.34 2.52 0 4.8 1.14 6.36 2.94" fill="#00A1E0" />
    </svg>
)

const WhatsAppIcon = () => (
    <svg viewBox="0 0 48 48" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.04 4C12.96 4 4 12.96 4 24.04c0 3.78 1.04 7.32 2.86 10.34L4 44l9.94-2.78A19.92 19.92 0 0 0 24.04 44C35.12 44 44 35.04 44 24.04 44 12.96 35.12 4 24.04 4z" fill="#25D366" />
        <path d="M34.56 29.34c-.56-.28-3.28-1.62-3.78-1.82-.52-.18-.88-.28-1.26.28-.36.56-1.42 1.82-1.74 2.18-.32.38-.64.42-1.2.14-.56-.28-2.34-.86-4.46-2.76-1.64-1.48-2.76-3.3-3.08-3.86-.32-.56-.04-.86.24-1.14.26-.26.56-.66.84-.98.28-.34.38-.56.56-.94.18-.38.1-.7-.04-.98-.14-.28-1.26-3.04-1.72-4.16-.46-1.1-.92-1-.26-.96-.02 0-.56-.06-.96-.06s-.88.12-1.34.6c-.46.48-1.76 1.72-1.76 4.18s1.8 4.86 2.06 5.2c.26.32 3.54 5.4 8.58 7.58 1.2.52 2.14.82 2.86 1.06 1.2.38 2.3.32 3.16.2.96-.14 2.98-1.22 3.4-2.4.42-1.18.42-2.2.3-2.4-.14-.22-.5-.34-1.06-.62z" fill="#FFF" />
    </svg>
)

// --- Integration app lists ---

const allApps: IntegrationApp[] = [
    { name: "Google Ads", icon: <GoogleAdsIcon /> },
    { name: "HubSpot", icon: <HubSpotIcon /> },
    { name: "Meta", icon: <MetaIcon /> },
    { name: "Salesforce", icon: <SalesforceIcon /> },
    { name: "WhatsApp", icon: <WhatsAppIcon /> },
    { name: "Zoho", icon: <ZohoIcon /> },
    { name: "Reddit Ads", icon: <RedditAdsIcon /> },
]

const defaultTopRowApps: IntegrationApp[] = [
    ...allApps,
    ...allApps,
]

const defaultBottomRowApps: IntegrationApp[] = [
    allApps[3], allApps[4], allApps[5], allApps[6], allApps[0], allApps[1], allApps[2],
    allApps[3], allApps[4], allApps[5], allApps[6], allApps[0], allApps[1], allApps[2],
]

// @component: IntegrationCarousel
export const IntegrationCarousel = ({
    buttonText = "Explore Integrations",
    buttonHref = "#",
    title = "Integrates with your entire CRM and ad stack.",
    subtitle = "Connect Trunorq to Google Ads, HubSpot, Zoho, Salesforce, Meta, and dozens of others to audit leads seamlessly.",
}: IntegrationCarouselProps) => {
    const topRowRef = useRef<HTMLDivElement>(null)
    const bottomRowRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let topAnimationId: number
        let bottomAnimationId: number
        let topPosition = 0
        let bottomPosition = 0
        const animateTopRow = () => {
            if (topRowRef.current) {
                topPosition -= 0.5
                if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
                    topPosition = 0
                }
                topRowRef.current.style.transform = `translateX(${topPosition}px)`
            }
            topAnimationId = requestAnimationFrame(animateTopRow)
        }
        const animateBottomRow = () => {
            if (bottomRowRef.current) {
                bottomPosition -= 0.65
                if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
                    bottomPosition = 0
                }
                bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`
            }
            bottomAnimationId = requestAnimationFrame(animateBottomRow)
        }
        topAnimationId = requestAnimationFrame(animateTopRow)
        bottomAnimationId = requestAnimationFrame(animateBottomRow)
        return () => {
            cancelAnimationFrame(topAnimationId)
            cancelAnimationFrame(bottomAnimationId)
        }
    }, [])

    // @return
    return (
        <div className="w-full py-24 bg-white">
            <div className="max-w-[680px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center mb-20"
                >
                    <div className="flex flex-col items-center gap-4">
                        <h2
                            className="text-[40px] leading-tight font-normal text-[#222222] text-center tracking-tight mb-0"
                            style={{
                                fontFamily: "var(--font-figtree), Figtree",
                                fontWeight: "400",
                                fontSize: "40px",
                            }}
                        >
                            {title}
                        </h2>
                        <p
                            className="text-lg leading-7 text-[#666666] text-center max-w-[600px] mt-2"
                            style={{
                                fontFamily: "var(--font-figtree), Figtree",
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                        className="flex gap-3 mt-6"
                    >
                        <a
                            href={buttonHref}
                            className="inline-block px-5 py-2.5 rounded-full bg-white text-[#222222] text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer hover:shadow-lg"
                            style={{
                                boxShadow:
                                    "0 -1px 0 0 rgb(181, 181, 181) inset, -1px 0 0 0 rgb(227, 227, 227) inset, 1px 0 0 0 rgb(227, 227, 227) inset, 0 1px 0 0 rgb(227, 227, 227) inset",
                                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.06) 80%, rgba(255, 255, 255, 0.12))",
                            }}
                        >
                            {buttonText}
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            <div className="h-[268px] -mt-6 mb-0 pb-0 relative overflow-hidden">
                <div
                    ref={topRowRef}
                    className="flex items-start gap-6 absolute top-6 whitespace-nowrap"
                    style={{
                        willChange: "transform",
                    }}
                >
                    {[...defaultTopRowApps, ...defaultTopRowApps].map((app, index) => (
                        <div
                            key={`top-${index}`}
                            className="flex items-center justify-center w-24 h-24 rounded-3xl flex-shrink-0"
                            style={{
                                backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
                                boxShadow:
                                    "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
                            }}
                            title={app.name}
                        >
                            {app.icon}
                        </div>
                    ))}
                </div>

                <div
                    className="absolute top-0 right-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0), rgb(255, 255, 255))",
                    }}
                />

                <div
                    className="absolute top-0 left-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255), rgba(0, 0, 0, 0))",
                    }}
                />

                <div
                    ref={bottomRowRef}
                    className="flex items-start gap-6 absolute top-[148px] whitespace-nowrap"
                    style={{
                        willChange: "transform",
                    }}
                >
                    {[...defaultBottomRowApps, ...defaultBottomRowApps].map((app, index) => (
                        <div
                            key={`bottom-${index}`}
                            className="flex items-center justify-center w-24 h-24 rounded-3xl flex-shrink-0"
                            style={{
                                backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(252, 252, 252))",
                                boxShadow:
                                    "rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 3px 3px -1.4px, rgba(0, 0, 0, 0.04) 0px 6px 6px -3px, rgba(0, 0, 0, 0.04) 0px 12px 12px -6px, rgba(0, 0, 0, 0.04) 0px 12px 12px -12px",
                            }}
                            title={app.name}
                        >
                            {app.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
