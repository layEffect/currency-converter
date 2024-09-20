import React, { useEffect } from "react";
import s from "./CurrencyTable.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCurrencyData } from "../../store/reducers/currencyForTableSlice";

export const CurrencyTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const currencyDataForTable = useAppSelector(
    (state) => state.currencyForTable
  );

  useEffect(() => {
    dispatch(fetchCurrencyData());
  }, [dispatch]);

  return (
    <div className={s.currencyTable}>
      {currencyDataForTable.length > 0 && (
        <table className={s.courseTable}>
          <thead>
            <tr>
              <th>Валютна пара</th>
              <th>Співвідношення</th>
            </tr>
          </thead>
          <tbody>
            {currencyDataForTable.map((currency) => (
              <tr
                key={`${currency.incomingCurrency}-${currency.outgoingCurrency}`}
              >
                <td>{`${currency.incomingCurrency} / ${currency.outgoingCurrency}`}</td>
                <td>{currency.ratio.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
