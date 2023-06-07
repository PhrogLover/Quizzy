# Quizzy

![Quizzy Homepage Img](https://github.com/PhrogLover/QuizWebApp/blob/main/img/Homepage.png?raw=true)

Quizzy is an interactive web application aimed at enabling users to create, organize, and participate in online quiz competitions. It is a space where individuals can gather into teams and test their knowledge and logical abilities against other teams globally.

**NOTE: This webapp is only at the PROTOTYPE stage at best and is not suited for any real use at the moment. It is buggy, insecure and does not utilise a non-local database to store data.**

This webapp was born out of a need for connection and collaboration during the COVID-19 pandemic. Quizzy intends to be a fun and engaging platform beneficial for a broad audience who enjoy pub-style open-ended quizzes. The hosts have a wide-range of tools to create their quiz slides, which are then broadcast to every team by utilising websockets and WebRTC technologies. By bridging the gap between entertainment and learning, it offers a unique opportunity for quiz hosts and participants to engage in an intuitive, exciting, and competitive environment.

*Preview of quiz editor:*
![Quiz Editor Img](https://github.com/PhrogLover/QuizWebApp/blob/main/img/Quiz-editor.png?raw=true)

*Preview of quiz search screen:*
![Quiz Search Img](https://github.com/PhrogLover/QuizWebApp/blob/main/img/Quiz-search.png?raw=true)

## Features

- *Real-time quiz sessions* using WebRTC Socket.IO which allow for voice and video communication, text chat, transmission of slides, answer sheets and results, enveloping the full experience of what makes a quiz fun and engaging
- *Quiz creation and editing tools* which offer a large amount of flexibility by allowing to change the type of the quiz, number of teams, players per team, rounds, questions per round and many other nuanses. The quizzes are then saved in the user's profile, where they can be edited at a moment's notice or set to air at a specific date and time.
- *Profiles* which store quizzes and statistics about how many quizzes were participated, created, won, etc.
- *Quiz lobby* format where every player is allowed multiple layers of interaction: with every player part of the quiz via the quiz chat, with teammates via voice and video and group chat. The lobby also affords important messages to be conveyed by the host, quiz flow controls and a judging system, which helps the host judge answers after each round/quiz.
- *Authentication with Google OAuth 2.0* API for easier registration and login.

*Preview of quiz lobby:*
![Quiz lobby Img](https://github.com/PhrogLover/QuizWebApp/blob/main/img/Lobby-screen.png?raw=true)

*Preview of team lobby:*
![Team lobby Img](https://github.com/PhrogLover/QuizWebApp/blob/main/img/Lobby.png?raw=true)
*Note that lobby is not activated along with the lobby chat as that is dependent on OpenVidu server to be active.*


## Installation & Usage
Clone the repository and navigate to the project directory. Run the following commands:

- Install dependencies: `npm install`
- Start both the server and client: `npm run dev`

## Socket.IO Events

Here are some of the key socket events in our system:

- `client update`: Update client information.
- `set round`: Set the current round in a quiz session.
- `chat message`: Send a chat message.
- `lobby data create/delete/change/call`: Create, delete, change, or call lobby data.
- `update sheet`: Update the quiz sheet.
- `send sheet`: Send the quiz sheet to a specific lobby.
- `slide data`: Update the slide data.
- `ping host`: Ping the host of a quiz session.
- `team lobby start`: Start a team lobby.
- `leaderboard`: Update the leaderboard.

## API Endpoints

### Quiz Routes

1. Get homepage: `GET /homepage`
2. Create a new quiz: `POST /newQuiz`
3. Update a quiz: `PUT /newQuiz`
4. Get a quiz by ID: `GET /quiz/:id`
5. Get full quiz details (with slides) by ID: `GET /quiz/full/:id`
6. Get chat for a quiz: `GET /quiz/chat/:id`
7. Get quizzes by creator ID: `GET /profile/:id`
8. Update a quiz: `PUT /update/:id`
9. Delete a quiz: `DELETE /delete/:id`

### Profile Routes

1. Get a profile by ID: `GET /:id`
2. Add a new user: `POST /add`
3. \[BROKEN\] Get rating of a user: `PUT /rating/:id`

## Future Improvements

- Overhaul the main pages to reduce clutter, simplify and consolidate the components and utilise a database to store and fetch data.
- Write comprehensive unit and integration tests to ensure this complex system is not breaking itself in weird ways.
- Finish the concept of seasonal quizzes by implementing a script that automates the launch of a quiz at specific time intervals (weekly, biweekly, etc).
- Give the host better control of the users and allowing them to kick/ban other users for misbehaving.
- Allow for picture/music/video media to be attachable to the slides for more intriguing quiz content and styles.
- Introduce a social system, where players can invite others to join their long-standing teams and earn shared rewards.
- Redamentary cheat detection.
- Add additional quiz style templates or include a way to import a self-made template for the various slide types.
- Multi-host quizzes.
- Friends/follower system for more convient quiz searching (along with notifications).
- Save a history of quizzes played, along with outcomes, people and other highlights.
- And much more.

## Technology Used

- Socket.IO for real-time communication and slide sharing.
- OpenVidu which utilises WebRTC on a docker container to allow for video chat.
- React.JS and Node.JS with Express for front-end and back-end respectively.
- Google OAuth 2.0 for safe and secure authentication.
