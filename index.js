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
var grogu = 0;

client.on("ready", () => {
    logAll('Fenris_Bear Discord Bot is now online!');
    client.user.setActivity('everywhere 👀', {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/thegrizziey'
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
        //Twitter
        case 'twitter':
            message.delete();
            message.channel.send('It seems like you\'d like to follow Grizzley on Twitter: https://twitter.com/grizzIeylol');
            break;
        //Instagram
        case ['insta', 'instagram', 'ig'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('It seems like you\'d like to follow Grizzley on Instagram: https://instagram.com/grizzIeylol');
            break;
        //Fiverr
        case ['fiverr', 'gig', 'emotes', 'logo', 'emote', 'logos', 'badge', 'badges'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('In need of emotes, badges or a logo for your Twitch, Youtube or Social Media Account? Check out Grizzleys Gigs on Fiverr: https://www.fiverr.com/kenowby');
            break;
        //Twitch
        case 'twitch':
            message.delete();
            message.channel.send('It seems like you\'d like to watch and follow Grizzley on Twitch: https://twitch.tv/thegrizziey');
            break;
        //Steam
        case 'steam':
            message.delete();
            message.channel.send('It seems like you\'d like to add Grizzley on Steam: https://steamcommunity.com/id/thegrizziey/');
            break;
        //8 Ball
        case '8ball':
            const randomMessage = eightball[Math.floor(Math.random() * eightball.length)];
            if (args.length >= 1 && args[0] != '') {
                message.channel.send('<@' + message.author + '>```' + randomMessage + '```');
            }
            else {
                message.channel.send('<@' + message.author + '>```If there is no question, there is no answer.```');
            }
            break;
        // Poke-Command.
        case 'poke':
            if (args.length > 0) {
                message.channel.send('Yo, ' + args[0]+ '! *poke* *poke* Lemme poke you! *poke* *poke* @<' + message.author + '> wants me to do dis.');
            }
            break;
        
        //DestinyV Command
        case ['destiny', 'dv', 'd5', 'destinyv', 'destiny5'].find((value, index, arr) => command == value):
            message.delete();
            message.channel.send('DestinyV is a German GTA V Roleplay server project by Grizzley and two of his friends which currently is in development. Discord-Server: https://discord.gg/URkNCPJeWe');
            message.channel.send(':flag_de: Bei Interesse an einer Mitarbeit als Gamedesigner, Supporter oder Developer, tretet dem obigen Discordserver bei und schickt einem Mitglied der Projektleitung eine DM.');
            break;

        //Join Command.
        case 'join':
            message.delete();
            let member = message.member;
            member.roles.add('787692725490286604').catch(console.error);
            message.author.send('```*clap clap* You\'re now a member of Grizzley\'s Bounty Hunter Guild!```');
            break;
        
        //Grogu Counter
        case 'grogu':
            message.delete();
            grogu++;
            message.channel.send('Grogu was in trouble again, but you saved him, @<' + message.author + '>! Baby Yoda was already saved ' + grogu + ' times by this Discord server!');
            break;

        //Commands
        case ['command', 'commands', 'cmd', 'cmds', 'help'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('<@' + message.author + '> These are the commands I can operate: ```!d5 - Sends information about our GTA V RP Server project DestinyV\n!twitter - Sends a link to Grizzley\'s Twitter-Account\n!insta - Sends a link to Grizzley\'s Instagram-Account\n!fiverr - Sends a Link to Grizzley\'s Fiverr-Account\n!twitch - Sends a Link to Grizzley\'s Twitch-Account\n!8ball [Your yes-no-question] - Gives an answer for your question\n!help - Shows this reply\n\nMore commands coming in the future.```');
            break;

    }
});

client.login(process.env.BOT_TOKEN);