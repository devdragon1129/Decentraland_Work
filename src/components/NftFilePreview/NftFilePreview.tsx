import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { locations } from '../../routing/locations';
import { useHistory } from 'react-router';
import './NftFilePreview.css';

toast.configure();

interface IAppProps {
  file: any;
}

export default function NftFilePreview (){

  var history = useHistory();
  const [fileUrl, setFileUrl] = useState('')
  const [names, setName] = useState('')
  console.log(fileUrl)
  useEffect(() => {
    let filepath = localStorage.getItem('urlHash')
    let filename = localStorage.getItem('nftname')
    if( filepath != null && filename != null){
      setName(filename)
      setFileUrl(filepath)
    } else {
      history.push(locations.nftinfo())
    }
  }, []);

  const {
    handleSubmit,
  } = useForm<IAppProps>();

  const onSubmitNext = async () => {
    history.push(locations.nftinfo())
  };
  
  const onSubmitBack = async () => {
    history.push(locations.nftfileupload())
  };

  return (
    <>
      <div className="NftFilePreview">
        <h1 className="text-center mb-6 font-bold text-2xl">
          {names}
        </h1>
        <div  className="dropzone" >
          <img
            width="200"
            src="./logo-2-dark.png"
          />
        </div>
        <div className="buttonBox">
          <div style={{textAlign:'right'}}>
            <form onSubmit={handleSubmit(onSubmitBack)} >
              <button  className="backButton" >
                {/* <Icon name="arrow-key-left"/> */}
                <p className="text-center">Back</p>
              </button>
            </form>
          </div>
          <div style={{textAlign:'left'}}>
            <form onSubmit={handleSubmit(onSubmitNext)} >
              <button className="nextButton" >
                {/* <Icon name="arrow-key-right"/> */}
                <p className="text-center">Create</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
