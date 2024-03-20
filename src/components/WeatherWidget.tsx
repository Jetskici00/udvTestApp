import React, { useState, useEffect } from 'react'
import '../styles/WeatherWidget.css'

interface WeatherWidgetProps {
  city: string
  onDelete: () => void
  onMove: (destinationColumn: string) => void
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city: initialCity,
  onDelete,
  onMove,
}) => {
  const [city, setCity] = useState<string>(initialCity)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCity, setNewCity] = useState<string>(initialCity)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8fe84a816ae377c5c9a8f297601aac71&units=metric`
        )
        if (!response.ok) {
          throw new Error('City not found')
        }
        const data = await response.json()
        setWeatherData(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setError('City not found')
      }
    }

    fetchWeatherData()
  }, [city])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setError(null)
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCity(event.target.value)
  }

  const handleSubmit = () => {
    setCity(newCity)
    handleCloseModal()
  }

  const handleDeleteWidget = () => {
    onDelete()
  }

  const handleMoveWidget = (destinationColumn: string) => {
    onMove(destinationColumn)
  }

  if (error) {
    console.error(error)
    return (
      <div className="weather-widget">
        <h2>Error: {error}</h2>
        <button onClick={handleOpenModal}>Settings</button>
        <button onClick={handleDeleteWidget}>Delete</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Set City</h2>
              <input type="text" value={newCity} onChange={handleCityChange} />
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <div className="widget">
      <h2>Weather in {city}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <button onClick={handleOpenModal} className="settings-button">
        Settings
      </button>
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
      {isModalOpen && (
        <div className="modal-weather">
          <div className="modal-content-weather">
            <h2>Set City</h2>
            <input type="text" value={newCity} onChange={handleCityChange} />
            <div>
              <button onClick={handleSubmit} className="save-button">
                Save
              </button>
              <button onClick={handleCloseModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherWidget
