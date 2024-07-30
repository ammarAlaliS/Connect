import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInitialCard: true,
  isOriginAutoCompleteFocused: false,
  placesSelected: false,
  quickCarsData: null,
  tripOrigin: { latitude: 0, longitude: 0 },
  tripOriginName: "",
  tripDestination: { latitude: 0, longitude: 0 },
  tripDestinationName: "",
  quickCarsDistances: null,
  locationForegroundPermissions: "denied",
  userLocation: { latitude: 0, longitude: 0 },
  startTime: { hour: 0, minutes: 0 },
  seatRequested: 0,
  inputIsActive: false,
  region: {
    latitude: 40.355594,
    longitude: -3.702583,
    latitudeDelta: 0.1522,
    longitudeDelta: 0.221,
  },
  quickCarDataReceivedForUpdate: [],
  roomsJoined: [],
};

export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setShowInitialCard: (state, action) => {
      state.showInitialCard = action.payload;
    },
    setIsOriginAutoCompleteFocused: (state, action) => {
      state.isOriginAutoCompleteFocused = action.payload;
    },
    setPlacesSelected: (state, action) => {
      state.placesSelected = action.payload;
    },
    setQuickarData: (state, action) => {
      state.quickCarsData = action.payload;
    },
    setTripOrigin: (state, action) => {
      state.tripOrigin = action.payload;
    },
    setTripOriginName: (state, action) => {
      state.tripOriginName = action.payload;
    },
    setTripDestination: (state, action) => {
      state.tripDestination = action.payload;
    },
    setTripDestinationName: (state, action) => {
      state.tripDestinationName = action.payload;
    },
    setQuickCarsDistances: (state, action) => {
      state.quickCarsDistances = action.payload;
    },
    setLocationForegroundPermissions: (state, action) => {
      state.locationForegroundPermissions = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setSeatRequested: (state, action) => {
      state.seatRequested = action.payload;
    },
    setIsInputActive: (state, action) => {
      state.inputIsActive = action.payload;
    },
    setMapRegion: (state, action) => {
      state.region = action.payload;
    },
    setRoomsJoined: (state, action) => {
      state.roomsJoined = action.payload;
    },
    updateIndividualQuickCarLocations: (state, action) => {
      state.quickCarsData = state.quickCarsData.map((el, index) => {
        if (el.id == action.id) {
          return {
            ...el,
            CurrentQuickCarLocation: {
              latitude: action.latitude,
              longitude: action.longitude,
            },
          };
        } else {
          return el;
        }
      });
    },
    receiveDataFromQuickarSocketLocations: (state, action) => {
      console.log("SE PIDIO UNA ACTUALIZACION DE LOS DATOS CON LA ACCION");
      console.log(action);

      if (
        state.quickCarDataReceivedForUpdate.filter(
          (el) => el.id == action.payload.id
        ).length > 0
      ) {
        state.quickCarDataReceivedForUpdate =
          state.quickCarDataReceivedForUpdate.map((el, index) => {
            if (el.id == action.payload.id) {
              return {
                ...el,
                CurrentQuickCarLocation: {
                  latitude: action.payload.latitude,
                  longitude: action.payload.longitude,
                },
              };
            } else {
              return el;
            }
          });
      } else {
        state.quickCarDataReceivedForUpdate = [
          ...state.quickCarDataReceivedForUpdate,
          {
            id: action.payload.id,
            CurrentQuickCarLocation: {
              latitude: action.payload.latitude,
              longitude: action.payload.longitude,
            },
          },
        ];
      }
    },
    updateAllQuickCarCurrentLocation: (state) => {
      console.log("Se trabaja en la actualizacion");
      console.log(state.quickCarsData?.length);

      state.quickCarsData = state.quickCarsData
        ? state.quickCarsData.map((el, index) => {
            let currentLocation = state.quickCarDataReceivedForUpdate.filter(
              (location) => location.id == el.id
            );

            console.log(
              "La cantidad de elamentos encontrados fueron: " +
                currentLocation.length
            );

            if (currentLocation.length > 0) {
              console.log("Intento actualizarse la MIERDA");
              console.log(currentLocation[0]);
              console.log(el.CurrentQuickCarLocation);
              return {
                ...el,
                CurrentQuickCarLocation: {
                  latitude: currentLocation[0].CurrentQuickCarLocation.latitude,
                  longitude:
                    currentLocation[0].CurrentQuickCarLocation.longitude,
                },
              };
            } else {
              return el;
            }
          })
        : [];
      state.quickCarDataReceivedForUpdate = [];
    },
  },
});

export const {
  setShowInitialCard,
  setIsOriginAutoCompleteFocused,
  setPlacesSelected,
  setQuickarData,
  setTripOrigin,
  setTripOriginName,
  setTripDestination,
  setTripDestinationName,
  setQuickCarsDistances,
  setLocationForegroundPermissions,
  setUserLocation,
  setStartTime,
  setSeatRequested,
  setIsInputActive,
  setMapRegion,
  updateIndividualQuickCarLocations,
  updateAllQuickCarCurrentLocation,
  receiveDataFromQuickarSocketLocations,
  setRoomsJoined,
} = travelSlice.actions;
export default travelSlice.reducer;
