/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= LANGUAGE CONTENT ================= */

const recommendations = {

    ta: {
        voice:
        "வணக்கம். உங்கள் சோலார் பேனலில் தூசி அதிகமாக உள்ளது. மூன்று நாட்களுக்குள் சுத்தம் செய்ய பரிந்துரைக்கப்படுகிறது.",

        sms:
        "உங்கள் சோலார் பேனலில் தூசி அதிகமாக உள்ளது. மூன்று நாட்களுக்குள் சுத்தம் செய்ய பரிந்துரைக்கப்படுகிறது."
    },

    en: {
        voice:
        "Hello. Your solar panel has high dust accumulation. Cleaning is recommended within three days.",

        sms:
        "Your solar panel has high dust accumulation. Cleaning is recommended within three days."
    }

};


/* ================= LANGUAGE UPDATE ================= */

function updateLanguage() {

    const language =
        document.getElementById("language").value;

    document.getElementById("voiceText").textContent =
        recommendations[language].voice;

    document.getElementById("smsText").textContent =
        recommendations[language].sms;
}


/* ================= VOICE ================= */

function speakRecommendation() {

    if (!("speechSynthesis" in window)) {

        alert("Voice is not supported in this browser.");

        return;
    }

    const language =
        document.getElementById("language").value;

    const text =
        recommendations[language].voice;

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang =
        language === "ta" ? "ta-IN" : "en-IN";

    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}


/* ================= STOP VOICE ================= */

function stopVoice() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


/* ================= AUTOMATIC CLEANING ================= */

function startCleaning() {

    const status1 = document.getElementById("cleanStatus");
    const status2 = document.getElementById("advisorStatus");

    // Start cleaning message
    [status1, status2].forEach(function(status) {

        if (status) {
            status.className = "clean-status cleaning";

            status.innerHTML =
                "🔄 Automatic cleaning started...<br>" +
                "Cleaning progress: <span class='progress'>0%</span>";
        }

    });

    let progress = 0;

    const timer = setInterval(function() {

        progress += 10;

        document.querySelectorAll(".progress").forEach(function(element) {
            element.textContent = progress + "%";
        });


        if (progress >= 100) {

            clearInterval(timer);


            // Cleaning completed
            [status1, status2].forEach(function(status) {

                if (status) {
                    status.className = "clean-status completed";

                    status.innerHTML =
                        "✅ Automatic cleaning completed!<br>" +
                        "Panel performance restored.";
                }

            });


            // =========================
            // DASHBOARD UPDATE
            // =========================

            document.getElementById("score").innerHTML =
                "15<span>/100</span>";

            document.getElementById("priorityText").textContent =
                "LOW PRIORITY";

            document.getElementById("recommendationText").textContent =
                "Panel is clean. No immediate cleaning required.";

            document.getElementById("efficiency").textContent =
                "94.8%";

            document.getElementById("dustLevel").textContent =
                "Low";

            document.getElementById("dust").textContent =
                "15%";


            // =========================
            // CLEANING ADVISOR UPDATE
            // =========================

            // Update dust
            const advisorInfo =
                document.querySelector("#advisor .info");

            if (advisorInfo) {

                advisorInfo.innerHTML = `
                    <p>🌫️ Dust Accumulation: <b>Low</b></p>
                    <p>🌧️ Rain Forecast: <b>80%</b></p>
                    <p>📉 Efficiency Impact: <b>Low</b></p>
                    <p>🎯 Cleaning Score: <b>15/100</b></p>
                `;

            }


            // Update recommendation text
            document.getElementById("voiceText").textContent =
                "வணக்கம். உங்கள் சோலார் பேனல் சுத்தமாக உள்ளது. தற்போது சுத்தம் செய்ய தேவையில்லை.";

            document.getElementById("smsText").textContent =
                "உங்கள் சோலார் பேனல் சுத்தமாக உள்ளது. தற்போது சுத்தம் செய்ய தேவையில்லை.";


            // Update history
            document.getElementById("historyStatus").textContent =
                "Automatic cleaning completed";

        }

    }, 300);
}
/* ================= SENSOR SIMULATION ================= */

function updateSensorData() {

    const temperature =
        Math.floor(Math.random() * 5) + 30;

    const humidity =
        Math.floor(Math.random() * 10) + 50;

    const dust =
        Math.floor(Math.random() * 15) + 65;

    const voltage =
        (Math.random() * 2 + 23).toFixed(1);

    const power =
        (Math.random() * 2 + 11).toFixed(2);


    document.getElementById("temperature").textContent =
        temperature + "°C";

    document.getElementById("humidity").textContent =
        humidity + "%";

    document.getElementById("dust").textContent =
        dust + "%";

    document.getElementById("voltage").textContent =
        voltage + " V";

    document.getElementById("power").textContent =
        power + " kW";


    if (dust >= 70) {

        document.getElementById("dustLevel").textContent =
            "High";

    } else if (dust >= 40) {

        document.getElementById("dustLevel").textContent =
            "Medium";

    } else {

        document.getElementById("dustLevel").textContent =
            "Low";
    }
}


/* UPDATE SENSOR DATA */

setInterval(updateSensorData, 5000);


/* INITIAL DATA */

document.addEventListener("DOMContentLoaded", function() {

    updateSensorData();

});