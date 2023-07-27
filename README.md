## Description



<ol>
  <li>Implementing a feature where a patient can book an appointment with a specific doctor by selecting an available timeslot.</li>
  <li>Incorporating pre-defined events into the timeslots. These events are of three types: specific, alternate, and repeat.
  <ol>
    <li>Specific: Events have a defined startDate, startTime, and endTime.</li>
    <li>Alternate: Events have a defined startDate, endDate, startTime, endTime, target, and value. The target could alternate by day, week, or month.</li>
    <li>Repeat: Events have a defined startDate, endDate, startTime, endTime, target, and value. The target could repeat every day in a month, day in a week, or month in a year.</li>
  </ol>  
  
  </li>

  <li>Building an API to fetch the availability of a specific given date, which should return a list of available timeslots for that day.</li>
  <li>Adding a feature where the timeslot range can be customized per doctor, indicating how many minutes per timeslot.</li>
</ol>


<strong>Database models and relationships should be designed to effectively handle these requirements.</strong>
<ul>
<li>It is necessary to handle concurrency issues to prevent double bookings for the same timeslot.</li>
<li>The logic to calculate the available timeslots based on the different types of events needs to be implemented correctly.</li>
<li>Security concerns should be addressed and measures should be put in place to mitigate them.</li>
</ul>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start -- -b swc

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```