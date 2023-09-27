import React, { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

// components
import Form from "../Form"
import VideoPlayer from "../VideoPlayer"

// functions 
import { firebaseStorage, onChangeError } from '../../utils/'

// styles
import "./style.css"

const AddVideo = props => {

  const { name, form, setForm, setError, error, required } = props

  const [video, setVideo] = useState([])
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("")

  useEffect(() => {
    setInputError(error[name])
  }, [error, name])

  useEffect(() => {
    if(url){
      onChangeError(name, url, form, error, setError)
    } // eslint-disable-next-line
  }, [url])

  const uploadVideo = fileItems => {
    if(fileItems.length > 0){
      const file = fileItems.map(fileItem => fileItem.file)
      setVideo(file)
      const storageRef = ref(firebaseStorage, `/files/${file[0].name}`)
      const uploadTask = uploadBytesResumable(storageRef, file[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url)
            setPercent(0)
            setForm(prevForm => {return {...prevForm, [name]: url}})
          });
        }
      )
    }
  }

  return (
    <div className={`${inputError && "app__addvideo-error"}`} >
        <label className="form__label smalltext__avenir">Video <span className="danger">{required && "*"}</span> </label>

          <Form.File
              accept={['video/*']} 
              file={video}
              setFile={uploadVideo}
              label='Drag and drop your files or <span class="filepond--label-action">Browse</span></span>'
          />
          {percent > 0 && <p>${percent}% </p> }
          <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
        {url && <div className="app__showProduct-video spacing-lg">
            <h1 className="mediumtext__avenir spacing-sm">Take a quick tour of this Product, watch this video</h1> 
            <VideoPlayer url={url} />
        </div>}
    </div>
  )
}

export default AddVideo