var activechannel = []

var createChannel = (member, private) => {
  var data = [
    {
      id: member.guild.id,
      allow: [],
      deny: ['CONNECT']
    },
    {
      id: member.id,
      allow: ['MOVE_MEMBERS', 'CONNECT', 'SPEAK'],
      deny: []
    }
  ];
  
  if(private) {
    data = [
      {
        id: member.guild.id,
        allow: ['CONNECT'],
      },
      {
        id: member.id,
        allow: ['MOVE_MEMBERS', 'CONNECT', 'SPEAK'],
        deny: []
      }
    ];
  }

  member.guild.channels.create('📞 ' + member.displayName + "'s channel", {
      type: 'voice',
      permissionOverwrites: data
    }).then(() => {
      member.guild.channels.cache.find(ch => {
        if(ch.name === '📞 ' + member.displayName + "'s channel") {
          //Add Channel to category
          member.guild.channels.cache.find(cat => {
            if(cat.name === "📢 Voicechannel" && cat.type === "category") {
              ch.setParent(cat, {lockPermissions: false}); 
            }
          });
          //Move Member
          member.voice.setChannel(ch.id);
          activechannel.push({channel: ch.id, owner: member.id});
          return;
        }
      });
    });
}

var deleteChannel = (channel) => {
  if(channel.channel.name.includes('📞')) {
    if(channel.channel.members.size == 0) {
      setTimeout(() => {
        if(channel.channel != null && channel.channel.members.size == 0) {
          channel.channel.delete().then(() => {
            console.log('voice channel deleted');
            activechannel.forEach(obj => {
              activechannel.remove(obj);
            });
            return;
          });
        }
      }, 4 * 1000);
    }
  }
}

var getChannel = (member) => {
  var channel = undefined;
  
  activechannel.forEach(obj => {
    if(obj.owner === member.id) {
      channel = obj.channel;
    }
  });
  return channel
}

//REMOVE ELEMENT FROM ARRAY BY VALUE
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

module.exports = {
    createChannel,
    deleteChannel,
    getChannel,
    activechannel
}