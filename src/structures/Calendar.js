'use strict';

const Base = require('./Base');
const CalendarReward = require('./CalendarReward');

/**
 * Represents a calendar.
 * @extends {Base}
 */
class Calendar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Calendar id
     * @type {string}
     */
    this.id = data.calendarId;

    /**
     * Calendar title
     * @type {string}
     */
    this.title = data.title;

    /**
     * Calendar description
     * @type {string}
     */
    this.description = data.description;

    /**
     * Calendar type
     * @type {string}
     */
    this.type = data.gemOfferType;

    if (data.owned) {
      /**
       * Calendar claimed rewards
       * @type {CalendarReward[]}
       */
      this.claimedRewards = data.claimedRewards.map(
        (reward, index) =>
          new CalendarReward(
            client,
            Object.assign(reward, {
              day: index,
            }),
          ),
      );

      /**
       * Calendar next reward day
       * @type {?number}
       */
      this.nextRewardDay = data.nextRewardTime ? data.nextRewardDay : null;

      /**
       * Calendar next reward claim timestamp
       * @type {?number}
       */
      this.nextRewardClaimTimestamp = new Date(data.nextRewardTime).getTime() || null;

      /**
       * Calendar claimed timestamp
       * @type {number}
       */
      this.claimedTimestamp = new Date(data.claimTime).getTime();
    }

    /**
     * Calendar duration
     * @type {number}
     */
    this.duration = data.durationInDays;

    /**
     * Calendar start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Calendar end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(this.startTimestamp + this.duration * 24 * 60 * 60 * 1000).getTime();

    /**
     * Whether calendar is claimed
     * @type {boolean}
     */
    this.claimed = data.owned;

    Object.defineProperty(this, '_assets', {
      value: {
        backgroundImage: {
          name: data.backgroundImageName,
          color: data.backgroundImagePrimaryColor,
        },
        iconImage: {
          name: data.iconImageName,
        },
        text: {
          color: data.textColor,
          backgroundColor: data.textBackgroundColor,
        },
      },
    });
  }

  /**
   * Whether calendar is completed
   * @type {boolean}
   * @readonly
   */
  get completed() {
    return Boolean(this.claimed & !this.nextRewardDay);
  }

  /**
   * Calendar background image url
   * @type {string}
   * @readonly
   */
  get backgroundImageURL() {
    return `${this.client.rest.options.cdn.items}/calendars/${this._assets.backgroundImage}.png`;
  }

  /**
   * Calendar icon image url
   * @type {string}
   * @readonly
   */
  get iconImageURL() {
    return `${this.client.rest.options.cdn.items}/calendars/${this._assets.iconImage}.png`;
  }
}

module.exports = Calendar;
