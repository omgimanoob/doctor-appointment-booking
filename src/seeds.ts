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
    today.setHours(9)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    for (let i = 5; i > 0; i--) {
      let shift = new Shift()
      shift.doctor = doctor
      shift.startTime = today
      shift.endTime = today
      shift.weekday = i
      shiftEntities.push(shift)
    }

    for (let i = 3; i > 0; i--) {
      let today1 =  today = new Date(today.getTime() + addMinutes*60000)
      , appt = new Appointment()
      appt.timeStart = today1
      appt.duration = doctor.minsPerSlot 
      appt.doctor = doctor
      appointmentEntities.push(appt)
      addMinutes += i==1 ? doctor.minsPerSlot*2 :doctor.minsPerSlot //skip one slot
    }
  }
  shiftEntities && await shiftRepo.save(shiftEntities)
  appointmentEntities && await apointmentRepo.save(appointmentEntities)



  await connection.close()
  
}



seed()