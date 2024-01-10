fs.readFile(
    "./message.txt",
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
)