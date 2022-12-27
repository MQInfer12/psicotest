import React from 'react'
import { useUserContext } from '../../context/userContext'
import { PurpleButton, WhiteButton } from '../../styles/globals/formularios'
import { DivFile, DivPhoto, DivPhotoButtons, DivPhotoInfo, InfoPhotoExtensions, InputFile } from '../../styles/pages/profile'
import ProfilePic from '../globals/profilePic'

const Photo = ({ prev, editable, handleChange, handleResetImg }) => {
  const { user } = useUserContext();

  return (
    <DivPhoto>
      <ProfilePic
        width="100px"
        height="100px"
        perfil={user.perfil}
        editable={editable}
        prev={prev}
      />
      {editable && (
        <DivPhotoInfo>
          <DivPhotoButtons>
            <DivFile>
              <InputFile
                type="file"
                name="perfil"
                onChange={handleChange}
                accept='.jpg,.png,.jpeg'
              />
              <PurpleButton>Subir foto nueva</PurpleButton>
            </DivFile>
            <WhiteButton onClick={() => handleResetImg("perfil")}>Reset</WhiteButton>
          </DivPhotoButtons>
          <InfoPhotoExtensions>Permitido JPG, JPEG o PNG.</InfoPhotoExtensions>
        </DivPhotoInfo>
      )}
    </DivPhoto>
  )
}

export default Photo