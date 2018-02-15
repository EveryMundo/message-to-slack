# @everymundo/message-to-slack
Easily sending message to slack channels

## Installation
```sh
$ npm install 
```

## Usage
```js
const SlackClient = require('@everymundo/message-to-slack');
const options = { icon_emoji: ':robot_face:' };

// your token will look like this:
// xoxb-999999999999-9a9a9a9a9a9a9a9a9a9a9a9a
// This is the BOT Token, not the other one
const { SLACK_TOKEN } = process.env;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || 'google-ita-worker-app';
const SLACK_USER    = process.env.SLACK_USER    || 'google-ita-worker-bot';

const client = new SlackClient(SLACK_TOKEN, SLACK_USER, SLACK_CHANNEL, options);

client.sendMessage('@everymundo/message-to-slack works like a charm');
```