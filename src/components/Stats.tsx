'use client';

import { useI18n } from "@/contexts/I18nContext";
import { stats } from "@/data/stats"

const Stats: React.FC = () => {
    const { t } = useI18n();
    return (
        <section id="stats" className="py-10 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={stat.title} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
                        <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                            {stat.icon}
                            {stat.title}
                        </h3>
                        <p className="text-foreground-accent">{t(`stats.stat${index + 1}.description`)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats