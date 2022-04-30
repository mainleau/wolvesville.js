const Base = require('./Base');
const RequestingClan = require('./RequestingClan');
const ClanMember = require('./ClanMember');

/**
 * Represents a clan request.
 * @extends {Base}
 */
class ClanRequest extends Base {
  constructor(client, data) {
    super(client);

    this.clan = new RequestingClan(client, data);

    const member = data.members[0];
    member.clan = data;

    this.inviter = new ClanMember(client, member);
  }
}

module.exports = ClanRequest;
