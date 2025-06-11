import React from 'react';
import { t } from 'i18next';
import ComponentCard from '../ComponentCard';

interface EmissionTopicsProps {
    attributes: {
        name: string;
        value: string;
    }[];
    guidence: string;
    referenceAnswer: string;
    questions?: {
        id: number;
        value: string;
    }[];
}

const CardViewTopic: React.FC<EmissionTopicsProps> = ({ attributes, guidence, referenceAnswer, questions }) => {
    return (
        <div className="space-y-2  min-w-[100%]" >
            <ComponentCard title={t('ATTRIBUTE_CONTENT')}>
                <div className="h-32 max-h-32  overflow-y-auto space-y-1 pr-2">
                    {attributes.map((attr, index) => (
                        <div key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="font-medium">{attr.name}</span>: {attr.value}
                        </div>
                    ))}
                </div>
            </ComponentCard>

            <ComponentCard title={t('GUIDANCE')}>
                <div className="h-32 max-h-32  overflow-y-auto space-y-1 pr-2">
                    {guidence}
                </div>
            </ComponentCard>

            <ComponentCard title={t('REFERENCE_ANSWER')}>
                <div className="h-32 max-h-32  overflow-y-auto space-y-1 pr-2">
                    {referenceAnswer}
                </div>
            </ComponentCard>
            {questions?.some(q => q.value?.trim()) && (
                <ComponentCard title={t('COL_QUESTIONS')}>
                    {questions.map((attr, index) => (
                        <div key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="font-medium">{attr.id}</span>: {attr.value}
                        </div>
                    ))}
                </ComponentCard>)}
        </div>
    );
};

export default CardViewTopic;
