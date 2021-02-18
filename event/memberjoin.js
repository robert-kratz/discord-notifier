module.exports = {
	execute(event) {
		event.addRole(guildMember.guild.roles.find(role => role.name === "User"));
	},
};