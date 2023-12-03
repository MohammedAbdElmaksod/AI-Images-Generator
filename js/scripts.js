const textInp = document.getElementById("randomTextInp");
let imagenum = document.getElementById("imgNum");
const imagesContainer = document.querySelector(".images");
const apiUrl = "https://api.openai.com/v1/images/generations";
const apiKey = "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";
async function GetImages() {
  imagesContainer.innerHTML =
    "<div></div><div class='loader' style='width:50px; height:50px'></div><div></div><div></div>";
  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      "model":"dall-e-2",
      prompt: textInp.value,
      n: parseInt(imagenum.value),
      size: "256x256",
    }),
  };
  const res = await fetch(
    "https://api.openai.com/v1/images/generations",
    methods
  );
  const data = await res.json();
  if (res.status === 200) {
    imagesContainer.innerHTML = "";
    data.data.map((img) => {
      const imageDiv = document.createElement("div");
      const image = document.createElement("img");
      image.src = img.url;
      imageDiv.append(image);
      imagesContainer.append(imageDiv);
    });
  } else {
    imagesContainer.innerHTML =
      "<div style='background-color:black'></div><h1 style='color:red; '>Sorry, something went wrong plaese wait a minute and try again.</h1>";
  }
}
