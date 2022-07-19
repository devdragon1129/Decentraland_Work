import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { locations } from '../../routing/locations';
import { useHistory } from 'react-router';
import './NftInfoCheckPage.css';

toast.configure();

interface IAppProps {
  name : string
  description : string
  maxnftmintonce : number
  maxnftmintcol : number
  maxtimeframe : number
}

export default function NftInfoCheckPage (){

  var history = useHistory();
  // localStorage.setItem("urlHash", folderUrl);
  const [place, setplace] = useState("")
  const [type, settype] = useState("collect")
  const [name, setname] = useState('')
  const [date, setdate] = useState('')
  const [hour, sethour] = useState('')
  const [minute, setmin] = useState('')
  const [maxmint, setmaxmint] = useState('')
  const [fileurl, setFileUrl] = useState('')
  
  useEffect(() => {
    let filepath = localStorage.getItem('urlHash')
    let cplace = localStorage.getItem('cplace')
    let ctype = localStorage.getItem('ctype')
    let cname = localStorage.getItem('cname')
    let cdate = localStorage.getItem('ctime')
    let chour = localStorage.getItem('chour')
    let cmin = localStorage.getItem('cmin')
    let cmaxmint = localStorage.getItem('cmaxmint')
    // let filename = localStorage.getItem('nftname')
    if (filepath == null){
      history.push(locations.nftfileupload())
    } else if (cplace == null || cmaxmint == null || ctype == null || cname == null) {
      history.push(locations.nftinfo())
    } else if (cdate == null && chour == null && cmin == null) {
      history.push(locations.nftinfo())
    } else {
      setplace(cplace)
      settype(ctype)
      setname(cname)
      setmaxmint(cmaxmint)
      setFileUrl(fileurl)
      if (cdate == null) {
        setdate('')
      } else {
        setdate(cdate)
      }
      if (chour == null) {
        sethour('')
      } else {
        sethour(chour)
      }
      if (cmin == null) {
        setmin('')
      } else {
        setmin(cmin)
      }
    }
  }, []);

    const {
      handleSubmit,
    } = useForm<IAppProps>();
  
    const onSubmitNext = async () => {
      console.log("this is the next click")
      // if(fileUrl == ''){
      //   toast.warning('Please upload the file!')
      // } else if(fileUrl == 'loading') {
      //   toast.warning('Now uploading. Please wait until upload is finished.')
      // } else {
      //   localStorage.setItem("urlHash", fileUrl);
      //   history.push(locations.nftinfocheck())
      // }
    };

    const onSubmitBack =async () => {
      history.push(locations.nftplace())
    }

    return (
      <>
        <div className="NftInfoCheckPage">
            <h1>
              Campaign Details
            </h1>
            <div className="mainzone">
              <div className="imagezone">
                <img src={fileurl}/>
              </div>
              <div  className="infozone" >
                <div>
                  <p>Campaign Name</p>
                  <h4>{name}</h4>
                </div>
                <div>
                  <p>Maximum number of mints per transaction</p>
                  <h4>{maxmint}</h4>
                </div>
                <div>
                  <p>Place in Metaverse</p>
                  <h4>{place}</h4>
                </div>
                <div>
                  <p>Days</p>
                  <h4>{date}</h4>
                  <p>Hours</p>
                  <h4>{hour}</h4>
                  <p>Minutes</p>
                  <h4>{minute}</h4>
                </div>
                <div>
                  <p>Type of NFT</p>
                  <h4>{type}</h4>
                </div>
              </div>
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
                    <p className="text-center">Next</p>
                  </button>
                </form>
              </div>
            </div>
        </div>
      </>
    )
}
