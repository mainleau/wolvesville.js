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
     * Calendar id.
     * @type {string}
     */
    this.id = data.calendarId;

    /**
     * Calendar title.
     * @type {string}
     */
    this.title = data.title;

    /**
     * Calendar description.
     * @type {string}
     */
    this.description = data.description;

    /**
     * Calendar type.
     * @type {string}
     */
    this.type = data.gemOfferType;

    /**
     * Wether calendar is claimed.
     * @type {boolean}
     */
    this.claimed = data.owned;
    if(this.claimed) {
      /**
       * Calendar claimed timestamp.
       * @type {string}
       */
      this.claimedTimestamp = new Date(data.claimTime).getTime();

      /**
       * Calendar next reward.
       * @type {Object}
       */
      this.nextReward = data.nextReward;

      /**
       * Calendar next reward claim timestamp.
       * @type {Object}
       */
      this.nextRewardClaimTimestamp = new Date(data.nextRewardTimestamp).getTime();

      /**
       * Calendar claimed rewards.
       * @type {CalendarReward[]}
       */
      this.claimedRewards = data.claimedRewards.map((reward, index) => new CalendarReward(
        client,
        Object.assign(reward, {
          claimed: this.nextReward >= index
        })
      ));
    }

    /**
     * Calendar duration.
     * @type {number}
     */
    this.duration = data.durationInDays;

    /**
     * Calendar start timestamp.
     * @type {number}
     */
    this.startTimestamp = new Date(data.startTime).getTime();

    /**
     * Calendar end timestamp.
     * @type {number}
     */
    this.endTimestamp = new Date(this.startTimestamp + this.duration * 24 * 60 * 60 * 1000).getTime();

    Object.defineProperty(this, '_assets', { value: {
      backgroundImage: {
        name: data.backgroundImageName,
        color : data.backgroundImagePrimaryColor
      },
      iconImage: {
        name: data.iconImageName
      },
      text: {
        color: data.textColor,
        backgroundColor: data.textBackgroundColor
      }
    }});
  }

  /**
   * Calendar background image url.
   * @type {string}
   * @readonly
   */
  get backgroundImageURL() {
    return `${this.client.options.http.cdn}/calendars/${this._assets.backgroundImage}.png`;
  }

  /**
   * Calendar icon image url.
   * @type {string}
   * @readonly
   */
  get iconImageURL() {
    return `${this.client.options.http.cdn}/calendars/${this._assets.iconImage}.png`;
  }

}

module.exports = Calendar;
