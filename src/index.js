import React from 'react';
import ReactDOM from 'react-dom';
if (module.hot) {
  module.hot.accept();
}

/**
 => This is(App) a functional component
 => In order to get information about where the user is located, we have to pass in 2 functions callback in getCurrentPosition(). 1st argument is the function that will get called anytime that this getCurrentPosition() get good successsfully position(user's location). 2nd argument is called when the failure occurs
 => One of the reason that Geolocation call will fail is that the user does not allow his position with our app.
 */

// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   );
//   return <div>Hi there!</div>;
// };

class App extends React.Component {
  /* 
  To set up 'state' (In this case we want to set it up in the constructor, so have to define a constructor)
  => 1. create constructor() - Going to be called any time an instance of this class created, will be called b4 anything else
  => 2. When we define constructor(), it's going to be automatically called with the 'props' object
  => 3. Call a function super and pass props object in : super(props)
    NOTE: what is super(props)? => Our App component is extending or borrowing functionality from the React.Component. This React.Component has a constructor function of its own that goes through some amount of setup or has some code inside of it to setup out component for us. BUT When we define a constructor function inside of our App class, we r essentially overriding or replacing the constructor function that is inside of the React.Component. But we still want to make sure that all the set up code inside of React.Component' s constructor() still gets called. So to make sure that the React.Component' s constructor() gets called, we call super(props). If we dont call super(props), we will get error messagge says "u got to call super"
   => 4. Initialize 'state' object . The 'state' object will contain data, properties that are very important and relevant to our component.
   => 5. Initialize the properties inside the 'state' object , if dont know it yet, use default value
    - Number- default value = null
  */
  constructor(props) {
    super(props);
    // Initialize 'state' object, this is ONLY time we can do direct assignment
    this.state = { lat: null, errorMessage: '' };
    /**
   NOTE: We put this call here, not in render() coz the render() inside of a component is going to be called frequently or even very very frequently, ex. if we update the this.state, render() will be call again. And this call(below) takes amount of time, so it shouldn't be put in render()
   */
    window.navigator.geolocation.getCurrentPosition(
      position => {
        // Update the state; can ONLY call setState()
        /* 
        Pass in an object that has the update to state that u want to make. In this case we want to use the position object and some property in there to update the lat property of the state object
        NOTE: Everytime we update the 'state' we are not required to update every property in it. It's won't delete other properties, but it will leave them untouched
        */
        this.setState({ lat: position.coords.latitude });
        console.log('Position', position);

        /*
        NOTE: Don't do direct assisnment like this to update the state, can do like this only in the constructor
        this.state.lat = position.coords.latitude;
        */
      },
      err => {
        // Call the setState() here again, so if error occurs, the page is updated with error message
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // React says we have to define render()!!, if we don't, React will throw error
  render() {
    // If we have error message and not have a latitude
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    // If we have latitude and not have error message
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }
    // Return this if we dont have both latitude and error message
    return <div>Loading!</div>;
  }
}

/*
1st argument = means we want to show an instance of the App component
2nd argument = Provide a reference to that div with id= root inside of our index.html
*/
ReactDOM.render(<App />, document.querySelector('#root'));
