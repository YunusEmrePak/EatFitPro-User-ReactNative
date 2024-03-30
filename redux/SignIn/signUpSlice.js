import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import signApi from "../apis/signApi";

export const signUp = createAsyncThunk(
  "userr/signUpp",
  async (userInfo, thunkAPI) => {
    try {
      const response = await signApi.post(
        "/auth/signup",
        JSON.stringify(userInfo)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signUpActivate = createAsyncThunk(
  "userr/signVerifyy",
  async (verifyInformation, thunkAPI) => {
    try {
      const response = await signApi.post(
        "/auth/activate",
        JSON.stringify(verifyInformation)
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signUpSlice = createSlice({
  name: "signUpp",
  initialState: {
    signUpStatus: "idle",
    verifyStatus: "idle",
    error: null,
    userInformation: {
      name: "",
      surname: "",
      email: "",
      password: "",
      length: "",
      weight: "",
      age: "",
      gender: "",
    },
    verifyInformation: {
      userEmail: null,
      code: 0,
    },
    codeArray: Array(6).fill(""),
    isClickedToVerifyButton: false,
    isVerifySuccessful: null,
    eyeIsClicked: false,
  },
  reducers: {
    setName: (state, action) => {
      state.userInformation.name = action.payload;
    },
    setSurname: (state, action) => {
      state.userInformation.surname = action.payload;
    },
    setEmail: (state, action) => {
      state.userInformation.email = action.payload;
    },
    setPassword: (state, action) => {
      state.userInformation.password = action.payload;
    },
    setLength: (state, action) => {
      state.userInformation.length = action.payload;
    },
    setWeight: (state, action) => {
      state.userInformation.weight = action.payload;
    },
    setAge: (state, action) => {
      state.userInformation.age = action.payload;
    },
    setGender: (state, action) => {
      state.userInformation.gender = action.payload;
    },
    setVerifyMail: (state, action) => {
      state.verifyInformation.userEmail = action.payload;
    },
    setCode: (state, action) => {
      state.verifyInformation.code = action.payload;
    },
    setDigit: (state, action) => {
      const { index, value } = action.payload;
      state.codeArray[index] = value;
    },
    setResetCodeArray: (state) => {
      state.codeArray = Array(6).fill("");
    },
    setResetStatus: (state) => {
      state.signUpStatus = "idle";
      state.verifyStatus = "idle";
    },
    setIsClickedToVerifyButton: (state) => {
      state.isClickedToVerifyButton = !state.isClickedToVerifyButton;
    },
    setEyeIsClicked: (state) => {
      state.eyeIsClicked = !state.eyeIsClicked;
    },
    setInformationNull: (state) => {
      state.userInformation = {
        name: "",
        surname: "",
        email: "",
        password: "",
        length: "",
        weight: "",
        age: "",
        gender: "",
      };
      state.verifyInformation = {
        userEmail: null,
        code: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
      })
      .addCase(signUp.pending, (state, action) => {
        state.signUpStatus = "pending";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = "failed";
      })

      .addCase(signUpActivate.fulfilled, (state, action) => {
        state.verifyStatus = "succeeded";
        state.isVerifySuccessful = action.payload.isSuccessful;
        setInformationNull();
      })
      .addCase(signUpActivate.pending, (state, action) => {
        state.verifyStatus = "pending";
      })
      .addCase(signUpActivate.rejected, (state, action) => {
        state.verifyStatus = "failed";
      });
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
