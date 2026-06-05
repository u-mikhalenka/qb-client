require('dotenv').config();

const target = process.env.QB_URL;

module.exports = {
  '/api': {
    target,
    changeOrigin: true,
    secure: true,
    configure(proxy) {
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('Origin', target);
        proxyReq.setHeader('Referer', `${target}/`);
      });
    },
  },
};
