console.log("testeee");

const information = document.getElementById("info");

information.innerText = `
  This app is using Chrome
  (v${versions.chrome()}),
  Node.js (v${versions.node()}),
  and Electron (v${versions.electron()})
`;

const test = document.getElementById("test");
test.innerText = "ping";
const pingTime = Date.now();
const exec = async () => {
  const result = await versions.ping();
  test.innerText = `ping ${result} in ${Date.now() - pingTime}ms`;
};

const button = document.getElementById("btn");
const input = document.getElementById("title");
button.addEventListener("click", () => {
  console.log("fadsklfdjsalk");
  window.api.setTitle(input.value);
});

const fileButton = document.getElementById("btn-file");
const fileInput = document.getElementById("file-name");
fileButton.addEventListener("click", async () => {
  const path = await window.api.getFile().catch(console.log);
  fileInput.value = path;
});

const counter = document.getElementById("counter");
window.api.onCounterUpdate((event, increase) => {
  counter.innerText = Number(counter.innerText) + increase;
});

exec();
