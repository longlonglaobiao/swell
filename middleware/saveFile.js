const fs = require("fs");
module.exports = (files, filepath, filename) => {
  fs.exists(filepath, function (exists) {
    if (!exists) {
      fs.mkdirSync(filepath, function (err) {
        if (err) {
          throw err;
        }
      });
    }
    fs.rename(files.file[0].path, filepath + "/" + filename, function (err) {
      if (err) {
        throw err;
      }
    });
  });
};
