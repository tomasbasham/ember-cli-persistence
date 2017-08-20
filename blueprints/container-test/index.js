/* eslint-env node */

module.exports = {
  description: 'Generates a persistence container adapter unit test.',

  /*
   * Define a series of custom
   * template variables.
   *
   * @method locals
   *
   * @params {Object} options
   *   Object containing general and entity-specific options.
   */
  locals: function(options) {
    return {
      friendlyTestDescription: 'Unit | Container | ' + options.entity.name
    };
  }
};
