import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countriesVisited: string;
  dreamDestination: string;
  travelTypes: string[];
  frequency: string;
  adventureLevel: number;
  bio: string;
  phone: string;
  language: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
}

export interface SignupState {
  currentStep: number;
  signupData: SignupData;
}

const initialSignupData: SignupData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  countriesVisited: '',
  dreamDestination: '',
  travelTypes: [],
  frequency: 'occasionally',
  adventureLevel: 5,
  bio: '',
  phone: '',
  language: 'English',
  country: '',
  state: '',
  city: '',
  pincode: '',
  address: ''
};

const initialState: SignupState = {
  currentStep: 1,
  signupData: initialSignupData,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setSignupData: (state, action: PayloadAction<Partial<SignupData>>) => {
      state.signupData = {
        ...state.signupData,
        ...action.payload,
      };
    },
    toggleTravelType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.signupData.travelTypes.indexOf(type);
      if (index > -1) {
        state.signupData.travelTypes = state.signupData.travelTypes.filter((t) => t !== type);
      } else {
        state.signupData.travelTypes.push(type);
      }
    },
    resetSignup: (state) => {
      state.currentStep = 1;
      state.signupData = initialSignupData;
    },
  },
});

export const { setCurrentStep, setSignupData, toggleTravelType, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
