// APLICACION QUE SIMULA EL SORTEO DE LA LOTERIA DE EL SALVDOE
// De acuerdo a las reglas de juego a octubre 2026

// Declaración de algunas variables globales
let i, j;
let premio1 = [];
premio1[0] = 175000;
let premio2 = [];
premio2[0] = 20000;
let premio3 = [];
premio3[0] = 10000;
let premio4 = [];
premio4[0] = 2000;
let premios1000 = [1000, 1000];
let premios500 = [];
let premios200 = [];
let premios100 = [];
let premios75 = [];
let premios50 = [];
let losPremios = [];

let premio;
let miPremio = [];
let enLista = [];
let laLista = [];
let listRow = [];
let premsUrna = [];

// Generar 7 premios de $500
for (i = 0; i < 7; i++) {
  premio = 500;
  premios500.push(premio);
}

// Generar 35 premios de $200
for (i = 0; i < 35; i++) {
  premio = 200;
  premios200.push(premio);
}

// Generar 60 premios de $100
for (i = 0; i < 60; i++) {
  premio = 100;
  premios100.push(premio);
}

// Generar 113 premios de $75
for (i = 0; i < 113; i++) {
  premio = 75;
  premios75.push(premio);
}

// Generar 456 premios de $50
for (i = 0; i < 456; i++) {
  premio = 50;
  premios50.push(premio);
}

// Concatenar el array de premios. Resulta un total de 677 premios de urna
losPremios = premio1.concat(
  premio2,
  premio3,
  premio4,
  premios1000,
  premios500,
  premios200,
  premios100,
  premios75,
  premios50,
);

// Declarar la variable billetes, casillas en blanco
let serieBilletes = ["", "", "", "", "", "", "", "", "", ""];
let sorteo;

// *************** Funcion comprar billetes
// *************** Actualizada a emision de 40000 billetes
// Generar los billetes, serie de 10, con terminación del 0 al 9
// Evitando números repetidos
function comprarBilletes() {
  clearfields();
  sorteo = false;
  let numsBaseBilletes = generateSet(10, 0, 3999); //size, min, max
  let baseBilletes = [];
  for (i = 0; i < 10; i++) {
    baseBilletes[i] = numsBaseBilletes[i].toString();
    serieBilletes[i] = baseBilletes[i] + i.toString();
    serieBilletes[i] = stringify5(serieBilletes[i]);
  }

  // Mostrar los billetes
  document.getElementById("billete1").innerHTML = serieBilletes[0];
  document.getElementById("billete2").innerHTML = serieBilletes[1];
  document.getElementById("billete3").innerHTML = serieBilletes[2];
  document.getElementById("billete4").innerHTML = serieBilletes[3];
  document.getElementById("billete5").innerHTML = serieBilletes[4];
  document.getElementById("billete6").innerHTML = serieBilletes[5];
  document.getElementById("billete7").innerHTML = serieBilletes[6];
  document.getElementById("billete8").innerHTML = serieBilletes[7];
  document.getElementById("billete9").innerHTML = serieBilletes[8];
  document.getElementById("billete10").innerHTML = serieBilletes[9];
}
// Final de la función comprarBilletes

// Variables para calcular los premios secundarios
let premioGrande = [];
let primerPremio, segundoPremio, tercerPremio;
let cut4, cut3;
let decena = [];
let centena = [];
// let iStr;
let decenaRed = [];
let centenaRed = [];
let listLength;

