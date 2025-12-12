import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Sarah M.',
        role: 'Homeowner',
        message: `Com o ${siteDetails.siteName} pude contratar o melhor serviço com um orçamento que tinha os materiais validados pelo app. Isso me deu muito mais confiança na escolha.`,
        avatar: '/images/testimonial-1.webp',
    },
    {
        name: 'John D.',
        role: 'Homeowner',
        message: `O app é muito útil. Com ele consigo medir toda a planta do local, assim o profissional consegue dar um orçamento mais preciso e honesto. Vale muito a pena.`,
        avatar: '/images/testimonial-2.webp',
    },
    {
        name: 'Maria L.',
        role: 'Homeowner',
        message: `Usei para reformar meu banheiro e gostei bastante. Os profissionais são verificados, dá pra acompanhar tudo pelo app e o pagamento fica seguro até a obra ficar pronta.`,
        avatar: '/images/testimonial-3.webp',
    },
];