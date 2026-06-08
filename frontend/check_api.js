async function check() {
  try {
    const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=6f9ec36adc7fdc52acf07e4806a2a4bc&units=metric");
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}
check();
