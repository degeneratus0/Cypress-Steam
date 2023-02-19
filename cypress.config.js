const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://store.steampowered.com/",
    setupNodeEvents(on, config) {
      on('task', {
        deleteFolderIfExists(path){
          return new Promise((resolve) => {
            fs.rmdir(path, { recursive: true }, (err) => {
              if (err) {
                return resolve(false);
              }
              return resolve(true);
            });
          });
        }
      });
    }
  }
});
