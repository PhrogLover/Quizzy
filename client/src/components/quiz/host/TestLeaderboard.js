import Leaderboard from "../../basic/Leaderboard"
import { useState } from "react";

const TestLeaderboard = ({ user }) => {
    const ids = [
        "8673b838-6f16-4580-acc8-b6809df74c3a",
        "9d53382b-eacb-4839-b490-2c6a8b370d0a",
        "e7dd8b05-afde-49e6-9c77-18bb2f966c0b",
        "0619b943-e5a6-409e-8518-319cd7b2eae4",
        "d9825c91-0d01-48d7-98ab-662e0d1735e2",
        "12fea2d7-5252-4b50-a23b-c2af66d0f790",
        "26d42730-ea72-41ba-ae5d-017043374dce",
        "0152ef37-db75-4c8b-af67-c79661e16efa",
        "34b2fd24-f99c-4764-a1f7-0f7b2445c889",
        "71dd8dd6-47c8-4561-b866-70651edb61ee",
        "403195eb-c38a-44cf-8de3-1b4512547867",
        "5c8b9368-5503-4c1c-96d2-2277ffaeae01",
        "3e7782ad-49e7-4ff3-82e9-c45b187c84eb",
        "435dfeb2-babb-4fd3-9eaf-71b71be3fe5e",
        "52e2d16b-6e58-4082-afe9-96e0f30922df",
        "2c8ee77c-a93a-476c-a53d-7a330a78ea2a",
        "fb222518-b43a-43d4-8115-e4b0fc59e529",
        "80627033-e191-42da-9f32-6c2d29b2b767",
        "c52f11dd-b1e8-44d3-bf98-420f97a4c344",
        "54d4ac11-badb-438d-86fd-a98fa3753ea8",
        "6494761b-4471-4e5a-81a1-b4dbb3c3bd32",
        "26233a9d-2900-4b19-b069-6922b3907256",
        "80fda64e-fe57-4fc9-80f3-95706e3ef1e0",
        "a573a122-9165-4293-b86d-02f7ed280981",
        "91b2b002-af54-4255-9765-c799fe0247fa"
    ];
    const [ testList, setTestList ] = useState(initState());

    function initState() {
        let test = [];
        let roundArr = [];
        
        for (let i = 0; i < 23; i++) {
            roundArr = [];
            roundArr.push({
                id: ids[i],
                name: "Team "+(i+1),
                players: [{
                    id: "106812796264951400312",
                    name: "Arijus Lengvenis"
                }]
            })
            for (let j = 0; j < 5; j++) {
                roundArr.push({
                    id: ids[i],
                    points: Math.floor(Math.random() * 11)
                })
            }
            test.push(roundArr);
        }
        for (let i = 0; i < 2; i++) {
            roundArr = [];
            roundArr.push({
                id: ids[i],
                name: "Team "+(i+24),
                players: []
            })
            for (let j = 0; j < 5; j++) {
                roundArr.push({
                    id: ids[i]
                })
            }
            test.push(roundArr);
        }
        return test
    }

    return ( 
        <div className="test-leaderboard">
            { testList && <Leaderboard teamList = { testList } user = { user } /> }
        </div>
    );
}
 
export default TestLeaderboard;