const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPathProd = "./src/environments/environment.ts";
  const targetPathDev = "./src/environments/environment.development.ts";
  require("dotenv").config({
    path: "src/environments/.env",
  });

  const envConfigFileProd = `export const environment = {
    xAPN: '${process.env["xAPN"]}',
    innoBasicUrl: '${process.env["innoBasicUrl"]}',
    apiKey: '${process.env["apiKey"]}',
    clientId: '${process.env["clientId"]}',
    clientSecret: '${process.env["CLIENT_SECRET"]}',
    redirectUri: '${process.env["redirectUriDev"]}',
    spotifyAuthEndpoint: '${process.env["spotifyAuthEndpoint"]}',
    scopes: '${process.env["scopes"]}',
    spotify_Token: '${process.env["spotify_Token"]}',
    playerURL: '${process.env["playerURL"]}',
    script_for_player: '${process.env["script_for_player"]}',
    searchURL: '${process.env["searchURL"]}',
    defaultArtistId: '${process.env["defaultArtistId"]}',
  };`;

  const envConfigFileDev = `export const environment = {
    xAPN: '${process.env["xAPN"]}',
    innoBasicUrl: '${process.env["innoBasicUrl"]}',
    apiKey: '${process.env["apiKey"]}',
    clientId: '${process.env["clientId"]}',
    clientSecret: '${process.env["CLIENT_SECRET"]}',
    redirectUri: '${process.env["redirectUriDev"]}',
    spotifyAuthEndpoint: '${process.env["spotifyAuthEndpoint"]}',
    scopes: '${process.env["scopes"]}',
    spotify_Token: '${process.env["spotify_Token"]}',
    playerURL: '${process.env["playerURL"]}',
    script_for_player: '${process.env["script_for_player"]}',
    searchURL: '${process.env["searchURL"]}',
    defaultArtistId: '${process.env["defaultArtistId"]}',
  };`;

  writeFile(targetPathProd, envConfigFileProd, () => {
    console.log("The file was saved for production!");
  });
  writeFile(targetPathDev, envConfigFileDev, () => {
    console.log("The file was saved for development!");
  });
};

setEnv()
