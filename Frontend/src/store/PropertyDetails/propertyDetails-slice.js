// propertyDetails

// create a slice name
// create initial state
// request starts 
// property data received
// error occurs
// export Actions
// export slice

import {createSlice} from '@reduxjs/toolkit';

const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState: {
    propertydetails:null,
    loading: false,
    error: null,
  },
  reducers:{
    getListRequest(state){
      state.loading = true;
    },
    getPropertyDetails(state, action){
      state.loading = false;
      state.propertydetails = action.payload;
    },
    getErrors(state, action){
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const propertyDetailsAction = propertyDetailsSlice.actions;
export default propertyDetailsSlice;