# Coding Contest Tracker

A web application to track upcoming coding contests from popular platforms like **AtCoder**, **Codeforces**, **CodeChef**, **LeetCode**, and **GeeksForGeeks** using the Clist API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Contest Listing:** Displays upcoming contests fetched from the Clist API.
- **User Authentication:** Supports user registration and login.
- **Session Management:** Keeps users logged in via Express sessions.
- **Automatic Contest Updates:** Fetches and stores contest data periodically.
- **Responsive UI:** Rendered using EJS templates.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS
- **Database:** PostgreSQL
- **External API:** Clist API
- **Authentication:** Express-session, bcryptjs

## Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/Ani-tem/contest-tracker.git
   cd contest-tracker

` ` ` 
npm install
` ` `

Database Setup
Create a PostgreSQL database (e.g., contest_tracker).

Run the following SQL commands in your PostgreSQL console to create the necessary tables:

```
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Contests table
CREATE TABLE contests (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    platform TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    url TEXT NOT NULL
);


Configuration
Create a .env file in the root directory with the following variables:

```


