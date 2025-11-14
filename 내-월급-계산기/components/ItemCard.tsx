import React, { useState, useEffect, useMemo } from 'react';
import { Item, Category } from '../types';

interface ItemCardProps {
  item: Item;
  salary: number;
  index: number;
}

const AnimatedNumber: React.FC<{ value: number, isPrice?: boolean, unit?: string }> = ({ value, isPrice, unit }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setCurrentValue(easedProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
      }
    };

    const frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value]);

  const formatValue = () => {
    if (isPrice) {
      return `₩${Math.floor(currentValue).toLocaleString('ko-KR')}`;
    }
    if (currentValue < 1 && currentValue > 0) {
        return currentValue.toFixed(3);
    }
    if (currentValue < 10) {
        return currentValue.toFixed(2);
    }
    if (currentValue < 100) {
        return currentValue.toFixed(1);
    }
    return Math.floor(currentValue).toLocaleString('ko-KR');
  };

  return <span className="font-bold">{formatValue()}{unit}</span>;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, salary, index }) => {
  const quantity = salary / item.price;

  const { comment, colorClass } = useMemo(() => {
    let messages: string[];
    let colorClass = 'text-green-400';

    if (quantity < 0.001) {
      messages = item.messages.under001;
      colorClass = 'text-red-400';
    } else if (quantity < 1) {
      messages = item.messages.under1;
      colorClass = 'text-amber-400';
    } else if (quantity < 5) {
      messages = item.messages.under5;
      colorClass = 'text-amber-400';
    } else if (quantity < 100) {
      messages = item.messages.under100;
      colorClass = 'text-sky-400';
    } else if (quantity < 1000) {
      messages = item.messages.over100;
      colorClass = 'text-green-400';
    } else {
      messages = item.messages.over1000;
      colorClass = 'text-emerald-400';
    }
    const comment = messages[Math.floor(Math.random() * messages.length)];
    return { comment, colorClass };
  }, [quantity, item.messages]);

  return (
    <div
      className="bg-slate-700 rounded-xl shadow-lg p-6 flex flex-col gap-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-indigo-500/20 fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
      // A simple trick to re-trigger animation on filter/sort change
      key={item.name}
    >
      <div className="text-2xl font-bold">
        <span className="mr-3">{item.emoji}</span>
        {item.name}
      </div>
      <div className="text-lg text-slate-300">
        💰 <AnimatedNumber value={item.price} isPrice />
      </div>
      <div className="text-center bg-slate-800 p-4 rounded-lg my-2">
        <p className="text-slate-400 mb-1">🎯 내 월급으로...</p>
        <p className={`text-4xl md:text-5xl ${colorClass}`}>
          <AnimatedNumber value={quantity} unit={item.unit || '개'} />
        </p>
      </div>
      <div className="text-center text-slate-300 italic">
        💬 "{comment}"
      </div>
    </div>
  );
};

export default ItemCard;