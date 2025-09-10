import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import packageReducer from "../slices/packageSlice";
import pageReducer from "../slices/pageSlice";
import itineraryReducer from "../slices/itinerarySlice";
import departureReducer from "../slices/departureSlice";
import fileReducer from "../slices/fileSlice";
import packageReviewReducer from "../slices/reviewSlice";
import inquiryReducer from "../slices/inquirySlice";
import newsLetterReducer from "../slices/newsLetterSlice";
import teamsCategoryReducer from "../slices/teamCategorySlice";
import teamReducer from "../slices/teamSlice";
import testimonialReducer from "../slices/testimonialSlice"
import bookinReducer from "../slices/bookinSlice";
import summiterReducer from "../slices/summiterSlice"

const rootReducer = combineReducers({
  packges: packageReducer,
  pages: pageReducer,
  itineraries: itineraryReducer,
  departures: departureReducer,
  files: fileReducer,
  packgeReviews: packageReviewReducer,
  inquiries: inquiryReducer,
  newsLetter: newsLetterReducer,
  teamsCategory: teamsCategoryReducer,
  teams: teamReducer,
  testimonials: testimonialReducer,
  bookings: bookinReducer,
  summiter: summiterReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;
