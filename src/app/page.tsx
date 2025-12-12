'use client';

import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import HowItWorks from "@/components/HowItWorks";
import ServiceCategories from "@/components/ServiceCategories";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import ClientOnly from "@/components/ClientOnly";
import { useI18n } from "@/contexts/I18nContext";
import { howItWorksSteps } from "@/data/howItWorks";
import { serviceCategories } from "@/data/serviceCategories";

const HomePage: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
        </div>
      </div>
      <Container>
        <Benefits />

        <Section
          id="how-it-works"
          title={t('howItWorks.title')}
          description={t('howItWorks.description')}
        >
          <HowItWorks steps={howItWorksSteps} />
        </Section>

        <Section
          id="services"
          title={t('serviceCategories.title')}
          description={t('serviceCategories.description')}
        >
          <ServiceCategories categories={serviceCategories} />
        </Section>

        <Section
          id="testimonials"
          title={t('testimonials.title')}
          description={t('testimonials.description')}
        >
          <Testimonials />
        </Section>

        <ClientOnly>
          <FAQ />
        </ClientOnly>

        <Stats />
        
        <CTA />
      </Container>
    </div>
  );
};

export default HomePage;
