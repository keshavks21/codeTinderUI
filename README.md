# CodeTinder

- Create a Vite + React application
- npm install
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Install react-router-dom 
- Create BrowserRouter -> Routes-> Route=/Body->RouteChildren
- Create Navbar ,Login, About and Footer Component and add them to Body and as its children
- Create an Outlet in your Body component

- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true } (for save cookies)
- install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder 
- Not give access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in th store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Conenction REquests
- Feature - Accept/Reject connection request
- Send/Ignore the user card from the feed
- Signup New User
- E2E testing


   ## For setUp redux store : 
    - Create a Redux store with configureStore
        configureStore accepts a reducer function as a named argument
        configureStore automatically sets up the store with good default settings
    - Provide the Redux store to the React application components
        Put a React Redux <Provider> component around your <App />
        Pass the Redux store as <Provider store={store}>
    - Create a Redux "slice" reducer with createSlice
        Call createSlice with a string name, an initial state, and named reducer functions
        Reducer functions may "mutate" the state using Immer
        Export the generated slice reducer and action creators
    - Use the React Redux useSelector/useDispatch hooks in React components
        Read data from the store with the useSelector hook
        Get the dispatch function with the useDispatch hook, and dispatch actions as needed

- Get the feed and add the feed in th store
- Build the user card on feed 
- Edit Profile Feature like age, gender, photoUrl, about and skills



- For auto scroll to top in chat : useEffect(()=>{
    messageRef.current?.scrollIntoView();
  },[messages])