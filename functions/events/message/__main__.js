const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const { google } = require('googleapis');
const search = google.customsearch({
	version: 'v1',
	auth: 'AIzaSyAJkA5G7F_zTfUIeHEkvpMtkbMvo87T4kQ'
});

/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {string} user The user id of the user that invoked this event (name is usable as well)
* @param {string} channel The channel id the event was executed in (name is usable as well)
* @param {string} text The text contents of the event
* @param {object} event The full Slack event object
* @param {string} botToken The bot token for the Slack bot you have activated
* @param {any} ts The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', event = {}, botToken = null, ts, callback) => {

  // Only send a response to certain messages
  if (text.match(/help/i)){
    search.cse.list({ cx: '005405688461163377964:c8kxxacbuqw',
                      q: `${text} meme`,
                      searchType: 'image',
                      imgSize: 'medium',
                      num: 10 }).then((res) => {
      const randItem = res.data.items[Math.floor(Math.random()*res.data.items.length)];
      callback(null, {
        text: `wain`,
        thread_ts: ts,
        attachments: [
          {
            preText: text,
            title: randItem.snippet,
            image_url: randItem.image.thumbnailLink,
          }
        ]
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    callback(null, {});
  }
};
