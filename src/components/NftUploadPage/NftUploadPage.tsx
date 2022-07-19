import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDropzone} from 'react-dropzone'
import { create } from 'ipfs-http-client'
const client = create({url:'https://ipfs.infura.io:5001/api/v0'});
import { locations } from '../../routing/locations';
import { useHistory } from 'react-router';
import './NftUploadPage.css';

toast.configure();

interface IAppProps {
  file: any;
}

export default function NftUploadPage (){

    var history = useHistory();
    const [files, setFiles] = useState([])
    const [folderUrl, setFolderUrl] = useState('')
    const [fileUrl, updateFileUrl] = useState('')
  
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      setFiles(acceptedFiles);
      setFolderUrl(acceptedFiles[0].path)
    }, [])
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    const {
      handleSubmit,
    } = useForm<IAppProps>();
  
    const onSubmit = async ({
    }: IAppProps) => {
      if(files.length != 0){
        //do sth with file
        try {
          updateFileUrl("loading")
          const added = await client.add(files[0])
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          updateFileUrl(url)
          console.log(url)

          toast.success('Upload file success!', {autoClose:1000});
        } catch (error) {
          updateFileUrl("")
          toast.error('Error uploading file! ', {autoClose:1000});
        }  
      } else {
        updateFileUrl("")
        toast.warning("Please select the file!", {autoClose:1000});
      }
    };
  
    const onSubmitNext = async () => {

      if(fileUrl == ''){
        toast.warning('Please upload the file!')
      } else if(fileUrl == 'loading') {
        toast.warning('Now uploading. Please wait until upload is finished.')
      } else {
        localStorage.setItem("urlHash", fileUrl);
        history.push(locations.nftinfo())
      }
    };

    return (
      <>
        <div className="NftUploadPage">
            <h1 className="text-center mb-6 font-bold text-2xl">
              Drop your files
            </h1>
            <div  className="dropzone" >
              <div {...getRootProps()} style={{minHeight:'300px'}} className='dropChild'>
                <div>
                  {/* <AiOutlineCloudUpload color="purple" size={36}/> */}
                  <p>{folderUrl}</p>
                </div>
                <div>
                  <input {...getInputProps()} />
                  <img
                      width="200"
                      src="./upload.png"
                      alt="freepik"
                      style={{ filter: 'invert(1)', cursor: 'pointer' }}
                    />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag and drop some files here, or click to select files</p>
                  }
                </div>
              </div>
              {/* {fileUrl=='loading' && <Spinner className="justify-left" />} */}
              <div style={{alignContent:'flex-end'}} >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <button
                    type="submit"
                    className="uploadButton"
                  >
                    {
                      fileUrl=='loading' ?
                        <p className="text-center">Uploading</p> :
                        <p className="text-center">Upload</p> 
                    }
                  </button>
                </form>
              </div>
            </div>
            <div className="buttonBox">
              <div style={{textAlign:'right'}}>
                <button  className="backButton" >
                  {/* <Icon name="arrow-key-left"/> */}
                  <p className="text-center">Back</p>
                </button>
              </div>
              <div style={{textAlign:'left'}}>
                <form onSubmit={handleSubmit(onSubmitNext)} >
                  <button className="nextButton" >
                    {/* <Icon name="arrow-key-right"/> */}
                    <p className="text-center">Next</p>
                  </button>
                </form>
              </div>
            </div>
        </div>
      </>
    )
}
