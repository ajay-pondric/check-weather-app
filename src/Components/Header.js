import { Col, Container, Row, Form } from 'react-bootstrap';
import locationIcon from '../assets/images/location-ic.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../utils/locationSlice';

const Header = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { currentLocation, latitude, longitude, weatherData } = useSelector((state) => state.location);

  // Get geaLocation
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('geoLocation is not supported by this browser');
    }
  };

  // Coordinates setting
  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    dispatch(setLocation({ latitude: lat, longitude: lon }));
  };

  useEffect(() => {
    getLocation();
    setThemeMode();
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then((response) => {
          console.log('apiCAll done', response);
          dispatch(setLocation({ location: response.data.name, latitude, longitude, weatherData: response.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [longitude, latitude, dispatch]);

  // Method for switch dark/light mode
  const handleToggle = () => {
    const toggleValue = !checked;
    setChecked(toggleValue);
    localStorage.setItem('themeMode', toggleValue ? 'light' : 'black');
    setThemeMode();
  }

  // Dark/Light Mode Setting method using localStorage
  const setThemeMode = () => {
    if (localStorage.getItem("themeMode") === "light") {
      document.body.classList.add("light-theme");
      setChecked(true);
    } else {
      document.body.classList.remove("light-theme");
      setChecked(false);
    }
  }

  return (
    <div className="header-section">
      <Container>
        <Row>
          <Col md={4} sm={4}>
            <h2>
              Check<span>Weather</span>
            </h2>
          </Col>
          <Col md={8} sm={8}>
            <div className="nav-right">
              <div className="current-location">
                <img width={24} height={24} src={locationIcon} alt="Location Icon" />
                <span> {currentLocation}</span>
              </div>
              <div className="switch-mode">
                <Form.Check type="switch" id="custom-switch"
                label={checked ? "🔆 Light mode" : "🌙 Dark mode"}
                   onChange={handleToggle}  />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
 };

 export default Header;
