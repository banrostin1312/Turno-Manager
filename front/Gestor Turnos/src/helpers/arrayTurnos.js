
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString(); // Formatear la fecha como "dd/mm/yyyy"
const formattedTime = currentDate.toLocaleTimeString();
const arrayTurnos = [{
   id:1,
   date:formattedDate,
   time: formattedTime,
   status:"Canceled",
   userId:1,
   userName:"Raamby"
},
{
   id:2,
   date:formattedDate,
   time: formattedTime,
   status:"Active",
   userId:2,
   userName:"Lether Crokku"
},
{
   id:3,
   date:formattedDate,
   time: formattedTime,
   status:"Active",
   userId:3,
   userName:"Pete el momo"
},
{
   id:4,
   date:formattedDate,
   time: formattedTime,
   status:"Canceled",
   userId:4,
   userName:"Bester mornig"
},
]

export default arrayTurnos;