# Whatsapp api baileys multi device support


🚧 This project is under construction and not ready for use yet.  🚧

## About this project
This project is a simple restfull API to send messages to whatsapp using the [baileys]() library as a base for the API service with multi device support.

## Requirements
- [Node.Js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/)

## How to use
clone this repository
```bash
git clone
```
install dependencies
```bash
npm install
```
copy the envs/.env.example file to envs/.env and fill the variables
```bash
cp envs/.env.exemple envs/.env.development
```

run the project
```bash
npm run dev
```

## Docker
This project uses a Dockerized development environment. Below are the details about the configured development environment:

update `envs/.env.development` file with the docker variables
```bash
cp envs/.env.exemple envs/.env.development
```
run the project
```bash
docker-compose up -d
```

Open an interactive terminal:
```
docker exec -it container-name  /bin/bash
```

You can now run commands as if you were in the local environment. For instance:
```
npm install
npm start
```

## API Documentation
All routes are documented in [Postman](https://documenter.getpostman.com/view/12598731/2sA3JQ3etK)

## Contributing
Check the [contributing](CONTRIBUTING.md) file for more details.

## Structure
Check the [structure](STRUCTURE.md) file for more details.

## License
This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

# Disclaimer
This project is an independent initiative and is not affiliated, authorized, maintained, sponsored, or endorsed by WhatsApp (WA) or any of its affiliates or subsidiaries.

The official WhatsApp website can be accessed at [https://whatsapp.com](https://whatsapp.com). The terms "WhatsApp," as well as any names, trademarks, badges, and associated images, are trademarks of their respective owners.

This software is an unofficial implementation. Its use is at the user's own risk. We recommend not using it for spam or any activity that violates the terms of service of WhatsApp.

The development team assumes no responsibility for any damages or issues resulting from the use of this software.

Thank you for your understanding.