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