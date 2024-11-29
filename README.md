# Frontend (React - TypeScript)

## Pages
- Login : You need to input email and password, in this case we are going to log in as doctor (Please see instructions on the backend repo)
- Patients
- Appointments (Doctor's Appointments)

## Patients Page
- On List Page : There is a search bar to find patients by name or email. Click patient name to go to the detail page
- On Detail Page : You can have the diagnoses/medications/allergies/upcoming appointments for the patient
- Decrypted Data : diagnoses, medications and allergies

## Getting Started
To get started, follow these steps:
1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. You'll have to run the backend service first.
4. Run `npm run dev` to start the web server - it will run on localhost:5173

## Main Packages
1. React Query to handle data fetching e.g. `src/hooks/usePatients.ts`
2. Material-UI is used as UI Library
3. socket.io-client to handle realtime communication i.e. `src/hooks/useSocket.ts` `src/pages/AppointmentPage.tsx`
4. Zod to handle validation
