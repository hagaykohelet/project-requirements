import fs from 'fs/promises';
import csv from 'csv-parser';


const results = [];

export default function readCSV(file) {
    console.log(file)
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("error", (error) => reject(results))
            .on("end", () => {
                resolve(results);
            });
    });
}