// *************************************************************
function correrSorteo() {
  if (serieBilletes[0] === "") {
    // Favor comprar billetes, para poder jugar
    alert("Se le invita a comprar billetes, para poder participar");
    return;
  }
  if (sorteo === true) {
    //  Si ya corrió el sorteo, favor comprar nuevos billetes
    alert("Se le invita a comprar nuevos billetes");
    return;
  }

  animate(); // Rotar la tómbola

  // Extraer los 677 numeros de urna, sin repeticiones
  premsUrna = [];
  premsUrna = generateSet(losPremios.length, 0, 39999); // size, min, max

  // Guardar los 3 números principales
  premioGrande[0] = premsUrna[0];
  primerPremio = stringify5(premioGrande[0].toString());
  premioGrande[1] = premsUrna[1];
  segundoPremio = stringify5(premioGrande[1].toString());
  premioGrande[2] = premsUrna[2];
  tercerPremio = stringify5(premioGrande[2].toString());

  // Armar la lista, array de 3 columnas
  laLista = [];
  for (i = 0; i < losPremios.length; i++) {
    listRow = [
      premsUrna[i],
      stringify5(premsUrna[i].toString()),
      losPremios[i],
    ];
    laLista.push(listRow);
  }

  // ******************* Agregar premios por aproximación *****
  let approxNum;
  let approxString;

  aproxPrems(0, 300);
  aproxPrems(1, 240);
  aproxPrems(2, 240);

  // ****************** Ordenar el array laLista[] en forma ascendente
  laLista = laLista.sort(function (a, b) {
    return a[0] - b[0];
  });

  // ****************** Consolidar números repetidos **************
  // THANKS IA STARTS *********************************************
  let totals = new Map();

  for (const [number, strNumber, prize] of laLista) {
    if (totals.has(number)) {
      totals.get(number)[2] += prize;
    } else {
      totals.set(number, [number, strNumber, prize]);
    }
  }

  // Replace the contents of the existing array
  laLista.length = 0;
  laLista.push(...totals.values());
  // THANKS IA ENDS *************************************************

  // Generar los premios por 4 y por 3 cifras
  bonox4x3(primerPremio, 120, 85);
  bonox4x3(segundoPremio, 90, 70);
  bonox4x3(tercerPremio, 90, 60);

  // ******* Ordenar de nuevo el array laLista[] en forma ascendente
  laLista = laLista.sort(function (a, b) {
    return a[0] - b[0];
  });

  // ****************** Consolidar números repetidos *****************
  // THANKS IA STARTS ************************************************
  totals = new Map();

  for (const [number, strNumber, prize] of laLista) {
    if (totals.has(number)) {
      totals.get(number)[2] += prize;
    } else {
      totals.set(number, [number, strNumber, prize]);
    }
  }

  // Replace the contents of the existing array
  laLista.length = 0;
  laLista.push(...totals.values());
  // THANKS IA ENDS *****************************************************

  // ******* A LOS PREMIOS DE LISTA, AñADIR BONO POR TERMINACIONES *******
  let term4, term3, term2, term1, laTerminacion, elNumero;

  // ************************* Otorgar por terminaciones del primer premio
  // Bonos primer premio 120, 90, 40, 35
  addTerminaciones(primerPremio, 120, 90, 40, 35);

  // ************************* Otorgar por terminaciones del segundo premio
  // Bonos segundo premio 100, 70, 35, 30
  addTerminaciones(segundoPremio, 100, 70, 35, 30);

  // ************************** Otorgar por terminaciones del tercer premio
  // Bonos tercer premio 100, 60, 35, 30
  addTerminaciones(tercerPremio, 100, 60, 35, 30);

  //  ************************* LISTA COMPLETADA ****************************

  //  ********************* REVISAR LOS BILLETES ****************************
  let k0 = 0,
    k1 = 0,
    k2 = 0,
    k3 = 0,
    k4 = 0,
    k5 = 0;

  // Inicializar los premios por billete
  for (i = 0; i < 10; i++) {
    miPremio[i] = 0;
    enLista[i] = false;
  }

  // Buscar en la lista los números de los billetes
  // Generar mensaje y sonido cuando hay premios de lista

  for (i in serieBilletes) {
    for (j = 0; j < laLista.length; j++) {
      if (serieBilletes[i] === laLista[j][1]) {
        miPremio[i] = laLista[j][2];
        enLista[i] = true;
        if (miPremio[i] >= 490 && miPremio[i] <= 899) {
          // al ganar $500 o mas, hasta $899
          k5 = miPremio[i];
          medioAudio();
        } else if (miPremio[i] >= 900 && miPremio[i] <= 8999) {
          // al ganar el de $1000 o $2000
          k4 = miPremio[i];
          medioAudio();
        } else if (miPremio[i] >= 9000 && miPremio[i] <= 18999) {
          // al ganar el de $10000
          k3 = miPremio[i];
          grandeAudio();
        } else if (miPremio[i] >= 19000 && miPremio[i] <= 99000) {
          // al ganar el de $20000
          k2 = miPremio[i];
          grandeAudio();
        } else if (miPremio[i] >= 100000) {
          // al ganar el premio mayor
          k1 = miPremio[i];
          grandeAudio();
        } else if (miPremio[i] > 40 && miPremio[i] <= 489) {
          k0 = miPremio[i];
          chicoAudio();
        }
      } //close the if
    } // close the j loop
  } // close the i loop

  // ************* Hay premio de lista!!... Display mensajes  *************
  setTimeout(displayAlerts, 500);
  function displayAlerts() {
    if (k0 > 1) {
      alert("Premio de lista  " + k0);
    }
    if (k5 > 1) {
      alert("Felicitaciones, buen premio de lista:  " + k5);
    }
    if (k4 > 1) {
      alert("Bravo!! Felicitaciones!! Cuarto premio:  " + k4);
    }
    if (k3 > 1) {
      alert("Bravo!! Felicitaciones!! Tercer premio:  " + k3);
    }
    if (k2 > 1) {
      alert("Bravo!! Bravo!! Felicitaciones!! Segundo premio:  " + k2);
    }
    if (k1 > 1) {
      alert("Bravo!! Bravo!! Felicitaciones!! PREMIO GORDO!!  " + k1);
    }
    clearTimeout(displayAlerts);
  }

  // ********************** Chequear los billetes por terminaciones ******
  // Bono por terminaciones del primer premio -> 120, 90, 40, 35
  checkTerminaciones(primerPremio, 120, 90, 40, 35);

  // Bono por terminaciones del segundo premio -> 100, 70, 35, 30
  checkTerminaciones(segundoPremio, 100, 70, 35, 30);

  // Bono por terminaciones del tercer premio -> 100, 60, 35, 30
  checkTerminaciones(tercerPremio, 100, 60, 35, 30);

  // ********* Premios por terminación han sido otorgados a mis billetes

  // Display los resultados del sorteo

  let total = 0;
  for (i = 0; i < 10; i++) {
    total = total + miPremio[i];
  }

  for (i = 0; i < 10; i++) {
    if (miPremio[i] < 1) {
      miPremio[i] = "-";
    }
  }

  document.getElementById("premiobillete1").innerHTML = miPremio[0];
  document.getElementById("premiobillete2").innerHTML = miPremio[1];
  document.getElementById("premiobillete3").innerHTML = miPremio[2];
  document.getElementById("premiobillete4").innerHTML = miPremio[3];
  document.getElementById("premiobillete5").innerHTML = miPremio[4];
  document.getElementById("premiobillete6").innerHTML = miPremio[5];
  document.getElementById("premiobillete7").innerHTML = miPremio[6];
  document.getElementById("premiobillete8").innerHTML = miPremio[7];
  document.getElementById("premiobillete9").innerHTML = miPremio[8];
  document.getElementById("premiobillete10").innerHTML = miPremio[9];

  document.getElementById("primerP").innerHTML = primerPremio;
  document.getElementById("segundoP").innerHTML = segundoPremio;
  document.getElementById("tercerP").innerHTML = tercerPremio;

  document.getElementById("balanceCuenta").innerHTML = total;

  // Bloquear la función correrSorteo() hasta compar de nuevo billetes
  sorteo = true;
}
// *********** Final de la función "correrSorteo()" ********

