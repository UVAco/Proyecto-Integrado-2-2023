import app from "./app.js";

const main = () => {
  app.listen(app.get("port"), app.get("host"), () => {
    console.log(`http://${app.get("host")}:${app.get("port")}/`);
  });
};

main();
