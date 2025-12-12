export const siteDetails = {
    siteName: 'MercadoMi',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mercadomi-homepage.vercel.app/',
    metadata: {
        title: 'MercadoMi - Connect with Trusted Home Improvement Professionals',
        description: 'MercadoMi connects homeowners with verified professionals for renovation, repair, and maintenance services. Manage your projects from start to finish.',
    },
    language: 'en-us',
    locale: 'en-US',
    siteLogo: `${process.env.BASE_PATH || ''}/images/Logo_(2).png`, // or use a string for the logo e.g. "TechStartup"
    googleAnalyticsId: '', // e.g. G-XXXXXXX,
}