// **************** FUNCIONES AUXILIARES *************************

function clearfields() {
  document.getElementById("premiobillete1").innerHTML = "";
  document.getElementById("premiobillete2").innerHTML = "";
  document.getElementById("premiobillete3").innerHTML = "";
  document.getElementById("premiobillete4").innerHTML = "";
  document.getElementById("premiobillete5").innerHTML = "";
  document.getElementById("premiobillete6").innerHTML = "";
  document.getElementById("premiobillete7").innerHTML = "";
  document.getElementById("premiobillete8").innerHTML = "";
  document.getElementById("premiobillete9").innerHTML = "";
  document.getElementById("premiobillete10").innerHTML = "";

  document.getElementById("primerP").innerHTML = "";
  document.getElementById("segundoP").innerHTML = "";
  document.getElementById("tercerP").innerHTML = "";
  document.getElementById("balanceCuenta").innerHTML = "";
}

// *********************** Agregar premios por aproximación
// Caso especial si lo números son 0, 1, 39998, o 39999
function aproxPrems(premIndex, bono) {
  // Dos anteriores
  let elGrande = premioGrande[premIndex];
  if (elGrande === 0) {
    listRow = [39999, "39999", bono];
    laLista.push(listRow);
    listRow = [39998, "39998", bono];
    laLista.push(listRow);
  }
  if (elGrande === 1) {
    listRow = [0, "00000", bono];
    laLista.push(listRow);
    listRow = [39999, "39999", bono];
    laLista.push(listRow);
  }
  if (elGrande !== 0 && elGrande !== 1) {
    approxNum = elGrande - 1;
    approxString = stringify5(approxNum.toString());
    listRow = [approxNum, approxString, bono];
    laLista.push(listRow);

    approxNum = elGrande - 2;
    approxString = stringify5(approxNum.toString());
    listRow = [approxNum, approxString, bono];
    laLista.push(listRow);
  }

  // Dos posteriores
  if (elGrande === 39999) {
    listRow = [0, "00000", bono];
    laLista.push(listRow);
    listRow = [1, "00001", bono];
    laLista.push(listRow);
  }
  if (elGrande === 39998) {
    listRow = [39999, "39999", bono];
    laLista.push(listRow);
    listRow = [0, "00000", bono];
    laLista.push(listRow);
  }
  if (elGrande !== 39999 && elGrande !== 39998) {
    approxNum = elGrande + 1;
    approxString = stringify5(approxNum.toString());
    listRow = [approxNum, approxString, bono];
    laLista.push(listRow);

    approxNum = elGrande + 2;
    approxString = stringify5(approxNum.toString());
    listRow = [approxNum, approxString, bono];
    laLista.push(listRow);
  }
}

