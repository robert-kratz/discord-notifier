const audio = require('../utils/autochannel');

module.exports = {
	execute(oldMember) {
		audio.deleteChannel(oldMember);
	},
};