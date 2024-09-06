import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
