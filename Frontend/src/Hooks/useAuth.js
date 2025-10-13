import { useQuery } from "@tanstack/react-query";
import { auth } from "../utils/Api";

function useAuth() {

    const { data: authUser, isLoading, isError } = useQuery({
        queryKey: ["auth"],
        queryFn : auth
    });

    return {authUser, isLoading, isError}
}
export default useAuth;