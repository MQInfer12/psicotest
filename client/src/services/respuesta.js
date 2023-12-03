import { http, openAIApiKey } from "../env";

export const updateRespuesta = async (form, id) => {
  try {
    const response = await fetch(`${http}respuesta/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addRespuesta = async (form) => {
  try {
    const response = await fetch(`${http}respuesta`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getFullRespuestas = async (ids) => {
  try {
    const response = await fetch(`${http}respuesta/test/filtered`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getFullRespuesta = async ({ id }) => {
  try {
    const response = await fetch(`${http}respuesta/full/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const generateInterpretationOpenAI = async (prompt, callback) => {
  try {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "Eres un psicólogo especializado en el análisis de tests psicológicos de cualquier tipo de paciente"
        },{
          role: "user",
          content: prompt
        }],
        temperature: 1,
        max_tokens: 2000,
        stream: true
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while(true) {
      const chunk = await reader.read();
      const { done, value } = chunk;
      if(done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      const lines = decodedChunk.split("\n");
      const parsedLines = lines
        .map(line => line.replace(/^data: /, ""))
        .filter(line => line !== "" && line !== "[DONE]")
        .map(line => JSON.parse(line));
      for(const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        if(content) {
          callback(content);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const generateInterpretation = async (id) => {
  try {
    const response = await fetch(`${http}respuesta/interpretation/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const saveInterpretation = async (id, text) => {
  try {
    const response = await fetch(`${http}respuesta/interpretation/save/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        interpretation: text
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}