const rankingData = [
    {
        "heading": "Diamond",
        "paragraph": "Diamond Band with A+ Grade by OBE Ranking Survey 2023."
    },
    {
        "heading": "#8th",
        "paragraph": "Ranked 8th in Mumbai, 22nd in West Zone, 38th among Private B-Schools in India by Fortune B-Schools Ranking 2023."
    },
    {
        "heading": "#37th",
        "paragraph": "Ranked 37th among India's Top 100 B-Schools, 12th in Maharashtra by EW India Higher Education Rankings 2023-24."
    },
    {
        "heading": "#60th",
        "paragraph": "Ranked 60th in Top Business colleges overall, 37th among Top 100 Private Business Schools in India, and 8th in Top B-Schools in Mumbai by Business Today 2023."
    },
    {
        "heading": "#8th",
        "paragraph": "Ranked 8th in the Top Eminent B-Schools of Super Excellence, 8th in Maharashtra, and 31st among Top Private B-Schools by GHRDC CSR 2023."
    },
    {
        "heading": "#58th",
        "paragraph": "Ranked 58th in the Top 100 B-Schools in India by MBA Universe Ranking 2024."
    },
    {
        "heading": "#45th",
        "paragraph": "Ranked 45th in India's Best Private B-Schools, 21st Private Standalone Institutions in India, 14th."
    },
    {
        "heading": "#7th",
        "paragraph": "Ranked 7th in Mumbai, 63rd in Overall Top B-Schools in India, 48th in Top 50 Private B-Schools in India, and 21st in Private B-School of West Zone by The Week Best B-Schools Ranking 2023."
    },
    {
        "heading": "#22nd",
        "paragraph": "Ranked 22nd State-wise, 28th in West Zone, and 68th among the Top 100 B-Schools in India by the Indian Institutional Ranking Framework (IIRF) B-School Survey 2024."
    },
    {
        "heading": "#20th",
        "paragraph": "Ranked 20th in Top 50 Standalone Private B-Schools, 37th Private B-School in India by India Today."
    },
    {
        "heading": "#8th",
        "paragraph": "Ranked 8th in Mumbai, 22nd in West Zone, 38th in Private B-Schools, 71st Overall B-School in India by OPEN Magazine."
    },
    {
        "heading": "#43rd",
        "paragraph": "Ranked 43rd among Top B-Schools in India, 30th among Top Private B-Schools in India, And 19th among Top B-Schools in West Zone by Times Annual B School Ranking Survey 2024."
    },
    {
        "heading": "CSR",
        "paragraph": "Competition Success Review (CSR) honored ITM Business School for Excellence in Education on April 21, 2024."
    },
    {
        "heading": "KEF",
        "paragraph": "Kotak Education Foundation (KEF) presented ITM Business School with the Institute Excellence Award for contributing the highest number of hours among all institutes partnered with KEF. ITM students contributed over 4000 hours to KEF initiatives."
    }
]




let ranking = rankingData.map(showRankingData).join("");
let rankingCards = document.getElementById("ranking-container");
rankingCards.innerHTML = ranking;

function showRankingData(rankingData) {
    let rankingCard = `
         <div class="flex w-64 rounded-r-lg group transition-all rounded-b-lg bg-white flex-col shadow-md ">
            <div
                class="flex w-full px-4 py-2 rounded-r-lg rounded-b-lg group-hover:bg-[#a91d54] group-hover:text-white transition-all bg-[#feefdf]">
                <span class="text-xl md:text-2xl font-bold">${rankingData.heading}</span>
            </div>
            <div class="flex w-full px-4 py-4">
                <p class="text-sm md:text-base">
                    ${rankingData.paragraph}
                </p>
            </div>
        </div>                       
    `;
    return rankingCard;
}
