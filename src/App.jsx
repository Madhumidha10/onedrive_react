import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph,callMsGraph1 } from "./graph";
import Button from "react-bootstrap/Button";


import "./styles/App.css";
/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    // const [accessToken,setAccessToken]=useState('')
     const [fileStream,setFileStream]=useState('')
const {file,setFile}=useState({file:'',msg:''})
    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
            //setAccessToken(response.accessToken)
         
        });
    }

    // PUT /drives/{drive-id}/items/{parent-id}:/{filename}:/content
    // const uploadFile=()=>{
    //     oneDriveAPI.items
    //     .listChildren({
    //       accessToken: accessToken,
    //       itemId: "root",
    //       drive: "me", // 'me' | 'user' | 'drive' | 'group' | 'site'
    //       driveId: "", // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
    //     })
    //     .then((childrens) => {
    //       // list all children of given root directory
    //       //
    //       console.log(childrens);
    //       // returns body of https://dev.onedrive.com/items/list.htm#response
    //     });
    // // }
    function uploadFile(){
 
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            
            callMsGraph1(response.accessToken).then(response => console.log(response));
        })
    }
// const onFileChange = (event) => {
//     event.preventDefault()
//     const reader = new FileReader()
//     reader.onload = async (e) => { 
//         setFile({
//             file: event.target.files[0],
//             msg:event.target.result
//         });
//         console.log(file)
//         uploadFile()
          
//            };

// }

    
//   const showFile = async (e) => {
   
//     const reader = new FileReader()
//     reader.onload = async (e) => { 
//     // console.log(e.target)
//       const text = (e.target.result)
//       console.log(text)
  
//     };

//     setFileStream(reader.readAsText(e.target.files[0]))





//   }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData}  />:

                <div>
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button><br/>
                {/* <input type="file" onChange={(e) => showFile(e)} /> */}

                <Button variant="secondary" onClick={uploadFile}>Upload File</Button>


                {/* <input type="file" name="file" onChange={onFileChange}/> */}
                </div>
            }
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
