import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentLocation: 'Delhi',
    latitude: null,
    longitude: null,
    weatherData: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.currentLocation = action.payload.location;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.weatherData = action.payload.weatherData;
    }
  }
});


export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;
