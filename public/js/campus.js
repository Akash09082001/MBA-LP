const campusData = [
  {
    image: "https://cdn.itm.edu/assets/Arti_169262b0dd.webp",
  },
  {
    image: "https://cdn.itm.edu/assets/Gauri_Surve_296b9831fe.webp",
  },
];

let campus = campusData.map(campusData1).join("");
let campusCards = document.getElementById("campus-data");
campusCards.innerHTML = campus;
function campusData1(campusData) {
  let listCard1 = `
        <div class="flex gap-5 flex-col w-80">
            <div onclick="showImage('https://media.itm.ac.in/event19_12a0a007b5.webp', 'INAUGURATION CEREMONY', 'Start your Btech journey with a Bang')"
           class="flex w-full border border-brand-yellow cursor-pointer shadow-sm hover:shadow-brand-yellow rounded-md transition-all hover:shadow-md ">
            <img src=${campusData.image} alt="event"
            class="flex w-full h-full object-contain rounded-md">
             </div>
        </div>                  
    `;
  return listCard1;
}
