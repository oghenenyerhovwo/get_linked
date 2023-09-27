import { createSlice } from '@reduxjs/toolkit'

import {
    getListings,
} from "../actions"

const initialState = {

    // get Listings
    errorGetListings: "",
    successGetListings: false,
    loadingGetListings: false,
    listings: [],
}

const listingSlice = createSlice({
    name: "listingStore",
    initialState,
    extraReducers: {
        [getListings.pending]: (state, { payload }) => {
            state.loadingGetListings=  true;
            state.errorGetListings= "";
        },
        [getListings.fulfilled]: (state, { payload }) => {
            state.loadingGetListings=  false;
            state.successGetListings= true;
            state.listings= payload.listings;
        },
        [getListings.rejected]: (state, { payload }) => {
            state.loadingGetListings=  false;
            state.errorGetListings= payload;
        },
    }
})

export default listingSlice.reducer