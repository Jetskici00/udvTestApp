import React, { useState } from 'react'
import '../styles/CurrencyWidget.css'

function generateRandomRates(): Record<string, number> {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY']
  const rates: Record<string, number> = {}

  currencies.forEach((currency) => {
    let minRate = 70
    let maxRate = 100

    if (currency === 'USD' || currency === 'EUR') {
      minRate = 70
      maxRate = 100
    }

    rates[currency] = parseFloat(
      (minRate + Math.random() * (maxRate - minRate)).toFixed(2)
    )
  })

  return rates
}

interface CurrencyWidgetProps {
  onDelete: () => void
  onMove: (destinationColumn: string) => void
}

const CurrencyWidget: React.FC<CurrencyWidgetProps> = ({
  onDelete,
  onMove,
}) => {
  const [currency, setCurrency] = useState<string>('USD')
  const [rates] = useState(generateRandomRates())

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value)
  }

  const handleDeleteWidget = () => {
    onDelete()
  }

  const handleMoveWidget = (destinationColumn: string) => {
    onMove(destinationColumn)
  }

  return (
    <div className="widget">
      <h2>Currency Rate (1 {currency} to RUB)</h2>
      <p>Rate: {rates[currency].toFixed(2)}</p>
      <select
        value={currency}
        onChange={handleCurrencyChange}
        className="select-currency"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <div className="nav-buttons">
        <button
          onClick={() => handleMoveWidget('Column 1')}
          className="nav-button"
        >
          Move to 1
        </button>
        <button
          onClick={() => handleMoveWidget('Column 2')}
          className="nav-button"
        >
          Move to 2
        </button>
        <button
          onClick={() => handleMoveWidget('Column 3')}
          className="nav-button"
        >
          Move to 3
        </button>
      </div>
      <button onClick={handleDeleteWidget} className="delete-button">
        Delete
      </button>
    </div>
  )
}

export default CurrencyWidget
