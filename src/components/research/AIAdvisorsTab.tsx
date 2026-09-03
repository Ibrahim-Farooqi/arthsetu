import React from 'react';
import { AiAdvisorsHub } from '../ai/AiAdvisorsHub';

interface AIAdvisorsTabProps {
  onTradeStock?: (stock: any) => void;
  onCompareStock?: (stock: any) => void;
}

export const AIAdvisorsTab: React.FC<AIAdvisorsTabProps> = ({
  onTradeStock,
  onCompareStock
}) => {
  return (
    <AiAdvisorsHub 
      onTradeStock={onTradeStock}
      onCompareStock={onCompareStock}
    />
  );
};

export default AIAdvisorsTab;
