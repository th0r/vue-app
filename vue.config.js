module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool('eval');
    }
  }
};
