module.exports = {
  outputDir: "docs",
  // publicPath: process.env.NODE_ENV === "production" ? "/GanttChart/" : "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "GanttChart";
      return args;
    });
  },
};
