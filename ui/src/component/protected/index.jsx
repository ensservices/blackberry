import { useMemo } from "react";
import { useLocation } from "react-router-dom";
function useQuery() {
    const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ProtectedRoute = ({ children }) => {
    let query = useQuery();
    const token = query.get("token");
    if(token)sessionStorage.setItem("tk", token);
    const localToken = sessionStorage.getItem("tk");
    console.log(token);
    if(token || localToken){
        return children;
    }else{
        return <h2> Invalid User...... </h2>
    }

}

export default ProtectedRoute;