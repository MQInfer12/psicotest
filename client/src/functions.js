//VALIDAR IMAGEN
export function validarInputFile(e) {
  const archivo = e.target.value;
  const extension = archivo.substring(archivo.lastIndexOf('.'),archivo.length);
  if(e.target.getAttribute('accept').split(',').indexOf(extension) < 0) {
    alert('Archivo inválido. No se permite la extensión ' + extension);
    return true;
  }
  return false;
}

//CONVERTIR IMAGENES A BASE 64
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    return console.log('Error: ', error);
  };
}