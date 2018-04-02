module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool('eval');
    }

    if (process.env.ANALYZE_BUNDLE === 'true') {
      config
        .plugin('bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
};
