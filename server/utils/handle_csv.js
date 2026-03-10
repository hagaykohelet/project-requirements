import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import multer from 'multer'
import { Readable } from 'stream';

function readCSV(buffer) {

    const results = []

    const stream = Readable.from(buffer);

    return new Promise((resolve, reject) => {
        stream
            .pipe(csv({
                headers: ["category", "urgency", "message"]
            }))
            .on("data", (data) => {
                results.push(data);
            })
            .on("error", (error) => reject(results))
            .on("end", () => {
                resolve(results);
            });
    });
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "csvFiles")
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname)
//         if (ext === ".csv") {
//             cb(null, file.originalname)
//         }
//     }
// })

const storage = multer.memoryStorage()
const filefilter = (req, file, cb) => {
    const allowExtensions = ["text/csv"];
    if (allowExtensions.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const uploadFile = multer({ storage, filefilter })

export { uploadFile, readCSV }
