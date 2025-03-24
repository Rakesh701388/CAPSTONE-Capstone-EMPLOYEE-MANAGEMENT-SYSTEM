// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import employeeService from "../services/employeeService";

// const initialState = {
//   employees: [],
//   employee: null,
//   profile: null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   errorMessage: "",
// };

// // Get all employees
// export const getAllEmployees = createAsyncThunk(
//   "employees/getAll",
//   async (_, thunkAPI) => {
//     try {
//       return await employeeService.getAllEmployees();
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

// // Get employee by ID
// export const getEmployeeById = createAsyncThunk(
//   "employees/getById",
//   async (id, thunkAPI) => {
//     try {
//       return await employeeService.getEmployeeById(id);
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

// // Create new employee
// export const createEmployee = createAsyncThunk(
//   "employees/create",
//   async (employeeData, thunkAPI) => {
//     try {
//       return await employeeService.createEmployee(employeeData);
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

// // Update employee
// export const updateEmployee = createAsyncThunk(
//   "employees/update",
//   async ({ id, employeeData }, thunkAPI) => {
//     try {
//       return await employeeService.updateEmployee(id, employeeData);
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

// // Delete employee
// export const deleteEmployee = createAsyncThunk(
//   "employees/delete",
//   async (id, thunkAPI) => {
//     try {
//       await employeeService.deleteEmployee(id);
//       return id;
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

// // Get employee profile
// export const getProfile = createAsyncThunk(
//   "employees/getProfile",
//   async (_, thunkAPI) => {
//     try {
//       return await employeeService.getProfile();
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

// export const employeeSlice = createSlice({
//   name: "employees",
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
//       .addCase(getAllEmployees.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllEmployees.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.employees = action.payload;
//       })
//       .addCase(getAllEmployees.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(getEmployeeById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getEmployeeById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.employee = action.payload;
//       })
//       .addCase(getEmployeeById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(createEmployee.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createEmployee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.employees.push(action.payload);
//       })
//       .addCase(createEmployee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(updateEmployee.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateEmployee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.employees = state.employees.map((employee) =>
//           employee.id === action.payload.id ? action.payload : employee
//         );
//       })
//       .addCase(updateEmployee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(deleteEmployee.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         console.log(state.employees)
//         state.employees = state.employees.filter(
//           (employee) => employee.id !== action.payload
//         );
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       })
//       .addCase(getProfile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.profile = action.payload;
//       })
//       .addCase(getProfile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload;
//       });
//   },
// });

// export const { reset } = employeeSlice.actions;
// export default employeeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

const initialState = {
  employees: [],
  employee: null,
  profile: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

// Get all employees
export const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getAllEmployees();
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

// Get employee by ID
export const getEmployeeById = createAsyncThunk(
  "employees/getById",
  async (id, thunkAPI) => {
    try {
      return await employeeService.getEmployeeById(id);
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

// Create new employee
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(employeeData);
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

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, employeeData }, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(id, employeeData);
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

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, thunkAPI) => {
    try {
      await employeeService.deleteEmployee(id);
      return id;
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

// Get employee profile
export const getProfile = createAsyncThunk(
  "employees/getProfile",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getProfile();
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

export const employeeSlice = createSlice({
  name: "employees",
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
      .addCase(getAllEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getEmployeeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle $values array properly
        if (state.employees && state.employees.$values) {
          state.employees.$values.push(action.payload);
        } else if (Array.isArray(state.employees)) {
          state.employees.push(action.payload);
        } else {
          // Initialize if needed
          state.employees = { $values: [action.payload] };
        }
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle $values array properly
        if (state.employees && state.employees.$values) {
          state.employees.$values = state.employees.$values.map((employee) =>
            employee.id === action.payload.id ? action.payload : employee
          );
        } else {
          // Fallback to direct array mapping
          state.employees = state.employees.map((employee) =>
            employee.id === action.payload.id ? action.payload : employee
          );
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle $values array properly
        if (state.employees && state.employees.$values) {
          state.employees.$values = state.employees.$values.filter(
            (employee) => employee.id !== action.payload
          );
        } else {
          // Fallback to direct array filtering
          state.employees = state.employees.filter(
            (employee) => employee.id !== action.payload
          );
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;