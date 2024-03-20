import React, { useState, useEffect } from 'react'
import '../styles/CurrencyPairWidget.css'

function generateRandomRate(): number {
  const minRate = 1.1
  const maxRate = 1.2
  return parseFloat((minRate + Math.random() * (maxRate - minRate)).toFixed(4))
}

interface CurrencyPairWidgetProps {
  onDelete: () => void
  onMove: (destinationColumn: string) => void
}

const CurrencyPairWidget: React.FC<CurrencyPairWidgetProps> = ({
  onDelete,
  onMove,
}) => {
  const [selectedPair, setSelectedPair] = useState<string>('EUR/USD')
  const [rate, setRate] = useState<number>(0)
  const [lastRate, setLastRate] = useState<number>(0)
  const [arrowDirection, setArrowDirection] = useState<string>('')

  useEffect(() => {
    const fetchCurrencyPairRate = () => {
      const newRate = generateRandomRate()
      setRate(newRate)

      if (lastRate > newRate) {
        setArrowDirection('down')
      } else if (lastRate < newRate) {
        setArrowDirection('up')
      }
      setLastRate(newRate)
    }

    const interval = setInterval(fetchCurrencyPairRate, 5000)
    return () => clearInterval(interval)
  }, [selectedPair, lastRate])

  const handleDeleteWidget = () => {
    onDelete()
  }

  const handleMoveWidget = (destinationColumn: string) => {
    onMove(destinationColumn)
  }

  const handlePairChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(event.target.value)
    setRate(generateRandomRate())
  }

  return (
    <div className="widget">
      <h2>Currency Pair Rate {selectedPair}</h2>
      <div className={`rate ${arrowDirection}`}>
        <span
          className={
            arrowDirection === 'up'
              ? 'new-value-up'
              : arrowDirection === 'down'
              ? 'new-value-down'
              : ''
          }
        >
          {rate}
        </span>
        {arrowDirection === 'up' && <span> ⬆</span>}
        {arrowDirection === 'down' && <span> ⬇</span>}
      </div>
      <select
        value={selectedPair}
        onChange={handlePairChange}
        className="select-currency-pair"
      >
        <option value="EUR/USD">EUR/USD</option>
        <option value="EUR/GBP">EUR/GBP</option>
        <option value="EUR/JPY">EUR/JPY</option>
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

export default CurrencyPairWidget
