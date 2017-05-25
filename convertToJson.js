xlsxj = require("xlsx-to-json");

console.log("Starting conversion from: input.xlsx to db.json...");

xlsxj({
    input: "input.xlsx",
    output: "./output.json",
}, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log("Conversion finished.");
    }
})