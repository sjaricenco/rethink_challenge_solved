## Summary ##

The following source code is the solution to the RethinkFirst's take home challenge. Solution is composed of 2 folders: `/ui` and `/api`

`/ui` contains the source for an Angular 17 SPA (single page application). This application contains basic CRUD functionality along with some animations and input validation.

`/api` contains a .NET 6 Web API serving a pseudo database of contacts. The actual source of data is a contacts.json file. It contains a single REST API controller + global error handling middleware. 

## How to run Angular UI application ##

There are 2 ways to launch the Angular front-end:

1) Using the supplied Docker file (recommended). To create Docker image, navigate inside of `/ui` folder and open terminal of choice.

   Run the following command to create Docker image: `docker image build -t rethink_ui ./`
   Once image is successfully created, start a new container with the following command: `docker container run -d -p 8081:80 --rm rethink_ui:latest`

2) You can also run the Angular app locally. To do so, navigate inside of `/ui` folder. Open source code in terminal or VS Code. Modify /src/app/service/api.service.ts file on line 12.
   Change it to `this._baseUrl = "[http://localhost:7264";](https://localhost:7264/)`
   **Note**: you need to do this only if you want to run both the UI and the API locally in Development mode

   Now run the following command: `ng serve`. This will launch a local development version of the app.
   **Note:** if the .NET Core API is not running, you will not see any data brought back from the API.

## How to run .NET API application ##

Similar to the UI, there are two ways to run the .NET 6 REST API.

1) Run it locally by navigating to the `/api` folder. Open the `RethinkHomeworkAPI.sln` solution in Visual Studio and launch the app in Debug mode.
2) (Recommended) navigate to the `/api` folder and launch the API as a Docker container.

   First run `docker image build -t rethink_homework_api ./` to create the Docker image. Next, run `docker container run -dp 8080:80 --rm rethink_homework_api:latest` to launch the actual container.

   **Note:** If you navigate to [localhost:8080/](http://localhost:8080/swagger/index.html)http://localhost:8080/swagger/index.html you will be presented with an interactive Swagger API testing screen

   ![image](https://github.com/sjaricenco/rethink_challenge_solved/assets/85944475/a13a159d-81a6-4e63-a3a4-4565bd506eb4)

