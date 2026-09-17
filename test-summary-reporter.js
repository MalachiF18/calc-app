export default class TestSummaryReporter {
  onEnd(result) {
    if (result.status === 'passed') {
      console.log('All tests passed');
    }
  }
}
