# dotnetcore-angular4-material
.NET Core SPA (Angular 4) with Material 2 Starter

## Preview
http://materialstarter.azurewebsites.net/home

## Deployment instructions
```
> npm install
> dotnet restore

# Development
> $Env:ASPNETCORE_ENVIRONMENT = "Development"
> dotnet run

# Production
> dotnet run
```

For development, you only need to set environment variable only one


----------------------------------------------------------------------------------------------------------------


This project was generated with [.NET Core Template](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/) version 0.9.3.

## Development server
Run `dotnet run` for a dev server and make you you set $Env:ASPNETCORE_ENVIRONMENT = "Development". Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

## Build

Run `dotnet build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `karma start ClientApp/test/karma.conf.js` to execute the unit tests via [Karma](https://karma-runner.github.io).
