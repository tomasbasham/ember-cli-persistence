# ember-cli-persistence [![Build Status](https://travis-ci.com/tomasbasham/ember-cli-persistence.svg?branch=master)](https://travis-ci.com/tomasbasham/ember-cli-persistence) [![Maintainability](https://api.codeclimate.com/v1/badges/c70f1ba7c215d29664b7/maintainability)](https://codeclimate.com/github/tomasbasham/ember-cli-persistence/maintainability)

An [Ember CLI](https://ember-cli.com/) addon to interface with front end
persistence containers.

Most modern applications require the ability to persist data and state for the
runtime of the application. This data may be temporary and only last the
duration of the session or could perhaps be longer lasting, requiring that the
application be able to fetch this data at a later point in time.

This addon provides a simple `persistence` service allowing your applications
to make use of the `LocalStorage` and `SessionStorage` containers found within
most modern HTML5 capable browsers. In instances where these two storage
containers are not available this addon provides an `Ephemeral` container that
simply acts as an in-memory key/value store for the duration of the
applications runtime.

This addon is built upon the
[ember-cli-adpater-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern)
allowing you to easily create your own storage container adapters.

## Compatibility

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

## Installation

From within your Ember CLI project directory run:
```
ember install ember-cli-persistence
```

## Usage

This addon implements a service to interface with several front end persistence
containers by providing an abstract API that hides the implementation details
of each persistence container adapter.

### Configuration

Before the `persistence` service can be used it first must be configured
through `config/environment`. This allows you to define which of the
persistence containers you want to make available to your application through
the `persistence` service.

##### Configuration Example

```JavaScript
// config/environment.js
module.exports = function(environment) {
  let ENV = {
    persistence: {
      containers: [
        {
          name: 'Local',
          config: {
            namespace: 'local-enterprise'
          }
        },
        {
          name: 'Session',
          config: {
            namespace: 'session-enterprise'
          }
        },
        {
          name: 'Ephemeral',
          config: {
            namespace: 'ephemeral-enterprise'
          }
        }
      ]
    }
  };

  return ENV;
};
```

This configures your application to use all 3 adapters bundled with this addon
and also namespaces each of key with the specified string.

#### Namespacing

As mentioned above you are able to namespace each of the keys you send to the
persistence containers. This is completely optional but recommended if you have
a lot of persisted data where key names may conflict. Key names are constructed
internally by the bundled adapters and take the form `namespace:key`.

#### Containers

The containers array takes a series of objects defining the configuration of
each adapter. This is a requirement of
[ember-cli-adpater-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern)
where each object may take an additional series of key/value pairs. This addon
however only requires the name of the adapter, in pascal case.

### Injection

This addon makes no assumptions about what ember objects you want to make the
`persistence` service available. Therefore in order to make the service
available you need to implement you own injections.

##### Injection Initializer Example

```JavaScript
// app/initializers/persistence.js
export function initialize(application) {
  application.inject('controller', 'persistence', 'service:persistence');
  application.inject('route', 'persistence', 'service:persistence');
};

export default { initialize };
```

This will make the `persistence` service available to all controllers and
routes. It is however unlikely that you will require the service to be injected
into every controller or route of your applications. Therefore it is
recommended that you include the service on a per object basis.

##### Injection Controller Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  persistence: inject()
});
```

This will create a dependency on the application controller and inject the
`persistence` service into this controller only. This can be repeated across
all objects that need access to the service.

### Persistence Service

The `persistence` service implements an abstract API that currently supports
the following methods:

* `setItem`
* `getItem`
* `removeItem`
* `key`
* `clear`
* `length`

When using this API, by default the service will call the corresponding method
on each of the adapters unless a specific adapter is specified. This means that
if you were to call `setItem` on the service, it would in turn call `setItem`
on each of the adapters and thus store the same data within each of the
persistence containers configured in `config/environment`.

##### All Adapters Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';

import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  persistence: inject(),

  actions: {
    storeTime() {
      const persistence = get(this, 'persistence');
      persistence.setItem({ key: 'time', value: Date() });
    }
  }
});
```

This is likely not the desired behaviour and is a consequence of the
[ember-cli-adpater-pattern](https://github.com/tomasbasham/ember-cli-adapter-pattern).
If you only want to store the data in a single persistence container you must
specify the name.

##### Single Adapter Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';

import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  persistence: inject(),

  actions: {
    storeTime() {
      const persistence = get(this, 'persistence');
      persistence.setItem('Local', { key: 'time', value: Date() });
    }
  }
});
```

This will only store the data using the `LocalStorage` adapter.

Each API call will be wrapped within a promise that resolves with the returned
result of the adapter mapped to the adapter name. This means that for any
method called on the service where a return value is expected you must use the
Promise API to access it.

##### Promise Single Adapter Example

```JavaScript
// app/controllers/application.js
import Controller from '@ember/controller';

import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  persistence: inject(),

  actions: {
    getTime() {
      const persistence = get(this, 'persistence');
      persistence.getItem('Local', { key: 'time' }).then(function(values) {
        // Print the value returned from the LocalStorage adapter.
        console.log(values['Local']);
      });
    }
  }
});
```

## License

This project is licensed under the [MIT License](LICENSE.md).
