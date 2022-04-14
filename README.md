TinyHabit - an event-based, habit-tracking, MERN-stack application 
======
This app was built with GA classmates [Borahm Cho](https://github.com/Borahm) and [Gurpal Singh](https://github.com/thisisgurpal) as the third project for my General Assembly Software Engineering course.

Users are able to join 30-day events that encourage positive lifestyle habits, submitting and tracking their progress, as well as liking and commenting on the events. Users can also view other users' profiles.

The app has been deployed with Heroku and is available [here](https://social-habit-tracker.herokuapp.com/).

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648038357/Habit_tracker_app/Screenshot_2022-03-23_at_12.25.26_wwbg8s.png "App homepage")

Brief
------
* Group project
* Timeframe of 8 days
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design
* Be deployed online so it's publicly accessible

Technologies used
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
Users can register to create a profile and log in using their email address and created password.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648045971/Habit_tracker_app/Auth_yjdgdq.png "Reg/login form")

#### Viewing an event
Clicking on an event card will take the user to an event page, where they can see the description, other members, likes and comments.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.44.31_vexbhr.png "event page")

#### Joining an event
Clicking "join event" will add the user to the event, giving them the ability to like and comment, and post their daily completions. Users can only join events that haven't yet started. The event now appears in the user's dashboard, and user can select between events if signed up to multiple events.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046818/Habit_tracker_app/Screenshot_2022-03-23_at_14.46.46_s5kalh.png "Joined event dashboard")

Further functionality is outlined below in the logged-in user journey (these are essentially the same from this stage onwards).

### Logged in user
#### Submitting habit completion evidence
If an event that a user has joined has started, the user is able to submit one habit-completion 'evidence' per day - a photo and a comment. They can do this either from their dashboard, or from the event page. The user can upload a photo as evidence, alongside a comment. This added habit is then reflected in the user's streak and progress bar in the dashboard.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648047741/Habit_tracker_app/Screenshot_2022-03-23_at_15.02.10_yigcwh.png "Streak and progress")

The submitted habit completion evidence will also appear in the event page feed (this is populated with completions from all users who've joined the event), and in the users profile page.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046019/Habit_tracker_app/Screenshot_2022-03-23_at_14.28.27_ni5re9.png "Habit completion event")

#### Liking an event
Users can click the like button to toggle their like on and off (this colours the icon blue or removes colour, respectively), which is reflected in the database.

#### Commenting on an event
Users can add a comment and see it appear in the comments section after submission.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1648046162/Habit_tracker_app/Comment_cjk8xi.png "Event comment")

Planning & process
-----
After an initial feature brainstorming session, we developed user stories and prioritised features to establish an MVP. We then wireframed the UIs on Miro so we could visualise everything and get an overview of the functionality required. 

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1649949904/Habit_tracker_app/Screenshot_2022-04-12_110941_z0qy2a.png "Wireframe")

Because we needed to understand how all our data would sit in the back-end, we also diagrammed the database models and relationships in Miro.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1649949962/Habit_tracker_app/Screenshot_2022-04-12_111158_ojrtu2.png "Database models")

Once we were confident that our MVP met the brief and was achievable in the timeframe, we established specific feature workflows that we managed via Trello. Using Trello, allowed us to prioritise tasks and, importantly, delineate tasks and roles to minimise duplicated/conflicted work. Specific tasks were assigned after discussions, by adding the relevant person to the Trello card, and progress was then monitored using a card checklist.

