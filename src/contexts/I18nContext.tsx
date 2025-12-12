'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'es' || savedLanguage === 'pt') {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const translations: Record<Language, Record<string, string>> = {
    en: {
      // Menu
      'menu.home': 'Home',
      'menu.features': 'Features',
      'menu.howItWorks': 'How It Works',
      'menu.services': 'Services',
      'menu.testimonials': 'Testimonials',
      'menu.download': 'Download',
      'menu.getStarted': 'Get Started',
      
      // Hero
      'hero.heading': 'Transform Your Home with Trusted Professionals',
      'hero.subheading': 'Connect with verified home improvement professionals, get expert consultations, and manage your renovation projects from start to finish—all in one powerful app.',
      
      // Benefits
      'benefits.findProfessionals.title': 'Find Trusted Professionals Easily',
      'benefits.findProfessionals.description': 'Browse through verified professionals in your area. View ratings, reviews, portfolios, and service areas. Connect with the perfect match for your home improvement needs.',
      'benefits.findProfessionals.verifiedProfessionals.title': 'Verified Professionals Only',
      'benefits.findProfessionals.verifiedProfessionals.description': 'Every professional on our platform is verified and vetted. We ensure quality and reliability.',
      'benefits.findProfessionals.expertConsultations.title': 'Expert Consultations',
      'benefits.findProfessionals.expertConsultations.description': 'Get professional guidance to help you plan your project, understand costs, and make informed decisions.',
      'benefits.findProfessionals.homeScanning.title': 'Smart Home Scanning',
      'benefits.findProfessionals.homeScanning.description': 'Use our integrated CubiCasa technology to create accurate floor plans of your home for better quotes.',
      
      'benefits.projectManagement.title': 'Complete Project Management',
      'benefits.projectManagement.description': 'Break down your project into manageable milestones. Track progress in real-time, approve completed stages, and ensure quality work at every step. You\'re always in control.',
      'benefits.projectManagement.milestoneTracking.title': 'Milestone-Based Tracking',
      'benefits.projectManagement.milestoneTracking.description': 'Monitor your project through milestone-based timelines. Approve completed stages and watch your home transformation happen.',
      'benefits.projectManagement.compareProducts.title': 'Compare Products and Prices',
      'benefits.projectManagement.compareProducts.description': 'Search for materials from major retailers like Home Depot and Lowe\'s. Compare prices and add items to your project quote.',
      'benefits.projectManagement.realTimeCommunication.title': 'Real-time Communication',
      'benefits.projectManagement.realTimeCommunication.description': 'Chat directly with professionals throughout your project. Share photos, ask questions, and stay updated on progress.',
      
      'benefits.securePayments.title': 'Secure Payment Protection',
      'benefits.securePayments.description': 'Your payments are held in escrow until milestones are completed and approved. This ensures professionals are paid fairly while protecting you from incomplete or unsatisfactory work.',
      'benefits.securePayments.escrowSystem.title': 'Escrow Payment System',
      'benefits.securePayments.escrowSystem.description': 'Your payment is held securely until project milestones are completed and approved. This ensures quality work while protecting your investment.',
      'benefits.securePayments.transparency.title': 'Complete Transparency',
      'benefits.securePayments.transparency.description': 'View detailed quotes, material lists, timelines, and progress updates. Everything is documented, so you always know what\'s happening.',
      'benefits.securePayments.projectHistory.title': 'Project History & Portfolio',
      'benefits.securePayments.projectHistory.description': 'Keep track of all your home improvement projects. Build a portfolio of completed work and easily reference past projects.',
      
      // Pricing
      'pricing.title': 'Pricing',
      'pricing.description': 'Simple, transparent pricing. No surprises.',
      'pricing.starter.name': 'Starter',
      'pricing.starter.feature1': 'Basic cloud integration',
      'pricing.starter.feature2': 'Up to 5 team members',
      'pricing.starter.feature3': '20GB storage',
      'pricing.starter.feature4': 'Email support',
      'pricing.pro.name': 'Pro',
      'pricing.pro.feature1': 'Advanced cloud integration',
      'pricing.pro.feature2': 'Up to 20 team members',
      'pricing.pro.feature3': '100GB storage',
      'pricing.pro.feature4': 'Priority email & phone support',
      'pricing.pro.feature5': 'Advanced analytics',
      'pricing.enterprise.name': 'Enterprise',
      'pricing.enterprise.price': 'Custom',
      'pricing.enterprise.feature1': 'Full cloud integration',
      'pricing.enterprise.feature2': 'Unlimited team members',
      'pricing.enterprise.feature3': 'Unlimited storage',
      'pricing.enterprise.feature4': '24/7 dedicated support',
      'pricing.enterprise.feature5': 'Custom solutions',
      'pricing.enterprise.feature6': 'On-site training',
      
      // How It Works
      'howItWorks.title': 'How It Works',
      'howItWorks.description': 'Simple, secure steps from request to completion',
      'howItWorks.step1.title': 'Create Your Request',
      'howItWorks.step1.description': 'Create your service request in minutes. Add description, photos, and location. Choose between open request or direct to a specific professional.',
      'howItWorks.step1.detail1': 'Create your service request in minutes',
      'howItWorks.step1.detail2': 'Add description, photos, and location',
      'howItWorks.step1.detail3': 'Choose between open request or direct to a specific professional',
      'howItWorks.step1.detail4': 'Optional: Use CubiCasa scanning for accurate floor plans',
      'howItWorks.step2.title': 'Get Visits & Quotes',
      'howItWorks.step2.description': 'Professionals request to schedule site visits. Confirm visit dates and times via in-app chat. Receive detailed quotes after professionals assess your project.',
      'howItWorks.step2.detail1': 'Professionals request to schedule site visits',
      'howItWorks.step2.detail2': 'Confirm visit dates and times via in-app chat',
      'howItWorks.step2.detail3': 'Receive detailed quotes after professionals assess your project',
      'howItWorks.step2.detail4': 'Compare multiple quotes side-by-side (prices, timelines, materials)',
      'howItWorks.step3.title': 'Choose & Pay Securely',
      'howItWorks.step3.description': 'Review and compare all quotes. Select the best professional for your project. Make secure payment (held safely until work is done).',
      'howItWorks.step3.detail1': 'Review and compare all quotes',
      'howItWorks.step3.detail2': 'Select the best professional for your project',
      'howItWorks.step3.detail3': 'Escrow System: Your payment is held securely by Mercado Me',
      'howItWorks.step3.detail4': '100% Secure: Bank-level encryption (Stripe)',
      'howItWorks.step4.title': 'Track & Complete',
      'howItWorks.step4.description': 'Monitor project progress in real-time. Approve milestones as work is completed. Release payments incrementally. Rate and review when finished.',
      'howItWorks.step4.detail1': 'Monitor project progress in real-time',
      'howItWorks.step4.detail2': 'Approve milestones as work is completed',
      'howItWorks.step4.detail3': 'Release payments incrementally',
      'howItWorks.step4.detail4': 'Rate and review when finished',

      // Service Categories
      'serviceCategories.title': 'Services We Cover',
      'serviceCategories.description': 'From simple repairs to complete renovations',
      'serviceCategories.cleaning.name': 'Cleaning',
      'serviceCategories.repair.name': 'Repairs',
      'serviceCategories.painting.name': 'Painting',
      'serviceCategories.hvac.name': 'HVAC',
      'serviceCategories.plumbing.name': 'Plumbing',
      'serviceCategories.electrical.name': 'Electrical',
      'serviceCategories.landscaping.name': 'Landscaping',
      'serviceCategories.more.name': 'More',

      // Testimonials
      'testimonials.title': 'What Our Clients Say',
      'testimonials.description': 'Hear from homeowners who have transformed their projects with us.',
      'testimonials.testimonial1.name': 'Sarah M.',
      'testimonials.testimonial1.role': 'Kitchen Renovation',
      'testimonials.testimonial1.message': 'With MercadoMi I was able to hire the best service with a quote that had materials validated by the app. This gave me much more confidence in my choice.',
      'testimonials.testimonial2.name': 'John D.',
      'testimonials.testimonial2.role': 'Home Improvement Project',
      'testimonials.testimonial2.message': 'The app is really useful. With it I can measure the entire floor plan of the location, so the professional can give a more accurate and honest quote. It\'s really worth it.',
      'testimonials.testimonial3.name': 'Maria L.',
      'testimonials.testimonial3.role': 'Bathroom Renovation',
      'testimonials.testimonial3.message': 'I used it to renovate my bathroom and really liked it. The professionals are verified, you can track everything in the app, and the payment stays secure until the work is completed.',
      
      // FAQ
      'faq.title': 'Frequently Asked Questions',
      'faq.subtitle': "FAQ'S",
      'faq.askUs': 'Ask us anything!',
      'faq.question1': 'What is MercadoMi?',
      'faq.answer1': 'MercadoMi is a comprehensive home improvement platform that connects homeowners with verified professionals for renovation, repair, and maintenance services. We provide tools for project management, material sourcing, and secure payments.',
      'faq.question2': 'How do I find a professional?',
      'faq.answer2': 'Simply create a service request describing your needs. Verified professionals in your area will send you detailed quotes. You can browse their profiles, ratings, and portfolios before making a decision.',
      'faq.question3': 'How does the payment system work?',
      'faq.answer3': 'We use an escrow system to protect both you and the professional. Your payment is held securely until project milestones are completed and approved. This ensures quality work while protecting your investment.',
      'faq.question4': 'What are milestones?',
      'faq.answer4': 'Milestones break your project into manageable stages. Each milestone has a specific scope, timeline, and payment amount. You approve each stage before the professional moves to the next, ensuring quality and transparency.',
      'faq.question5': 'Is my payment information secure?',
      'faq.answer5': 'Absolutely. We use industry-standard encryption and secure payment processing through Stripe. Your payment information is never stored on our servers.',
      'faq.question6': 'How do I get started?',
      'faq.answer6': 'Download the app, create an account, and start by creating your first service request. It\'s that simple!',
      
      // Stats
      'stats.stat1.description': 'Verified professionals ready to help transform your home.',
      'stats.stat2.description': 'Star rating from satisfied homeowners across all projects.',
      'stats.stat3.description': 'Secure escrow payments protecting your investment until work is completed.',
      
      // CTA
      'cta.heading': 'Ready to Transform Your Home?',
      'cta.subheading': 'Download MercadoMi today and connect with trusted professionals in your area.',
      
      // Footer
      'footer.subheading': 'Connecting homeowners with trusted professionals for all your home improvement needs.',
      'footer.quickLinks.features': 'Features',
      'footer.quickLinks.howItWorks': 'How It Works',
      'footer.quickLinks.services': 'Services',
      'footer.quickLinks.testimonials': 'Testimonials',
      'footer.quickLinks.faq': 'FAQ',
      'footer.madeWith': 'Made with 💚 Aicrus',
    },
    es: {
      // Menu
      'menu.home': 'Inicio',
      'menu.features': 'Características',
      'menu.howItWorks': 'Cómo Funciona',
      'menu.services': 'Servicios',
      'menu.testimonials': 'Testimonios',
      'menu.download': 'Descargar',
      'menu.getStarted': 'Comenzar',
      
      // Hero
      'hero.heading': 'Transforma Tu Hogar con Profesionales de Confianza',
      'hero.subheading': 'Conecta con profesionales verificados de mejoras para el hogar, obtén consultas expertas y gestiona tus proyectos de renovación de principio a fin—todo en una poderosa aplicación.',
      
      // Benefits
      'benefits.findProfessionals.title': 'Encuentra Profesionales de Confianza Fácilmente',
      'benefits.findProfessionals.description': 'Navega por profesionales verificados en tu área. Ve calificaciones, reseñas, portafolios y áreas de servicio. Conecta con la opción perfecta para tus necesidades de mejoras en el hogar.',
      'benefits.findProfessionals.verifiedProfessionals.title': 'Solo Profesionales Verificados',
      'benefits.findProfessionals.verifiedProfessionals.description': 'Cada profesional en nuestra plataforma está verificado y evaluado. Garantizamos calidad y confiabilidad.',
      'benefits.findProfessionals.expertConsultations.title': 'Consultas Expertas',
      'benefits.findProfessionals.expertConsultations.description': 'Obtén orientación profesional para ayudarte a planificar tu proyecto, entender los costos y tomar decisiones informadas.',
      'benefits.findProfessionals.homeScanning.title': 'Escaneo Inteligente del Hogar',
      'benefits.findProfessionals.homeScanning.description': 'Usa nuestra tecnología integrada CubiCasa para crear planos precisos de tu hogar y obtener mejores cotizaciones.',
      
      'benefits.projectManagement.title': 'Gestión Completa de Proyectos',
      'benefits.projectManagement.description': 'Divide tu proyecto en hitos manejables. Rastrea el progreso en tiempo real, aprueba etapas completadas y asegura trabajo de calidad en cada paso. Siempre tienes el control.',
      'benefits.projectManagement.milestoneTracking.title': 'Seguimiento Basado en Hitos',
      'benefits.projectManagement.milestoneTracking.description': 'Monitorea tu proyecto a través de líneas de tiempo basadas en hitos. Aprueba etapas completadas y observa la transformación de tu hogar.',
      'benefits.projectManagement.compareProducts.title': 'Compara Productos y Precios',
      'benefits.projectManagement.compareProducts.description': 'Busca materiales de grandes minoristas como Home Depot y Lowe\'s. Compara precios y agrega artículos a la cotización de tu proyecto.',
      'benefits.projectManagement.realTimeCommunication.title': 'Comunicación en Tiempo Real',
      'benefits.projectManagement.realTimeCommunication.description': 'Chatea directamente con profesionales durante todo tu proyecto. Comparte fotos, haz preguntas y mantente actualizado sobre el progreso.',
      
      'benefits.securePayments.title': 'Protección de Pagos Seguros',
      'benefits.securePayments.description': 'Tus pagos se mantienen en depósito de garantía hasta que los hitos se completen y aprueben. Esto asegura que los profesionales sean pagados de manera justa mientras te protege de trabajos incompletos o insatisfactorios.',
      'benefits.securePayments.escrowSystem.title': 'Sistema de Pago en Depósito',
      'benefits.securePayments.escrowSystem.description': 'Tu pago se mantiene de forma segura hasta que los hitos del proyecto se completen y aprueben. Esto asegura trabajo de calidad mientras protege tu inversión.',
      'benefits.securePayments.transparency.title': 'Transparencia Completa',
      'benefits.securePayments.transparency.description': 'Ve cotizaciones detalladas, listas de materiales, líneas de tiempo y actualizaciones de progreso. Todo está documentado, por lo que siempre sabes qué está pasando.',
      'benefits.securePayments.projectHistory.title': 'Historial y Portafolio de Proyectos',
      'benefits.securePayments.projectHistory.description': 'Lleva un registro de todos tus proyectos de mejoras en el hogar. Construye un portafolio de trabajos completados y referencia fácilmente proyectos pasados.',
      
      // Pricing
      'pricing.title': 'Precios',
      'pricing.description': 'Precios simples y transparentes. Sin sorpresas.',
      'pricing.starter.name': 'Básico',
      'pricing.starter.feature1': 'Integración básica en la nube',
      'pricing.starter.feature2': 'Hasta 5 miembros del equipo',
      'pricing.starter.feature3': '20GB de almacenamiento',
      'pricing.starter.feature4': 'Soporte por correo electrónico',
      'pricing.pro.name': 'Pro',
      'pricing.pro.feature1': 'Integración avanzada en la nube',
      'pricing.pro.feature2': 'Hasta 20 miembros del equipo',
      'pricing.pro.feature3': '100GB de almacenamiento',
      'pricing.pro.feature4': 'Soporte prioritario por correo y teléfono',
      'pricing.pro.feature5': 'Análisis avanzados',
      'pricing.enterprise.name': 'Empresarial',
      'pricing.enterprise.price': 'Personalizado',
      'pricing.enterprise.feature1': 'Integración completa en la nube',
      'pricing.enterprise.feature2': 'Miembros ilimitados del equipo',
      'pricing.enterprise.feature3': 'Almacenamiento ilimitado',
      'pricing.enterprise.feature4': 'Soporte dedicado 24/7',
      'pricing.enterprise.feature5': 'Soluciones personalizadas',
      'pricing.enterprise.feature6': 'Capacitación en sitio',
      
      // How It Works
      'howItWorks.title': 'Cómo Funciona',
      'howItWorks.description': 'Pasos simples y seguros desde la solicitud hasta la finalización',
      'howItWorks.step1.title': 'Crea Tu Solicitud',
      'howItWorks.step1.description': 'Crea tu solicitud de servicio en minutos. Agrega descripción, fotos y ubicación. Elige entre solicitud abierta o directa a un profesional específico.',
      'howItWorks.step1.detail1': 'Crea tu solicitud de servicio en minutos',
      'howItWorks.step1.detail2': 'Agrega descripción, fotos y ubicación',
      'howItWorks.step1.detail3': 'Elige entre solicitud abierta o directa a un profesional específico',
      'howItWorks.step1.detail4': 'Opcional: Usa el escaneo CubiCasa para planos precisos',
      'howItWorks.step2.title': 'Obtén Visitas y Cotizaciones',
      'howItWorks.step2.description': 'Los profesionales solicitan programar visitas al sitio. Confirma fechas y horarios de visita vía chat en la app. Recibe cotizaciones detalladas después de que los profesionales evalúen tu proyecto.',
      'howItWorks.step2.detail1': 'Los profesionales solicitan programar visitas al sitio',
      'howItWorks.step2.detail2': 'Confirma fechas y horarios de visita vía chat en la app',
      'howItWorks.step2.detail3': 'Recibe cotizaciones detalladas después de que los profesionales evalúen tu proyecto',
      'howItWorks.step2.detail4': 'Compara múltiples cotizaciones lado a lado (precios, plazos, materiales)',
      'howItWorks.step3.title': 'Elige y Paga de Forma Segura',
      'howItWorks.step3.description': 'Revisa y compara todas las cotizaciones. Selecciona el mejor profesional para tu proyecto. Realiza un pago seguro (retenido de forma segura hasta que el trabajo esté hecho).',
      'howItWorks.step3.detail1': 'Revisa y compara todas las cotizaciones',
      'howItWorks.step3.detail2': 'Selecciona el mejor profesional para tu proyecto',
      'howItWorks.step3.detail3': 'Sistema de Depósito: Tu pago es retenido de forma segura por Mercado Me',
      'howItWorks.step3.detail4': '100% Seguro: Encriptación de nivel bancario (Stripe)',
      'howItWorks.step4.title': 'Rastrea y Completa',
      'howItWorks.step4.description': 'Monitorea el progreso del proyecto en tiempo real. Aprueba hitos a medida que se completa el trabajo. Libera pagos de forma incremental. Califica y reseña cuando termines.',
      'howItWorks.step4.detail1': 'Monitorea el progreso del proyecto en tiempo real',
      'howItWorks.step4.detail2': 'Aprueba hitos a medida que se completa el trabajo',
      'howItWorks.step4.detail3': 'Libera pagos de forma incremental',
      'howItWorks.step4.detail4': 'Califica y reseña cuando termines',

      // Service Categories
      'serviceCategories.title': 'Servicios Que Cubrimos',
      'serviceCategories.description': 'Desde reparaciones simples hasta renovaciones completas',
      'serviceCategories.cleaning.name': 'Limpieza',
      'serviceCategories.repair.name': 'Reparaciones',
      'serviceCategories.painting.name': 'Pintura',
      'serviceCategories.hvac.name': 'HVAC',
      'serviceCategories.plumbing.name': 'Plomería',
      'serviceCategories.electrical.name': 'Eléctrico',
      'serviceCategories.landscaping.name': 'Paisajismo',
      'serviceCategories.more.name': 'Más',

      // Testimonials
      'testimonials.title': 'Lo Que Dicen Nuestros Clientes',
      'testimonials.description': 'Escucha a propietarios que han transformado sus proyectos con nosotros.',
      'testimonials.testimonial1.name': 'Sarah M.',
      'testimonials.testimonial1.role': 'Renovación de Cocina',
      'testimonials.testimonial1.message': 'Con MercadoMi pude contratar el mejor servicio con un presupuesto que tenía los materiales validados por la app. Esto me dio mucha más confianza en mi elección.',
      'testimonials.testimonial2.name': 'John D.',
      'testimonials.testimonial2.role': 'Proyecto de Mejoras',
      'testimonials.testimonial2.message': 'La app es muy útil. Con ella puedo medir toda la planta del lugar, así el profesional puede dar un presupuesto más preciso y honesto. Realmente vale la pena.',
      'testimonials.testimonial3.name': 'Maria L.',
      'testimonials.testimonial3.role': 'Renovación de Baño',
      'testimonials.testimonial3.message': 'La usé para renovar mi baño y me gustó mucho. Los profesionales están verificados, puedes seguir todo en la app y el pago se mantiene seguro hasta que el trabajo esté completo.',
      
      // FAQ
      'faq.title': 'Preguntas Frecuentes',
      'faq.subtitle': 'PREGUNTAS FRECUENTES',
      'faq.askUs': '¡Pregúntanos lo que quieras!',
      'faq.question1': '¿Qué es MercadoMi?',
      'faq.answer1': 'MercadoMi es una plataforma integral de mejoras para el hogar que conecta a propietarios con profesionales verificados para servicios de renovación, reparación y mantenimiento. Proporcionamos herramientas para gestión de proyectos, búsqueda de materiales y pagos seguros.',
      'faq.question2': '¿Cómo encuentro un profesional?',
      'faq.answer2': 'Simplemente crea una solicitud de servicio describiendo tus necesidades. Los profesionales verificados en tu área te enviarán cotizaciones detalladas. Puedes navegar por sus perfiles, calificaciones y portafolios antes de tomar una decisión.',
      'faq.question3': '¿Cómo funciona el sistema de pagos?',
      'faq.answer3': 'Utilizamos un sistema de depósito de garantía para proteger tanto a ti como al profesional. Tu pago se mantiene de forma segura hasta que los hitos del proyecto se completen y aprueben. Esto asegura trabajo de calidad mientras protege tu inversión.',
      'faq.question4': '¿Qué son los hitos?',
      'faq.answer4': 'Los hitos dividen tu proyecto en etapas manejables. Cada hito tiene un alcance, línea de tiempo y monto de pago específicos. Apruebas cada etapa antes de que el profesional pase a la siguiente, asegurando calidad y transparencia.',
      'faq.question5': '¿Es segura mi información de pago?',
      'faq.answer5': 'Absolutamente. Utilizamos cifrado estándar de la industria y procesamiento de pagos seguro a través de Stripe. Tu información de pago nunca se almacena en nuestros servidores.',
      'faq.question6': '¿Cómo empiezo?',
      'faq.answer6': 'Descarga la aplicación, crea una cuenta y comienza creando tu primera solicitud de servicio. ¡Es así de simple!',
      
      // Stats
      'stats.stat1.description': 'Profesionales verificados listos para ayudar a transformar tu hogar.',
      'stats.stat2.description': 'Calificación de estrellas de propietarios satisfechos en todos los proyectos.',
      'stats.stat3.description': 'Pagos seguros en depósito de garantía protegiendo tu inversión hasta que el trabajo se complete.',
      
      // CTA
      'cta.heading': '¿Listo para Transformar Tu Hogar?',
      'cta.subheading': 'Descarga MercadoMi hoy y conecta con profesionales de confianza en tu área.',
      
      // Footer
      'footer.subheading': 'Conectando propietarios con profesionales de confianza para todas tus necesidades de mejoras en el hogar.',
      'footer.quickLinks.features': 'Características',
      'footer.quickLinks.howItWorks': 'Cómo Funciona',
      'footer.quickLinks.services': 'Servicios',
      'footer.quickLinks.testimonials': 'Testimonios',
      'footer.quickLinks.faq': 'Preguntas Frecuentes',
      'footer.madeWith': 'Hecho con 💚 Aicrus',
    },
    pt: {
      // Menu
      'menu.home': 'Início',
      'menu.features': 'Recursos',
      'menu.howItWorks': 'Como Funciona',
      'menu.services': 'Serviços',
      'menu.testimonials': 'Depoimentos',
      'menu.download': 'Baixar',
      'menu.getStarted': 'Começar',
      
      // Hero
      'hero.heading': 'Transforme Sua Casa com Profissionais Confiáveis',
      'hero.subheading': 'Conecte-se com profissionais verificados de melhorias para o lar, obtenha consultas especializadas e gerencie seus projetos de renovação do início ao fim—tudo em um aplicativo poderoso.',
      
      // Benefits
      'benefits.findProfessionals.title': 'Encontre Profissionais Confiáveis Facilmente',
      'benefits.findProfessionals.description': 'Navegue por profissionais verificados em sua área. Veja avaliações, comentários, portfólios e áreas de serviço. Conecte-se com a opção perfeita para suas necessidades de melhorias no lar.',
      'benefits.findProfessionals.verifiedProfessionals.title': 'Apenas Profissionais Verificados',
      'benefits.findProfessionals.verifiedProfessionals.description': 'Cada profissional em nossa plataforma é verificado e avaliado. Garantimos qualidade e confiabilidade.',
      'benefits.findProfessionals.expertConsultations.title': 'Consultas Especializadas',
      'benefits.findProfessionals.expertConsultations.description': 'Obtenha orientação profissional para ajudá-lo a planejar seu projeto, entender os custos e tomar decisões informadas.',
      'benefits.findProfessionals.homeScanning.title': 'Digitalização Inteligente da Casa',
      'benefits.findProfessionals.homeScanning.description': 'Use nossa tecnologia integrada CubiCasa para criar plantas precisas de sua casa e obter melhores orçamentos.',
      
      'benefits.projectManagement.title': 'Gestão Completa de Projetos',
      'benefits.projectManagement.description': 'Divida seu projeto em marcos gerenciáveis. Acompanhe o progresso em tempo real, aprove etapas concluídas e garanta trabalho de qualidade em cada etapa. Você sempre está no controle.',
      'benefits.projectManagement.milestoneTracking.title': 'Acompanhamento Baseado em Marcos',
      'benefits.projectManagement.milestoneTracking.description': 'Monitore seu projeto através de cronogramas baseados em marcos. Aprove etapas concluídas e observe a transformação de sua casa.',
      'benefits.projectManagement.compareProducts.title': 'Compare Produtos e Preços',
      'benefits.projectManagement.compareProducts.description': 'Busque materiais de grandes varejistas como Home Depot e Lowe\'s. Compare preços e adicione itens ao orçamento do seu projeto.',
      'benefits.projectManagement.realTimeCommunication.title': 'Comunicação em Tempo Real',
      'benefits.projectManagement.realTimeCommunication.description': 'Converse diretamente com profissionais durante todo o seu projeto. Compartilhe fotos, faça perguntas e mantenha-se atualizado sobre o progresso.',
      
      'benefits.securePayments.title': 'Proteção de Pagamentos Seguros',
      'benefits.securePayments.description': 'Seus pagamentos são mantidos em garantia até que os marcos sejam concluídos e aprovados. Isso garante que os profissionais sejam pagos de forma justa enquanto protege você de trabalhos incompletos ou insatisfatórios.',
      'benefits.securePayments.escrowSystem.title': 'Sistema de Pagamento em Garantia',
      'benefits.securePayments.escrowSystem.description': 'Seu pagamento é mantido com segurança até que os marcos do projeto sejam concluídos e aprovados. Isso garante trabalho de qualidade enquanto protege seu investimento.',
      'benefits.securePayments.transparency.title': 'Transparência Completa',
      'benefits.securePayments.transparency.description': 'Veja orçamentos detalhados, listas de materiais, cronogramas e atualizações de progresso. Tudo está documentado, para que você sempre saiba o que está acontecendo.',
      'benefits.securePayments.projectHistory.title': 'Histórico e Portfólio de Projetos',
      'benefits.securePayments.projectHistory.description': 'Mantenha um registro de todos os seus projetos de melhorias no lar. Construa um portfólio de trabalhos concluídos e referencie facilmente projetos passados.',
      
      // Pricing
      'pricing.title': 'Preços',
      'pricing.description': 'Preços simples e transparentes. Sem surpresas.',
      'pricing.starter.name': 'Básico',
      'pricing.starter.feature1': 'Integração básica na nuvem',
      'pricing.starter.feature2': 'Até 5 membros da equipe',
      'pricing.starter.feature3': '20GB de armazenamento',
      'pricing.starter.feature4': 'Suporte por e-mail',
      'pricing.pro.name': 'Pro',
      'pricing.pro.feature1': 'Integração avançada na nuvem',
      'pricing.pro.feature2': 'Até 20 membros da equipe',
      'pricing.pro.feature3': '100GB de armazenamento',
      'pricing.pro.feature4': 'Suporte prioritário por e-mail e telefone',
      'pricing.pro.feature5': 'Análises avançadas',
      'pricing.enterprise.name': 'Empresarial',
      'pricing.enterprise.price': 'Personalizado',
      'pricing.enterprise.feature1': 'Integração completa na nuvem',
      'pricing.enterprise.feature2': 'Membros ilimitados da equipe',
      'pricing.enterprise.feature3': 'Armazenamento ilimitado',
      'pricing.enterprise.feature4': 'Suporte dedicado 24/7',
      'pricing.enterprise.feature5': 'Soluções personalizadas',
      'pricing.enterprise.feature6': 'Treinamento no local',
      
      // How It Works
      'howItWorks.title': 'Como Funciona',
      'howItWorks.description': 'Passos simples e seguros desde a solicitação até a conclusão',
      'howItWorks.step1.title': 'Crie Sua Solicitação',
      'howItWorks.step1.description': 'Crie sua solicitação de serviço em minutos. Adicione descrição, fotos e localização. Escolha entre solicitação aberta ou direta para um profissional específico.',
      'howItWorks.step1.detail1': 'Crie sua solicitação de serviço em minutos',
      'howItWorks.step1.detail2': 'Adicione descrição, fotos e localização',
      'howItWorks.step1.detail3': 'Escolha entre solicitação aberta ou direta para um profissional específico',
      'howItWorks.step1.detail4': 'Opcional: Use a digitalização CubiCasa para plantas precisas',
      'howItWorks.step2.title': 'Obtenha Visitas e Orçamentos',
      'howItWorks.step2.description': 'Profissionais solicitam agendar visitas ao local. Confirme datas e horários de visita via chat no app. Receba orçamentos detalhados após os profissionais avaliarem seu projeto.',
      'howItWorks.step2.detail1': 'Profissionais solicitam agendar visitas ao local',
      'howItWorks.step2.detail2': 'Confirme datas e horários de visita via chat no app',
      'howItWorks.step2.detail3': 'Receba orçamentos detalhados após os profissionais avaliarem seu projeto',
      'howItWorks.step2.detail4': 'Compare múltiplos orçamentos lado a lado (preços, prazos, materiais)',
      'howItWorks.step3.title': 'Escolha e Pague com Segurança',
      'howItWorks.step3.description': 'Revise e compare todos os orçamentos. Selecione o melhor profissional para seu projeto. Faça um pagamento seguro (mantido com segurança até que o trabalho seja concluído).',
      'howItWorks.step3.detail1': 'Revise e compare todos os orçamentos',
      'howItWorks.step3.detail2': 'Selecione o melhor profissional para seu projeto',
      'howItWorks.step3.detail3': 'Sistema de Garantia: Seu pagamento é mantido com segurança pela Mercado Me',
      'howItWorks.step3.detail4': '100% Seguro: Criptografia de nível bancário (Stripe)',
      'howItWorks.step4.title': 'Acompanhe e Complete',
      'howItWorks.step4.description': 'Monitore o progresso do projeto em tempo real. Aprove marcos conforme o trabalho é concluído. Libere pagamentos incrementalmente. Avalie e comente quando terminar.',
      'howItWorks.step4.detail1': 'Monitore o progresso do projeto em tempo real',
      'howItWorks.step4.detail2': 'Aprove marcos conforme o trabalho é concluído',
      'howItWorks.step4.detail3': 'Libere pagamentos incrementalmente',
      'howItWorks.step4.detail4': 'Avalie e comente quando terminar',

      // Service Categories
      'serviceCategories.title': 'Serviços Que Cobrimos',
      'serviceCategories.description': 'Desde reparos simples até renovações completas',
      'serviceCategories.cleaning.name': 'Limpeza',
      'serviceCategories.repair.name': 'Reparos',
      'serviceCategories.painting.name': 'Pintura',
      'serviceCategories.hvac.name': 'HVAC',
      'serviceCategories.plumbing.name': 'Encanamento',
      'serviceCategories.electrical.name': 'Elétrica',
      'serviceCategories.landscaping.name': 'Paisagismo',
      'serviceCategories.more.name': 'Mais',

      // Testimonials
      'testimonials.title': 'O Que Nossos Clientes Dizem',
      'testimonials.description': 'Ouça de proprietários que transformaram seus projetos conosco.',
      'testimonials.testimonial1.name': 'Sarah M.',
      'testimonials.testimonial1.role': 'Reforma de Cozinha',
      'testimonials.testimonial1.message': 'Com o MercadoMi pude contratar o melhor serviço com um orçamento que tinha os materiais validados pelo app. Isso me deu muito mais confiança na escolha.',
      'testimonials.testimonial2.name': 'John D.',
      'testimonials.testimonial2.role': 'Projeto Residencial',
      'testimonials.testimonial2.message': 'O app é muito útil. Com ele consigo medir toda a planta do local, assim o profissional consegue dar um orçamento mais preciso e honesto. Vale muito a pena.',
      'testimonials.testimonial3.name': 'Maria L.',
      'testimonials.testimonial3.role': 'Reforma de Banheiro',
      'testimonials.testimonial3.message': 'Usei para reformar meu banheiro e gostei bastante. Os profissionais são verificados, dá pra acompanhar tudo pelo app e o pagamento fica seguro até a obra ficar pronta.',
      
      // FAQ
      'faq.title': 'Perguntas Frequentes',
      'faq.subtitle': 'PERGUNTAS FREQUENTES',
      'faq.askUs': 'Pergunte-nos qualquer coisa!',
      'faq.question1': 'O que é MercadoMi?',
      'faq.answer1': 'MercadoMi é uma plataforma completa de melhorias para o lar que conecta proprietários com profissionais verificados para serviços de renovação, reparo e manutenção. Fornecemos ferramentas para gestão de projetos, busca de materiais e pagamentos seguros.',
      'faq.question2': 'Como encontro um profissional?',
      'faq.answer2': 'Simplesmente crie uma solicitação de serviço descrevendo suas necessidades. Profissionais verificados em sua área enviarão orçamentos detalhados. Você pode navegar por seus perfis, avaliações e portfólios antes de tomar uma decisão.',
      'faq.question3': 'Como funciona o sistema de pagamentos?',
      'faq.answer3': 'Usamos um sistema de garantia para proteger tanto você quanto o profissional. Seu pagamento é mantido com segurança até que os marcos do projeto sejam concluídos e aprovados. Isso garante trabalho de qualidade enquanto protege seu investimento.',
      'faq.question4': 'O que são marcos?',
      'faq.answer4': 'Marcos dividem seu projeto em etapas gerenciáveis. Cada marco tem um escopo, cronograma e valor de pagamento específicos. Você aprova cada etapa antes que o profissional passe para a próxima, garantindo qualidade e transparência.',
      'faq.question5': 'Minhas informações de pagamento estão seguras?',
      'faq.answer5': 'Absolutamente. Usamos criptografia padrão da indústria e processamento de pagamentos seguro através do Stripe. Suas informações de pagamento nunca são armazenadas em nossos servidores.',
      'faq.question6': 'Como começo?',
      'faq.answer6': 'Baixe o aplicativo, crie uma conta e comece criando sua primeira solicitação de serviço. É simples assim!',
      
      // Stats
      'stats.stat1.description': 'Profissionais verificados prontos para ajudar a transformar sua casa.',
      'stats.stat2.description': 'Avaliação de estrelas de proprietários satisfeitos em todos os projetos.',
      'stats.stat3.description': 'Pagamentos seguros em garantia protegendo seu investimento até que o trabalho seja concluído.',
      
      // CTA
      'cta.heading': 'Pronto para Transformar Sua Casa?',
      'cta.subheading': 'Baixe MercadoMi hoje e conecte-se com profissionais confiáveis em sua área.',
      
      // Footer
      'footer.subheading': 'Conectando proprietários com profissionais confiáveis para todas as suas necessidades de melhorias no lar.',
      'footer.quickLinks.features': 'Recursos',
      'footer.quickLinks.howItWorks': 'Como Funciona',
      'footer.quickLinks.services': 'Serviços',
      'footer.quickLinks.testimonials': 'Depoimentos',
      'footer.quickLinks.faq': 'Perguntas Frequentes',
      'footer.madeWith': 'Feito com 💚 Aicrus',
    },
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

