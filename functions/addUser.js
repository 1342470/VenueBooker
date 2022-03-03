function handleSubmit(event) {
    const fs = require('fs');
    event.preventDefault();
    const userData = new FormData(event.target);
    JSON.stringify(Object.fromEntries(userData));
    
    fs.writeFileSync('userData',userData);


    console.log({ data });
  }
  
  module.exports = {
    handleSubmit
};
