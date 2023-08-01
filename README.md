# COMMIT ACCOMAPANIMENT

## A record of commits and some details regarding the changes made in them

### July 31, 3:25 PM

#### Commit hash: a22ae8a

Created this readme to document changes in greater detail

Removed comments and empty/unused imports from the following files:

- appContext.js
- convertBase.64.js
- auth.js
- Set.js (dashboard)
- SharedLayout.js
- ProtectedSet.js
- TodosContainer.js
- reducer.js

Implemented short algorithm to optimize image compression based on factors such as raw file size

### July 31, 9:00 PM

#### Commit hash: 

Implemented Todo ID link and styling in place of "remove todo" button on All Todos page

Fixed issue where the Set Name input was rendering before a truthy Set value was loaded, which was done in Set.js (dashboard) by:

- Implementing asyncFetch in an async/await fashion (was originally sync)
- Implementing a new condition `&& !set` for SkeletonLoad
- Implementing a new condition `&& set` for name-container, to ensure that when a falsey Set exists, the name-container element (and more importantly, the SetNameInput component) does not render
