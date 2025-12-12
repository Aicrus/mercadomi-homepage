import { FiCheckCircle, FiHome, FiSearch, FiShield, FiUsers, FiMessageCircle, FiEye, FiShoppingCart, FiCalendar, FiFileText } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Find Trusted Professionals Easily",
        description: "Browse through verified professionals in your area. View ratings, reviews, portfolios, and service areas. Connect with the perfect match for your home improvement needs.",
        translationKey: "findProfessionals",
        bullets: [
            {
                title: "Verified Professionals Only",
                description: "Every professional on our platform is verified and vetted. We ensure quality and reliability.",
                translationKey: "verifiedProfessionals",
                icon: <FiCheckCircle size={26} />
            },
            {
                title: "Expert Consultations",
                description: "Get professional guidance to help you plan your project, understand costs, and make informed decisions.",
                translationKey: "expertConsultations",
                icon: <FiUsers size={26} />
            },
            {
                title: "Smart Home Scanning",
                description: "Use our integrated CubiCasa technology to create accurate floor plans of your home for better quotes.",
                translationKey: "homeScanning",
                icon: <FiHome size={26} />
            }
        ],
        imageSrc: "/images/02.png"
    },
    {
        title: "Complete Project Management",
        description: "Break down your project into manageable milestones. Track progress in real-time, approve completed stages, and ensure quality work at every step. You're always in control.",
        translationKey: "projectManagement",
        bullets: [
            {
                title: "Milestone-Based Tracking",
                description: "Monitor your project through milestone-based timelines. Approve completed stages and watch your home transformation happen.",
                translationKey: "milestoneTracking",
                icon: <FiCalendar size={26} />
            },
            {
                title: "Compare Products and Prices",
                description: "Search for materials from major retailers like Home Depot and Lowe's. Compare prices and add items to your project quote.",
                translationKey: "compareProducts",
                icon: <FiShoppingCart size={26} />
            },
            {
                title: "Real-time Communication",
                description: "Chat directly with professionals throughout your project. Share photos, ask questions, and stay updated on progress.",
                translationKey: "realTimeCommunication",
                icon: <FiMessageCircle size={26} />
            }
        ],
        imageSrc: "/images/03.png"
    },
    {
        title: "Secure Payment Protection",
        description: "Your payments are held in escrow until milestones are completed and approved. This ensures professionals are paid fairly while protecting you from incomplete or unsatisfactory work.",
        translationKey: "securePayments",
        bullets: [
            {
                title: "Escrow Payment System",
                description: "Your payment is held securely until project milestones are completed and approved. This ensures quality work while protecting your investment.",
                translationKey: "escrowSystem",
                icon: <FiShield size={26} />
            },
            {
                title: "Complete Transparency",
                description: "View detailed quotes, material lists, timelines, and progress updates. Everything is documented, so you always know what's happening.",
                translationKey: "transparency",
                icon: <FiEye size={26} />
            },
            {
                title: "Project History & Portfolio",
                description: "Keep track of all your home improvement projects. Build a portfolio of completed work and easily reference past projects.",
                translationKey: "projectHistory",
                icon: <FiFileText size={26} />
            }
        ],
        imageSrc: "/images/04.png"
    },
]