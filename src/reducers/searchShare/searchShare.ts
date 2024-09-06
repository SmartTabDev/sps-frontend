import { createSlice } from '@reduxjs/toolkit';
import { KeywordProduct } from 'types/KeywordProduct';

type CurrentDisplayState = {
  searchShareLoading: boolean;
  searchShareDetails: KeywordProduct[];
  selectedRetailerId?: number;
  selectedKeywordId?: number;
};

const initialState: CurrentDisplayState = {
  searchShareLoading: false,
  searchShareDetails: [],
  selectedRetailerId: undefined,
  selectedKeywordId: undefined,
};

export const searchShareSlice = createSlice({
  name: 'searchShare',
  initialState,
  reducers: {
    setSearchShareLoading(state, action) {
      state.searchShareLoading = action.payload;
    },
    setSearchShareDetails(state, action) {
      state.searchShareDetails = action.payload;
    },
    setSelectedSearchShareDetails(state, action) {
      const { retailerId, keywordId } = action.payload;

      state.selectedRetailerId = Number(retailerId);
      state.selectedKeywordId = Number(keywordId);
    },
  },
});

export const searchShareReducer = searchShareSlice.reducer;
