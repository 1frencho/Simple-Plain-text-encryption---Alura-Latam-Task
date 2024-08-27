const encryptButton = document.getElementById('button-encrypt');
const decryptButton = document.getElementById('button-decrypt');
const inputText = document.getElementById('text-input');
const outputText = document.getElementById('final-text');
const placeholderImage = document.getElementById('mono');
const infoText = document.getElementById('text-info');
const rightSection = document.getElementById('right');
const copyButton = document.getElementById('button-copy');

// Función para encriptar el texto
function encryptText(text) {
  const encryptionKeys = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  };
  return text.replace(/[eioua]/g, (match) => encryptionKeys[match]);
}

// Función para desencriptar el texto
function decryptText(text) {
  const decryptionKeys = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober: 'o',
    ufat: 'u',
  };
  return text.replace(
    /enter|imes|ai|ober|ufat/g,
    (match) => decryptionKeys[match]
  );
}

// Inicializar SweetAlert
const showAlert = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'Aceptar',
    timer: 2000,
  });
};

// Validar que el texto solo contenga letras minúsculas sin acentos
const validateText = (text) => {
  const regex = /^[a-z\s]*$/;
  return regex.test(text);
};

const replaceText = (newValue) => {
  outputText.innerHTML = newValue;
  outputText.classList.add('adjust');
  rightSection.classList.add('adjust');
  inputText.value = '';
  inputText.style.height = 'auto';
  inputText.placeholder = 'Ingrese el texto aquí';
  placeholderImage.classList.add('hide');
  infoText.classList.add('hide');
};

const resetValues = () => {
  inputText.value = '';
  inputText.style.height = 'auto';
  outputText.innerHTML = '';
  rightSection.classList.remove('adjust');
  outputText.classList.remove('adjust');
  placeholderImage.classList.remove('hide');
  outputText.placeholder = 'No se encontró mensaje';
  infoText.classList.remove('hide');
  inputText.focus();
};

encryptButton.addEventListener('click', () => {
  const text = inputText.value.toLowerCase();

  if (text !== '') {
    if (validateText(text)) {
      const encryptedText = encryptText(text);
      replaceText(encryptedText);
      showAlert('Éxito', 'Texto encriptado', 'success');
      // <button className="button-copy bn-hide" id="button-copy">Copiar</button>
      copyButton.classList.remove('bn-hide');
    } else {
      showAlert(
        'Advertencia',
        'El texto debe contener solo letras minúsculas y sin acentos',
        'warning'
      );
    }
  } else {
    showAlert(
      'Advertencia',
      'Por favor ingrese texto para encriptar',
      'warning'
    );
    resetValues();
  }
});

decryptButton.addEventListener('click', () => {
  const text = inputText.value.toLowerCase();

  if (text !== '') {
    if (validateText(text)) {
      const decryptedText = decryptText(text);
      replaceText(decryptedText);
      showAlert('Éxito', 'Texto desencriptado', 'success');
    } else {
      showAlert(
        'Advertencia',
        'El texto debe contener solo letras minúsculas y sin acentos',
        'warning'
      );
      resetValues();
    }
  } else {
    showAlert(
      'Advertencia',
      'Por favor ingrese texto para desencriptar',
      'warning'
    );
    resetValues();
  }
});

// Auto ajustar el textarea
inputText.addEventListener('change', (e) => {
  inputText.style.height = 'auto';
  const scrollHeight = e.target.scrollHeight;
  inputText.style.height = `${scrollHeight}px`;
});

inputText.addEventListener('keyup', (e) => {
  inputText.style.height = 'auto';
  const scrollHeight = e.target.scrollHeight;
  inputText.style.height = `${scrollHeight}px`;
});

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(outputText.innerHTML);
  showAlert('Éxito', 'Texto copiado', 'success');
});
