const axios = require("axios");

successRate = 0;
const podId = [];

async function run() {
  for (var i = 0; i < 2300; i++) {
    await axios
      .post("http://ledx-dev.io/client/add", {
        data: [107 + i, 122 + i],
      })
      .then(function(response) {
        // handle success
        console.log("response data : ", JSON.stringify(response.data) + " ", i);
        if (response.data?.sum) {
          successRate = successRate + 1;

          if (!podId.includes(response.data.sum)) {
            podId.push(response.data.sum);
          }
        }
      })
      .catch(function(error) {
        // handle error
        console.log("error : ", error);
      })
      .then(function() {
        // always executed
      });
  }
  console.log("success rate : ", successRate, "Pod id length : ", podId.length);
}

run();
