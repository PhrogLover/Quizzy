import { useEffect } from "react";
import { useHistory } from "react-router";

const LoginDerouter = () => {
    let history = useHistory();

    useEffect(() => {
        history.push("/");
    }, [])
    return ( <></> );
}
 
export default LoginDerouter;