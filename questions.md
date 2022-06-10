### What is the difference between Component and PureComponent? give an example where it might break my app.

The difference between these components is that PureComponent already have a implementation of shouldComponentUpdate function.
So, on every component's render shouldComponentUpdate method will check for changes in previous and next state and props, and based on this - decide of re-render the component or not.

Component will re-render every time if the state or props were changed - even if all the values are the same.

You can use PureComponent for cases, that doesn't need a complex logic for the checking props (because, shouldComponentUpdate doing only shallow comparison).
Because of this PureComponent can break your app: if you working with a nested data structures - it will not update itself and also all children.

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because, if the context was changed, but the props or state of component are not - it will not re-render, so the component will not update for context changes.

### Describe 3 ways to pass information from a component to its PARENT.

1. Using just regular handler: we creating a handler in a parent, passing it like a prop to a child and calling the handler inside child with some data as argument.
2. Using any of state management library (Redux, MobX, etc.)
3. Using a "lifting state" pattern: wrap a parent component with another component and then flush the data to the parent using props

### Give 2 ways to prevent components from re-rendering.

1. Use PureComponent / implement shouldComponentUpdate for class components
2. Use memo HOC for functional components

### What is a fragment and why do we need it? Give an example where it might break my app.

React is always waiting from a component for returning just only one element.
Fragment is a component in React that allows us to return multiple childs without wrapping them with useless markup container (like `div , section, or other html tags`).

Honestly, I don't know how the Fragments can break my app :)

### Give 3 examples of the HOC pattern.

1. memo from React - for optimize re-renders of the component
2. Different lib Providers - like Apollo or Redux - they also wrapping components and adding to them functionality
3. HOC for subscribe component to any updates

### What's the difference in handling exceptions in promises, callbacks and async...await.

To handle the exception in promises you must to use .catch syntax:

```
const newPromise = new Promise(resolve, reject) {
    // do something

    reject(new Error('Something went wrong...'));
};

promise.catch(err => {
    console.log(err);
})
```

To handle the exception with callback or async/await you can use a try/catch construction:

```
// for callbacks
const a = (cb) => {
    try {
        cb();
    } catch(err) {
        console.log(err);
    }
};

const b = () => {
    throw new Error('Something went wrong');
};

a(b); // will log an error

// for async/await
const c = async () => {
    try {
      const result = await fetch('https://this1urldoesntexist1.com')
    } catch(err) {
        console.log(err);
    }
};


c() // will log an error;
```

### How many arguments does setState take and why is it async.

setState can take two arguments: the new state and the callback. Callback will be called after the component finished the re-render process for the new state.
It's async, for performance reasons: re-rendering is expensive, so React won't to block the browser.

### List the steps needed to migrate a Class to Function Component.

1. Create a function with same name as a Class component
2. In function arguments - write a list of props inside a curly brackets (for getting the props by the name)
3. Copy the state of the class component and use a useState/useReducer hook to create a state inside the functional component
4. Migrate lifecycle methods using useEffect hook
5. Copy all the methods of the class component, remove this keyword all around the component, use new state setters from the useState/useReducer hooks from the step 3
6. Instead of render() method - just return a JSX

### List a few ways styles can be used with components.

1. Using a id/className prop with selector values, styles must be described in css files and imported on the top of component.
2. Using an inline style prop for JSX. For example, if you need some calculations - you can pass a common javascript variable to the style object.
3. Using thirdparty-libraries - like JSS, styled components, etc. The way of styling will depends on the lib :)

### How to render an HTML string coming from the server.

You can set `dangerouslySetInnerHTML` property in JSX to render an HTML string coming from server.

Example:

```
const componentFromServer = ({ htmlFromServer }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlFromServer }} />
);
```
