import { createConnection, getConnectionOptions } from 'typeorm';
import { Doctor } from './doctor/doctor'; 
import { SpecificEvent } from './specific-event/specific-event'; 
import { AlternateEvent } from './alternate-event/alternate-event'; 
import { RepeatEvent } from './repeat-event/repeat-event'; 

async function seed() {
  const connectionOptions = await getConnectionOptions()
  , connection = await createConnection({ ...connectionOptions, name: 'seedConnection' })
  , today = new Date()
  , doctorRepo = connection.getRepository(Doctor)
  , doctorEntities = [
        { name: 'Dr Wong', specialty: 'Dermatology' },
        { name: 'Dr Smith', specialty: 'Oncology' },
        { name: 'Dr Fatimah', specialty: 'Gynaecology' },
    ]
  , otherSeeds = [
    // {
    //     repo:Doctor, entities: [
    //         { name: 'Dr Wong' },
    //         { name: 'Dr Smith' },
    //         { name: 'Dr Fatimah' },
    //     ]
    // },
    {
        repo:SpecificEvent, entities: [
            { startDate: today, startTime: '09:00:00', endTime: '11:00:00' },
            { startDate: today, startTime: '14:00:00', endTime: '16:00:00' },
        ]
    },
    {
        repo: AlternateEvent, entities: [
            {startDate: today, endDate: today, startTime: '09:00:00',  endTime: '11:00:00', target: 'day', value: 1 },
        ]
    },
    {
        repo: RepeatEvent, entities: [
            {startDate: today, endDate: today, startTime: '09:00:00', endTime: '11:00:00', target: 'day', value: 1 },
        ]
    },
  ]

  
  await doctorRepo.save(doctorEntities)

  for (const seed of otherSeeds) {
    const repo = connection.getRepository(seed.repo)
    await repo.save(seed.entities)
  }


  await connection.close()
}

seed()