README.txt

Academic honesty certification
------------------------------
Although I did not use outside sources for the actual application logic itself, I have listed the application dependencies (which includes frameworks/libraries).
I wrote all, non-dependency code for this project by myself. This project uses the following dependencies:

Server:
Spring framework - Framework used for building the backend server of ULearn
JJWT - JSON Web Token generation/signing/verification library
SQLite/PostgreSQL/Apache Commons DBCP - Database extension for Java
Maven - Build tool

Client:
ReactJS - Library for building Single Page Application
FontAwesome - Used for button icons
Redux - Used for managing application state (e.g. has the user logged in? what course sorting order do they prefer?)
Typescript - Used to add a build/compile step in the front-end development. This helped in quickly finding JavaScript-related errors
Webpack - Bundling (combining) the final JavaScript files in an efficient manner so the application loads quickly
Node.js (and dependencies to support the Node.js runtime)

All of these dependencies are "general" dependencies which were used to simplify application build (TypeScript/Webpack) and 
images (FontAwesome). React/Redux were primarily used to develop using the "component-centric" architecture. Aside from these dependencies,
I have built the application architecture, written the core logic and designed the UI for the ULearn application myself.
