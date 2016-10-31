var testsContext = require.context('./app', true, /.spec.ts$/);

testsContext.keys().forEach(testsContext);