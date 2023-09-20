import { createSlice } from "@reduxjs/toolkit";
type Hide = {
    isHide: boolean;
  };
  const initialState: Hide = {
    isHide:true
  };
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      HideHeader: (state) => {
        state.isHide = false;
       
      },
     ShowHeader: (state) => {
        state.isHide = true;
      
      },
    },
  });
  
  export default authSlice.reducer;
  export const { ShowHeader, HideHeader } = authSlice.actions;