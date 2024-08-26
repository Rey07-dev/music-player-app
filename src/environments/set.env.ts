export const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPathProd = "./src/environments/environment.ts";
  // const targetPathDev = "./src/environments/environment.development.ts";
  // Load node modules
  const appVersion = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });

  const envConfigFileProd = `export const environment = {
    xAPN: '${process.env["xAPN"]}'
    innoBasicUrl: '${process.env["innoBasicUrl"]}'
    version: '${appVersion}'
    apiBasicUrl: '${process.env["apiBasicUrl"]}'
    apiKey: '${process.env["apiKey"]}'
    clientId: '${process.env["clientId"]}'
    clientSecret: '${process.env["clientSecret"]}'
    redirectUri: '${process.env["redirectUri"]}'
    authEndpoint: '${process.env["authEndpoint"]}'
    scopes: '${process.env["scopes"]}'
    spotify_Token: '${process.env["spotify_Token"]}'
    playerURL: '${process.env["playerURL"]}'
    script_for_player: '${process.env["script_for_player"]}'
    searchURL: '${process.env["searchURL"]}'
    defaultArtistId: '${process.env["defaultArtistId"]}'
  };`;

  writeFile(targetPathProd, envConfigFileProd, () => {
  });
};

setEnv()
