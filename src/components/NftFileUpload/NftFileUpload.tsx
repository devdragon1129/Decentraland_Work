import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDropzone} from 'react-dropzone'
import { locations } from '../../routing/locations';
import { useHistory } from 'react-router';
import './NftFileUpload.css';

toast.configure();

interface IAppProps {
  file: any;
}

export default function NftFileUpload (){

  var history = useHistory();
  const [files, setFiles] = useState([])
  const [folderUrl, setFolderUrl] = useState('')
  const [names, setName] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles[0])
    console.log(acceptedFiles[0].path)
    setFiles(acceptedFiles[0]);
    setFolderUrl(acceptedFiles[0].path)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const {
    handleSubmit,
  } = useForm<IAppProps>();

  const onSubmitNext = async () => {

    if(folderUrl == ''){
      toast.warning('Please upload the file!')
    } else if(names == '') {
      toast.warning('Please Enter Name assets!')
    } else {
      localStorage.setItem("urlHash", folderUrl);
      localStorage.setItem("nftfile", files[0])
      localStorage.setItem("nftname", names)
      history.push(locations.nftfilepreview())
    }
  };

  const handleInputName = (e:any) => {
    setName(e.target.value)
  }
  return (
    <>
      <div className="NftFileUpload">
        <h1 className="text-center mb-6 font-bold text-2xl">
          Create NFT
        </h1>
        <div className="subheader">
          <h3>
            Image, Video, 3d Model*
          </h3>
          <p>
            File type supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
          </p>
          <p>
            Max size: 100 MB
          </p>
        </div>
        <div  className="dropzone" >
          <div {...getRootProps()} style={{minHeight:'300px'}} className='dropChild'>
            <div>
              <span>{folderUrl}</span>
            </div>
            <div>
              <input {...getInputProps()} />
              {
                folderUrl == '' ?
                <img
                  width="200"
                  src="./upload.png"
                  alt="freepik"
                  style={{ filter: 'invert(1)', cursor: 'pointer' }}
                />
                :
                <img
                  width="200"
                  src="./logo-2-dark.png"
                  alt="freepik"
                  style={{ cursor: 'pointer' }}
                />
              }
            </div>
            <div>
              {
                isDragActive ?
                  <span>Drop the files here ...</span> :
                  <span>Drag and drop some files here, or click to select files</span>
              }
            </div>
          </div>
        </div>
        <div className="subheader1">
          <h3>
            Name*
            {/* <h3 style={{color:'red'}}>*</h3> */}
          </h3>
          <input
            type="text"
            id="nftname"
            placeholder="Enter Name assets"
            required
            onChange={handleInputName}
          />
        </div>
        <div className="buttonBox">
          <div style={{textAlign:'right'}}>
            <button  className="backButton" >
              {/* <Icon name="arrow-key-left"/> */}
              {/* <p className="text-center">Back</p> */}
              Back
            </button>
          </div>
          <div style={{textAlign:'left'}}>
            <form onSubmit={handleSubmit(onSubmitNext)} >
              <button className="nextButton" >
                {/* <Icon name="arrow-key-right"/> */}
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
