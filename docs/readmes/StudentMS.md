# StudentMS — Student Management System

An ASP.NET Core MVC web app to add, view, edit and delete student records (name, grade, email, course).

## Screenshots

TODO(rafael): add screenshots of the student list and the create/edit form.

## Features

- Full CRUD for students (list, details, create, edit, delete with confirmation)
- Server-side validation with data annotations: name 2–50 characters, grade 1–100, valid email, required course
- Entity Framework Core with a code-first migration

## Tech stack

C# · ASP.NET Core MVC (.NET 10) · Entity Framework Core · SQL Server · Bootstrap

## Run locally

Requirements: .NET 10 SDK and SQL Server (LocalDB / Express).

```bash
# set your server in appsettings.json -> ConnectionStrings:DefaultConnection
dotnet ef database update
dotnet run
```

## My role

Solo project by Rafael Marinas. TODO(rafael): course name.

> Repo cleanup: `bin/`, `obj/` and `publish/` should be removed from git and added to a .NET `.gitignore`.
