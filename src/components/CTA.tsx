'use client';

import { useI18n } from "@/contexts/I18nContext";
import { ctaDetails } from "@/data/cta"

import AppStoreButton from "./AppStoreButton"
import PlayStoreButton from "./PlayStoreButton"

const CTA: React.FC = () => {
    const { t } = useI18n();
    return (
        <section id="cta" className="mt-10 mb-5 lg:my-20 overflow-x-hidden">
            <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20 max-w-full">
                <div className="h-full w-full max-w-full overflow-x-hidden">
                    <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full max-w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
                        <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
                    </div>

                    <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">{t('cta.heading')}</h2>

                        <p className="mx-auto max-w-xl md:px-5">{t('cta.subheading')}</p>

                        <div className="mt-4 flex flex-col sm:flex-row items-center sm:gap-4">
                        <AppStoreButton />
                        <PlayStoreButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA