# COMMIT ACCOMAPANIMENT

## A record of commits and some details regarding the changes made in them

### July 31, 3:25 PM

#### Commit hash: a22ae8a

Created this readme to document changes in greater detail

---

Removed comments and empty/unused imports from the following files:

- appContext.js
- convertBase.64.js
- auth.js
- Set.js (dashboard)
- SharedLayout.js
- ProtectedSet.js
- TodosContainer.js
- reducer.js

---

Implemented short algorithm to optimize image compression based on factors such as raw file size

---

### August 1, 8:18 AM

#### Commit hash: b4f5360

Implemented Todo ID link and styling in place of "remove todo" button on All Todos page

---

Fixed issue where the Set Name input was rendering before a truthy Set value was loaded, which was done in Set.js (dashboard) by:

---

- Implementing asyncFetch in an async/await fashion (was originally sync)
- Implementing a new condition `&& !set` for SkeletonLoad
- Implementing a new condition `&& set` for name-container, to ensure that when a falsey Set exists, the name-container element (and more importantly, the SetNameInput component) does not render

### August 2, 12:04 AM

#### Commit hash: f41251a

Cleaned up eslint warnings, console logs, and comments from the following files:

**/components**

- AllTodosContainer.js
- FormRow.js
- Navbar.js
- Set.js
- SetNameInput.js
- SkeletonSet.js
- TextArea.js
- TodoNew.js

**/pages**

- /dashboard
  - Profile.js
  - Sets.js
  - Todos.js
- ProtectedLogReg.js
- ProtectedRoute.js
- Register.js

**/utils**

- convertToBase64.js

> Note that a lot of these edited pages also have warnings for missing dependencies. These should likely be resolved for best practice.

---

Removed unused exported functions from convertToBase64.js, and changed export of compressToSizes to be default

---

Cleaned up animation of checked Todo items, and removed comments from Todo.js (wrappers)

### August 2, 1:17 PM

#### Commit hash: 

Added getSets request to AllTodosContainer to retrieve Set IDs and names

---

Added functionality to display the Set name with the Todo item in the AllTodosContainer (previously the ID)

---

Added condition to getSets asyncFetch requests, which evaluates whether the sets context value is an array with 0 length
- If it is _not_, then a request is _not_ made (since the list has already been retrieved)
- This condition was added to both SetsContainer.js and AllTodosContainer.js (components)