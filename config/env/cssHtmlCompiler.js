function noop() {
    return null;
}

require.extensions['.sass'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.html'] = noop;