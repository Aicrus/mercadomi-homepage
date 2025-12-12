import { FiEdit3, FiHome, FiCheckCircle, FiCreditCard, FiActivity } from "react-icons/fi";

export const howItWorksSteps = [
    {
        number: 1,
        title: "Create Your Request",
        description: "Create your service request in minutes. Add description, photos, and location. Choose between open request or direct to a specific professional.",
        details: [
            "Create your service request in minutes",
            "Add description, photos, and location",
            "Choose between open request or direct to a specific professional",
            "Optional: Use CubiCasa scanning for accurate floor plans"
        ],
        icon: <FiEdit3 />
    },
    {
        number: 2,
        title: "Get Visits & Quotes",
        description: "Professionals request to schedule site visits. Confirm visit dates and times via in-app chat. Receive detailed quotes after professionals assess your project.",
        details: [
            "Professionals request to schedule site visits",
            "Confirm visit dates and times via in-app chat",
            "Receive detailed quotes after professionals assess your project",
            "Compare multiple quotes side-by-side (prices, timelines, materials)"
        ],
        icon: <FiHome />
    },
    {
        number: 3,
        title: "Choose & Pay Securely",
        description: "Review and compare all quotes. Select the best professional for your project. Make secure payment (held safely until work is done).",
        details: [
            "Review and compare all quotes",
            "Select the best professional for your project",
            "Escrow System: Your payment is held securely by Mercado Me",
            "100% Secure: Bank-level encryption (Stripe)"
        ],
        icon: <FiCreditCard />
    },
    {
        number: 4,
        title: "Track & Complete",
        description: "Monitor project progress in real-time. Approve milestones as work is completed. Release payments incrementally. Rate and review when finished.",
        details: [
            "Monitor project progress in real-time",
            "Approve milestones as work is completed",
            "Release payments incrementally",
            "Rate and review when finished"
        ],
        icon: <FiActivity />
    },
];

