import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: null
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProducts } = productSlice.actions;

export const getAllProducts = (pageCount) => async (dispatch) => {
  
  // api given
  const api = "https://6525210567cfb1e59ce6ae75.mockapi.io/api/v1/designstyles";

  // fake data api
  // if you want to see selection of products, pagination clearly then use the below api
  // const api = `https://picsum.photos/v2/list?page=${pageCount}&limit=100`;

  try {
    const res = await axios.get(api);
    if(res && res.status === 200){
      dispatch(addProducts(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export const sendSelectedProducts = (products) => async (dispatch) => {
  try {
    // call api to save the products selected by the user
    console.log(products)
  } catch (error) {
    console.log(error);
  }
}

export default productSlice.reducer