require('dotenv').config()
const GoogleImages = require('google-images')
const Discord = require('discord.js')
const client = new Discord.Client()
const googleImages = new GoogleImages(
  '016859491529718255023:kdzs054nffl',
  'AIzaSyCcv7b5BumVDoyApas3CGuc8xVzjYzjQMg'
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
      msg.reply(results[rnd].url)
    } catch (e) {
      console.error(e)
      msg.channel.send('Error happened, see the console')
    }
  }
}

client
  .on('ready', () => console.log('I am ready!'))
  .on('message', onMessage)
  .login(process.env.BOT_TOKEN)
