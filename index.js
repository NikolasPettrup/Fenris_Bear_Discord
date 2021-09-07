/**
 * @author Nikolas P.
 */

/**
 * define logger
 * @type {Map}
 */
const loggerMap = require('./logger').logger();


/**
 * setup global functions
 */
require('./globalFunctions').globalFunctions(loggerMap);


/**
 * require config
 */
require('dotenv').config({
    path: require('find-config')(".env")
})


/**
 * require discord.js
 */
const Discord = require("discord.js");


/**
 * instantiate new client
 * @type {Discord.Client}
 */
const client = new Discord.Client();


/**
 * set prefix
 * @type {string}
 */
const prefix = "!";


/**
 * bot goes online
 */
client.on("ready", () => {
    logAll('Fenris_Bear Discord Bot is now online!');
    client.user.setActivity('everywhere 👀', {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/ratback'
    });
});


/**
 * don't listen to messages from self or w/o prefix
 */
client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;


    /**
     * get command
     * set command to lowercase
     * @type {string}
     */
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    /**
     * set 8ball variables
     * @type {string[]}
     */
    const eightball = [
        'As I see it, yes. And now don\'t get on my nerves any longer.',
        'Ask again later. I\'m too busy doing bear-god-things right now, u know?',
        'My sources say no. And ya know, Imma bear-god, so it\'s true.',
        'The answer to your question is 42 and the universe.'
    ], x;


    /**
     * ping test
     */
    /*if (command === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply('Pong! This message had a latency of ' +timeTaken+ 'ms.');
    }*/


    /**
     * check if command is used
     */
    switch (command) {
        /**
         * command list
         */
        case ['command', 'commands', 'cmd', 'cmds', 'help'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('<@' + message.author + '> These are the commands I can operate: ```!youtube - Sends a link to Ratback\'s Youtube-Account\n !twitter - Sends a link to Ratback\'s Twitter-Account\n!insta - Sends a link to Ratback\'s Instagram-Account\n!steamgroup - Sends a Link to Ratback\'s Community Steam Group\n!fiverr - Sends a Link to Ratback\'s Fiverr-Account\n!twitch - Sends a Link to Ratback\'s Twitch-Account\n!8ball [Your yes-no-question] - Gives an answer for your question\n!help - Shows this reply\n\nMore commands coming in the future.```');
            break;


        /**
         * sends twitter link
         */
        case 'twitter':
            message.delete();
            message.channel.send('It seems like you\'d like to follow Ratback on Twitter: https://twitter.com/ratbackttv');
            break;


        /**
         * sends instagram link
         */
        case ['insta', 'instagram', 'ig'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('It seems like you\'d like to follow Ratback on Instagram: https://instagram.com/ratbackttv');
            break;


        /**
         * sends a link to youtube
         */
        case ['youtube', 'yt'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('Follow me on Youtube for exclusive Speedpaints and more! https://www.youtube.com/channel/UChXii0Ai8kFyZGP7VIVSGKg');
            break;


        /**
         * sends fiverr link
         */
        case ['fiverr', 'gig', 'emotes', 'logo', 'emote', 'logos', 'badge', 'badges'].find((value, index, arr) => command === value):
            message.delete();
            message.channel.send('In need of emotes, badges or a logo for your Twitch, Youtube or Social Media Account? Check out Ratbacks Gigs on Fiverr: https://www.fiverr.com/kenowby');
            break;


        /**
         * sends twitch link
         */
        case 'twitch':
            message.delete();
            message.channel.send('It seems like you\'d like to watch and follow Ratback on Twitch: https://twitch.tv/ratback');
            break;


        /**
         * sends steam link
         */
        case 'steam':
            message.delete();
            message.channel.send('It seems like you\'d like to add Ratback on Steam: https://steamcommunity.com/id/ratback/');
            break;


        /**
         * sends steam group link
         */
        case 'steamgroup':
            message.delete();
            message.channel.send('Feel free to join Ratback\'s Community Steam Group: https://steamcommunity.com/groups/ratbacktwitch');
            break;


        /**
         * gives a random answer to a yes-no-question
         */
        case '8ball':
            const randomMessage = eightball[Math.floor(Math.random() * eightball.length)];
            if (args.length >= 1 && args[0] != '') {
                message.channel.send('<@' + message.author + '>```' + randomMessage + '```');
            } else {
                message.channel.send('<@' + message.author + '>```If there is no question, there is no answer.```');
            }
            break;


        /**
         * pokes a specific user
         */
        case 'poke':
            if (args.length > 0) {
                message.channel.send('Yo, ' + args[0] + '! *poke* *poke* Lemme poke you! *poke* *poke* @<' + message.author + '> wants me to do dis.');
            }
            break;


        /**
         * let users join the Mandalorian role
         */
        case 'join':
            message.delete();
            let member = message.member;
            member.roles.add('787692725490286604').catch(console.error);
            message.author.send('```*clap clap* You\'re now a member of Ratback\'s Bounty Hunter Guild!```');
            break;


        /**
         * operates a dice-roll with a dx-dice
         */
        case 'dice':
            if ( args.length > 0) {
                let x = args[0];
                message.channel.send('@<' + message.author + '> hat eine ' + (Math.floor(Math.random() * (x - 1)) + 1) + ' gewürfelt!');
            } else {
                message.channel.send('@<' + message.author + '> hat eine ' + (Math.floor(Math.random() * (6 - 1)) + 1) + ' gewürfelt!');
            }
            break;
    }
});


/**
 * logs in the bot to the discord server
 */
client.login(process.env.BOT_TOKEN);