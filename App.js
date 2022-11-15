const cron = require('node-cron');

const today = new Date();
const totalPayment = 2000
const numberOfMilestone = 5
const paymentDate = ['11302022', '12302022', '01302023', '02282023', '03302023'];
let count = 0;

/**
 * Validating as per given contraint
 * @param {int} numberOfMilestone 
 * @param {int} totalPayment 
 * @returns {boolean}
 */
function isValid(numberOfMilestone, totalPayment) {
    if (numberOfMilestone < 0 || numberOfMilestone >= 100) {
        console.log(`Milestone = ${numberOfMilestone} cannot be beyond the range`)
        return false
    }

    if (totalPayment < 0 || totalPayment >= 100000) {
        console.log(`Total Payment = ${totalPayment} cannot be beyond the range`)
        return false
    }
    return true
}


/**
 * Formatting value 
 * This function that takes care of adding a leading zero 
 * If the month or day only contain a single digit (are less than 10).
 * @param {*} num 
 * @returns 
 */
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Format date (mmddyyyy) as per input date required 
 * @param {Date} date 
 * @returns {String}
 */
function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('');
}


/**
 * SetMilestone with 3 params
 * @param {int} numberOfMilestone 
 * @param {int} totalPayment 
 * @param {String[]} paymentDate 
 * @returns {String}
 */
function setMilestone(numberOfMilestone, totalPayment, paymentDate) {
    if (isValid(numberOfMilestone, totalPayment)) {
        if (formatDate(today) === paymentDate[count]
            && count < paymentDate.length) {
            count++;
            return `Payment of ${totalPayment / numberOfMilestone} release on ${today} for the milestone ${count}`
        }
    }
}

/* *
Cron running once a day at 00:00 with cron expression => '0 0 * * *'
console log to verify result
*/
cron.schedule('* * * * *', () => {
    console.log(setMilestone(numberOfMilestone, totalPayment, paymentDate))
});

/**
https://github.com/node-cron/node-cron
Cron Expression can be manipulated as per requirement 
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
*/

/**
NOTE :- 
Instruction for TESTING purpose only
For testing purpose just replace expression value
FROM - '0 0 * * *' => this runs once a day at 00:00
To - '* * * * *' => this runs every minutes
AND also update
* @paymentDate array to current date
Currently @paymentDate value is => ['11302022', '12302022', '01302023', '02282023', '03302023']
Example - @paymentDate value is => ['11152022', '11152022']
*/

