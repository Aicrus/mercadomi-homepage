'use client';

import PricingColumn from "./PricingColumn";
import { useI18n } from "@/contexts/I18nContext";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
    const { t } = useI18n();
    const getTierTranslationKey = (tierName: string) => {
        const keyMap: Record<string, string> = {
            'Starter': 'starter',
            'Pro': 'pro',
            'Enterprise': 'enterprise'
        };
        return keyMap[tierName] || tierName.toLowerCase();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => {
                const tierKey = getTierTranslationKey(tier.name);
                return (
                    <PricingColumn 
                        key={tier.name} 
                        tier={tier} 
                        highlight={index === 1}
                        translationKey={tierKey}
                    />
                );
            })}
        </div>
    )
}

export default Pricing