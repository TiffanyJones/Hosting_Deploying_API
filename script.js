const main = document.querySelector("main");
const roverList = document.querySelector(".rover-list");
const errorMsg = document.querySelector(".error-msg");
const dateInput = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit-button");


async function fetchData(url, handleData) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    handleData(data);
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "There is a problem with your fetch: " + error;
  }
}

function handleRoverData(data) {
  roverList.innerHTML = "";
  if (!data.photos.length) {
    roverList.innerHTML =
      "<li>No photos were taken on this date. Please select another date.</li>";
  } else {
    const photos = data.photos
      .map((photo) => `<li><img src="${photo.img_src}" alt="Rover photo"></li>`)
      .join("");
    roverList.insertAdjacentHTML("beforeend", photos);
  }
}

submitButton.addEventListener("click", function () {
  roverList.innerHTML = "Loading...";
  const date = dateInput.value
    ? dateInput.value
    : new Date().toISOString().slice(0, 10);

  const roverURL = `https://lastspacechallenge.netlify.app/.netlify/functions/API_KEY?date=${date}`;

  fetchData(roverURL, handleRoverData);
});
