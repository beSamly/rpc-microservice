const axios = require("axios");

successRate = 0;
async function run() {
  for (var i = 0; i < 100; i++) {
    await axios
      .post("http://rpcmicro.dev/add", {
        data: [17, 12],
      })
      .then(function(response) {
        // handle success
        console.log("response data : ", response.data);
        if (response.data?.sum) {
          successRate = successRate + 1;
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
  console.log("success rate : ", successRate);
}

run();
