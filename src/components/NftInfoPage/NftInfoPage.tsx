import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { locations } from '../../routing/locations';
import { useHistory } from 'react-router';
import './NftInfoPage.css';

toast.configure();

interface IAppProps {
  name : string
  description : string
  maxnftmintonce : number
  maxnftmintcol : number
  maxtimeframe : number
}

export default function NftInfoPage (){

  var history = useHistory();

  const [place, setplace] = useState("")
  const [type, settype] = useState("collect")
  const [name, setname] = useState("")
  const [date, setdate] = useState(0)
  const [hour, sethour] = useState(0)
  const [minute, setmin] = useState(0)
  const [maxmint, setmaxmint] = useState(1)

  const handleSelect = (e:any) => {
    setplace(e.target.value)
  }

  const handleType = (e:any) => {
    settype(e.target.value)
  }

  const handleName = (e:any) => {
    setname(e.target.value)
  }

  const handleDate = (e:any) => {
    setdate(e.target.value)
  }

  const handleHour = (e:any) => {
    sethour(e.target.value)
  }

  const handleMin = (e:any) => {
    setmin(e.target.value)
  }

  const handleMxnum = (e:any) => {
    setmaxmint(e.target.value)
  }

  const {
    handleSubmit,
  } = useForm<IAppProps>();

  const onSubmitNext = async () => {
    console.log("this is the next click")
    if(name == ''){
      toast.warning('Please input the name!')
    } else if (date == 0 && hour == 0 && minute == 0) {
      toast.warning('Please input the time!')
    } else {
      localStorage.setItem('cname', name)
      localStorage.setItem('cmaxmint', maxmint.toString())
      localStorage.setItem('cplace', place)
      localStorage.setItem('cdate', date.toString())
      localStorage.setItem('chour', hour.toString())
      localStorage.setItem('cmin', minute.toString())
      localStorage.setItem('ctype', type)

      history.push(locations.nftplace())
    }
  };

  const onSubmitBack =async () => {
    history.push(locations.nftfileupload())
  }

  return (
    <>
      <div className="NftInfoPage">
        <h1>
          Campaign Details
        </h1>
        <div  className="infozone" >
          <div>
            <h4>Campaign Name</h4>
            <input
              type="text"
              id="cname"
              placeholder="Enter Campaign Name"
              required
              onChange={handleName}
            />
          </div>
          <div>
            <h4>Maximum number of mints per transaction</h4>
            <input
              type="number"
              id="maxnum"
              min={1}
              placeholder="The upper limit of NFTs that you can mint at once"
              required
              onChange={handleMxnum}
            />
          </div>
          <div>
            <h4>Place in Metaverse</h4>
            <select value={place} onChange={handleSelect} placeholder='Choose the place'>
              <option value="Place1">Place1</option>
              <option value="Place2">Place2</option>
              <option value="Place3">Place3</option>
              <option value="Place4">Place4</option>
            </select>
          </div>
          <div>
            <h4>Time Frame</h4>
            <input
              className="inputdate"
              type="number"
              id="dtime"
              placeholder="Days"
              required
              onChange={handleDate}
            />
            <input
              className="inputdate"
              type="number"
              id="htime"
              placeholder="Hours"
              required
              onChange={handleHour}
            />
            <input
              className="inputdate"
              type="number"
              id="mtime"
              placeholder="Minutes"
              required
              onChange={handleMin}
            />
          </div>
          <div>
            <h4>Type of NFT</h4>
            <div>
              <input 
                className="inputradio"
                type="radio" 
                id="collect" 
                name="type" 
                value="collect" 
                checked={type==="collect"} 
                onChange={handleType}
              />
              <label htmlFor="collect">For collect/sell</label>
              <input 
                className="inputradio"
                type="radio" 
                id="wearable" 
                name="type" 
                value="wearable" 
                onChange={handleType} 
                checked={type==="wearable"}
              />
              <label htmlFor="wearable">For wearing</label>
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