![alt text](https://res.cloudinary.com/di7ndofao/image/upload/v1649950011/Habit_tracker_app/Screenshot_2022-04-12_111516_svnfzx.png "Trello")

We started with developing our back end, as this was fundamental to establishing what data we would have on the front-end to work with. We initially coded collaboratively using Microsoft Live Share and screen sharing to generate our models, controllers and routes, and then tested these using the Insomnia API client. We also used the MongoDB shell to explore the data in the database. Overall, this process took about a day and a half, as we refined our controllers.
Once the back end was in place, we next focussed on building the React client. We moved to coding separately on different git branches for specific tasks, merging together as a team to discuss any conflicts. Each day we ran a morning stand-up where we shared progress and discussed issues, but throughout the day we would get together when we had a particularly complex issue to solve. 

Working in parallel, we were able to make significant progress on the authorisation and homepage/dashboard components. The key element of the React work was getting the API requests set up with Axios, so this is what we focussed on initially. Once we were happy that our requests were fetching or sending the appropriate data correctly, we then focussed on the rendering of the components.

At this point I focussed primarily on the following aspects:
* Building the progress widget for the dashboard (the progress bar and the circles that are coloured according to whether a habit has been completed on a specific date), which used habit completion data from MondoDB to render the component
* Form validation, which involved storing the API request errors in state to generate appropriate error messaging
* Setting up the like model/relationships in the back-end and creating the like button functionality with hooks and Axios to send the data
* Setting up the like comments model/relationships in the back-end and creating the comments section functionality with hooks and Axios.

One big advantage of group working was that rather than building all the functionality first and then styling afterwards, styling tasks could be assigned to someone once a component had been built, which meant that the app ‘took form’ more quickly. We therefore didn’t have any issues at the end like needing to make any significant code changes to facilitate features of styling such as responsiveness. The Chakra style props were key in facilitating this as you could simply add styles in the JSX as you were building.

Code Examples
------
Determining if a user is authenticated, by extracting the token added to the user’s localstorage at login, and decoding it to find the payload:


Generating the circle progress widget
```javascript
 export const getPayload = () => {
  const token = window.localStorage.getItem('tinyhabits-token')
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}
```

Calculating the user's best habit completion streak:

```javascript
const calcStreak = () => {
    console.log(selectedEvent)
    if (!eventHabitCompletions.length) return 0
    if (selectedEvent && Object.keys(selectedEvent).length) {
      const strDate = Date.parse(selectedEvent.startDate)
      const endDate = Date.parse(selectedEvent.endDate)
      const days = []
      for (let i = new Date(strDate); i <= endDate; i.setDate(i.getDate() + 1)) {
        days.push(new Date(i).toLocaleDateString())
      }
      const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
      const mapped = days.map(date => {
        return completedDates.includes(date) ? 1 : 0
      })
      let streaks = mapped.reduce((res, n) =>
        (n ? res[res.length - 1]++ : res.push(0), res)
        , [0])
      console.log(streaks.join(","))
      return Math.max(...streaks)
    }
  }
```

Generating the circle progress widget:

```javascript
 useEffect(() => {
    const arr = []
    if (selectedEvent && Object.keys(selectedEvent).length) {
      const strDate = Date.parse(selectedEvent.startDate)
      const endDate = Date.parse(selectedEvent.endDate)
      const days = []
      for (let i = new Date(strDate); i <= endDate; i.setDate(i.getDate() + 1)) {
        days.push(new Date(i).toLocaleDateString())
      }
      days.forEach((day, i) => {
        arr.push(<WrapItem h='20px' w='20px' backgroundColor='gray.200' borderRadius='50%' justifyContent='center' key={day} id={day}></WrapItem>)
      })
      if (eventHabitCompletions.length) {
        const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
        arr.filter(obj => completedDates.includes(obj.key)).forEach(obj => {
          arr[arr.indexOf(obj)] = <WrapItem h='20px' w='20px' backgroundColor='fifth' borderRadius='50%' justifyContent='center' key={obj.key} id={obj.key}></WrapItem>
        })
        setWidget(arr)
      } else {
        setWidget(arr)
      }
    }
  }, [selectedEvent, eventHabitCompletions])
```

Key learnings
------
This was the most significant collaborative coding work I had undertaken, and while it brought challenges in the form of conflicting ideas and visions, and managing divergent branches and conflicting code, it also showed me the huge value of discussing issues/solving problems collaboratively. Often, when one of us was stuck, the other two collaborators with a fresh pair of eyes, could more quickly spot an error or find a solution.

The key elements for successful collaboration I found were: detailed planning, specific and well-defined tasks and features, regular communication, and seeking as much feedback as possible.

#### Git
Thanks to our collaborative Git approach, I saw a significant improvement in my understanding of Git and my comfortability in using and merging different branches and versions of code, and dealing with any merge conflicts. Though there were times when we encountered issues, taking the time to read documentation ensured that we were able to utilise Git's features to resolve them.

#### Node/Express
This was my first significant practical experience of these tools, and I was pleased with my progress with them in the timespan. By spending a whole day building and testing routes/controllers using Insomnia, I was able gain a better understanding of Because of my limited experience with Node, there are some elements of the controllers that I can optimise, but I was pleased that I was able to access all the data I needed on the front-end.

#### MongoDB/Mongoose
Also the first time I had used these tools and initially found the flexibility in developing data models slightly overwhelming because I was focussed on the optimal way to do things, and model relationships were somewhat complex with our app. However, once we began designing schemas, defining relationships and testing these out, I was able to focus on producing code that works rather than a single optimal solution. And ultimately I began to see the benefits of NoSQL, especially as we needed to make changes at later stages.

#### React
Though I had previously built a project using React, I felt like this project significantly advanced my understanding. Firstly, because of its relative size and complexity, there were a lot more issues around managing state with hooks. In particular, the like and comment functionality brought a new dimension to thinking about state in React for me, which involved the interplay with adding and fetching data from the backend, as well as just reflecting changes on the page.

#### Chakra UI
We felt that a UI framework would be necessary given the timeframe we had, and decided to use Chakra because we felt its components were easy to use and fit well with the features we needed. Over the course of the project, I began to like the framework a lot, especially how easy it was to restyle components and ensure responsiveness.

#### Vanilla Javascript 
I was proud of the habit completion progress widget, which involved generating circular divs with ids that corresponded to days of the month and then conditionally styling these divs green, depending on which date ids corresponded to the completed habit dates in the database. This involved using loops as well as some array methods including mapping and filtering. As mentioned above, there were aspects of the app backend that could be optimised to make the data easier to work with in the front-end. However, I found that this actually gave me a good opportunity to get more practice of using JS methods to dig down and access nested data.

#### Cloudinary upload API
Having never used Cloudinary before, I was able to develop an understanding of how to use a file upload element, React state and a Cloudinary account and credentials to add an uploaded image URL to the backend.

Challenges
-------
This application was large in scope given the timeframe and what I found most difficult was ensuring bug-free functionality while still meeting the MVP. At the planning stage it was completely clear to us how much work some of the features would be, so in hindsight I would’ve scaled down our MVP.

In addition, the back-end involved some complex relationships between models. Understanding exactly which fields should be nested or virtual fields took a lot of planning and some trial and error, but we ultimately were able to get and post/put all the data we needed for the app to function.

Wins
------
For me personally, getting the circle progress widget and completion streak calculator to work was a big win. Though I had a good idea of what I was going to do conceptually, there were a number of obstacles to overcome. However, I felt that, while my solution wasn’t the most elegant or efficient, I was able to use my JavaScript knowledge and problem solving skills so that it worked robustly and really enhanced the app.

I was also very pleased with how quickly I was able to get up to speed with Chakra. I had never used this UI framework before, but through reading documentation I ultimately got to the point where I felt comfortable developing layouts and styled components.

Future features
-------
One ‘job-to-be-done’ that I feel is important in applications like this is - finding information about your progress. The aim of the app is ultimately to keep track of your progress in completion of the specific habit and to encourage you to do it. Therefore, with more time I would like to build out the dashboard with more data visualisation, possibly using a library such as react-vis for data.