// Premios por las primeras 4 cifras y las primeras 3 cifras
function bonox4x3(numPremio, bonoX4, bonoX3) {
  // Generar la decena de numPremio
  cut4 = numPremio.substring(0, 4);
  for (i = 0; i < 10; i++) {
    iStr = i.toString();
    decena[i] = cut4 + iStr;
  }
  // Genrar la centena de numPremio
  cut3 = numPremio.substring(0, 3);
  for (i = 0; i < 100; i++) {
    iStr = i.toString();
    while (iStr.length < 2) {
      iStr = "0" + iStr;
    }
    centena[i] = cut3 + iStr;
  }
  // Generar la centena reducida, excluyendo los números presentes en la decena
  // Gracias IA
  let centenaRed = centena.filter((element) => !decena.includes(element));

  // Agregar los premios por las primeras 4 cifras de numPremio
  for (i = 0; i < decena.length; i++) {
    if (decena[i] === numPremio) {
      continue; // Excluir numPremio
    } else {
      listRow = [parseInt(decena[i]), decena[i], bonoX4];
      laLista.push(listRow);
    }
  }

  // Agregar los premios por las primeras 3 cifras de numPremio
  for (i = 0; i < centenaRed.length; i++) {
    if (centenaRed[i] === numPremio) {
      continue; // Excluir numPremio
    } else {
      listRow = [parseInt(centenaRed[i]), centenaRed[i], bonoX3];
      laLista.push(listRow);
    }
  }
}

// Función animate() para rotar la tómbola

let img0 = new Image();
img0.src = "tombola1.jpg";

let img1 = new Image();
img1.src = "tombola2.jpg";

let img2 = new Image();
img2.src = "tombola3.jpg";

let img3 = new Image();
img3.src = "tombola4.jpg";

let nbImg = 4; // change to the number of different images you have
let r = 0;
let s = 0;

function animate() {
  document.images[0].src = eval("img" + r).src;
  r++;
  s++;
  if (r === nbImg) r = 0;
  junk = setTimeout("animate();", 200);

  if (s >= 7) {
    clearTimeout(junk);
    s = 0;
  }
}

