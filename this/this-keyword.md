# JavaScript `this` Behavior Explained

## Code Example

```javascript
const user = {
  username: 'dev_master',
  points: 1200,

  printDetails() {
    console.log(`${this.username} has ${this.points} points`);
  },

  printDetailsArrow: () => {
    console.log(`${this.username} has ${this.points} points`);
  },

  delayedPrint() {
    setTimeout(() => {
      console.log(`(Delayed) ${this.username} has ${this.points} points`);
    }, 100);
  }
};

user.printDetails();
user.printDetailsArrow();
user.delayedPrint();

Key Concept

There is no inherent concept of this inside an object in JavaScript.
The value of this is determined at the time a function is invoked, not where it is written.

It depends on:

How the function is called → for regular functions
Where the function is defined → for arrow functions
Regular Functions (printDetails)

In regular functions, this is dynamic and depends on how the function is invoked.

👉 Rule: Always look at what comes before the . in obj.method()

Example
user.printDetails();
Explanation
The function is called using user.printDetails()
So the calling context is user
Therefore, this === user
Output
dev_master has 1200 points
Arrow Functions (printDetailsArrow)

Arrow functions do not have their own this.

Instead, they:

Capture this from the surrounding (lexical) scope
Ignore how they are called
Example
user.printDetailsArrow();
Explanation
Even though the function is inside user, it does NOT bind to it
It takes this from the outer/global scope
In most cases, this.username and this.points will be undefined
Output
undefined has undefined points
Mixed Case (delayedPrint)

This method combines both regular and arrow function behavior.

delayedPrint() {
  setTimeout(() => {
    console.log(`(Delayed) ${this.username} has ${this.points} points`);
  }, 100);
}

Step-by-step Explanation
delayedPrint is a regular function
Called as user.delayedPrint()
So this === user
Inside it, setTimeout uses an arrow function
Arrow function captures this from its parent (delayedPrint)
Therefore, this still refers to user
Output
(Delayed) dev_master has 1200 points
```
