export const calcTotalAmount = (rate, amount) => {
    return parseFloat(rate) * parseFloat(amount);
}

export const calcDifference = (historicalAmount, currentAmount) => {
    return parseFloat(currentAmount) - parseFloat(historicalAmount);
}

export const reverseExchangeRate = (rate) => {
    return 1 / parseFloat(rate);
}

export const calcDifferencePercentage = (historicalAmount, currentAmount) => {
    return ((100 * (currentAmount - historicalAmount)) / currentAmount);
}
