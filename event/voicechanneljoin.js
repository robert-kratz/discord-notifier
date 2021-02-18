const audio = require('../utils/autochannel');

module.exports = {
	execute(oldMember, newMember) {
		if(newMember.member.voice.channelID === "811574343104593920") { //PRIVATE CHANNEL
			if(audio.getChannel(newMember.member) == null) {
				audio.createChannel(newMember.member, true);
			} else {
				newMember.member.voice.setChannel(audio.getChannel(newMember.member));
			}
		} else {
			if(newMember.member.voice.channelID === "809854175185600553") { //PUBLIC CHANNEL
				if(audio.getChannel(newMember.member) == null) {
					audio.createChannel(newMember.member, false);
				} else {
					newMember.member.voice.setChannel(audio.getChannel(newMember.member));
				}
			}
		}
	},
};