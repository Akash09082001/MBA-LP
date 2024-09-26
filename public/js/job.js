const jobData = [
  {
    name: "Arti Shrotriya",
    company: "AllWave AV",
    image: "https://cdn.itm.edu/assets/Arti_169262b0dd.webp",
  },
  {
    name: "Gauri Surve",
    company: "IDFC First Bank",
    image: "https://cdn.itm.edu/assets/Gauri_Surve_296b9831fe.webp",
  },
  {
    name: "Neelima Sharma",
    company: "UltraTech Cement",
    image: "https://cdn.itm.edu/assets/Neelima_Sharma_973d1030a6.webp",
  },
  {
    name: "Snehashis Barua",
    company: "OfBusiness",
    image: "https://cdn.itm.edu/assets/Snehashis_Barua_6d238ed4d3.webp",
  },
  {
    name: "Manik Mittal",
    company: "Tata Play",
    image: "https://cdn.itm.edu/assets/Manik_06e5c5cf16.webp",
  },
  {
    name: "Sakshi Bhasker",
    company: "Sutherland",
    image: "https://cdn.itm.edu/assets/Sakshi_Bhaskar_1df1644ccb.webp",
  },
  {
    name: "Shane Mathews",
    company: "OfBusiness",
    image: "https://cdn.itm.edu/assets/Sakshi_Bhaskar_1df1644ccb.webp",
  },
  {
    name: "Sakchi Goutam",
    company: "Wildcraft",
    image: "https://cdn.itm.edu/assets/Sakchi_Goutam_d94916bec1.webp",
  },
  {
    name: "Sakshi Agal",
    company: "Inorbit",
    image: "https://cdn.itm.edu/assets/Sakshi_Agal_8840af5cc1.webp",
  },
  {
    name: "Suresh Sharma",
    company: "ICICI Prudential",
    image: "https://cdn.itm.edu/assets/Suresh_Sharma_8c4614c574.webp",
  },
  {
    name: "Nitin S.",
    company: "General Mills",
    image: "https://cdn.itm.edu/assets/nitin_8260b85da5.webp",
  },
  {
    name: "Nandini C.",
    company: "Deloitte",
    image: "https://cdn.itm.edu/assets/nandini_d82d66699b.webp",
  },
  {
    name: "Aditi K.",
    company: "Deloitte",
    image: "https://cdn.itm.edu/assets/aditi_c082a100ea.webp",
  },
  {
    name: "Yash Z.",
    company: "Deloitte",
    image: "https://cdn.itm.edu/assets/yash_d5b3b3cfd4.webp",
  },
  {
    name: "Nasrin P.",
    company: "Pricewaterhouse Coopers India",
    image: "https://cdn.itm.edu/assets/nasrin_e2811f004d.webp",
  },
  {
    name: "Shreyansh S.",
    company: "Pricewaterhouse Coopers India",
    image: "https://cdn.itm.edu/assets/shreyansh_17951cac69.webp",
  },
  {
    name: "Kshitij N.",
    company: "Pricewaterhouse Coopers India",
    image: "https://cdn.itm.edu/assets/kshitij_9b1b563142.webp",
  },
];

let job = jobData.map(showData).join("");
let jobCards = document.getElementById("job-data");
jobCards.innerHTML = job;
function showData(jobData) {
  let listCard = `
        <div class="bg-white p-4 rounded-lg flex flex-col items-center w-40 md:w-full">
            <img src=${jobData.image} alt="Arti Shrotriya" class="w-20 h-20 rounded-full mb-2">
            <h3 class="font-semibold text-[#a91d54]">${jobData.name}</h3>
            <p class="text-sm text-center">${jobData.company}</p>
        </div>                    
    `;
  return listCard;
}
