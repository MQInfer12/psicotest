import React, { useState } from "react";
import { addBenefToTest } from "../../services/test";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import Cargando from "../globals/cargando";
import { useUserContext } from "../../context/userContext";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useGet from "../../hooks/useGet";
import { useEffect } from "react";
import ChecksArea from "./modalAssign/checksArea";

const ModalAssignBenef = ({ id, actualizar }) => {
  const { resJson: data, loading } = useGet(`test/assignBenef/${id}`, { alwaysLoading: true });

  const { user } = useUserContext();
  const [idsSelected, setIdsSelected] = useState([]);
  const [selecteds, setSelecteds] = useState([]);

  const saveData = async () => {
    const res = await addBenefToTest(selecteds, id);

    idsSelected.forEach(async (val) => {
      const combinedId =
        Number(val) > Number(user.id)
          ? String(val) + String(user.id)
          : String(user.id) + String(val);
      console.log(combinedId);

      try {
        const resChat = await getDoc(doc(db, "chats", combinedId));
        console.log("llega");
        if (!resChat.exists()) {
          console.log("llega");
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", String(val)), {
            [combinedId + ".userInfo"]: {
              uid: String(user.id)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", String(user.id)), {
            [combinedId + ".userInfo"]: {
              uid: String(val)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } 
      } catch (error) {
        console.log(error);
      }
    });

    if (res.ok) {
      actualizar();
    } 
  };

  useEffect(() => {
    if(data.emails) {
      setSelecteds(data.emails);
    }
  }, [data]);

  return (
    <FormContainer>
      {
        loading ? (
          <Cargando />
        ) : (
          <ChecksArea
            users={data.users}
            selectedsState={{selecteds, setSelecteds}}
            idsSelectedState={{idsSelected, setIdsSelected}}
          />
        )
      }
      <PurpleButton onClick={saveData}>Guardar</PurpleButton>
    </FormContainer>
  );
};

export default ModalAssignBenef;