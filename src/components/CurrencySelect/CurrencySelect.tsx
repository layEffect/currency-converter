import React, { useEffect } from "react";
import s from "./CurrencySelect.module.css";
import { optionsData } from "../../assets/data/currencyData";

interface Props {
  label: string;
  defaultValue?: string;
  amount: number;
  onAmountChange: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
}

export const CurrencySelect: React.FC<Props> = ({
  label,
  defaultValue,
  amount,
  onAmountChange,
  onCurrencyChange,
}) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState(
    defaultValue || optionsData[0].optionCurrency
  );

  useEffect(() => {
    setSelectedCurrency(defaultValue || optionsData[0].optionCurrency);
  }, [defaultValue]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    onAmountChange(newAmount || 0);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <div className={s.currencySelect}>
      <div className={s.title}>{label}</div>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className={s.currencyAmount}
      />
      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className={s.currency}
      >
        {optionsData.map((option) => (
          <option key={option.optionCurrency} value={option.optionCurrency}>
            {option.optionCurrency}
          </option>
        ))}
      </select>
    </div>
  );
};
