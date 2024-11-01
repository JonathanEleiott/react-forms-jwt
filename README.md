# React Forms & JSON Web Tokens

## Forms

- Controlled Forms
  - links each input to a useState
  - all event listeners get passed in an event
  - we can use event.target to get the element where the event occurred
  - we can use event.target.value on an input to get what the user typed in
  - Setting up a form
    - onSubmit={function} - run the function when the form is submitted
  - Setting an input
    - create a useState to save the value that the user will type in
    - set the value of the input to the new useState variable
    - set the onChange to a function that will run when the user types into the input -> setUseState(event.target.value)

## Calling an API

- by default, fetch will make a GET request
- fetch takes in an optional second argument which will be an object
- fetch(URL, { key: value })
- KEYS are the optional for this object
  - method -> 'POST'
  - headers -> { "Content-Type": "application/json" }
  - body: JSON.stringify({ "name": "Barry Allen", "email": "TheFlash@aol.com"... })

## JWT (Json Web Tokens) -> credentials that conatin a header, payload (data), and a signature