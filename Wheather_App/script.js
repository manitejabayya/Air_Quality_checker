document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const latitude = document.getElementById("latitude").value.trim();
    const longitude = document.getElementById("longitude").value.trim();
    
    if (!latitude || !longitude) {
        alert("Please enter valid latitude and longitude.");
        return;
    }

    const url = `https://air-quality.p.rapidapi.com/current/airquality?lon=${longitude}&lat=${latitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64d34e3ca2msha9e256766fd0ee0p133756jsnb0cc8cf41202',
            'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const result = await response.json();

        if (!result || !result.data || result.data.length === 0) {
            throw new Error("No air quality data found for the given location.");
        }

        let readings = result.data[0];

        document.getElementById("aqi").textContent = readings.aqi ?? "N/A";
        document.getElementById("co").textContent = readings.co ?? "N/A";
        document.getElementById("no2").textContent = readings.no2 ?? "N/A";
        document.getElementById("o3").textContent = readings.o3 ?? "N/A";
        document.getElementById("pm2").textContent = readings.pm2_5 ?? "N/A";
        document.getElementById("pm10").textContent = readings.pm10 ?? "N/A";
        document.getElementById("so2").textContent = readings.so2 ?? "N/A";

        document.getElementById("result").style.display = 'flex';
    } catch (error) {
        console.error("Error fetching air quality data:", error);
        alert("Failed to fetch air quality data. Please try again later.");
    }
});