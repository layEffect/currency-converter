import axios from "axios";

const instance = axios.create({
  baseURL: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/",
});

export const currencyAPI = {
  async getCurrency(
    incomingCurrency: string,
    outgoingCurrency: string
  ): Promise<number | null> {
    try {
      const response = await instance.get(
        `currencies/${incomingCurrency}.json`
      );

      const currencyData = response.data[incomingCurrency];
      if (currencyData && currencyData[outgoingCurrency]) {
        return currencyData[outgoingCurrency];
      } else {
        console.error(
          `Currency pair ${incomingCurrency}-${outgoingCurrency} not found.`
        );
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch currency data:", error);
      return null;
    }
  },
};
