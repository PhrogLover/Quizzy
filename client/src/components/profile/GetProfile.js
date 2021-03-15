import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Profile from "./Profile";

const GetProfile = () => {
    const { id } = useParams();
    const profileUrl = "http://localhost:5000/api/profiles/" + id;
    const { data: profile, isPending, error} = useFetch(profileUrl);

    return ( 
        <>
            { error && <div className="error">{ error }</div> }
            { isPending && <div className="loading">Loading...</div> }
            { profile && <Profile profile = { profile }/> }
        </> 
    );
}
 
export default GetProfile;