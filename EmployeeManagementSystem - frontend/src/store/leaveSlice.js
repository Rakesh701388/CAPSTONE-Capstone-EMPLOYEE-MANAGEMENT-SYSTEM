// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import leaveService from "../services/leaveService";

// const initialState = {
//   leaves: [],
//   leave: null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   errorMessage: "",
// };

// // Get all leave requests
// export const getLeaveRequests = createAsyncThunk(
//   "leaves/getAll",
//   async (_, thunkAPI) => {
//     try {
//       return await leaveService.getLeaveRequests();
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get leave request by ID
// export const getLeaveRequestById = createAsyncThunk(
//   "leaves/getById",
//   async (id, thunkAPI) => {
//     try {
//       return await leaveService.getLeaveRequestById(id);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Create new leave request
// export const createLeaveRequest = createAsyncThunk(
//   "leaves/create",
//   async (leaveData, thunkAPI) => {
//     try {
//       return await leaveService.createLeaveRequest(leaveData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Update leave request status
// export const updateLeaveRequestStatus = createAsyncThunk(
//   "leaves/updateStatus",
//   async ({ id, status }, thunkAPI) => {
//     try {
//       await leaveService.updateLeaveRequestStatus(id, status);
//       return { id, status };
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const leaveSlice = createSlice({
//   name: "leaves",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.errorMessage = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getLeaveRequests.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getLeaveRequests.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.leaves = action.payload;
//       })
//       .addCase(getLeaveRequests.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(getLeaveRequestById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getLeaveRequestById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.leave = action.payload;
//       })
//       .addCase(getLeaveRequestById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(createLeaveRequest.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createLeaveRequest.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.leaves.push(action.payload);
//       })
//       .addCase(createLeaveRequest.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateLeaveRequestStatus.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateLeaveRequestStatus.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.leaves = state.leaves.map((leave) =>
//           leave.id === action.payload.id
//             ? { ...leave, status: action.payload.status }
//             : leave
//         );
//       })
//       .addCase(updateLeaveRequestStatus.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       });
//   },
// });

// export const { reset } = leaveSlice.actions;
// export default leaveSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaveService from "../services/leaveService";

const initialState = {
  leaves: [],
  leave: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Get all leave requests
export const getLeaveRequests = createAsyncThunk(
  "leaves/getAll",
  async (_, thunkAPI) => {
    try {
      return await leaveService.getLeaveRequests();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get leave request by ID
export const getLeaveRequestById = createAsyncThunk(
  "leaves/getById",
  async (id, thunkAPI) => {
    try {
      return await leaveService.getLeaveRequestById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new leave request
export const createLeaveRequest = createAsyncThunk(
  "leaves/create",
  async (leaveData, thunkAPI) => {
    try {
      return await leaveService.createLeaveRequest(leaveData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update leave request status
export const updateLeaveRequestStatus = createAsyncThunk(
  "leaves/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      await leaveService.updateLeaveRequestStatus(id, status);
      return { id, status };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaveRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaveRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leaves = action.payload;
      })
      .addCase(getLeaveRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getLeaveRequestById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaveRequestById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leave = action.payload;
      })
      .addCase(getLeaveRequestById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(createLeaveRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLeaveRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle $values array properly
        if (state.leaves && state.leaves.$values) {
          state.leaves.$values.push(action.payload);
        } else if (Array.isArray(state.leaves)) {
          state.leaves.push(action.payload);
        } else {
          // Initialize if needed
          state.leaves = { $values: [action.payload] };
        }
      })
      .addCase(createLeaveRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateLeaveRequestStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeaveRequestStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle $values array properly
        if (state.leaves && state.leaves.$values) {
          state.leaves.$values = state.leaves.$values.map((leave) =>
            leave.id === action.payload.id
              ? { ...leave, status: action.payload.status }
              : leave
          );
        } else {
          // Fallback to direct array mapping
          state.leaves = state.leaves.map((leave) =>
            leave.id === action.payload.id
              ? { ...leave, status: action.payload.status }
              : leave
          );
        }
      })
      .addCase(updateLeaveRequestStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = leaveSlice.actions;
export default leaveSlice.reducer;