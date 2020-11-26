import Hapi from '@hapi/hapi';

const plugin:Hapi.Plugin<undefined> = {
  name: 'app/status',
  register: async (server:Hapi.Server) => {
    // define a status endpoint
    server.route({
      method: 'GET',
      path: '/',
      handler: async (
        request:Hapi.Request,
        h:Hapi.ResponseToolkit,
      ) => h.response({ up: true }).code(200),
    });
  },
};

export default plugin;
