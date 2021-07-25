// Define Logger.
const loggerMap = require('./logger').logger();
// Setup Global Functions.
require('./globalFunctions').globalFunctions(loggerMap);

/* function testLog() {
    logAll("This is an INFO");
    logAll("This is an ERROR", 'ERROR');
    logAll("This is a FATAL", 'FATAL');
    logAll("This is a TRACE", 'TRACE');
    logAll("This is a WARN", 'WARN');
    logAll("This is a DEBUG", 'DEBUG');
}
testLog(); */
require('dotenv').config({
    path: require('find-config')(".env")
})
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
var i = 0;

client.on("ready", () => {
    logAll('Fenris_Bear Discord Bot is now online!');
    client.user.setActivity('everywhere 👀', {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/ratback'
    });
});

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //8Ball Variables
    const eightball = ['As I see it, yes. And now don\'t get on my nerves any longer.', 'Ask again later. I\'m too busy doing bear-god-things right now, u know?', 'My sources say no. And ya know, Imma bear-god, so it\'s true.', 'The answer to your question is 42 and the universe.'];



    /*if (command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply('Pong! This message had a latency of ' +timeTaken+ 'ms.');
    }*/

    switch (command) {
        //Commands
        case ['command', 'commands', 'cmd', 'cmds', 'help'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('<@' + message.author + '> These are the commands I can operate: ```!youtube - Sends a link to Ratback\'s Youtube-Account\n !twitter - Sends a link to Ratback\'s Twitter-Account\n!insta - Sends a link to Ratback\'s Instagram-Account\n!fiverr - Sends a Link to Ratback\'s Fiverr-Account\n!twitch - Sends a Link to Ratback\'s Twitch-Account\n!8ball [Your yes-no-question] - Gives an answer for your question\n!help - Shows this reply\n\nMore commands coming in the future.```');
            break;

            //Twitter
        case 'twitter':
            message.delete();
            message.channel.send('It seems like you\'d like to follow Ratback on Twitter: https://twitter.com/ratbackttv');
            break;
            //Instagram
        case ['insta', 'instagram', 'ig'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('It seems like you\'d like to follow Ratback on Instagram: https://instagram.com/ratbackttv');
            break;
            //Fiverr
        case ['fiverr', 'gig', 'emotes', 'logo', 'emote', 'logos', 'badge', 'badges'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('In need of emotes, badges or a logo for your Twitch, Youtube or Social Media Account? Check out Ratbacks Gigs on Fiverr: https://www.fiverr.com/kenowby');
            break;
            //Twitch
        case 'twitch':
            message.delete();
            message.channel.send('It seems like you\'d like to watch and follow Ratback on Twitch: https://twitch.tv/ratback');
            break;
            //Steam
        case 'steam':
            message.delete();
            message.channel.send('It seems like you\'d like to add Ratback on Steam: https://steamcommunity.com/id/ratback/');
            break;
            //8 Ball
        case '8ball':
            const randomMessage = eightball[Math.floor(Math.random() * eightball.length)];
            if (args.length >= 1 && args[0] != '') {
                message.channel.send('<@' + message.author + '>```' + randomMessage + '```');
            } else {
                message.channel.send('<@' + message.author + '>```If there is no question, there is no answer.```');
            }
            break;
            // Poke-Command.
        case 'poke':
            if (args.length > 0) {
                message.channel.send('Yo, ' + args[0] + '! *poke* *poke* Lemme poke you! *poke* *poke* @<' + message.author + '> wants me to do dis.');
            }
            break;

            //Join Command.
        case 'join':
            message.delete();
            let member = message.member;
            member.roles.add('787692725490286604').catch(console.error);
            message.author.send('```*clap clap* You\'re now a member of Ratback\'s Bounty Hunter Guild!```');
            break;

        //Youtube
        case ['youtube', 'yt'].find((value, index, arr) => command == value):
            message.delete();
            message.channel.send('Follow me on Youtube for exclusive Speedpaints and more! https://www.youtube.com/channel/UChXii0Ai8kFyZGP7VIVSGKg');
            break;

    }
});

client.login(process.env.BOT_TOKEN);