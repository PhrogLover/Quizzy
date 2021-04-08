import { useEffect } from "react";
import { useHistory } from "react-router";

const LoginRerouter = () => {
    let history = useHistory();

    useEffect(() => {
        history.push("/login");
    }, [])
    return ( <></> );
}
 
export default LoginRerouter;