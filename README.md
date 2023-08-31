# Loans For Good - Frontend (work in progress)

## Summary
- [Demo](#demo)
- [How to Build the project](#how-to-build-the-project)
- [Project explanation](#project-explanation)
- [References](#references)

## Demo
https://loansforgoodfrontend-06732fd2e7f8.herokuapp.com/

## How to build the project
To build the project, you have to download this repo and the [backend](https://github.com/jsobralgitpush/lfg_backend) one. After that, create an app tree like this
### App tree
```
(root)
├── loans_for_good_backend
├── loans_for_good_frontend
│   ├── (this repo)
└── docker-compose.yml
```
and use this `docker-compose.yml`, setting the following `config-vars` as your preference or use the current ones from the example (just to test the app)
### env
```
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DEBUG=
DATABASE_URL=
REACT_APP_API_HOSTNAME=
REDIS_URL=
```
### docker-compose.yml
```
version: '3.8'

services:
  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword

  backend:
    build:
      context: ./loans_for_good_backend
    command: ["python", "manage.py", "runserver", "0.0.0.0:8000"]
    volumes:
      - ./loans_for_good_backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DEBUG: 'True'
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydatabase
      REDIS_URL: redis://redis:6379/0

  frontend:
    build:
      context: ./loans_for_good_frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./loans_for_good_frontend:/app
    environment:
      REACT_APP_API_HOSTNAME: http://localhost:8000
  
  redis:
    image: "redis:latest"
    ports:
      - "6379:6379"
      

  celery:
    build:
      context: ./loans_for_good_backend
    command: celery -A loans_for_good worker --loglevel=info
    volumes:
      - ./loans_for_good_backend:/app
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgresql://myuser:mypassword@db:5432/mydatabase
      REDIS_URL: redis://redis:6379/0


volumes:
  postgres_data:

```
## Project explanation
The project simulates a financial company which loans money. To request a loan, you have to send a `Proposal`. Users can send, check and refresh the status of all proposals in a SPA. Admin users can register new attributes to proposal and change the status of each proposal. For further detail about the [backend](https://github.com/jsobralgitpush/lfg_backend) check its README.

In this App, we have two `slices` which represents local states. 

### ProposalSlice
In this slice, we manage `Proposal` states. There is two components, a list (`ProposalList`) and a form (`ProposalForm`). This slice manage `proposals` and `attributes` states, which represents an `array` of `JSON` from our `backend` fetch. To check how the fetch proposal is working, you can check files at `/src/api/*`. 


### AlertSlice
In this slice we manage `alerts` from our `UI`. There are two states: `loading` which is a `bool` that indicates if there is any loading ocurring and `alerts` which represents an `array` of `hash`, with payload as `{type: 'error', message: 'Proposal failed to load'}`. Acocrding to that states, our `ToastAlert` component will raise and notify our user

## References
- https://github.com/markerikson/project-minimek
- https://github.com/andrewngu/sound-redux
- https://www.taniarascia.com/redux-react-guide/
