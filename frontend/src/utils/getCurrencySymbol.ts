function getCurrencySymbol(currency: string): string {
    const currencySymbols: { [key: string]: string } = {
        USD: "$",     // Dólar Americano
        BRL: "R$",
        EUR: "€",     // Euro
        JPY: "¥",     // Iene Japonês
        GBP: "£",     // Libra Esterlina
        AUD: "A$",    // Dólar Australiano
        CAD: "C$",    // Dólar Canadense
        CHF: "CHF",   // Franco Suíço
        CNY: "¥",     // Yuan Renminbi Chinês
        HKD: "HK$",   // Dólar de Hong Kong
        NZD: "NZ$",   // Dólar Neozelandês
    };

    return currencySymbols[currency] || "Moeda não suportada";
}

export default getCurrencySymbol;