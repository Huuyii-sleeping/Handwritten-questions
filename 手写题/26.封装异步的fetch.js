async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status:${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error", error);
    throw error;
  }
}

async function fetchAndUseData() {
  try {
    const url = "https://api.example.com/data";
    const data = await fetchData(url);
    console.log(data);
  } catch (error) {
    console.error("Error fetching and using data:", error);
  }
}

fetchAndUseData()
