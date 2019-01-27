const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const { google } = require('googleapis');
const search = google.customsearch({
	version: 'v1',
	auth: 'AIzaSyAJkA5G7F_zTfUIeHEkvpMtkbMvo87T4kQ'
});

/**
* /memefy
*
*   "memefy" command spits out a random dank meme
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
	search.cse.list({ cx: '005405688461163377964:c8kxxacbuqw',
										q: `${text} meme`,
										searchType: 'image',
										num: 10 }).then((res) => {
		const randItem = res.data.items[Math.floor(Math.random()*res.data.items.length)];
		callback(null, {
			attachments: [
				{
					preText: text,
					title: randItem.snippet,
					image_url: randItem.image.thumbnailLink
				}
			]
		});
	}).catch((err) => {
		console.log(err);
	});
};
