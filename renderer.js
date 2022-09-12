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

exec();
