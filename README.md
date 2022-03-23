TinyHabit - an event-based, habit-tracking, MERN-stack application 
======
This app was built with GA classmates [Borahm Cho](https://github.com/Borahm) and [Gurpal Singh](https://github.com/thisisgurpal) as the third project for my General Assembly Software Engineering course.
Users are able to join 30-day events that encourage positive lifestyle habits, submitting and tracking their progress, as well as liking and commenting on the events. Users can also view other users' profiles.
The app has been deployed with Heroku and is available [here](https://social-habit-tracker.herokuapp.com/).

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648038357/Habit_tracker_app/Screenshot_2022-03-23_at_12.25.26_wwbg8s.png "App homepage")

Brief & timeframe:
------
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design
* Be deployed online so it's publicly accessible
* Timeframe: 8 days

Languages & tools used:
------
Node.js
Express
MongoDB
Mongoose
JavaScript (ES6)
React.js
Chakra UI
JWT
Bcrypt
Axios
Git + GitHub
Cloudinary

App walkthrough:
------
### Authorization
Users can register to create a profile and log in using their email address and created password
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648045971/Habit_tracker_app/Auth_yjdgdq.png "Reg/login form")

### New user
Once registered, a new user will land on their dashboard page, which initially will just show current events
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046654/Habit_tracker_app/Screenshot_2022-03-23_at_14.43.58_ndrr6n.png "New user dashboard")

# Viewing an event
Clicking on an event card will take the user to an event page, where they can see the description, other members, likes and comments
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.44.31_vexbhr.png "event page")

# Joining an event
Clicking "join event" will add the user to the event, giving them the ability to like and comment, and post their daily completions. Users can only join events that haven't yet started.
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.44.42_lv09kp.png "Join event")

The event now appears in the user's dashboard, and user can select between events if signed up to multiple
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.46.46_s5kalh.png "Joined event dashboard")

Further functionality is outlined below in the logged-in user journey (these are essentially the same from this stage onwards)

### Logged in user
# Submitting habit completion evidence
If an event that a user has joined has started, the user is able to submit one habit-completion 'evidence' per day - a photo and a comment. They can do this either from their dashboard, or from the event page:
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648047552/Habit_tracker_app/Screenshot_2022-03-23_at_14.58.59_ecremi.png "Add habit completion button")

The user can upload a photo as evidence, alongside a comment
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.19.41_re1ry2.png "Add habit completion")

This added habit is then reflected in the user's streak and progress bar in the dashboard
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648047741/Habit_tracker_app/Screenshot_2022-03-23_at_15.02.10_yigcwh.png "Streak and progress")

The submitted habit completion evidence will also appear in the event page feed (this is populated with completions from all users who've joined the event), and in the users profile page:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.28.27_ni5re9.png "Habit completion event")

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.28.17_tsn4mi.png "Habit profile")

## Liking an event
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.29.33_vtg8ja.png "Event lik")

## Commenting on an event
![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046162/Habit_tracker_app/Comment_cjk8xi.png "Event comment")




