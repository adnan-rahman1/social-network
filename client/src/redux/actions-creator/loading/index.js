import { LOADING } from "../../actions";

export const ac_loading = (isLoading) => {
    return {
        type: LOADING,
        payload: isLoading,
    }
}