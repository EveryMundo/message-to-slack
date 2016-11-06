'use strict';
/* eslint-disable no-console */

const
  assert  = require('assert'),
  request = require('./request');

const defaultConfig = {
  icon_emoji: ':ghost:',
};

function SlackClient(token, username, _channel, extraConfigs) {
  const channel = _channel || '#general';
  assert(token    && (typeof token    === 'string') && token.length    > 0, `invalid token '${token}'`);
  assert(username && (typeof username === 'string') && username.length > 0, `invalid username '${username}'`);
  assert(channel  && (typeof channel  === 'string') && channel.length  > 0, `invalid channel '${channel}'`);

  Object.defineProperties(this, {
    token:    { value: token },
    username: { value: username },
    channel:  { value: channel || '#general' },
  });

  if (extraConfigs && typeof extraConfigs === 'object')
    Object
    .keys(extraConfigs)
    .filter(  _ => _ in defaultConfig)
    .forEach( _ => this[_] = extraConfigs[_]);
}

function sendMessageToSlack(text, _attachments) {
  const attachments = _attachments && JSON.stringify(Array.isArray(_attachments) ? _attachments : [_attachments] );
  return new Promise((resolve, reject) => {
    const postObj  = {
      token:    this.token,
      channel:  this.channel,
      text,
      username:   this.username,
      icon_emoji: this.icon_emoji || defaultConfig.icon_emoji,
      // 'icon_url': 'https://slack.com/img/icons/app-57.png',
      parse: true
    };

    if (attachments)
      postObj.attachments = attachments;

    request
    .post('https', 'slack.com', '/api/chat.postMessage', postObj)
    .then(resolve)
    .catch(reject);
  });
}

SlackClient.prototype.sendMessage = sendMessageToSlack;

module.exports = SlackClient;
