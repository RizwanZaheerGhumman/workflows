# Project Name
Microservice Workflows

## Description
 This project is a Workflow Management System designed to handle various workflows that are consumed using Kafka. The system leverages Temporal for workflow orchestration, PostgreSQL for data persistence, Redis for caching, and Zookeeper for managing Kafka brokers. This setup provides a robust environment for handling distributed, scalable, and fault-tolerant workflow processes.

## Table of Contents

- [Project Name](#project-name)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running Docker](#running-docker)
    - [Running Worker](#running-worker)
    - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
  - [Built With](#built-with)

## Prerequisites

Make sure you have installed the following prerequisites on your development machine:

- Docker
- Node.js (version specified in `package.json`)
- npm (Node Package Manager, typically included with Node.js)
- PostgreSQL client (optional, for database interaction outside the Docker container)

## Getting Started

To get a local copy up and running, follow these steps.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
2. Install Dependencies

  ``` bash
  $ npm install
  ```
## Running Docker
  
 To run the application locally, you need to start the Docker containers defined in the docker-compose.yml file.

``` bash
$ docker compose up -d
```
 This command will start the following services:

 - Temporal server (temporal, listening on port 7233)
 - Temporal Web UI (temporal-web, accessible on port 8088)
 - PostgreSQL database (postgres, accessible on port 5432)
 - Redis server (redis, accessible on port 6379)
 - Zookeeper (zookeeper, accessible on port 2181)
 - Kafka (accessible on port 9092)

 ## Running Worker

  To start the worker locally you need to run the worker thread in worker.ts file.This will run your workflows & activities.

  ``` bash
  $ npm run start:worker
  ```

## Run Application
  ``` bash 
  ## watch mode
  $ npm run stat:dev

 ## prod
 $ npm run start:prod
 ```
 ## Running Tests
 ``` bash
 ## watch mode
 $ npm run test:watch

 ## run all test cases
 $ npm run test
 ```

## Built With
 - NestJS - The Node.js framework used
 - TypeORM - ORM used for database interactions
 - Temporal - Workflow orchestration engine
 - PostgreSQL - Database system
 - Redis - In-memory data structure store
 - Kafka - Distributed streaming platform
 - Docker - Containerization platform
