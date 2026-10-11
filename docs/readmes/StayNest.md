# StayNest

An Airbnb-style booking system for Windows, written in **VB.NET on .NET 10**. Guests search and book stays, Hosts list
places and manage bookings, and Admins approve listings and manage users, all in one WinForms app with role-based menus.
If the main MySQL database goes offline, the app keeps working from a Microsoft Access backup and syncs back later.

## Screenshots

| | |
|---|---|
| ![Login](docs/ui/01%20Login.png) | ![Browse listings](docs/ui/03%20Guest%20-%20Browse%20Listings.png) |
| ![Listing details & booking](docs/ui/04%20Guest%20-%20Listing%20Details%20%26%20Booking.png) | ![Host dashboard](docs/ui/07%20Host%20-%20Dashboard.png) |
| ![Admin dashboard](docs/ui/09%20Admin%20-%20Dashboard.png) | ![Sync & backup](docs/ui/10%20Admin%20-%20Sync%20%26%20Backup.png) |

## Features

**Guests:** search approved listings by city, dates and guests · listing details with photos, amenities and reviews ·
book (dates are re-checked before saving) · record a payment (Cash / GCash / Card, no real money) · cancel with refund ·
1–5 star reviews.

**Hosts:** dashboard (earnings, upcoming bookings, pending requests, rating) · add/edit listings with photos and amenities ·
hide/unhide · accept/decline bookings (overlap check) · earnings chart and CSV export.

**Admins:** dashboard · listing approvals with rejection reasons · user management · reports · sync & backup page ·
text-only admin console.

**System:** MySQL primary with automatic Access backup mode (yellow banner + retry) · sync between the two ·
PBKDF2-SHA256 password hashing · parameterized SQL everywhere.

Full list: [`docs/FEATURES.md`](docs/FEATURES.md).

## Tech stack

VB.NET · .NET 10 Windows Forms · MySQL (MySql.Data) · Microsoft Access via OleDb · layered solution
(`AirbnbSystem.Core`, `AirbnbSystem.WinForms`, `AirbnbSystem.Console`)

## Run locally

Step-by-step guide for a fresh Windows PC: [`docs/SETUP.md`](docs/SETUP.md). In short:

1. Install Visual Studio 2026 Community (.NET 10), XAMPP (MySQL) and the Microsoft Access Database Engine 2016 (64-bit).
2. Import `database/airbnb_db.sql` into MySQL.
3. Open `AirbnbSystem.slnx` and run `AirbnbSystem.WinForms`.

Sample accounts are listed in `docs/SETUP.md`. They are demo data only.

## Documentation

[`docs/design.md`](docs/design.md) (tables, classes, use cases) · [`docs/BUILD_GUIDE.md`](docs/BUILD_GUIDE.md) ·
[`docs/CHALLENGES.md`](docs/CHALLENGES.md) · [`docs/CODE_SNIPPETS.md`](docs/CODE_SNIPPETS.md)

## My role

Solo project by Rafael Marinas: design, database, code and documentation. TODO(rafael): course / context and status
(the resume says "in progress").
