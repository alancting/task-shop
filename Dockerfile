FROM node:17.4.0 as base

ENV WORKDIR /application

WORKDIR ${WORKDIR}

ADD ./application ${WORKDIR}

RUN yarn install

# CMD ["yarn", "start"]