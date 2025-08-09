// Yahan aapko apni AbstractAPI key dalni hai
const API_KEY = "YOUR_ABSTRACTAPI_KEY_HERE";

// Jab page load ho jaye to button par event listener lagana
document.getElementById("traceButton").addEventListener("click", traceNumber);

async function traceNumber() {
    const phoneNumberInput = document.getElementById("phoneNumber").value;
    const resultContainer = document.getElementById("result-container");
    const errorMessage = document.getElementById("error-message");

    // API key aur number ka check
    if (API_KEY === "YOUR_ABSTRACTAPI_KEY_HERE" || !phoneNumberInput) {
        errorMessage.textContent = "Please enter a valid phone number and replace 'YOUR_ABSTRACTAPI_KEY_HERE' with your actual API key.";
        errorMessage.style.display = "block";
        resultContainer.style.display = "none";
        return;
    }

    const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${API_KEY}&phone=${phoneNumberInput}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.valid) {
            document.getElementById("valid").textContent = data.valid ? "Yes" : "No";
            document.getElementById("country").textContent = data.country.name;
            document.getElementById("location").textContent = data.location;
            document.getElementById("carrier").textContent = data.carrier;
            document.getElementById("type").textContent = data.type;
            
            resultContainer.style.display = "block";
            errorMessage.style.display = "none";
        } else {
            errorMessage.textContent = "Invalid phone number or no data found.";
            errorMessage.style.display = "block";
            resultContainer.style.display = "none";
        }

    } catch (error) {
        errorMessage.textContent = "An error occurred while fetching data. Please check your API key and internet connection.";
        errorMessage.style.display = "block";
        resultContainer.style.display = "none";
        console.error("Error:", error);
    }
}
