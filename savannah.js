const { Client, GatewayIntentBits, ChannelType, EmbedBuilder } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});



const token = process.env['TOKEN']
client.once('ready', () => {
  console.log('Ready!');
});



client.on('messageCreate', async message => {
  if (message.content === '<@1119018606689271909>'){
    setTimeout(() => { message.reply("<@1119018606689271909>") }, 3600000)
  }
  if (message.channelId !="1224535746560659607"){return}
  if (message.content.toLowerCase() === 'test') {
    try {
      const channel = client.channels.cache.get(message.channelId);
      // Create a thread
      const thread = await message.channel.threads.create({
        name: 'Booster Perks',
        //autoArchiveDuration: 1000,
        // Auto-archive duration in minutes (optional)
        type: ChannelType.PrivateThread,
        reason: 'na',
      });
      await thread.members.add(message.author);
      console.log('Thread created:', thread.name);
      message.reply({content:'Thread created successfully!', ephemeral: true});
      setTimeout(() => { message.delete(); }, 2000);
      
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();
      webhook.send({
	content: '<@695659304774139945>',
	threadId: thread.id,
        
    
});
    } catch (error) {
      console.error('Error creating thread:', error);
      message.reply({content: `Error creating thread. ${error}`, ephemeral: true});
    }
  }
  
});

client.login(token);
