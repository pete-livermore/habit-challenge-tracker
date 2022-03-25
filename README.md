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
* Node.js
* Express
* MongoDB
* Mongoose
* JavaScript (ES6)
* React.js
* Axios
* Chakra UI
* JWT
* Bcrypt
* Git + GitHub
* Cloudinary Upload API

App walkthrough:
------
### Authorization
Users can register to create a profile and log in using their email address and created password

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648045971/Habit_tracker_app/Auth_yjdgdq.png "Reg/login form")

### New user
Once registered, a new user will land on their dashboard page, which initially will just show current events

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046654/Habit_tracker_app/Screenshot_2022-03-23_at_14.43.58_ndrr6n.png "New user dashboard")

#### Viewing an event
Clicking on an event card will take the user to an event page, where they can see the description, other members, likes and comments

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.44.31_vexbhr.png "event page")

#### Joining an event
Clicking "join event" will add the user to the event, giving them the ability to like and comment, and post their daily completions. Users can only join events that haven't yet started.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.44.42_lv09kp.png "Join event")

The event now appears in the user's dashboard, and user can select between events if signed up to multiple

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.46.46_s5kalh.png "Joined event dashboard")

Further functionality is outlined below in the logged-in user journey (these are essentially the same from this stage onwards)

### Logged in user
#### Submitting habit completion evidence
If an event that a user has joined has started, the user is able to submit one habit-completion 'evidence' per day - a photo and a comment. They can do this either from their dashboard, or from the event page:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648047552/Habit_tracker_app/Screenshot_2022-03-23_at_14.58.59_ecremi.png "Add habit completion button")

The user can upload a photo as evidence, alongside a comment

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.19.41_re1ry2.png "Add habit completion")

This added habit is then reflected in the user's streak and progress bar in the dashboard

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648047741/Habit_tracker_app/Screenshot_2022-03-23_at_15.02.10_yigcwh.png "Streak and progress")

The submitted habit completion evidence will also appear in the event page feed (this is populated with completions from all users who've joined the event), and in the users profile page:

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.28.27_ni5re9.png "Habit completion event")

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.28.17_tsn4mi.png "Habit profile")

#### Liking an event
Users can click the like button to toggle their like on and off (this colours the icon blue or removes colour, respectively), which is reflected in the database

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.29.33_vtg8ja.png "Event like")

#### Commenting on an event
Users can add a comment and see it appear in the comments section after submission

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046162/Habit_tracker_app/Comment_cjk8xi.png "Event comment")

Code Examples
------

How we worked
------
After an initial feature brainstorming session, we developed user stories and prioritised features to establish an MVP. After wireframing the UIs on Miro, and diagramming the database models and relationships, we established specific feature workflows that we managed via Trello. Using Trello, allowed us to prioritize tasks and, importantly, delineate tasks and roles to minimise duplicated/conflicted work. Specific tasks where assigned after discussions, by adding the relevant person to the Trello card, and progress was then monitored using a card checklist. 

We started with developing our back end, as this was fundamental to establishing what data we would have on the front end to work with. We initially worked collaboratively using Microsoft Live Share and screen sharing and then once the back end was in place, we moved to coding separately on different git branches for specific tasks, merging together as a team to discuss any conflicts. Each day we ran a morning stand-up where we shared progress and discussed issues, but throughout the day we would get together when we had a particuarly complex issue to solve.

Although I was involved with every aspect of the project, the following components were where I took the lead:

* Building the progress widget for the dashboard (the progress bar and the circles that are coloured according to whether a habit has been completed on a specific date)
* Form validation
* Creating the like button functionality
* Creating the comments section functionality
* Creating the seeds for the events

What I got from the project
------
### General points
This was the most significant collaborative coding work I had undertaken, and while it brought challenges in the form of conflicting ideas and visions, and managing divergent branches and conflicting code, it also showed me the huge value of discussing issues/solving problems collaboratively. Often, when one of us was stuck, the other two collobarators with a fresh pair of eyes, could more quickly spot and error or find a solution. 

The key elements for successful collaboration I found were: detailed planning, specific and well-defined tasks and features, regular communication, and seeking as much feedback as possible.

### Technical points
*Git* - I felt a significant improvement in my understanding of Git and my comfortablity in managing different branches and versions of code, and we were able to almost completely eliminate merge conflicts by the end.

*Node/Express* - This was my first significant practical experience of these tools, and I felt I got up to speed quickly. Working on both the front end and  Together, we were able to build a functional backend in a couple of days. 

*MongoDB/Mongoose* - Also the first time I had used these tools and initially found the flexibility in develpoing data models slightly overwhelming because I was focussed on the optimal way to do things, and model relationships were somewhat complex with our app. However, once we began designing schemas, defining relationships and testing these out, I was able to focus on producing code that works rather than a single optimal solution. And ultimately I began to realise the value of this flexibility, especially as we needed to make changes at later stages.

*React* - Though I had previously built a project using React, I felt like this project significantly advanced my understanding. Firstly, because of its relative size and complexity, there were a lot more issues around managing state with hooks. In particuar, the like and comment functionality brought a new dimension to thinking about state in React for me, which involved the interplay with adding and fetching data from the backend, as well as just reflecting changes on the page.

*Vanilla Javascript*
I was very proud of the habit completion progress widget, which involved - I got to 

Future features
------




