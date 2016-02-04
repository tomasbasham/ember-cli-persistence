import Persistence from 'ember-cli-persistence/services/persistence';
import config from '../config/environment';

export default Persistence.extend({
  config: config
});
