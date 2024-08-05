import { Reporter } from '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
  async onBegin(config, suite) {
    console.log(`Execution of ${suite.allTests().length} tests`)
  }

  async onTestBegin(test) {
    console.log(`Running test: ${test.title}`)
  }

  async onTestEnd(test, result) {
    const execTime = result.duration
    const data = {
      title: test.title,
      status: result.status,
      executionTime: execTime,
      errors: result.errors,
    }
    const dataToString = JSON.stringify(data, null, 2)
    console.log(dataToString)
    fs.writeFileSync(`./playwright-report/${test.title}.json`, dataToString)
  }

  async onEnd(result) {
    console.log(`Execution finished with status of ${result.status}`)
  }
}

export default MyReporter
