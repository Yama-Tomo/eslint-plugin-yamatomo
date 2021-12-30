module.exports = {
  transform: {
    '.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: true }],
  },
};
