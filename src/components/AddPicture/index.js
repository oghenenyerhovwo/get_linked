import React, { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"

// components
import Form from "../Form"

// functions 
import { firebaseStorage, onChangeError  } from '../../utils/'

// styles
import "./style.css"

const AddPicture = props => {

  const { _id, name, form, setForm, setError, error } = props

  const [picture, setPicture] = useState([])
  const [caption, setCaption] = useState("")
  const [percent, setPercent] = useState(0);
  const [inputError, setInputError] = useState("")
  const [url, setUrl] = useState("");

  useEffect(() => {
      if(error[name] && error[name].text && !url){
        setInputError(error[name])
      } else {
        setInputError("")
      }
  }, [error, url, name])

  useEffect(() => {
    if(error[name] && error[name].text && url){
      onChangeError(name, url, form, error, setError)
    } // eslint-disable-next-line
  }, [url])

  const uploadPicture = fileItems => {
    if(fileItems.length > 0){
      const file = fileItems.map(fileItem => fileItem.file)
      setPicture(file)
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
            setForm(prevForm => {return {...prevForm, [name]: prevForm[name].map(image => {
                if(image._id === _id){
                    return {...image, url: url}
                }
                return image
            }) }})
          });
        }
      )
    }
  }

  const handleCaption = e => {
    setCaption(e.target.value)
    setForm(prevForm => {return {...prevForm, [name]: prevForm[name].map(image => {
        if(image._id === _id){
            return {...image, caption: e.target.value}
        }
        return image
    }) }})
  }

  return (
    <div className={`${inputError && "app__addpicture-error"}`} >
        <Form.File
            accept={['image/*']}
            file={picture}
            setFile={uploadPicture}
            label='Drag and drop your files or <span class="filepond--label-action">Browse</span></span>'
        />
        {percent > 0 && <p>${percent}% </p> }
        <Form.Input
            onChange={handleCaption}
            value={caption}
            type="textarea"
        />
    </div>
  )
}

export default AddPicture