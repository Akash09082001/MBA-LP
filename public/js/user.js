async function fetchReferralUser() {
    const getParameterByName = (name, url = window.location.href) => {
        name = name.replace(/[[]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const refUserId = getParameterByName("utm_campaign");
    const userNameHeading = document.getElementById("userReferName");
    if (!refUserId) {
        return;
    } else {
        try {
            const resp = await fetch(`https://service.letsupgrade.in/v2/itm/isu/ref/name/${refUserId}`);

            if (!resp.ok) {
                console.log("Referral User not found");
            } else {
                const data = await resp.json();
                const message = data.results.data;
                userNameHeading.innerText = message || "ITM Business School | Postgraduate Program";
            }

        } catch (error) {
            console.log("Error:", error);
        }
    }
}

window.addEventListener("load", fetchReferralUser);
