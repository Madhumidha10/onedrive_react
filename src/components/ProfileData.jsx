import React from "react";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    console.log(props.graphData);
    console.log(props.fileListData)
    // function fileSelected(e) {
    //     e.preventDefault()
    //     displayUploadMessage(`Uploading ${e.files[0].name}...`);
    //     uploadFile(e.files[0])
    //     .then((response) => {
    //       displayUploadMessage(`File ${response.name} of ${response.size} bytes uploaded`);
    //     //   displayFiles();
    //     });
    //   }
      
    //   function displayUploadMessage(message) {
    //       const messageElement = document.getElementById('uploadMessage');
    //       messageElement.innerText = message;
    //   }


    


        // async function fileUpload() {
        //     console.log("Uploading...")
        //     let file = document.getElementById("fileUploadControl").files[0];
        //     try {
        //         let response = await largeFileUpload(client, file, file.name);
        //         console.log(response);
        //         console.log("File Uploaded Successfully!!");
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // async function largeFileUpload(client, file) {
        //     try {
        //         let options = {
        //             path: "/Desktop",
        //             fileName: file.name,
        //             rangeSize: 1024 * 1024,
        //         };
        //         const uploadTask = await MicrosoftGraph.OneDriveLargeFileUploadTask.create(client, file, options);
        //         const response = await uploadTask.upload();
        //         return response;
        //     } catch (err) {
        //         throw err;
        //     }
        // }
    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
{/* 
            <input id="fileUploadControl" name="fileUploadControl" type="file" />
    <button onClick={fileUpload}>Save to OneDrive</button> */}

<ReactOneDriveFilePicker
        clientID={process.env.CLIENT_ID}
        action="share"
        multiSelect={true}
        onSuccess={(result) => {
          console.log(JSON.stringify(result));
        }}
        onCancel={(result) => {
          console.log(JSON.stringify(result));
        }}
      >
        <button>Click Here</button>
      </ReactOneDriveFilePicker> 
            
        </div>

        
    );
};



