import { createConnection, getConnectionOptions } from 'typeorm';
import { Doctor } from './doctor/doctor'; 
// import { SpecificEvent } from './specific-event/specific-event'; 
// import { AlternateEvent } from './alternate-event/alternate-event'; 
// import { RepeatEvent } from './repeat-event/repeat-event'; 
// import { isTypedArray } from 'util/types';
import { Appointment } from './appointment/appointment'; 
import { Shift } from './shift/shift'; 

async function seed() {
  
  const connectionOptions = await getConnectionOptions()
  , connection = await createConnection({ ...connectionOptions, name: 'seedConnection' })
  , today = new Date()
  , doctorRepo = connection.getRepository(Doctor)
  , doctorEntities = [
        { name: 'Dr Wong', specialty: 'Dermatology', minsPerSlot:20 },
        { name: 'Dr Smith', specialty: 'Oncology', minsPerSlot:30 },
        { name: 'Dr Fatimah', specialty: 'Gynaecology', minsPerSlot:60 },
    ]
  , shiftRepo = connection.getRepository(Shift)
  , apointmentRepo = connection.getRepository(Appointment)
  , shiftEntities = []
  , appointmentEntities = [
    // { startDate: today, endDate: today, startTime: '09:00:00', endTime: '09:20:00', doctor:1,target:'day',value:1 },
    // { startDate: today, endDate: today, startTime: '09:20:00', endTime: '09:40:00', doctor:1,target:'day',value:1 },
    // { startDate: today, endDate: today, startTime: '09:00:00', endTime: '09:30:00', doctor:2,target:'day',value:1 },
    // { startDate: today, endDate: today, startTime: '10:00:00', endTime: '10:30:00', doctor:2,target:'day',value:1 },
  ]
  // , otherSeeds = [
  //   // {
  //   //   repo:Appointment, entities: [
  //   //       { startDate: today, endDate: today, startTime: '09:00:00', endTime: '9:20:00', doctor:1,target:'day',value:1 },
  //   //       { startDate: today, endDate: today, startTime: '09:20:00', endTime: '9:40:00', doctor:1,target:'day',value:1 },
  //   //       { startDate: today, endDate: today, startTime: '09:00:00', endTime: '9:30:00', doctor:2,target:'day',value:1 },
  //   //       { startDate: today, endDate: today, startTime: '10:00:00', endTime: '10:30:00', doctor:2,target:'day',value:1 },
          
  //   //   ]
  //   // },
  //   {
  //       repo:SpecificEvent, entities: [
  //           { startDate: today, startTime: '09:00:00', endTime: '11:00:00' },
  //           { startDate: today, startTime: '14:00:00', endTime: '16:00:00' },
  //       ]
  //   },
  //   {
  //       repo: AlternateEvent, entities: [
  //           {startDate: today, endDate: today, startTime: '09:00:00',  endTime: '11:00:00', target: 'day', value: 1 },
  //       ]
  //   },
  //   {
  //       repo: RepeatEvent, entities: [
  //           {startDate: today, endDate: today, startTime: '09:00:00', endTime: '11:00:00', target: 'day', value: 1 },
  //       ]
  //   },
  // ]

  // for (const seed of otherSeeds) {
  //   const repo = connection.getRepository(seed.repo)
  //   await repo.save(seed.entities)
  // }

  let savedDoctors = await doctorRepo.save(doctorEntities)
  
  for (const doctor of savedDoctors) {
    let addMinutes = 0
    , today = new Date()
    , shiftdate = new Date()
    today.setHours(9)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    for (let i = 1; i <= 5; i++) {
      
      let lunchDurationMins = 60
      , lunchBreaks = [12,13] 
      , lunchBreak = lunchBreaks[Math.floor(Math.random() * lunchBreaks.length)]
      , goOpis = 9
      , leaveOpis = 17
      , thisDoctorShift = []

      shiftdate.setHours(9)
      shiftdate.setMinutes(0)
      shiftdate.setSeconds(0)
      shiftdate.setMilliseconds(0)

      {
        let shift = new Shift()
        shift.weekday = i
        shift.doctor = doctor
        shiftdate.setHours(goOpis)
        shift.startTime = new Date(shiftdate)
        shiftdate.setHours(lunchBreak)
        shift.endTime = new Date(shiftdate)
        shiftEntities.push(shift)
        thisDoctorShift.push(shift)
      }

      {
        let shift = new Shift()
        shift.weekday = i
        shift.doctor = doctor
        shiftdate.setHours(lunchBreak)
        shift.startTime = new Date(shiftdate.getTime() + lunchDurationMins*60000)
        shiftdate.setHours(leaveOpis)
        shift.endTime = new Date(shiftdate)
        shiftEntities.push(shift)
        thisDoctorShift.push(shift)
      }
    }

    shiftEntities && await shiftRepo.save(shiftEntities)

    for (let i = 3; i > 0; i--) {
      // let today1 =  today = new Date(today.getTime() + addMinutes*60000)
      // , appt = new Appointment()
      // appt.timeStart = today1
      // appt.duration = doctor.minsPerSlot 
      // appt.doctor = doctor
      // appointmentEntities.push(appt)
      // addMinutes += i==1 ? doctor.minsPerSlot*2 :doctor.minsPerSlot //skip one slot

      // // Generate a random appointment time within the doctor's shifts
      // const randomShiftIndex = Math.floor(Math.random() * doctorShifts.length);
      // const randomShift = doctorShifts[randomShiftIndex];

      // // Calculate the start and end time for the appointment (e.g., add 30 minutes to the shift start time)
      // const appointmentStartTime = new Date(randomShift.startTime);
      // appointmentStartTime.setMinutes(appointmentStartTime.getMinutes() + 30);
      // const appointmentEndTime = new Date(appointmentStartTime);
      // appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + 20);

      // // Check if the appointment time falls within the doctor's shift
      // if (
      //   appointmentStartTime >= randomShift.startTime &&
      //   appointmentEndTime <= randomShift.endTime
      // ) {
      //   // Create the appointment using the doctor's ID
      //   const appointment = new Appointment();
      //   appointment.timeStart = appointmentStartTime;
      //   appointment.duration = 20;
      //   appointment.doctor = doctor;

      //   // Save the appointment to the database
      //   await apointmentRepo.save(appointment);
      // }
    }
  }
 
  appointmentEntities && await apointmentRepo.save(appointmentEntities)



  await connection.close()
  
}



seed()