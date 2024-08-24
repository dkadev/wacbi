# WACBI - WhatsApp Chat Backup Inspector

A web tool to store and visualize Whatsapp Chat backups.

## Features

- Upload a WhatsApp chat backup file.
- Extract messages and attachments.
- Store messages in MongoDB.
- Store attachments in Minio.
- View chat history.
- Search for chats.
- Search for messages. (Soon)
- Filter chats by date. (Soon)
- Dockerized setup. (Soon)

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
    - [x] Parse the data and store it in a MongoDB database.
    - [x] Store any file attachments in a suitable location (e.g., the filesystem or a cloud storage service).
3. Retrieving and Displaying Chat Data:
    - [x] Fetch the chat data from the API.
    - [x] Display the chat data in the frontend.
    - [ ] Filtering functionality on table.
    - [ ] Pagination functionality on table.
    - [x] CRUD functionality on table.
    - [ ] Search functionality on chat.
    - [x] Attachment viewing functionality on chat.
4. Docker Setup:
    - [ ] Write Dockerfiles to package application.
    - [x] Set up a `docker-compose.yml` file to define the services required for application.
