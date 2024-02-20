const fs = require("fs");
const cron = require("cron");

const clearFolder = () => {
    // Set the path of the folder you want to clear
    const folderPath = "/path/to/folder";

    // Get a list of all files in the folder
    const files = fs.readdirSync(folderPath);

    // Delete each file in the folder
    files.forEach((file) => {
        const filePath = `${folderPath}/${file}`;
        fs.unlinkSync(filePath);
    });

    console.log("Folder cleared!");
};

// Set the cron schedule for when to clear the folder (in this example, every day at 12:00 AM)
const cronSchedule = "0 0 * * *";

// Create a cron job
const job = new cron.CronJob(cronSchedule, clearFolder, null, true);

// Start the cron job
job.start();
