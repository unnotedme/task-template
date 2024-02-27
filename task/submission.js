const { namespaceWrapper } = require('../_koiiNode/koiiNode');
class Submission {
  async task(round) {
    // Write the logic to do the work required for submitting the values and optionally store the result in levelDB

    // Below is just a sample of work that a task can do
    try {
      const value = 'Hello, World!';

      if (value) {
        // store value on NeDB
        await namespaceWrapper.storeSet('value', value);
      }
      return value;
    } catch (err) {
      console.log('ERROR IN EXECUTING TASK', err);
      return 'ERROR IN EXECUTING TASK' + err;
    }
  }

  async submitTask(roundNumber) {
    try {
      const submission = await this.fetchSubmission();
      console.log("SUBMISSION", submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(
        submission,
        roundNumber,
      );
    } catch (error) {
      console.log("error in submission", error);
    }
  }

  async fetchSubmission() {
    // The code below shows how you can fetch your stored value from level DB
    const value = await namespaceWrapper.storeGet("value"); // retrieves the value
    console.log("VALUE", value);
    return value;
  }
}
const submission = new Submission();
module.exports = { submission };
