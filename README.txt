README.txt
==========
I have used other sources, as-is, as listed and detailed in my submitted README.txt file 
(must be named EXACTLY README.txt)

Academic honesty certification
------------------------------
Although I did not use outside sources for the actual application logic itself, I have listed the 
application dependencies (which includes frameworks/libraries). Other than the tools listed below, I wrote 
all code for this project by myself. Server-side dependencies are managed through Maven and client-side 
dependencies are managed through Yarn (Package manager for Node.js). This project uses the following third-party
frameworks/libraries/tools:

Global:
------
- Vagrant (as-is, obtained from https://www.vagrantup.com) - Used to set up the development environment. This
  "containerized" the development environment so it could be used across multiple systems.

Server:
------
- Spring framework (as-is, dependency (JAR libraries) managed by Maven) - Framework used for building the 
  backend server of ULearn
- JJWT (as-is, dependency (JAR libraries) managed by Maven) - JSON Web Token generation/signing/verification 
  library
- SQLite/PostgreSQL/Apache Commons DBCP (as-is, dependency (JAR libraries) managed by Maven) - Database 
  management library for Java
- Maven (as-is) - Build tool

Client:
------
- ReactJS (as-is, dependency (JavaScript files) managed by Yarn) - Library for building Single Page Application
- FontAwesome (as-is, dependency (JavaScript files) managed by Yarn) - Used for button icons
- Redux (as-is, dependency (JavaScript files) managed by Yarn) - Used for managing application state 
  (e.g. has the user logged in? what course sorting order do they prefer?)
- Typescript (as-is, dependency (JavaScript files) managed by Yarn) - Used to add a build/compile step in 
  the front-end development. This helped in quickly finding JavaScript-related errors
- Webpack (as-is, dependency (JavaScript files) managed by Yarn) - Bundling (combining) the final JavaScript 
  files in an efficient manner so the application loads quickly
- Yarn (as-is, obtained from https://yarnpkg.com/en/)
- Node.js (as-is, obtained from https://nodejs.org/en/download/)

All of these dependencies are "general" dependencies which were used to simplify application 
development (TypeScript/Webpack) and images (FontAwesome). React/Redux were primarily used to develop 
the "component-centric" style. Aside from these dependencies, I have built the application 
architecture, written the core logic and designed the UI for the ULearn application myself.
