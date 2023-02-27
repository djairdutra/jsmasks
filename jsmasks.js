/*
Use as classes abaixo para aplicar as máscaras ao input do tipo text:

.cpfmask  = 999.999.999-99      (+ validade)
.cnpjmask = 99.999.999/9999-99  (+ validate)
.cepmask  = 99.999-99
.telmask  = (99) 999999999
.datemask = 99/99/9999          (+ validate)
.horamask = 99:99               (+ validate)
*/

const cpfmask = document.querySelector(".cpfmask");
const cnpjmask = document.querySelector(".cnpjmask");
const cepmask = document.querySelector(".cepmask");
const telmask = document.querySelector(".telmask");
const datemask = document.querySelector(".datemask, .datamask");
const horamask = document.querySelector(".horamask");

if(cpfmask){
    cpfmask.setAttribute("maxlength",11);
    cpfmask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        event.target.value = valor;
    })
    cpfmask.addEventListener("blur", () => {
        if(cpfmask.value.length > 0 && !validarCPF(cpfmask.value)){
            alert("CPF Inválido");
            cpfmask.value = null;
        }
    })
}

if(cnpjmask){
    cnpjmask.setAttribute("maxlength",14);
    cnpjmask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        event.target.value = valor;
    })
    cnpjmask.addEventListener("blur", () => {
        if(cnpjmask.value.length > 0 && !validarCNPJ(cnpjmask.value)){
            alert("CNPJ Inválido");
            cnpjmask.value = null;
        }
    })
}

if(cepmask){
    cepmask.setAttribute("maxlength",8);
    cepmask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
        event.target.value = valor;
    })
}

if(telmask){
    telmask.setAttribute("maxlength",11);
    telmask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{8,9})/, '\($1\) $2');
        event.target.value = valor;
    })
}

if(datemask){
    datemask.setAttribute("maxlength",8);
    datemask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        event.target.value = valor;
    })
    datemask.addEventListener("blur", () => {
        if(datemask.value.length > 0 && !validarData(datemask.value)){
            datemask.value = null;
        }
    })
}

if(horamask){
    horamask.setAttribute("maxlength",4);
    horamask.addEventListener('keyup', (event) => {
        let valor = event.target.value;
        valor = valor.replace(/\D/g, '');
        valor = valor.replace(/(\d{2})(\d{2})/, '$1:$2');
        event.target.value = valor;
    })
    horamask.addEventListener("blur", () => {
        if(horamask.value.length > 0 && !validarHora(horamask.value)){
            horamask.value = null;
        }
    })
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ) return false;
    // Valida #1 dígito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida #2 dígito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}

function validarData(data) {

    // Expressão regular para validar a data no formato "dd/mm/aaaa"
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Verifica se a data foi digitada no formato correto
    if (!regexData.test(data)) {
      alert('Data inválida. Digite a data no formato "dd/mm/aaaa".');
      return false;
    }

    const dia = parseInt(data.substr(0, 2));
    const mes = parseInt(data.substr(3, 2));
    const ano = parseInt(data.substr(6, 4));

    // Verifica se o ano é bissexto
    const bissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
  
    // Verifica se o mês é válido
    if (mes < 1 || mes > 12) {
      alert('Data inválida. O mês deve estar entre 1 e 12.');
      return false;
    }
  
    // Verifica se o dia é válido para o mês e ano informados
    const diasNoMes = [
      31, // janeiro
      bissexto ? 29 : 28, // fevereiro
      31, // março
      30, // abril
      31, // maio
      30, // junho
      31, // julho
      31, // agosto
      30, // setembro
      31, // outubro
      30, // novembro
      31, // dezembro
    ];

    if (dia < 1 || dia > diasNoMes[mes - 1]) {
      alert(`Data inválida. O mês ${mes} de ${ano} tem ${diasNoMes[mes - 1]} dias.`);
      return false;
    }

    // Data válida
    return true;

}

function validarHora() {
    const input = document.querySelector('.horamask');
    const hora = input.value;
  
    // Expressão regular para validar a hora no formato "HH:MM"
    const regexHora = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  
    // Verifica se a hora foi digitada no formato correto
    if (!regexHora.test(hora)) {
      alert('Hora inválida. Digite a hora no formato "HH:MM".');
      return false;
    }
  
    const horas = parseInt(hora.substr(0, 2));
    const minutos = parseInt(hora.substr(3, 2));
  
    // Verifica se a hora é válida
    if (horas < 0 || horas > 23) {
      alert('Hora inválida. As horas devem estar entre 00 e 23.');
      return false;
    }
  
    // Verifica se os minutos são válidos
    if (minutos < 0 || minutos > 59) {
      alert('Hora inválida. Os minutos devem estar entre 00 e 59.');
      return false;
    }
  
    // Hora válida
    return true;
  }
  
