import React, { useState } from 'react'
import './styles/App.css'
import WeatherWidget from './components/WeatherWidget'
import CurrencyWidget from './components/CurrencyWidget'
import CurrencyPairWidget from './components/CurrencyPairWidget'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState('')
  const [widgets, setWidgets] = useState<{ [column: string]: string[] }>({
    'Column 1': [],
    'Column 2': [],
    'Column 3': [],
  })

  const handleAddWidget = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleColumnSelect = (column: string) => {
    setSelectedColumn(column)
  }

  const handleWidgetSelect = (widget: string) => {
    if (selectedColumn) {
      setWidgets((prevWidgets) => ({
        ...prevWidgets,
        [selectedColumn]: [...prevWidgets[selectedColumn], widget],
      }))
      handleCloseModal()
    }
  }

  const handleDeleteWidget = (column: string, index: number) => {
    setWidgets((prevWidgets) => {
      const updatedWidgets = { ...prevWidgets }
      updatedWidgets[column].splice(index, 1)
      return updatedWidgets
    })
  }

  const handleMoveWidget = (
    sourceColumn: string,
    destinationColumn: string,
    index: number
  ) => {
    setWidgets((prevWidgets) => {
      const updatedWidgets = { ...prevWidgets }
      const widgetToMove = updatedWidgets[sourceColumn][index]
      updatedWidgets[sourceColumn].splice(index, 1)
      updatedWidgets[destinationColumn].push(widgetToMove)
      return updatedWidgets
    })
  }

  const isColumnSelected = selectedColumn !== ''

  return (
    <div className="app">
      <button className="btn add-btn" onClick={handleAddWidget}>
        Add Widget
      </button>
      <div className="columns"></div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select Column</h2>
            <select
              value={selectedColumn}
              onChange={(e) => handleColumnSelect(e.target.value)}
            >
              <option value="">Select Column</option>
              <option value="Column 1">Column 1</option>
              <option value="Column 2">Column 2</option>
              <option value="Column 3">Column 3</option>
            </select>
            <h2>Select Widget</h2>
            <div className="widget-options">
              <button
                className="btn"
                onClick={() => handleWidgetSelect('WeatherWidget')}
                disabled={!isColumnSelected}
              >
                Weather Widget
              </button>
              <button
                className="btn"
                onClick={() => handleWidgetSelect('CurrencyWidget')}
                disabled={!isColumnSelected}
              >
                Currency Widget
              </button>
              <button
                className="btn"
                onClick={() => handleWidgetSelect('CurrencyPairWidget')}
                disabled={!isColumnSelected}
              >
                CurrencyPairWidget
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="btn add-btn add-btn-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="columns">
        {Object.keys(widgets).map((column) => (
          <div className="column" key={column}>
            {widgets[column].map((widget, index) => (
              <div className="widget-container" key={index}>
                {widget === 'WeatherWidget' && (
                  <WeatherWidget
                    key={index}
                    city="Ekaterinburg"
                    onDelete={() => handleDeleteWidget(column, index)}
                    onMove={(destinationColumn: string) =>
                      handleMoveWidget(column, destinationColumn, index)
                    }
                  />
                )}
                {widget === 'CurrencyWidget' && (
                  <CurrencyWidget
                    key={index}
                    onDelete={() => handleDeleteWidget(column, index)}
                    onMove={(destinationColumn: string) =>
                      handleMoveWidget(column, destinationColumn, index)
                    }
                  />
                )}
                {widget === 'CurrencyPairWidget' && (
                  <CurrencyPairWidget
                    key={index}
                    onDelete={() => handleDeleteWidget(column, index)}
                    onMove={(destinationColumn: string) =>
                      handleMoveWidget(column, destinationColumn, index)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
