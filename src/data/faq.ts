import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `What is ${siteDetails.siteName}?`,
        answer: `${siteDetails.siteName} is a comprehensive home improvement platform that connects homeowners with verified professionals for renovation, repair, and maintenance services. We provide tools for project management, material sourcing, and secure payments.`,
    },
    {
        question: 'How do I find a professional?',
        answer: 'Simply create a service request describing your needs. Verified professionals in your area will send you detailed quotes. You can browse their profiles, ratings, and portfolios before making a decision.',
    },
    {
        question: 'How does the payment system work?',
        answer: 'We use an escrow system to protect both you and the professional. Your payment is held securely until project milestones are completed and approved. This ensures quality work while protecting your investment.',
    },
    {
        question: 'What are milestones?',
        answer: 'Milestones break your project into manageable stages. Each milestone has a specific scope, timeline, and payment amount. You approve each stage before the professional moves to the next, ensuring quality and transparency.'
    },
    {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard encryption and secure payment processing through Stripe. Your payment information is never stored on our servers.'
    },
    {
        question: 'How do I get started?',
        answer: 'Download the app, create an account, and start by creating your first service request. It\'s that simple!'
    }
];