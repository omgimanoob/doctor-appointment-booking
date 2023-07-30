# Installation

## Step 1. Install dependencies for nestjs

```bash
$ npm install
```

## Step 2. Install dependencies for react - run inside the "frontend" folder

```bash
$ cd frontend
$ npm install
```

## Step 3. change mysql database credentials in src/app.module.ts
```
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...
      username: 'root', //change this
      password: '', //change this
      database: 'doctor_appointment_booking', //change this
      ...
    }),
  ],
})
```

## Step 4. change mysql database credentials in /ormconfig.json
```
{
    ...
    "username": "root", 
    "password": "", 
    "database": "doctor_appointment_booking",
    ...
}
```

## Step 5. Insert dummy data to mysql
```bash
$ npm run seed
```

## Step 6. build web files at the "frontend" folder
```bash
$ cd frontend
$ npm run build
```

## Step 7. Running the app

```bash
# development
# $ npm run start -- -b swc
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Step 8. open with browser
[http://localhost:3000/](http://localhost:3000/)

## Step 9. Book appointment with postman:
[https://documenter.getpostman.com/view/17726783/2s9Xxtxuw5](https://documenter.getpostman.com/view/17726783/2s9Xxtxuw5)
```
POST localhost:3000/api/doctors/1/appointments
{
  "timeStart": "2023-07-31 15:00:00"
}

```

# Description

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