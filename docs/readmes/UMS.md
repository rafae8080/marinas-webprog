# UMS — User Management System

A PHP and MySQL web app for managing user accounts, with two roles: **Admin** (dashboard + user management) and
**Barangay Official** (dashboard only).
TODO(rafael): say whether this was part of E-Telly or a separate class project.

## Screenshots

TODO(rafael): add screenshots of the login page, dashboard and user management.

## Features

- Session-based login with `password_verify` and session ID regeneration
- Create, edit, delete users and reset passwords (JSON API under `api/users/`)
- Role-based access (Admin / Barangay Official)
- Prepared statements (PDO) for every query that takes user input

## Tech stack

PHP (PDO) · MySQL · HTML, CSS, vanilla JavaScript · XAMPP

## Run locally

1. Copy the folder to `C:\xampp\htdocs\UMS` and start Apache + MySQL.
2. Import `database/ums.sql` in phpMyAdmin.
3. Open `http://localhost/UMS/login.html` and sign in with the default admin from `readme`.
   **Change that password after the first login.**

## Team

Rafael Marinas (rafae8080) and TODO(rafael): teammate name (GitHub: kaia-cmd). TODO(rafael): who did what. i only do front end but i think i cant run this so no need to add this on the portfolio, but if needeed, go add it
