import { configureStore } from"@reduxjs/toolkit"
import userSlice from "./userSlice"
import staffSlice from "./staffSlice"
export const store=configureStore({reducer:{

    user:userSlice,
    staff:staffSlice
}

})