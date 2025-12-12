'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

interface Step {
    number: number;
    title: string;
    description: string;
    details: string[];
    icon: React.ReactNode;
}

interface HowItWorksProps {
    steps: Step[];
}

interface DetailCardProps {
    detail: string;
    index: number;
    stepNumber: number;
    delay: number;
    t: (key: string) => string;
    isVisible: boolean;
    totalSteps: number;
}

const DetailCard: React.FC<DetailCardProps> = ({ detail, index, stepNumber, delay, t, isVisible, totalSteps }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 300, height: 60 });
    const [showLine, setShowLine] = useState(true);
    
    useEffect(() => {
        if (containerRef.current && isVisible) {
            const rect = containerRef.current.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        }
    }, [isVisible]);
    
    // Calcular o perímetro do retângulo arredondado
    const radius = 8;
    const perimeter = 2 * (dimensions.width + dimensions.height) - 4 * radius + 2 * Math.PI * radius;
    
    // Delay para animação sequencial: cada card começa quando o anterior termina (sincronizado)
    const animationDuration = 1.0; // Mais lento para ser mais suave
    // Delay base fixo para todos os cards (quando o card de explicação aparece)
    const baseDelay = 0.5;
    // Cada card começa exatamente quando o anterior termina
    const animationDelay = baseDelay + (index * animationDuration);
    // Tempo total: quando a animação completa e deve desaparecer
    const totalAnimationTime = animationDelay + animationDuration;
    
    // Calcular apenas o comprimento da base (parte inferior) do container
    const baseLength = dimensions.width;
    
    // Esconder a linha exatamente quando a animação termina (sem delay extra)
    useEffect(() => {
        if (isVisible && showLine) {
            const timer = setTimeout(() => {
                setShowLine(false);
            }, totalAnimationTime * 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, totalAnimationTime, showLine]);
    
    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 200 }}
            className="relative flex items-start gap-2 lg:gap-3 p-2.5 lg:p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 ml-4 lg:ml-6"
        >
            {/* Animated Border Line */}
            <AnimatePresence>
                {isVisible && dimensions.width > 0 && showLine && (
                    <motion.svg
                        key={`line-${stepNumber}-${index}`}
                        className="absolute -inset-[2px] w-full h-full pointer-events-none max-w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            opacity: { 
                                delay: animationDelay, 
                                duration: 0.05,
                                ease: "easeOut"
                            },
                            exit: {
                                duration: 0.1,
                                ease: "easeIn"
                            }
                        }}
                        viewBox={`0 0 ${dimensions.width + 4} ${dimensions.height + 4}`}
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id={`gradient-line-${stepNumber}-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7210FF" stopOpacity="0.4" />
                                <stop offset="50%" stopColor="#5a0dcc" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#7210FF" stopOpacity="0.4" />
                            </linearGradient>
                        </defs>
                        {/* Linha apenas na base do container */}
                        <motion.line
                            x1="1"
                            y1={dimensions.height + 1}
                            x2={dimensions.width + 1}
                            y2={dimensions.height + 1}
                            stroke={`url(#gradient-line-${stepNumber}-${index})`}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="6 12"
                            initial={{ strokeDashoffset: baseLength, opacity: 0 }}
                            animate={{ 
                                strokeDashoffset: 0, 
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                strokeDashoffset: {
                                    delay: animationDelay,
                                    duration: animationDuration,
                                    ease: [0.4, 0, 0.2, 1] // Curva suave e natural
                                },
                                opacity: {
                                    times: [0, 0.05, 0.98, 1],
                                    delay: animationDelay,
                                    duration: animationDuration,
                                    ease: [0.4, 0, 0.2, 1] // Curva suave
                                }
                            }}
                        />
                    </motion.svg>
                )}
            </AnimatePresence>
            
            {/* Step Number Badge - aparece antes da animação */}
            {showLine && (
                <motion.div 
                    className="relative z-10 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-gradient-to-br from-primary/20 to-primary-accent/20 flex items-center justify-center mt-0.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + 0.1, type: "spring", stiffness: 200 }}
                >
                    <span className="text-xs lg:text-sm font-bold text-primary">{index + 1}</span>
                </motion.div>
            )}
            
            {/* Check Icon - substitui o número quando a animação completa */}
            <AnimatePresence>
                {!showLine && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative z-10 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-gradient-to-br from-primary to-primary-accent flex items-center justify-center mt-0.5 shadow-md"
                    >
                        <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <p className="relative z-10 text-base lg:text-base text-foreground-accent leading-relaxed">
                {t(`howItWorks.step${stepNumber}.detail${index + 1}`) || detail}
            </p>
        </motion.div>
    );
};

