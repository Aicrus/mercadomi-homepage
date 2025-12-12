'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/contexts/I18nContext';
import { testimonials } from '@/data/testimonials';

const Testimonials: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className=""
                >
                    <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                        <Image
                            src={testimonial.avatar}
                            alt={`${testimonial.name} avatar`}
                            width={50}
                            height={50}
                            className="rounded-full shadow-md"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-secondary">
                                {t(`testimonials.testimonial${index + 1}.name`)}
                            </h3>
                            <p className="text-sm text-foreground-accent">
                                {t(`testimonials.testimonial${index + 1}.role`)}
                            </p>
                        </div>
                    </div>
                    <p className="text-foreground-accent text-center lg:text-left">
                        &quot;{t(`testimonials.testimonial${index + 1}.message`)}&quot;
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;
