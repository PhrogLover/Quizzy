import { useLocation } from "react-router-dom";
import queryString from "query-string";
import useFetch from "../../hooks/useFetch";
import Profile from "./Profile";
import ProfileFriends from "./ProfileFriends";
import ProfileTeams from "./ProfileTeams";
import ProfileQuizzes from "./ProfileQuizzes";
import ProfileHome from "./ProfileHome";

const GetProfile = () => {
    const { search } = useLocation();
    const { id, tab } = queryString.parse(search);
    const profileUrl = "http://localhost:5000/api/profiles/" + id;
    const { data: profile, isPending, error} = useFetch(profileUrl);

    ///profile/?id=1&tab=home

    return ( 
        <>
            { error && <div className="error">{ error }</div> }
            { isPending && <div className="loading">Loading...</div> }
            { profile && <>
                <Profile profile = { profile } id={id} />
                { tab === "friends" && <ProfileFriends profile = {profile} /> }
                { tab === "quizzes" && <ProfileQuizzes profile = {profile} /> }
                { tab === "teams" && <ProfileTeams profile = {profile} /> }
                { tab !== "friends" && tab !== "quizzes" && tab !== "teams" && <ProfileHome profile = {profile} /> }
            </>
            }
        </> 
    );
}
 
export default GetProfile;