// Otorgar los premios por terminaciones de 4, 3, 2, y de 1 cifra
function addTerminaciones(numPremio, bono1, bono2, bono3, bono4) {
  term4 = numPremio.substring(1);
  term3 = numPremio.substring(2);
  term2 = numPremio.substring(3);
  term1 = numPremio.substring(4);

  for (i = 0; i < laLista.length; i++) {
    elNumero = laLista[i][1];
    if (elNumero === numPremio) {
      continue; // excluir el premio principal
    }
    laTerminacion = elNumero.substring(1);
    if (laTerminacion === term4) {
      laLista[i][2] += bono1; // Sumar el bono por terminación de 4 cifras
      continue;
    }
    laTerminacion = elNumero.substring(2);
    if (laTerminacion === term3) {
      laLista[i][2] += bono2; // Sumar el bono por terminación de 3 cifras
      continue;
    }
    laTerminacion = elNumero.substring(3);
    if (laTerminacion === term2) {
      laLista[i][2] += bono3; // Sumar el bono por terminación de 2 cifras
      continue;
    }
    laTerminacion = elNumero.substring(4);
    if (laTerminacion === term1) {
      laLista[i][2] += bono4; // Sumar el premio por terminación de 1 cifra
    }
  }
}

// Revisar mis billetes por terminaciones
function checkTerminaciones(numPremio, bono1, bono2, bono3, bono4) {
  let miTerminacion;

  term4 = numPremio.substring(1);
  term3 = numPremio.substring(2);
  term2 = numPremio.substring(3);
  term1 = numPremio.substring(4);

  for (i in serieBilletes) {
    if (enLista[i] === true) {
      // Si el billete está en lista, ya no se le agrega mas premio
      continue;
    }
    miTerminacion = serieBilletes[i].substring(1); // Chequear por terminación de 4 cifras
    if (miTerminacion === term4) {
      miPremio[i] += bono1;
      continue;
    }
    miTerminacion = serieBilletes[i].substring(2); // chequear por terminación de 3 cifras
    if (miTerminacion === term3) {
      miPremio[i] += bono2;
      continue;
    }
    miTerminacion = serieBilletes[i].substring(3); // chequear por terminación de 2 cifras
    if (miTerminacion === term2) {
      miPremio[i] += bono3;
      continue;
    }
    miTerminacion = serieBilletes[i].substring(4); // chequear por terminación de UNA cifra
    if (miTerminacion === term1) {
      miPremio[i] += bono4;
    }
  }
}

// ************************* Sonidos *********************************

function chicoAudio() {
  var x = document.getElementById("chicoAudio");
  x.volume = 0.5;
  x.play();
}

function medioAudio() {
  var x = document.getElementById("medioAudio");
  x.volume = 0.5;
  x.play();
}

function grandeAudio() {
  var x = document.getElementById("grandeAudio");
  x.play();
}

// Mostrar la lista de premios
function myFunction() {
  if (sorteo == false) {
    //  Si ya corrió el sorteo, favor comprar nuevos billetes
    alert("La nueva lista saldrá después del siguiente sorteo");
    return;
  }

  var myWindow = window.open(
    "",
    "MyWindow",
    "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=300,height=400",
  );
  myWindow.document.writeln("Habiendo consultado la lista:");
  myWindow.document.writeln("<br>");
  myWindow.document.writeln("PC favor cierre esta ventana.");
  myWindow.document.writeln("<br>");
  myWindow.document.writeln("Celular, nomás retroceda página.");
  myWindow.document.writeln("<br>");
  myWindow.document.writeln("<br>");
  myWindow.document.writeln("NUMEROS --- PREMIOS");
  myWindow.document.writeln("<br>");
  for (i = 0; i < laLista.length; i++) {
    myWindow.document.writeln(laLista[i][1] + " ---------- " + laLista[i][2]);
    myWindow.document.writeln("<br>");
  }
}

// Agregar CEROS a la izquierda cuando se requiera
function stringify5(myString) {
  let result = myString;
  while (result.length < 5) {
    result = "0" + result;
  }
  return result;
}

// Generar array de números random, sin repeticiones
// La función requiere el tamaño del array, y los valores mínimo y máximo
// Gracias a la IA
function generateSet(size, min, max) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < size) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  const array = [...uniqueNumbers];

  return array;
}
