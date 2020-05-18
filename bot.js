require('dotenv').config()
const GoogleImages = require('google-images')
const Discord = require('discord.js')
const client = new Discord.Client()
const googleImages = new GoogleImages(
  'Your Google CSE ID Here',
  'Your Google Console API Key Here'
)
async function onMessage(msg) {
  let s = msg.content
  if (s.match(/-nakam.*/) || s.match(/-n.*/)) {
    s = s.match(/-nakam.*/)
      ? s.replace('-nakam ', 'food ')
      : s.replace('-n ', 'food ')

    try {
      const results = await googleImages.search(s)
      var rnd = Math.floor(Math.random() * results.length)
      let pict = results[rnd].url
      msg.reply(results[rnd].url)
      console.log({
        isSuccess: true,
        url: pict,
        message: 'mantappu',
      })
    } catch (e) {
      console.error(e)
      msg.channel.send('Error happened, see the console')
    }
  }
}

client
  .on('ready', () => console.log('I am ready!'))
  .on('message', onMessage)
  .login('Your Discord API Key Here')
