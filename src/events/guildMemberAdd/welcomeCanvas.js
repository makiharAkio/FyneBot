const { Client, GuildMember, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');
const path = require('path');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
    try {
        let guild = member.guild;
        if (!guild) return;
  
        var welcomeCanvas = {};

        welcomeCanvas.create = Canvas.createCanvas(1024, 500)
        welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
        welcomeCanvas.context.font = '72px sans-serif';
        welcomeCanvas.context.fillStyle = '#ffffff';

        const imgPath = path.join(__dirname, '../../img/bg.png');
        await Canvas.loadImage(imgPath).then(async (img) => {
            welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
            welcomeCanvas.context.fillText('Welcome', 360, 360);
            welcomeCanvas.context.beginPath();
            welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
            welcomeCanvas.context.stroke();
            welcomeCanvas.context.fill();
        })

        const welcomeChannel = client.channels.cache.get('1143871270988025916');
        welcomeCanvas.context.font =  '42px sans-serif';
        welcomeCanvas.context.textAlign = 'center';
        welcomeCanvas.context.fillText(member.user.tag.toUpperCase(), 512, 410);
        welcomeCanvas.context.font = '32px sans-serif';
        welcomeCanvas.context.fillText(`You are the ${guild.memberCount}th`, 512, 455);
        welcomeCanvas.context.beginPath();
        welcomeCanvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
        welcomeCanvas.context.closePath();
        welcomeCanvas.context.clip();
        await Canvas.loadImage(member.user.displayAvatarURL({extension: 'png', size: 1024}))
            .then(img => welcomeCanvas.context.drawImage(img, 393, 47, 238, 238))
        let atta = new AttachmentBuilder(welcomeCanvas.create.toBuffer(), { name: `welcome-${member.id}.png` });
        welcomeChannel.send(`Hello ${member}, welcome to ${member.guild.name}!`);;
        welcomeChannel.send({ files: [atta] });


    } catch (error) {
      console.log(`Error welcoming: ${error}`);
    }
  };



