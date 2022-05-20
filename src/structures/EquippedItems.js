'use strict';

const Avatar = require('./Avatar');
const Base = require('./Base');
const OwnedProfileIcon = require('./OwnedProfileIcon');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents player equipped items.
 * @extends {Base}
 */
class EquippedItems extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('avatar' in data) {
      /**
       * Player avatar
       * @type {Avatar}
       */
      this.avatar = new Avatar(this.client, data.avatar);
    }

    if ('profileIcon' in data) {
      /**
       * Player profile icon
       * @type {OwnedProfileIcon}
       */
      this.profileIcon = this.client.items.profileIcons.cache.size
        ? new OwnedProfileIcon(
            this.client,
            Object.assign(this.client.items.profileIcons.cache.get(data.profileIcon.id), {
              color: data.profileIcon.color,
            }),
          )
        : new OwnedProfileIcon(this.client, data.profileIcon);
    }

    if ('background' in data) {
      /**
       * Player background
       * @type {Background}
       */
      this.background = this.client.items.resolve(data.background, ItemTypes.BACKGROUND);
    }

    if ('loadingScreen' in data) {
      /**
       * Player loading screen
       * @type {LoadingScreen}
       */
      this.loadingScreen = this.client.items.resolve(data.loadingScreen, ItemTypes.LOADING_SCREEN);
    }
  }
}

module.exports = EquippedItems;
