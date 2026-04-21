# Understanding `this` in Arrow Functions vs Regular Functions

## The Code in Question

```javascript
var foo = 1;
var change = () => {
  this.foo = 2;
  console.log(this.foo);
};
var obj = {
  foo: 3
};
var bounded = change.bind(obj);

// What would be the output of the following?
console.log(foo);
console.log(change());
console.log(foo);
console.log(obj.foo);
console.log(bounded());
```

---

## The Key Concept

The key concept here: **arrow functions don't have their own `this`** — they inherit `this` from the surrounding scope (the global scope in this case).

---

## Output & Explanation

### `console.log(foo)` → **`1`**

Simple. `foo` was declared as `1` at the top. Nothing has changed it yet.

---

### `console.log(change())` → **`2`, then `undefined`**

When `change()` runs:
- `this.foo = 2` — because `change` is an **arrow function**, `this` refers to the **global scope**, so it sets the **global `foo` to `2`**
- `console.log(this.foo)` prints **`2`** (the global `foo`)
- The function itself returns nothing, so `console.log(change())` prints **`undefined`** after

> 💡 Think of it like this: the arrow function has no home of its own — it borrows its "identity" (`this`) from wherever it was *written*, which is the global scope.

---

### `console.log(foo)` → **`2`**

Surprised? The previous `change()` call secretly **overwrote the global `foo`** from `1` to `2` via `this.foo = 2`. So now `foo` is `2`.

---

### `console.log(obj.foo)` → **`3`**

`obj.foo` is still `3` and was **never touched**. Even though we defined `obj.foo = 3`, the arrow function's `this` never pointed to `obj` — it always pointed to the global scope.

---

### `console.log(bounded())` → **`2`**, then `undefined`

This is the most important part. We tried to use `.bind(obj)` to force the arrow function to use `obj` as its `this`. **It didn't work.**

- `.bind()` has **no effect on arrow functions**
- The arrow function still uses the global `this`, where `foo` is already `2`
- So `this.foo` is still `2`, `obj.foo` remains `3`, and the function still returns nothing → `undefined`

> 💡 Arrow functions are like a stubborn employee who refuses a new assignment — they're permanently loyal to the boss they started with (the scope where they were created).

---

## Full Output Summary

```
1          ← global foo before anything
2          ← this.foo inside change() (global foo)
undefined  ← change() returns nothing
2          ← global foo was silently overwritten!
3          ← obj.foo was never touched
2          ← bind() failed, still global this
undefined  ← bounded() also returns nothing
```

---

## The Golden Rule

| Function Type | Has its own `this`? | Can `.bind()` change `this`? |
|---|---|---|
| Regular function | ✅ Yes | ✅ Yes |
| Arrow function `() =>` | ❌ No | ❌ No |

---

## Quick Recap

- **Arrow functions** capture `this` from the scope where they are **defined**, not where they are **called**.
- Calling `.bind()`, `.call()`, or `.apply()` on an arrow function has **no effect** on `this`.
- If you want `this` to be dynamic and bindable, use a **regular function** (`function` keyword).