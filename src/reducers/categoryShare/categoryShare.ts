import { createSlice } from '@reduxjs/toolkit';
import { CategoryProduct } from 'types/CategoryProduct';

type CurrentDisplayState = {
  categoryShareLoading: boolean;
  categoryShareDetails: CategoryProduct[];
  selectedRetailerId?: number;
  selectedCategoryId?: number;
};

const initialState: CurrentDisplayState = {
  categoryShareLoading: false,
  categoryShareDetails: [],
  selectedRetailerId: undefined,
  selectedCategoryId: undefined,
};

export const categoryShareSlice = createSlice({
  name: 'categoryShare',
  initialState,
  reducers: {
    setCategoryShareLoading(state, action) {
      state.categoryShareLoading = action.payload;
    },
    setCategoryShareDetails(state, action) {
      state.categoryShareDetails = action.payload;
    },
    setSelectedCategoryShareDetails(state, action) {
      const { retailerId, categoryId } = action.payload;

      state.selectedRetailerId = Number(retailerId);
      state.selectedCategoryId = Number(categoryId);
    },
  },
});

export const categoryShareReducer = categoryShareSlice.reducer;
