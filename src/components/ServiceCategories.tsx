'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

interface Category {
    name: string;
    icon: React.ReactNode;
    translationKey: string;
}

interface ServiceCategoriesProps {
    categories: Category[];
}

const containerVariants = {
    offscreen: {
        opacity: 0,
    },
    onscreen: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.06,
        }
    }
};

const categoryVariants = {
    offscreen: {
        opacity: 0,
        y: 30,
        scale: 0.8,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.8,
        }
    },
};

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({ categories }) => {
    const { t } = useI18n();

    return (
        <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-50px" }}
        >
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    variants={categoryVariants}
                    whileHover={{ 
                        y: -8,
                        transition: { type: "spring", stiffness: 400 }
                    }}
                    className="group cursor-pointer"
                >
                    <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
                        
                        <div className="relative flex flex-col items-center text-center gap-4">
                            {/* Icon Container */}
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-md"
                            >
                                <div className="text-secondary text-3xl lg:text-4xl group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                                    {category.icon}
                                </div>
                            </motion.div>
                            
                            {/* Category Name */}
                            <h3 className="font-semibold text-base lg:text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                                {t(`serviceCategories.${category.translationKey}.name`)}
                            </h3>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ServiceCategories;
