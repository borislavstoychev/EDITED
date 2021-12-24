const fs = require('fs');


const saveData = (data, file) => {
    const finished = (error) => {
        if (error){
            console.log(error)
            return;
        };
    };
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(file, jsonData, finished)
};

module.exports = saveData;