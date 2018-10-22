module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-icss-values': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        autoprefixer: true,
      },
    },
  },
};
