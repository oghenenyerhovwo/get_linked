import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setError, backend_url, setHeader } from "../../utils"

export const getListings = createAsyncThunk(`GET_LISTINGS`, async (nullDate, { rejectWithValue }) => {
  try {
    const { data } = await axios
      .get(
        `${backend_url}/listings/route/`,
      )
    return data
  } catch (err) {
    return rejectWithValue(setError(err))
  }
})