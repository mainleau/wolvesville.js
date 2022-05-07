const Base = require('./Base');
const { ItemRarities } = require('../util/Constants');

/**
 * Represents a loading screen.
 * @extends {Base}
 */
class LoadingScreen extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.imageStore.fileName.split('_').slice(0, -1).join('_');

    this.rarity = data.rarity === 'COMMON' ? ItemRarities.COMMON
      : data.rarity === 'RARE' ? ItemRarities.RARE
      : data.rarity === 'EPIC' ? ItemRarities.EPIC
      : ItemRarities.LEGENDARY;

    Object.defineProperty(this, 'primaryColor', { value: data.imagePrimaryColor });
  }

  imageURL({ wide = false, zoom } = {}) {
    if(typeof wide !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if(zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.options.http.cdn}/loadingScreens/${this.name}`;
    url += `_background_large${wide ? '.wide' : ''}`;
    if(zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }

}

module.exports = LoadingScreen;
