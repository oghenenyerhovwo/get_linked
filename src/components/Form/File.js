import React, { useState } from 'react'
import { FileSelector, ProgressBar } from 'react-rainbow-components';
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"


import { firebaseStorage, onChangeError, objectToArray } from '../../utils/'

import "./file.css"

const LargeScreenFile = props => {
  const { accept, icon, name, onChange, errorFileMessage, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      uploadIcon={icon}
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      variant="multiline"
      onChange={onChange}
      accept={accept}
      name={name}
      multiple={multiple}
      error={errorFileMessage}
    /> 
  )
}

const SmallScreenFile = props => {
  const { accept, icon, name, onChange, errorFileMessage, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      uploadIcon={icon}
      onChange={onChange}
      error={errorFileMessage}
      accept={accept}
      name={name}
      multiple={multiple}
    />
  )
}

// Our app
const FileComponent = props => {

  const { 
    label, 
    name, 
    errorMessage, 
    setForm, 
    setError, 
    multiple, 
    form, 
    error, 
    required,
    maxSize,
    minSize,
    description,
    maxNumber,
  } = props

  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState({
    [name]: "",
  })
  const [percent, setPercent] = useState({
    [name]: 0,
  });

  const handleSingleFileChange = async (fileList) => {
    setPercent(prevForm => {
      return {
        ...prevForm,
        [name]: 0,
      }
    })
    if(fileList && fileList[0]){
      try {
        const file = fileList[0];
        if (maxSize && file.size > maxSize){
          setUploadError({[name]: "File is too large"})
          return;
        }
        if (minSize && file.size < minSize){
          setUploadError({[name]: "File is too small"})
          return;
        }
        setUploadError("")
        const storageRef = ref(firebaseStorage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const currentPercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
    
            // update progress
            setPercent({...percent, [name]: currentPercent})
            if(currentPercent === 100){
              setUploadSuccess(true)
            }
          },
          (err) => {
            setUploadError({[name]: "Error while uploading file"})
          },
          async () => {
            // download url
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setPercent({...percent, [name]: 0})
              setError(onChangeError(name, url, form, error))
              setForm(prevForm =>{ 
                return  {
                  ...prevForm, 
                  [name]: url,
                }
                }
              )
              
            });
          }
        )
      } catch (error) {
        console.log(error)
        setUploadError({[name]: "Error while uploading file"})
      }
    }
  }

  const handleMultipleFileChange = (fileList) => {
    setPercent(prevForm => {
      return {
        ...prevForm,
        [name]: 0,
      }
    })
    if(fileList && fileList[0]){
      try {
        const fileListArr = objectToArray(fileList)
        if(fileListArr.length > maxNumber){
          setUploadError({[name]: `Exceeded ${maxNumber} files`})
          return;
        }
        fileListArr.map(async file => {
          if (maxSize && file.size > maxSize){
            setUploadError({[name]: "File is too large"})
            return;
          }
          if (minSize && file.size < minSize){
            setUploadError({[name]: "File is too small"})
            return;
          }
          setUploadError("")
          const storageRef = ref(firebaseStorage, `/files/${file.name}`)
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          await uploadTask.on(
            "state_changed",
            (snapshot) => {
              const currentPercent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
      
              // update progress
              setPercent({...percent, [name]: currentPercent})
              if(currentPercent === 100){
                setUploadSuccess(true)
              }
            },
            (err) => {
              console.log("Firebase upload error")
              console.log(err)
              setUploadError({[name]: "Error while uploading file"})
            },
            async () => {
              // download url
              await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setPercent({...percent, [name]: 0})
                  setError(onChangeError(name, url, form, error))
                setForm(prevForm =>{ 
                  return  {
                    ...prevForm, 
                    [name]: [...prevForm[name], {url: url, _id: prevForm[name].length + 1 }]
                  }
                  }
                )
              });
            }
          )
        })
      } catch (error) {
        console.log("Firebase upload error")
        console.log(error)
        setUploadError({[name]: "Error while uploading file"})
      }
    }
  }

  const onChange = multiple ? handleMultipleFileChange : handleSingleFileChange

  return (
    <div className={`app_file ${(uploadError[name] || errorMessage) && "app_file_error"} ${uploadSuccess && "app_file_success"} spacing-md`}>
        <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span> <span className="not_required">{label && !required && "(optional)"} </span></label>
        <div className="spacing-sm"> </div>
        <p className="form_description">{description} </p> 
        <div className="spacing-sm"> </div>
        <>
          <div className="file_largescreen"> 
              <LargeScreenFile {...props} errorFileMessage={uploadError[name] || errorMessage} onChange={onChange}/>
          </div>
          <div className="file_smallscreen">
              <SmallScreenFile {...props} errorFileMessage={uploadError[name] || errorMessage} onChange={onChange}/>
          </div>
        </>
      {
        (percent[name] > 0)&&
        <ProgressBar value={percent[name]} />
      }
  </div>
  )
}

export default FileComponent