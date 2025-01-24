export interface IGuia {
    carater: string; // Ex.: "2"
    cbo: string; // Ex.: "225125"
    cnpj: string; // Ex.: "39489968000169"
    contratado: string; // Ex.: "clínica de cirurgia plástica peçanha"
    crm: string; // Ex.: "52658510"
    dateSol: string; // Ex.: "2024-12-09"
    doctor: string; // Ex.: "Marcos Augusto Lima"
    guia: string; // Ex.: ""
    ind: string; // Ex.: ""
    obs: string; // Ex.: ""
    name: string; // Ex.: "fabiano gonçalves machado"
    planNumber: string; // Ex.: "1234567890"
    proced: Procedure[]; // Ex.: [] (Array de procedimentos)
    qtd: string; // Ex.: ""
    senha: string; // Ex.: ""
    src: string; // Ex.: "https://imgs.search.brave.com/..." // Ex.: ""
    typeGuia: string; // Ex.: "sadt"
    type: string; // Ex.: "guia"
    diaria: string; // Ex.: ""
    opme: string; // Ex.: ""
  }


  interface Procedure {
    proced: string; // Ex.: "Visita hospitalar (paciente internado)"
    tuss: string; // Ex.: "10102019"
    qtd: string; // Ex.: "1"
  }