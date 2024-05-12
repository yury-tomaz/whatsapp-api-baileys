FROM node:20.5.1-slim

USER node

WORKDIR /home/node/app
ENV NODE_ENV development

CMD ["tail", "-f", "/dev/null"]