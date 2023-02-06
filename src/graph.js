import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
export async function callMsGraph1(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  fetch(graphConfig.graphDriveEndpoint, options)
    .then((response) => response.json())
    .then((data) => uploadApi(accessToken, data.value[0].id))
    .catch((error) => console.log(error));
}

export async function uploadApi(accessToken, id) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("Content-Type", "text/plain");

  const bs = new Blob(["this is my upload file task", { type: "plain/text" }]);
  const options = {
    method: "PUT",
    headers: headers,
    body: bs,
  };

  fetch(
    `${graphConfig.graphDriveEndpoint}/${id}/items/root:/WLC_task.txt:/content`,
    options
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
