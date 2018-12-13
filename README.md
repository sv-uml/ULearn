# ULearn
A simple, easy-to-use Learning Management System (LMS) to manage employee training.

## Project Structure
`src/`: Contains source code for ULearn

`Weekly Update`: Contains progress reports for each week

`WeeklyChanges`: Contains archive of source code as it stood in each week


## How to build

### Prerequisites
- Vagrant

### Build
To maintain build environment consistency, this project uses Vagrant. As a result, all tools (nodejs, yarn etc.) are installed within the environment.

To begin development, start the Vagrant machine by running `vagrant up` in the terminal.

Once the set up is complete, login to the Ubuntu-based environment by running `vagrant ssh`.

Next, navigate to the source code folder:

    cd /vagrant

Install application dependencies using Yarn:

    yarn install

Start the application:

    yarn start

This will use `webpack-dev-server` to start the development server. Open your browser and type `http://localhost:8081/` to view the application.
