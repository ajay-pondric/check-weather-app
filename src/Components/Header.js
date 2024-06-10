import { Col, Container, Row, Form } from "react-bootstrap";
import locationIcon from "../assets/images/location-ic.svg";
import { useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../utils/locationSlice";
import { toggleTheme } from "../utils/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { currentLocation, latitude, longitude, weatherData } = useSelector(
    (state) => state.location
  );
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Get geaLocation
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("geoLocation is not supported by this browser");
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
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        )
        .then((response) => {
          console.log("apiCAll done", response);
          dispatch(
            setLocation({
              location: response.data.name,
              latitude,
              longitude,
              weatherData: response.data,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [longitude, latitude, dispatch]);

  // Method for switch dark/light mode
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`header ${darkMode ? "dark" : "light"}`}>
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
                <img
                  width={24}
                  height={24}
                  src={locationIcon}
                  alt="Location Icon"
                />
                <span> {currentLocation}</span>
              </div>
              <div className="switch-mode">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={darkMode ? "🌙 Dark mode" : "🔆 Light mode"}
                  onChange={handleToggle}
                  checked={darkMode}
                />
                {/* <button onClick={handleToggle}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
