import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Connecting homeowners with trusted professionals for all your home improvement needs.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "How It Works",
            url: "#how-it-works"
        },
        {
            text: "Services",
            url: "#services"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        },
        {
            text: "FAQ",
            url: "#faq"
        }
    ],
    email: 'contact@mercadomi.com',
    telephone: '+1 (555) 234-5678',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}