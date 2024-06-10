# WACBI - WhatsApp Chat Backup Inspector

A web tool to store and visualize Whatsapp Chat backups.

## Features

- Upload a WhatsApp chat backup file.
- Extract messages and attachments.
- Store messages in MongoDB.
- Store attachments in Minio.
- View chat history.
- Search for messages.
- Search for chats.
- Filter chats by date.

## Stack

Frontend:

- Nextjs 14
- Shadcn UI

Backend:

- Nodejs Express
- MongoDB
- Minio

## To Do

1. Building the Frontend:
    - [x] Create Nextjs project for the frontend interface.
    - [x] UI components using Tailwind CSS and Shadcn.
    - [x] Create the necessary routes and pages.
2. Handling File Upload and Data Extraction:
    - [x] Create Nodejs Express project.
    - [x] Set up a file upload endpoint.
    - [x] Extract the chat data from the uploaded `.zip` file.
    - [ ] Parse the data and store it in a MongoDB database.
    - [ ] Store any file attachments in a suitable location (e.g., the filesystem or a cloud storage service).
3. Retrieving and Displaying Chat Data:
    - [ ] Fetch the chat data from the API.
4. Docker Setup:
    - [ ] Write Dockerfiles to package application.
    - [ ] Set up a `docker-compose.yml` file to define the services required for application.
