import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <Header />
      <CurrencyConverter />
    </div>
  );
}

export default App;
