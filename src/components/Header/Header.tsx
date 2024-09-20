import React from "react";
import s from "./Header.module.css";
import { CurrencyTable } from "../CurrencyTable/CurrencyTable";

export const Header: React.FC = () => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.title}>Currency Converter</div>

      <CurrencyTable />
    </div>
  );
};
