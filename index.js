//Funciones

//Funcion Crear Arreglos devuelve Array[Array[Int 0]]
function crearArrays() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      let fila = [];
      for (let j = 0; j < 10; j++) {
        fila.push(0);
      }
      array.push(fila);
    }
    return array;
  }
  
  //Funcion para crear los barcos con js
  function crearBarcos() {
    let listaValores = [2, 3, 3, 4];
    for (let i = 0; i < 4; i++) {
      let barquito = document.getElementById("barco" + (i + 1));
      let ship = document.createElement("table");
      ship.setAttribute("class", "ship");
      let row = document.createElement("tr");
      for (let j = 0; j < listaValores[i]; j++) {
        let cell = document.createElement("td");
        row.appendChild(cell);
      }
      ship.appendChild(row);
      barquito.appendChild(ship);
    }
  }
  
  //Funcion Interna para limpiar las selecciones pasadas
  function desEleccion() {
    for (let i = 1; i < 5; i++) {
      document.getElementById("barco" + i).setAttribute("class", "");
    }
  }
  
  //Eleccion de barco para poner en tablero
  function seleccBarco(event) {
    //Accion principal de la funcion
    desEleccion();
    let celdita = event.currentTarget.id;
    let [var1, var2, var3, var4] = arraysVerificacion;
    switch (celdita) {
      case "barco1":
        if (var1) {
          barc = 0;
          break;
        }
  
        barc = 2;
        break;
      case "barco2":
        if (var2) {
          barc = 0;
          break;
        }
  
        barc = 3;
        break;
      case "barco3":
        if (var3) {
          barc = 0;
          break;
        }
  
        barc = 3;
        break;
      case "barco4":
        if (var4) {
          barc = 0;
          break;
        }
  
        barc = 4;
        break;
      default:
        break;
    }
    if (barc != 0) {
      event.currentTarget.setAttribute("class", "elegidoSet");
    }
  }
  
  //Accion para saber cual boton accionar
  function rotar(event) {
    //Funcion Interna para fijar la direccion
    function btnSelec() {
      btn1 = document.getElementById("btn1");
      btn2 = document.getElementById("btn2");
      btn3 = document.getElementById("btn3");
      switch (direc) {
        case 1:
          btn1.setAttribute("class", "opcSel");
          btn2.setAttribute("class", "opc");
          btn3.setAttribute("class", "opc");
          break;
  
        case 2:
          btn1.setAttribute("class", "opc");
          btn2.setAttribute("class", "opcSel");
          btn3.setAttribute("class", "opc");
          break;
  
        case 3:
          btn1.setAttribute("class", "opc");
          btn2.setAttribute("class", "opc");
          btn3.setAttribute("class", "opcSel");
          break;
  
        default:
          break;
      }
    }
  
    //Accion Principal Funcion
    switch (event.currentTarget.id) {
      case "btn1":
        direc = 1;
        btnSelec();
        break;
      case "btn2":
        direc = 2;
        btnSelec();
        break;
      case "btn3":
        direc = 3;
        btnSelec();
        break;
    }
  }
  
  //Funcion Para Establecer quien va a jugar
  function cambiarTituloJugador() {
    let nombreJugador = document.getElementById("nombreJugador");
    if (turno % 2 == 0) {
      nombreJugador.textContent = "Jugador1";
      return [array2, array1];
    } else {
      nombreJugador.textContent = "Jugador2";
      return [array1, array2];
    }
  }
  
  //Despues de terminar el set de ambos jugadores cambiar pantallas
  function cambiarPantallas() {
    let pantalla1 = document.getElementById("logueo");
    let pantalla2 = document.getElementById("juego");
  
    pantalla1.style.display = "none";
    pantalla2.style.display = "block";
  }
  
  function pantallaInter() {
    let pantalla1 = document.getElementById("juego");
    let pantalla2 = document.getElementById("espera");
    pantalla1.style.display = "none";
    pantalla2.style.display = "block";
  }
  
  //Funcion cambiar al otro jugador
  function setotroJugador() {
    let boton = document.getElementById("botonSet");
    boton.textContent = "A Jugar";
    jugadorset = 2;
    barcosaSeteados = 0;
  
    llenarArrayDer(array1);
    arraysVerificacion = [false, false, false, false];
  
    limpiarCeldas();
  }
  
  //Funcion del boton para jugar
  function botonPrimeraPagina() {
    let [var1, var2, var3, var4] = arraysVerificacion;
    if (var1 && var2 && var3 && var4) {
      if (jugadorset == 2) {
        cambiarPantallas();
      } else {
        setotroJugador();
      }
    }
  }
  
  //Funcion del boton para que el otro jugador juegue
  function cambiarJugador() {
    let pantalla1 = document.getElementById("juego");
    let pantalla2 = document.getElementById("espera");
  
    pantalla1.style.display = "block";
    pantalla2.style.display = "none";
    if (!bool) {
      bool = true;
      turno++;
      cambiarTituloJugador();
  
      //otras funciones
      vaciarArrays();
      let [lista1, lista2] = cambiarTituloJugador();
      llenarArrayIzq(lista1);
      llenarArrayDer(lista2);
    }
  }
  
  //Funcion para ver donde ubicar el barco
  function verificarDireccBarco(casilla, propiedad, lista, funcionLocal) {
    let [fil, col] = casilla;
    let newCol, newFila;
    let todoLimpio = true;
    if (direc == 1) {
      if (barc != 0 && col + barc <= 10) {
        for (let i = 0; i < barc; i++) {
          newCol = col + i;
          if (lista[fil][newCol] != 0) {
            todoLimpio = false;
          }
        }
        if (todoLimpio) {
          for (let e = 0; e < barc; e++) {
            newCol = col + e;
            let lado = document.getElementById("" + 2 + fil + newCol);
            lado.setAttribute("class", propiedad);
            funcionLocal(lista, fil, newCol);
          }
        }
      }
    } else {
      if (direc == 2) {
        if (barc != 0 && col + barc <= 10 && fil + barc <= 10) {
          for (let i = 0; i < barc; i++) {
            newCol = col + i;
            newFila = fil + i;
            if (lista[newFila][newCol] != 0) {
              todoLimpio = false;
            }
          }
          if (todoLimpio) {
            for (let e = 0; e < barc; e++) {
              newCol = col + e;
              newFila = fil + e;
              let lado = document.getElementById("" + 2 + newFila + newCol);
              lado.setAttribute("class", propiedad);
              funcionLocal(lista, newFila, newCol);
            }
          }
        }
      } else {
        if (direc == 3) {
          if (barc != 0 && fil + barc <= 10) {
            for (let i = 0; i < barc; i++) {
              newFila = fil + i;
              if (lista[newFila][col] != 0) {
                todoLimpio = false;
              }
            }
            if (todoLimpio) {
              for (let e = 0; e < barc; e++) {
                newFila = fil + e;
                let lado = document.getElementById("" + 2 + newFila + col);
                lado.setAttribute("class", propiedad);
                funcionLocal(lista, newFila, col);
              }
            }
          }
        }
      }
    }
  }
  
  //Funcion Colorear con los Arrays
  function colorearChosen(array) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (array[i][j] == 1) {
          let celda = document.getElementById("" + 2 + i + j);
          celda.setAttribute("class", "chosen");
        }
      }
    }
  }
  
  //Limpiar los arrays para que se cambie de jugador
  function vaciarArrays() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        document.getElementById("" + 1 + i + j).setAttribute("class", "normal");
  
        document.getElementById("" + "" + i + j).setAttribute("class", "normal");
      }
    }
  }
  
  //Llenar el array de los ataques
  function llenarArrayIzq(array) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let casi = document.getElementById("" + i + j);
        if (array[i][j] == 2) {
          casi.setAttribute("class", "yaSelect");
        } else {
          if (array[i][j] == 3) {
            casi.setAttribute("class", "yaMatado");
          }
        }
      }
    }
  }
  
  //Llenar el array de la defensa
  function llenarArrayDer(array) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let casi = document.getElementById("" + 1 + i + j);
        if (array[i][j] == 1) {
          casi.setAttribute("class", "barcoPresente");
        } else {
          if (array[i][j] == 2) {
            casi.setAttribute("class", "barcoNoGolpeado");
          } else {
            if (array[i][j] == 3) {
              casi.setAttribute("class", "barcoGolpeado");
            }
          }
        }
      }
    }
  }
  
  //Funcion para activar cuando se quiera limpiar celdas
  function limpiarCeldas(event) {
    posibleSetBarco = false;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let limpiar = document.getElementById("" + 2 + i + j);
        limpiar.setAttribute("class", "normal");
      }
    }
    if (jugadorset == 1) {
      colorearChosen(array1);
    } else {
      colorearChosen(array2);
    }
  }
  
  //Crear Tablas y Aplicarles los respectivos Listeners
  function crearTablas(tabla, inicial) {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < 10; i++) {
      let fila = document.createElement("tr");
      for (let j = 0; j < 10; j++) {
        let celda = document.createElement("td");
  
        switch (inicial) {
          case "m":
            celda.setAttribute("id", "" + i + j);
  
            //Soldado para saber si hay click en ataque
            celda.addEventListener("click", function (event) {
              if (bool) {
                cell = event.currentTarget;
                casilla = cell.id;
                if (verificarJugada(casilla)) {
                  bool = false;
                  //otras funciones
                  vaciarArrays();
                  let [lista1, lista2] = cambiarTituloJugador();
                  llenarArrayIzq(lista1);
                  llenarArrayDer(lista2);
                }
              }
            });
            break;
  
          case "s":
            celda.setAttribute("id", "" + 2 + i + j);
            celda.setAttribute("class", "normal");
  
            //Soldado para saber si hay click en Set
            celda.addEventListener("click", function (event) {
              let celda = event.currentTarget;
              casilla = celda.id - 200;
              let fila = Math.floor(casilla / 10);
              let columna = casilla % 10;
              if (posibleSetBarco) {
                let parametroArray;
                if (jugadorset == 1) {
                  parametroArray = array1;
                } else {
                  parametroArray = array2;
                }
  
                verificarDireccBarco(
                  [fila, columna],
                  "chosen",
                  parametroArray,
                  function (lista, f, c) {
                    lista[f][c] = 1;
                  }
                );
  
                switch (barc) {
                  case 2:
                    arraysVerificacion[0] = true;
                    barc = 0;
                    break;
  
                  case 3:
                    if (arraysVerificacion[1]) {
                      arraysVerificacion[2] = true;
                    } else {
                      arraysVerificacion[1] = true;
                    }
                    barc = 0;
                    break;
  
                  case 4:
                    arraysVerificacion[3] = true;
                    barc = 0;
                    break;
  
                  default:
                    break;
                }
                desEleccion();
                barcosaSeteados++;
                posibleSetBarco = false;
              }
            });
  
            //Soldado para saber si mouse encima en Set
            celda.addEventListener("mouseover", function (event) {
              let celda = event.currentTarget;
              casilla = celda.id - 200;
              let fila = Math.floor(casilla / 10);
              let columna = casilla % 10;
  
              if (jugadorset == 1) {
                paramArr = array1;
              } else {
                paramArr = array2;
              }
              verificarDireccBarco(
                [fila, columna],
                "posible",
                paramArr,
                function (fila, colu) {
                  posibleSetBarco = true;
                }
              );
            });
  
            //Soldado para saber si el mouse salio del set
            celda.addEventListener("mouseleave", limpiarCeldas);
            break;
  
          case "t":
            celda.setAttribute("id", "" + 1 + i + j);
            break;
  
          default:
            break;
        }
  
        fila.appendChild(celda);
      }
      tbody.appendChild(fila);
    }
    tabla.appendChild(tbody);
  }
  
  //Funcion para verificar
  function verificarJugada(casilla) {
    //funcion interna para obtener un return
    function interna(paramArr) {
      if (paramArr[fila][columna] <= 1) {
        if (paramArr[fila][columna] == 1) {
          paramArr[fila][columna] = 3;
          return true;
        }
        paramArr[fila][columna] = 2;
        return true;
      }
      return false;
    }
  
    //Accion Principal
    let fila = Math.floor(casilla / 10);
    let columna = casilla % 10;
    if (turno % 2 == 0) {
      return interna(array2);
    } else {
      return interna(array1);
    }
  }
  
  //Variables
  let turno = 0;
  let array1 = crearArrays();
  let array2 = crearArrays();
  let bool = true;
  let arraysVerificacion = [false, false, false, false];
  
  let direc = 1;
  let barc = 0;
  let jugadorset = 1;
  let barcosaSeteados = 0;
  let finset1 = false;
  let finSet = false;
  let posibleSetBarco = false;
  
  //Principal
  crearTablas(setBarcos, "s");
  crearBarcos();
  
  crearTablas(mijuego, "m");
  crearTablas(otrojuego, "t");