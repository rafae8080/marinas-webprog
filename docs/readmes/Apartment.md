# Apartment — Lease Management System

A web app for a landlord to manage apartments, units, leases and tenant payments in one place.
TODO(rafael): one line on who it was built for (only if the client agrees to be mentioned).

## Screenshots

TODO(rafael): add screenshots of the dashboard, units, lease overview and transaction history.
Use sample data only, with no real tenant names.

## Features

- Landlord login and registration (passwords hashed with `password_hash`)
- Dashboard of available apartments; add an apartment with a photo
- Units per apartment, with unit details
- Create a lease and view a lease overview per apartment and unit
- Submit tenant payments and view the transaction history

## Tech stack

PHP · Microsoft SQL Server (`sqlsrv` driver) · HTML, CSS, JavaScript

## Run locally

Requirements: PHP with the Microsoft `sqlsrv` extension, and SQL Server (Express is free).

1. Create a database named `LeaseManagementDB`. TODO(rafael): add the schema as `database/schema.sql` (no real data).
2. Set your server name in `loginConfig.php` (better: read it from an untracked config file).
3. Serve the folder with Apache (XAMPP) or `php -S localhost:8000`, then open `login.php`.

## My role

TODO(rafael): solo or team? Who is the GitHub user `maverivk`? What did you build?
