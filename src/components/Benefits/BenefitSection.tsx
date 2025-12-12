"use client"
import Image from "next/image";
import clsx from "clsx";
import { motion, Variants } from "framer-motion"

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { useI18n } from "@/contexts/I18nContext";
import { IBenefit } from "@/types";

interface Props {
    benefit: IBenefit;
    imageAtRight?: boolean;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

export const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1,
        }
    },
};

const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }: Props) => {
    const { t } = useI18n();
    const { title, description, imageSrc, bullets, translationKey } = benefit;

    return (
        <section className="benefit-section">
            <motion.div
                className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div
                    className={clsx("flex flex-wrap items-center justify-center w-full max-w-lg mx-auto", { "lg:justify-start": imageAtRight, "lg:order-1 lg:justify-end": !imageAtRight })}
                >
                    <div className="w-full text-center lg:text-left">
                        <motion.div
                            className="flex flex-col w-full"
                            variants={childVariants}
                        >
                            <SectionTitle>
                                <h3 className="lg:max-w-2xl break-words">
                                    {translationKey ? t(`benefits.${translationKey}.title`) : title}
                                </h3>
                            </SectionTitle>

                            <p className="mt-1.5 mx-auto lg:ml-0 leading-relaxed text-foreground-accent break-words">
                                {translationKey ? t(`benefits.${translationKey}.description`) : description}
                            </p>
                        </motion.div>

                        <div className="mx-auto lg:ml-0 w-full">
                            {bullets.map((item, index) => {
                                const bulletKey = item.translationKey || '';
                                return (
                                    <BenefitBullet 
                                        key={index} 
                                        title={bulletKey ? t(`benefits.${translationKey}.${bulletKey}.title`) : item.title} 
                                        icon={item.icon} 
                                        description={bulletKey ? t(`benefits.${translationKey}.${bulletKey}.description`) : item.description} 
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className={clsx("mt-5 lg:mt-0 w-full flex justify-center", { "lg:order-2 lg:justify-start": imageAtRight, "lg:justify-end": !imageAtRight })}>
                    <div className="w-fit flex justify-center">
                        <Image 
                            src={imageSrc} 
                            alt="title" 
                            width={450} 
                            height={850} 
                            quality={100} 
                            className="object-contain max-w-full h-auto w-full" 
                            style={{ maxHeight: '80vh', maxWidth: 'min(400px, 100%)' }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default BenefitSection