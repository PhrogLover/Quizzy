import Profile from "./Profile";
import ProfileFriends from "./ProfileFriends";
import ProfileTeams from "./ProfileTeams";
import ProfileQuizzes from "./ProfileQuizzes";
import ProfileHome from "./ProfileHome";
import { useState } from "react";

const GetProfile = ({ user, socket }) => {
    const [tab, setTab ] = useState("friends");

    ///profile/?id=1&tab=home

    return ( 
        <div>
            <Profile id={1} user = { user } />
            { tab === "friends" && <ProfileFriends user = { user } /> }
            { tab === "quizzes" && <ProfileQuizzes user={user} socket={socket} /> }
            { tab === "teams" && <ProfileTeams user = { user } /> }
            { tab !== "friends" && tab !== "quizzes" && tab !== "teams" && <ProfileHome user = { user } /> }
        </div> 
    );
}
 
export default GetProfile;