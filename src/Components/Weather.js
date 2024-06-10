import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../utils/locationSlice";
import Clock from "./Clock";

const Weather = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { weatherData } = useSelector((state) => state.location);

  const temp = weatherData?.main?.temp;
  const humidity = weatherData?.main?.humidity;
  const description = weatherData?.weather?.[0]?.description;
  const icon = weatherData?.weather?.[0]?.icon;
  const speed = weatherData?.wind?.speed;

  const handleWeatherResult = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0abb4b73083d6d13ed5741b429c5b542`
      );
      setCity("");
      setError("");
      dispatch(
        setLocation({
          location: city,
          latitude: res.data.coord.lat,
          longitude: res.data.coord.lon,
          weatherData: res.data,
        })
      );
    } catch (err) {
      setError("City not found");
    }
  };

  return (
    <>
      <div className="weather-section">
        <Container>
          <Row>
            <div className="form-container">
              <form onSubmit={handleWeatherResult} className="weather-form">
                <div className="input-box">
                  <div className="form-input">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter your City or Zip Code"
                    >
                      <Form.Control
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="search"
                      />
                    </FloatingLabel>
                  </div>
                  <Button type="submit">Search</Button>
                </div>
              </form>
            </div>
          </Row>
        </Container>
      </div>
      <div className="weather-container">
        <Container>
          <div className="weather-info-item">
            <Row>
              {weatherData && (
                <>
                  <Col md="12"><Clock /></Col>
                  <Col md={6}>
                    <div className="weather-heading">
                      <h4>Temperature: {(temp - 273.15).toFixed(2)}°C</h4>
                      <img width={75} height={75}
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="weather-items mt-4">
                      <span>
                        <strong> Humidity: </strong> {humidity}
                      </span>
                      <span>
                        <strong> Wind Speed: </strong> SSW {speed} km/h
                      </span>
                      <span>
                        <strong> Description: </strong> {description}
                      </span>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Weather;
