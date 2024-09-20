import React, { useEffect, useState } from "react";
import s from "./CurrencyConverter.module.css";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import {
  fetchConversionRatio,
  setFirstAmount,
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency,
} from "../../store/reducers/converterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import switchIcon from "../../assets/images/switchIcon.png";

export const CurrencyConverter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { firstCurrency, secondCurrency, firstAmount, secondAmount } =
    useAppSelector((state) => state.converter);

  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    dispatch(fetchConversionRatio({ firstCurrency, secondCurrency }));
  }, [firstCurrency, secondCurrency, dispatch]);

  const handleSwitchClick = () => {
    setIsRotated(!isRotated);

    dispatch(setFirstCurrency(secondCurrency));
    dispatch(setSecondCurrency(firstCurrency));
  };

  const handleFirstAmountChange = (amount: number) => {
    dispatch(setFirstAmount(amount));
  };

  const handleSecondAmountChange = (amount: number) => {
    dispatch(setSecondAmount(amount));
  };

  const handleFirstCurrencyChange = (currency: string) => {
    dispatch(setFirstCurrency(currency));
  };

  const handleSecondCurrencyChange = (currency: string) => {
    dispatch(setSecondCurrency(currency));
  };

  return (
    <div className={s.converterWrapper}>
      <div className={s.converter}>
        <CurrencySelect
          label={"Перша валюта"}
          defaultValue={firstCurrency}
          amount={firstAmount}
          onAmountChange={handleFirstAmountChange}
          onCurrencyChange={handleFirstCurrencyChange}
        />
        <img
          className={`${s.switch} ${isRotated ? s.rotated : ""}`}
          src={switchIcon}
          alt="switch"
          onClick={handleSwitchClick}
        />
        <CurrencySelect
          label={"Друга валюта"}
          defaultValue={secondCurrency}
          amount={secondAmount}
          onAmountChange={handleSecondAmountChange}
          onCurrencyChange={handleSecondCurrencyChange}
        />
      </div>
    </div>
  );
};
