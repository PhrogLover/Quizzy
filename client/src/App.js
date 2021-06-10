import './App.css';
import { useState } from "react";
import PostLogin from './components/main/PostLogin';
import PreLogin from './components/main/PreLogin';

function App() {
  const [ googleObj, setGoogleObj ] = useState();

  // {
  //   email: "aryjeleng@gmail.com",
  //   familyName: "Lengvenis",
  //   givenName: "Arijus",
  //   id: "112380395290543152389",
  //   imageUrl: "https://lh3.googleusercontent.com/-3hP2gkuIj-M/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckUVLf3SPlN7M1LkxUym_XQw6sYAw/s96-c/photo.jpg",
  //   name: "Arijus Lengvenis"
  // }

  // {
  //   email: "quizzyapp.dev@gmail.com",
  //   familyName: "Admin",
  //   givenName: "Quizzy",
  //   id: "106812796264951400312",
  //   imageUrl: "https://lh5.googleusercontent.com/-a7zvn0K9S3I/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnDv_BhF6AuY08z9CbmJ-F9pFYIjA/s96-c/photo.jpg",
  //   name: "Quizzy Admin",
  //   donor: false, 
  //   status: "New User",
  //   registerTime: new Date().toString(),
  //   created: 0,
  //   hosted: 0,
  //   won: 0,
  //   answered: 0,
  //   participated:0,
  //   seasonal: 0,
  //   partOfTeam: false,
  //   teamName: "",
  //   rating: 4,
  //   numberOfRatings: 1
  // }

  function onSuccessGoogle({ profileObj }) {
    const url = "http://localhost:5000/api/profiles/"+profileObj.googleId;
    fetch(url)
    .then(res => {
        if (!res.ok) {
            throw Error('Could not fetch the data for that resource.')
        }
        return res.json();
    })
    .then((data) => {
        if (!data.msg) {
          setGoogleObj(data);
        }
        else {
          const userObj = {
            id: profileObj.googleId,
            name: profileObj.name,
            imageUrl: profileObj.imageUrl,
            email: profileObj.email,
            donor: false, 
            status: "New User",
            registerTime: new Date().toString(),
            created: 0,
            hosted: 0,
            won: 0,
            answered: 0,
            participated:0,
            seasonal: 0,
            partOfTeam: false,
            teamName: "",
            rating: 4,
            numberOfRatings: 1
          }
          //additional stats as well.
          fetch('http://localhost:5000/api/profiles/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userObj)
        }).then(setGoogleObj(userObj));
        }
    })
    .catch((err) => {
        console.log(err);
    })
    setGoogleObj(profileObj);
  }

  function onFailureGoogle(err) {
    console.log(err);
  }

  return (
      <div className="App">
        { googleObj && <PostLogin user = { googleObj } setGoogleObj = { setGoogleObj }/>}
        { !googleObj && <PreLogin onSuccess = { onSuccessGoogle } onFailure = { onFailureGoogle }/>}
      </div>
    
  );
}

export default App;
