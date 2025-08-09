const API_KEY = "47b496561f414f0e884dd348e9e42357";

document.getElementById("traceButton").addEventListener("click", traceNumber);

async function traceNumber() {
    const phoneNumberInput = document.getElementById("phoneNumber").value.trim();
    const resultContainer = document.getElementById("result-container");
    const errorMessage = document.getElementById("error-message");

    if (!phoneNumberInput) {
        errorMessage.textContent = "Please enter a valid phone number.";
        errorMessage.style.display = "block";
        resultContainer.style.display = "none";
        return;
    }

    const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${API_KEY}&phone=${encodeURIComponent(phoneNumberInput)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("HTTP Error: " + response.status);

        const data = await response.json();

        if (data.valid) {
            document.getElementById("valid").textContent = "Yes";
            document.getElementById("country").textContent = data.country ? data.country.name : "N/A";
            document.getElementById("location").textContent = data.location || "N/A";
            document.getElementById("carrier").textContent = data.carrier || "N/A";
            document.getElementById("type").textContent = data.type || "N/A";

            resultContainer.style.display = "block";
            errorMessage.style.display = "none";
        } else {
            errorMessage.textContent = "Invalid phone number or no data found.";
            errorMessage.style.display = "block";
            resultContainer.style.display = "none";
        }
    } catch (error) {
        errorMessage.textContent = "Error fetching data. Check your API key and internet connection.";
        errorMessage.style.display = "block";
        resultContainer.style.display = "none";
        console.error(error);
    }
}
