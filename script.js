/*
    Tabla de enciptacion

        1	2	3	4	5
    1	a	b	c	d	e
    2	f	g	h	i	j
    3	k	l	m	n	ñ
    4	o	p	q	r	s
    5	t	u	v	w	x
    6	y	z
*/

const tabla = {
  a: "11",
  b: "12",
  c: "13",
  d: "14",
  e: "15",
  f: "21",
  g: "22",
  h: "23",
  i: "24",
  j: "25",
  k: "31",
  l: "32",
  m: "33",
  n: "34",
  ñ: "35",
  o: "41",
  p: "42",
  q: "43",
  r: "44",
  s: "45",
  t: "51",
  u: "52",
  v: "53",
  w: "54",
  x: "55",
  y: "61",
  z: "62",
};

const textarea = document.getElementById("userText");
const userInput = textarea.value;

function validarTexto(userInput) {
  const regex = /[A-ZÁÉÍÓÚÜáéíóúü]/;
  if (regex.test(userInput)) {
    alert("El texto contiene mayúsculas o letras acentuadas.");
    return false;
  }
  return true;
}

function encriptarTexto(userInput) {
  if (!validarTexto(userInput)) {
    return;
  }

  let encriptado = "";
  for (let char of userInput) {
    if (char === " ") {
      encriptado += "0";
    } else if (tabla[char]) {
      encriptado += tabla[char];
    } else {
      encriptado += char;
    }
  }

  const textoProcesado = document.getElementById("textoProcesado");
  textoProcesado.innerHTML = `
        <div class="texto-procesado">
            <p id="texto">${encriptado}</p>
        </div>
        <input class="button secundary-button" type="button" value="copy" id="copy">
    `;
}

document.getElementById("encriptarText").addEventListener("click", () => {
  const userInput = document.getElementById("userText").value;
  encriptarTexto(userInput);
});

function desencriptarTexto(textoEncriptado) {
  const tablaInvertida = {};
  for (let letra in tabla) {
    tablaInvertida[tabla[letra]] = letra;
  }

  let textoDesencriptado = "";
  let i = 0;
  while (i < textoEncriptado.length) {
    if (textoEncriptado[i] === "0") {
      textoDesencriptado += " ";
      i++;
    } else {
      let codigo = textoEncriptado.substr(i, 2);

      if (tablaInvertida[codigo]) {
        textoDesencriptado += tablaInvertida[codigo];
        i += 2;
      } else {
        textoDesencriptado += codigo;
        i += 2;
      }
    }
  }
  return textoDesencriptado;
}


document.querySelector(".primary-button").addEventListener("click", () => {
  const textoEncriptado = document.getElementById("texto").textContent;
  const textoDesencriptado = desencriptarTexto(textoEncriptado);

  const textoProcesado = document.getElementById("textoProcesado");
  textoProcesado.innerHTML = `
        <div class="texto-procesado">
            <p id="texto">${textoDesencriptado}</p>
        </div>
        <input class="button secundary-button" type="button" value="copy" id="copy">
    `;
});
