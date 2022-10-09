const reactivos = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const preguntas = [];

for(let i = 0; i < 45; i++) {
  preguntas.push({id: i, id_pregunta: i % 9, id_reactivo: Math.floor(i / 9)});
}

const idPreguntas = [];
preguntas.map(v => {
  if(!idPreguntas.includes(v.id_pregunta)) {
    idPreguntas.push(v.id_pregunta);
  }
});

console.log(idPreguntas);