const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => {
    const { t } = useI18n();
    const [selectedStep, setSelectedStep] = useState(1);

    const currentStep = steps.find(step => step.number === selectedStep) || steps[0];
    const progressPercentage = ((selectedStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="w-full">
            {/* Progress Bar - Only Desktop */}
            <div className="hidden lg:block mb-12 max-w-4xl mx-auto">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary-accent to-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Modern Timeline Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left: Step Selector with Timeline - Only Desktop */}
                <div className="hidden lg:block space-y-3">
                    {steps.map((step, index) => {
                        const isActive = selectedStep === step.number;
                        const isCompleted = selectedStep > step.number;
                        
                        return (
                            <motion.button
                                key={step.number}
                                onClick={() => setSelectedStep(step.number)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`w-full text-left group relative ${
                                    isActive ? 'z-10' : ''
                                }`}
                            >
                                <div className={`
                                    relative flex items-center gap-3 p-4 rounded-xl
                                    transition-all duration-300 ease-out
                                    ${isActive 
                                        ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-lg shadow-primary/20' 
                                        : 'bg-white/50 backdrop-blur-sm border-2 border-transparent hover:border-gray-200 hover:bg-white/80 hover:shadow-md'
                                    }
                                    ${isCompleted ? 'opacity-75' : ''}
                                `}>
                                    {/* Timeline Connector */}
                                    {index < steps.length - 1 && (
                                        <div className={`
                                            absolute left-7 top-12 w-0.5 h-full
                                            ${isActive || isCompleted ? 'bg-gradient-to-b from-primary to-primary/30' : 'bg-gray-200'}
                                            transition-colors duration-300
                                        `} />
                                    )}

                                    {/* Step Number Badge */}
                                    <div className={`
                                        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                                        transition-all duration-300
                                        ${isActive 
                                            ? 'bg-gradient-to-br from-primary to-primary-accent text-white shadow-lg shadow-primary/30' 
                                            : isCompleted
                                            ? 'bg-primary/20 text-primary'
                                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                        }
                                    `}>
                                        {isCompleted ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <span className="text-base font-bold">{step.number}</span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`
                                            text-lg lg:text-xl font-semibold mb-1 transition-colors duration-300
                                            ${isActive ? 'text-foreground' : 'text-foreground-accent group-hover:text-foreground'}
                                        `}>
                                            {t(`howItWorks.step${step.number}.title`)}
                                        </h3>
                                        <p className={`
                                            text-sm lg:text-base line-clamp-1 transition-colors duration-300
                                            ${isActive ? 'text-foreground-accent' : 'text-gray-500'}
                                        `}>
                                            {t(`howItWorks.step${step.number}.description`)}
                                        </p>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <div className={`
                                        flex-shrink-0 transition-all duration-300
                                        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                                    `}>
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right: Detailed Content - Only Desktop */}
                <div className="hidden lg:block lg:sticky lg:top-24 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedStep}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl p-6 lg:p-7 shadow-xl border border-gray-100"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary-accent/20 mb-4 text-primary"
                            >
                                <div className="text-3xl">
                                    {currentStep.icon}
                                </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">
                                {t(`howItWorks.step${currentStep.number}.title`)}
                            </h3>

                            {/* Description */}
                            <p className="text-base text-foreground-accent mb-6 leading-relaxed">
                                {t(`howItWorks.step${currentStep.number}.description`)}
                            </p>

                            {/* Details Grid */}
                            <div className="relative space-y-2">
                                {/* Connecting Line */}
                                <motion.div
                                    className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                    style={{ transformOrigin: "top" }}
                                />
                                
                                {currentStep.details.map((detail, index) => (
                                    <DetailCard
                                        key={index}
                                        detail={detail}
                                        index={index}
                                        stepNumber={currentStep.number}
                                        delay={0.3 + index * 0.1}
                                        t={t}
                                        isVisible={true}
                                        totalSteps={currentStep.details.length}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile/Tablet: Horizontal Scrollable Tabs */}
            <div className="lg:hidden">
                <div className="overflow-x-auto pb-3 lg:pb-4 scrollbar-hide mb-4 lg:mb-6">
                    <div className="flex gap-2 lg:gap-3 justify-start md:justify-center">
                        {steps.map((step) => {
                            const isActive = selectedStep === step.number;
                            return (
                                <button
                                    key={step.number}
                                    onClick={() => setSelectedStep(step.number)}
                                    className={`
                                        flex-shrink-0 px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-sm font-medium
                                        transition-all duration-300 whitespace-nowrap
                                        ${isActive 
                                            ? 'bg-gradient-to-r from-primary to-primary-accent text-white shadow-lg' 
                                            : 'bg-white text-foreground-accent border border-gray-200 hover:border-primary/30'
                                        }
                                    `}
                                >
                                    {step.number}. {t(`howItWorks.step${step.number}.title`)}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                {/* Mobile/Tablet: Detailed Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedStep}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100"
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary-accent/20 mb-3 lg:mb-4 text-primary"
                        >
                            <div className="text-2xl lg:text-3xl">
                                {currentStep.icon}
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-foreground">
                            {t(`howItWorks.step${currentStep.number}.title`)}
                        </h3>

                        {/* Description */}
                        <p className="text-base lg:text-base text-foreground-accent mb-4 lg:mb-6 leading-relaxed">
                            {t(`howItWorks.step${currentStep.number}.description`)}
                        </p>

                        {/* Details Grid */}
                        <div className="relative space-y-1.5 lg:space-y-2">
                            {/* Connecting Line */}
                            <motion.div
                                className="absolute left-4 lg:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                style={{ transformOrigin: "top" }}
                            />
                            
                            {currentStep.details.map((detail, index) => (
                                <DetailCard
                                    key={index}
                                    detail={detail}
                                    index={index}
                                    stepNumber={currentStep.number}
                                    delay={0.3 + index * 0.1}
                                    t={t}
                                    isVisible={true}
                                    totalSteps={currentStep.details.length}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HowItWorks;

