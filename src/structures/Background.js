const Base = require('./Base');
const { ItemRarities } = require('../util/Constants');

/**
 * Represents a background.
 * @extends {Base}
 */
class Background extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.imageStoreDay.fileName.split('_').slice(0, -3).join('_');

    this.rarity = data.rarity === 'COMMON' ? ItemRarities.COMMON
      : data.rarity === 'RARE' ? ItemRarities.RARE
      : data.rarity === 'EPIC' ? ItemRarities.EPIC
      : ItemRarities.LEGENDARY;

    Object.defineProperty(this, 'dayColor', { value: data.backgroundColorDay });
    Object.defineProperty(this, 'nightColor', { value: data.backgroundColorNight });
  }

  imageURL({ night = false, large = false, zoom } = {}) {
    if(typeof large !== 'boolean' || typeof night !== 'boolean') {
      throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    }
    if(zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.options.http.cdn}/backgrounds/${this.name}`;
    url += `_background_${large ? 'large' : 'small'}`;
    url += `_${night ? 'night' : 'day'}`;
    if(zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }

}

module.exports = Background;
