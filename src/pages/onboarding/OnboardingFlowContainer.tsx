import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArthSetuPersonalization } from '../../components/onboarding/ArthSetuPersonalization';
import type { PersonalizationAnswers } from '../../components/onboarding/ArthSetuPersonalization';
import { PlanSelectionStep } from '../../components/onboarding/PlanSelectionStep';
import type { SelectedPlanInfo } from '../../components/onboarding/PlanSelectionStep';
import { AccountSetupLoading } from '../../components/onboarding/AccountSetupLoading';

type AdvisoryStep = 'personalization' | 'plan' | 'loading';

export const OnboardingFlowContainer: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AdvisoryStep>('personalization');
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanInfo>({
    tier: 'Free',
    price: '₹0',
    billingFrequency: 'monthly'
  });

  const handlePersonalizationComplete = (answers: PersonalizationAnswers) => {
    localStorage.setItem('arthsetu_personalization', JSON.stringify(answers));
    setCurrentStep('plan');
  };

  const handlePlanSelected = (planInfo: SelectedPlanInfo) => {
    setSelectedPlan(planInfo);
    localStorage.setItem('arthsetu_selected_plan', JSON.stringify(planInfo));
    setCurrentStep('loading');
  };

  const handleSetupFinished = () => {
    navigate('/dashboard');
  };

  if (currentStep === 'personalization') {
    return <ArthSetuPersonalization onComplete={handlePersonalizationComplete} />;
  }

  if (currentStep === 'plan') {
    return <PlanSelectionStep onSelectPlan={handlePlanSelected} />;
  }

  return (
    <AccountSetupLoading
      planTier={selectedPlan.tier}
      onFinished={handleSetupFinished}
    />
  );
};

export default OnboardingFlowContainer;
