import React from 'react'

// babel with react plugin converts jsx
const JSX = () => (
    <h1>hello world</h1>
)
// to javascript 
React.createElement("h1", null, "hello world");
// React library is required to interpret the React.createElement function as
const h1 = document.createElement('h1');
h1.textContent = 'Hello, world!'; 
document.body.appendChild(h1); 



export default temp