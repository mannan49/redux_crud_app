import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./features/PostSlice";

const store = configureStore({
    reducer: {
        app: PostSlice,
    }
})

export default store;