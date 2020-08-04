module.exports = {
  outputDir: "docs",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "GanttChart";
      return args;
    });
  },
};
