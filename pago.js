let sesionIniciadaFB = false;
let sesionIniciadaGoogle = false;
let datosSesion = '';
let sesionIniciadaPHP = false;




// ---------------------------------------------------------------------
function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//console.log('Welcome!  Fetching your information.... ');
FB.api('/me', { fields: 'first_name,last_name,email,picture' }, function (response) {
    //console.log(response);
    datosSesion = response;
    // console.log('Successful login for: ' + response.name);
    // document.getElementById('prueba').innerHTML =
    //     'Thanks for logging in, ' + response.name + '!';
});
}

// ---------------------------------------------------------------------


// ---------------------------------------------------------------------
            

    //este handler cambia por una función en el HOST
    window.handleCredentialResponse = (response) => {
        //console.log("Encoded JWT ID token: " + response.credential);
        //console.log("Antes de decodificar");
        const responsePayload = decodeJwtResponse(response.credential);

        console.log(responsePayload);

        if (responsePayload.sub != "" && responsePayload.sub != null) {
            sesionIniciadaGoogle = true;

            //datosSesion = responsePayload;
            //console.log("Antes de datossesion");
            let printedObject = JSON.stringify(datosSesion);
            console.log(printedObject);
            //console.log("Despues de datossesion");
            //datosSesion = printedObject;
            //console.log("Printed Object");
            //console.log(datosSesion);
            crearCliente('', responsePayload);
            //mostrarOpcionesSesion();
            setTimeout(() => {

                iniciarSesionFBGLPHP('', responsePayload.sub);
                cerrarModalSesiones();
                mostrarOpcionesSesion();

            }, 2000);
            // iniciarSesionFBGLPHP( '', responsePayload.sub );
            // console.log("Cerrar modal sesiones google");
            // console.log("ID: " + responsePayload.sub);
            // console.log('Full Name: ' + responsePayload.name);
            // console.log('Given Name: ' + responsePayload.given_name);
            // console.log('Family Name: ' + responsePayload.family_name);
            // console.log("Image URL: " + responsePayload.picture);
            // console.log("Email: " + responsePayload.email);
            // cerrarModalSesiones();
        }
    }
    

    

    // ---------------------------------------------------------------------------
    function mostrarToast(titulo, mensaje) {
        // let liveToast = document.getElementById('liveToast')
        // let myToast = bootstrap.Toast.getInstance(liveToast) // Returns a Bootstrap toast instance
        // myToast.show()
        // console.log("entro a toast");
        $("#toast-titulo").empty();
        $("#toast-titulo").append(titulo);
        $(".toast-body").empty();
        $(".toast-body").append(mensaje);

        $(".toast").toast('show');
    }

    
    function decodeJwtResponse(token) {
        //console.log("Entro a decode");
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } 
    
    let precioSeleccionado = 0,
    clasificacion_id = 0,
    clasificacion = "",
    cantidadBoletos = 0,
    contenido = 1,
    cantidadBoletosMenores = 0,
    boletosDisponibles = 0,
    total = 0,
    precioMenores = 0;
    let nombre = "",
    correo = "",
    numTarjeta = "",
    fechaTarjeta = "",
    cvv_ = "";
  var precioProgA;
  var precioProgM;
  var topeBProg;
  var procesadorPredet = null;
  var requiereFactura = false;

  var horarioElegido = 0;

  var cliente_id = 0;
  var nombre_usuario = "";
  var correo_usuario = "";
  var correo_confirmar = "";
  var telefono_usuario = "";
  var politica_check = "";
  var deviceSessionId = "";

  //Se utilizaba para facturas pero se cambió a CompraRealizada.php (Views)
  var paisSel = 0;
  var estadoSel = 0;
  var ciudadSel = 0;
  var claveFiscal = 0;
  var claveUsoCFDI = 0;
  var datosFModificados = false;

  var pagarPresionado = false;
  var redirecPendiente = false;
  var url3dsec = "";
  var eventoHorarioIdSesion = 0;

  let paisCargado = false;
  let estadoCargado = false;
  let ciudadCargada = false;
  let regimenCargado = false;
  let usoCargado = false;

  let parvaditos = false;
  let precioParvaditos = 0;
  let disponiblesParvaditos = 0;
  let clasificacionParvaditos = 0;
  let cantidadBoletosParvaditos = 0;

  //VARIABLE CONTENIDO SIRVE COMO MULTIPLICADOR EN LOS EVENTOS (INDICA LA CANTIDAD DE BOLETOS POR MESA)

  // VARIABLES PARA PROCESAR PAGO POR CONEKTA
  let itemsOrdenCompra = {};

  // VARIABLES DEL PHP PARA JAVASCRIPT
  console.log(1);
  console.log('uhtv5illvuhlh1spascllhad4ojm2n17');

  let eventoNombre = "",
    eventoFecha = "",
    eventoHora = "";

  let panelDetallesEvento = $("#panelDetallesEvento"),
    panelImagenEvento = $("#panelImagenEvento"),
    container = $("#container");

  $(document).ready(function() {
    // $("#panel2").fadeOut( 1000 );
    $("#panel2").hide();
    $("#panel3").hide();
    $("#panel4").hide();
    $("#seccionBoletosMenores").hide();
    // ------------------------VARIABLES PARA INFORMACIÓN DEL USUARIO-----------
    // nombre_usuario = $("#nombre");
    // correo_usuario = $("#correo");
    // correo_confirmar = $("#correo2");
    // telefono_usuario = $("#numeroTel");
    // politica_check = $("#TYC");

    //------------------------MÉTODOS PARA OPEN PAY----------------------------
    //LINEAS DE PRUEBAS
    OpenPay.setId('mf6pbhlxhkyuhcgih3h4');
    OpenPay.setApiKey('pk_fb808ef65927499a810b3a73ab0bef28');
    OpenPay.setSandboxMode(true);

    //PRODUCCION
    // OpenPay.setId('m730u8lzas5f1xo7kuyw');
    // OpenPay.setApiKey('pk_fa9711857ee843f8b88efae84657ce1f');
    // OpenPay.setSandboxMode(false);

    deviceSessionId = OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
    // ----------------------- INPUT CANTIDAD DE BOLETOS -----------------------
    $("#btnBoletos").attr("disabled", true);

    $("#mes").on('input', function() {
      let valorMes = $("#mes").val();
      if (valorMes.length > 1)
        $("#año").focus();
    });

    $("#año").on('input', function() {
      let valoraño = $("#año").val();
      if (valoraño.length > 1)
        $("#cvv").focus();
    });

    $("#cantidadBoletos").on('input', inputBoletos);
    $("#cantidadBoletosParvaditos").on('input', inputBoletos);
    $("#cantidadParvaditos").hide();
    //$("#paisF").on('change', cargarEstados);

    $('#incluirParvaditos').hide();
    //$('#cantidadBoletosParvaditos').hide();

    //VERIFICAR CARGO PENDIENTE 3D SECURE
    cargosPendientes3dSecure();

  });


  function cargosPendientes3dSecure() {
    let params = new URLSearchParams(location.search);
    var transaccion = params.get('id');
    //console.log("Cargos pendientes Transaction ID "+transaccion);

    if (transaccion != null && transaccion != '') {
      $('#panel1').hide();
      $.ajax({
        url: "http://localhost/PARVADA/public/Eventos/verificarEstatusTransaccion",
        type: "POST",
        data: {
          'transaccion_id': transaccion
        },
        success: function(res) {
          //console.log(JSON.stringify(res));
          //console.log("ESTATUS "+res.STATUS);
          let resStatus = res.STATUS;
          if (res.EXISTE) {
            //YA ESTÁ CREADA LA COMPRA
          } else if (res.STATUS == 'completed') {
            MostrarModal();
            $('#panel1').hide();
            $('#panel2').hide();
            $('#panel3').hide();
            $('#conektaIframeContainer').hide();
            $('#openPayFrameContainer').hide();
            $('#panel4').show();
            // $("#mensajeCompraExitosa").append(`
            // <div class="alert alert-success my-1" style="text-align: center;" role="alert">
            //   <strong>¡La compra fue exitosa! A continuacion, presiona el boton 'Ver Codigo' para guardar tus boletos.</strong>
            // </div>`);

            generarBoletosOpenPay(res.ID);
          } else if (resStatus == "failed") {
            //console.log("Falló la compra");
            MostrarModal()

            $('#panel1').hide();

            panelDetallesEvento.append(` 
            <h2 class=" section-heading">
              No pudimos procesar tu compra
            </h2>
            <h3>
              Lo sentimos, ocurrió un error con tu pago, por favor reinténtalo.
            </h3>`);
            // $('#panel2').hide();
            // $('#panel3').hide();
            // $('#conektaIframeContainer').hide();
            // $('#openPayFrameContainer').hide();
            // $("#panelAlertas").empty();
            // $('#panel4').show();
            // $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
            //                       Ocurrió un error. ${res.MSG}
            //                     </div>`);
            CerrarModal();
            setTimeout(function() {
              window.location = "https://boletos.vinosparvada.com/";
            }, 5000);
          }
        }
      })
    }
  }

  function botonPagar(btnPagar) {
    //console.log("PAGAR PRESIONADO");


    let numTarjeta = $("#cardNumber");
    let cvvTarjeta = $("#cvv");
    let owner = $("#owner");
    var isCardValid = $.payform.validateCardNumber(numTarjeta.val());
    var isCvvValid = $.payform.validateCardCVC(cvvTarjeta.val());

    if (owner.val().length < 5) {
      $("#pay-button").prop("disabled", false);
      document.getElementById('pay-button').textContent = 'Procesar pago';
      pagarPresionado = false;
      alert("Nombre de tarjetahabiente incorrecto.");
    } else if (!isCardValid) {
      $("#pay-button").prop("disabled", false);
      document.getElementById('pay-button').textContent = 'Procesar pago';
      pagarPresionado = false;
      alert("Número de tarjeta no válido.");
    } else if (!isCvvValid) {
      $("#pay-button").prop("disabled", false);
      document.getElementById('pay-button').textContent = 'Procesar pago';
      pagarPresionado = false;
      alert("CVV no válido.");
    } else {
      if (pagarPresionado == false) {
        pagarPresionado = true;
        var tarjetaIngresada = document.getElementById('cardNumber').value;
        tarjetaIngresada = tarjetaIngresada.trim();
        var primerDigito = tarjetaIngresada.charAt(0);
        //console.log("Primer dígito AMEX " + tarjetaIngresada);
        //console.log(primerDigito);
        if (primerDigito == '3') { //Chequeo tarjeta American Express AMEX
          alert("Por el momento no se aceptan pagos con American Express, gracias por tu comprensión.");
          pagarPresionado = false;
        } else {
          OpenPay.token.extractFormAndCreate('payment-form', success_callbak, error_callbak);
        }
      } else if (pagarPresionado == true) {
        alert("Ya hay un pago en proceso, por favor espere respuesta de su banco.");
      }
    }
  }

  var success_callbak = function(response) {
    //console.log("SUCCESS CALLBACK");
    //ActualizarCliente
    if (sesionIniciadaFB || sesionIniciadaGoogle) {
      if (sesionIniciadaFB) //INICIO CON FACEBOOK
      {
        var datosActualizar = {
          CORREO: $("#correo").val(),
          TELEFONO: $("#numeroTel").val(),
          FB_ID: 'TRUE',
          GOOGLE_ID: ''
        }
      } else if (sesionIniciadaGoogle) //INICIO CON GOOGLE
      {
        //console.log("Has own property SUB (google) " + google_id);
        var datosActualizar = {
          CORREO: $("#correo").val(),
          TELEFONO: $("#numeroTel").val(),
          FB_ID: '',
          GOOGLE_ID: 'TRUE'
        }
      }

      $.ajax({
        url: "http://localhost/PARVADA/public/Clientes/ActualizarClienteCompra",
        type: "POST",
        data: datosActualizar,
        // beforeSend: function()
        // {
        //   MostrarModal();
        // },
        success: function(res) {
          let estatus = res.ESTATUS || "ERROR";

          if (estatus == "CORREO") {
            $("#mensajeCorreo").empty();
            $("#mensajeCorreo").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                ${res.MSG}
                              </div>`);
          }

          if (estatus == "ERROR") {
            $("#panelAlertas").empty();
            $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                Ocurrió un error: ${res.MSG}
                              </div>`);
            CerrarModal();
          } else {
            //console.log("Actualizado correctamente");
            $("#panelAlertas").empty();
            $("#panel3").fadeOut(100);
            $("#panel4").delay(100).fadeIn(100);
          }
        },
        error: function(res) {
          console.log(res);
          $("#panelAlertas").empty();
          $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                Ocurrió un error. ${res.MSG}
                              </div>`);
          CerrarModal();
        }
      });

    }

    let descripcionCargo = eventoNombre + ' ' + eventoFecha + ' ' + eventoHora + " Adul-Prem:"+cantidadBoletos+" M:"+cantidadBoletosMenores+" P:"+cantidadBoletosParvaditos;

    let panelAlertas = $("#panelAlertas");
    panelAlertas.empty();
    nombre_usuario.removeClass("error");
    correo_usuario.removeClass("error");
    correo_confirmar.removeClass("error");
    telefono_usuario.removeClass("error");

    let cargoTotal = 0;

    if (totalAdultos > 0 && totalMenores == 0) {
      cargoTotal = (precioSeleccionado * (cantidadBoletos * contenido));
    } else if (totalAdultos > 0 && totalMenores > 0) {
      cargoTotal = (precioSeleccionado * (cantidadBoletos * contenido)) + (precioMenores * cantidadBoletosMenores);
    } else if (totalAdultos > 0 && totalMenores > 0 && totalParvaditos) {
      cargoTotal = (precioSeleccionado * (cantidadBoletos * contenido)) + (precioMenores * cantidadBoletosMenores) + (precioParvaditos * cantidadBoletosParvaditos);
    }

    var token_id = response.data.id;
    $('#token_id').val(token_id);

    let datosCompra = new FormData();
    datosCompra.append("NOMBRE", $('#nombre').val());
    datosCompra.append("TELEFONO", $('#numeroTel').val());
    datosCompra.append("CORREO", $('#correo').val());
    datosCompra.append("MONTO_CARGO", cargoTotal)
    datosCompra.append("PARCIALIDADES", $('#parcialidades').val());
    datosCompra.append("TOKEN", token_id);
    datosCompra.append("DESCRIPCION", descripcionCargo);
    datosCompra.append("DEVICE_SESSION_ID", deviceSessionId);

    let ruta = "http://localhost/PARVADA/public/Eventos/CargoOpenpay";

    $.ajax({
      url: ruta,
      type: "POST",
      data: datosCompra,
      processData: false,
      contentType: false,
      beforeSend: function() {
        MostrarModal();
      },
      success: function(datos) {
        //console.log(datos);
        //console.log(datos.PAYMENT_METHOD);

        if (datos.STATUS == "charge_pending") {
          url3dsec = datos.PAYMENT_METHOD.url;
          //console.log(url3dsec);
          redirectPendiente = true;

          if (redirectPendiente === true) {
            //console.log("Guardar los datos en sesión 3d");
            let urlDatosCompra3d = "http://localhost/PARVADA/public/Eventos/datosCompra3d";
            let datosCompra3d = new FormData();

            datosCompra3d.append("COMPRA_3D_SECURE", "true");
            datosCompra3d.append("CEVENTO_ID", 1);
            datosCompra3d.append("CCANTIDAD_BOLETOS", (cantidadBoletos * contenido));
            datosCompra3d.append("CCANTIDAD_BOLETOS_MENORES", cantidadBoletosMenores);
            datosCompra3d.append("CCANTIDAD_BOLETOS_PARVADITOS", cantidadBoletosParvaditos);
            datosCompra3d.append("CPRECIO_BOLETOS_MENORES", precioMenores);
            datosCompra3d.append("CPRECIO_BOLETOS_PARVADITOS", precioParvaditos);
            datosCompra3d.append("CCLASIFICACION", clasificacion_id);
            datosCompra3d.append("CCLASIFICACION_MENORES", boletosMenores.CID);
            datosCompra3d.append("CCLASIFICACION_PARVADITOS", clasificacionParvaditos);
            datosCompra3d.append("CPRECIO_BOLETOS", precioSeleccionado);
            datosCompra3d.append("CEVENTO_HORARIO_ID", horarioElegido);
            datosCompra3d.append("CCLIENTE_ID", cliente_id);
            if ($("#chkCortesia").length > 0 && $("#chkCortesia").is(":checked")) {
              datosCompra3d.append("CCORTESIA", "S");
            } else {
              datosCompra3d.append("CCORTESIA", "N");
            }
            datosCompra3d.append("CNOMBRE_RECEPTOR", $("#nombre").val());

            if (requiereFactura == true) {
              let cdescripcionRegimen = $('select[id="regimenF"] option:selected').text();

              datosCompra3d.append("CREQUIERE_FACTURA", 'S');
              if (datosFModificados == true) {
                datosCompra3d.append("CDATOS_FACTURA_MODIFICADOS", 'S');
              } else {
                datosCompra3d.append("CDATOS_FACTURA_MODIFICADOS", 'N');
              }
              datosCompra3d.append("CRFC", $("#RFC").val());
              datosCompra3d.append("CNOMBRE_FAC", $("#nombreF").val());
              datosCompra3d.append("CCALLE_FAC", $("#calleF").val());
              datosCompra3d.append("CNUMERO_FAC", $("#numeroF").val());
              datosCompra3d.append("CCP_FAC", $("#cpF").val());
              datosCompra3d.append("CCOLONIA_FAC", $("#coloniaF").val());
              datosCompra3d.append("CPAIS_FAC", $("#paisF").val());
              datosCompra3d.append("CESTADO_FAC", $("#estadoF").val());
              datosCompra3d.append("CCIUDAD_FAC", $("#ciudadF").val());
              datosCompra3d.append("CPERSONA_FAC", $("#personaF").val());
              datosCompra3d.append("CREGIMEN_DES_FAC", cdescripcionRegimen);
              datosCompra3d.append("CREGIMEN_FAC", $("#regimenF").val());
              datosCompra3d.append("CUSO_CFDI", $("#usoCFDI").val());

            } else if (requiereFactura == false) {
              datosCompra3d.append("CREQUIERE_FACTURA", 'N');
              datosCompra3d.append("CDATOS_FACTURA_MODIFICADOS", 'N');
              datosCompra3d.append("CRFC", '');
              datosCompra3d.append("CNOMBRE_FAC", '');
              datosCompra3d.append("CCALLE_FAC", '');
              datosCompra3d.append("CNUMERO_FAC", '');
              datosCompra3d.append("CCP_FAC", '');
              datosCompra3d.append("CCOLONIA_FAC", '');
              datosCompra3d.append("CPAIS_FAC", '');
              datosCompra3d.append("CESTADO_FAC", '');
              datosCompra3d.append("CCIUDAD_FAC", '');
              datosCompra3d.append("CPERSONA_FAC", '');
              datosCompra3d.append("CREGIMEN_DES_FAC", '');
              datosCompra3d.append("CREGIMEN_FAC", '');
              datosCompra3d.append("CUSO_CFDI", '');
            }

            for (const value of datosCompra3d.values()) {
              console.log(value);
            }

            $.ajax({
              url: urlDatosCompra3d,
              type: "POST",
              data: datosCompra3d,
              processData: false,
              contentType: false,
              success: function(resSave) {
                if (resSave.ESTATUS == 'OK') {
                  window.location.href = url3dsec;
                } else if (resSave.ESTATUS == 'ERROR') {

                }
              }
            })
          }
        } else if (datos.ESTATUS == "ERROR") {
          $("#pay-button").text('Procesar pago');
          pagarPresionado = false;
          alert("No se pudo completar la compra con tu tarjeta.");
        } else if (datos.id != '' && datos.AUTHORIZATION) {
          //console.log("Lanzar método para generar los boletos");
          generarBoletosOpenPay(datos.ID);
        }
        CerrarModal();
      },
      error: function(res) {
        console.log(res);
        $("#panelAlertas").empty();
        $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                              Ocurrió un error. ${res.MSG}
                            </div>`);
        CerrarModal();
      }
    });

  };

  var error_callbak = function(response) {
    var desc = response.data.description != undefined ?
      response.data.description : response.message;
    alert("ERROR [" + response.status + "] " + desc);
    $("#pay-button").prop("disabled", false);
    $("#pay-button").text('Procesar pago');
    pagarPresionado = false;
  };

  function generarBoletosOpenPay(folio_autorizacion) {
    let ruta = "http://localhost/PARVADA/public/Eventos/pagoCompra2";
    eventoHorarioIdSesion = 3727;
    let compra3dsecure = '';

    let datosForm = new FormData();

    if (compra3dsecure === true) {
      console.log("Comparacion === true");
    }

    if (compra3dsecure == 'true') {
      //Recuperar variables desde BD
      //console.log("entré en if de boletos 3dsecure");
      datosForm.append("EVENTO_ID", );
      datosForm.append("CLIENTE_ID", );
      datosForm.append("CANTIDAD_BOLETOS", );
      datosForm.append("CANTIDAD_BOLETOS_MENORES", );
      datosForm.append("CANTIDAD_BOLETOS_PARVADITOS", )
      datosForm.append("PRECIO_BOLETOS", );
      datosForm.append("PRECIO_BOLETOS_MENORES", )
      datosForm.append("PRECIO_BOLETOS_PARVADITOS", )
      datosForm.append("CLASIFICACION", );
      datosForm.append("CLASIFICACION_MENORES", );
      datosForm.append("CLASIFICACION_PARVADITOS", );
      datosForm.append("FOLIO_COMPRA", folio_autorizacion);
      datosForm.append("EVENTO_HORARIO_ID", );
      datosForm.append("CORTESIA", "");
      datosForm.append("NOMBRE_RECEPTOR", "");

      if ('' === 'true') {
        datosForm.append("REQUIERE_FACTURA", );
        datosForm.append("RFC", '');
        datosForm.append("NOMBRE_FAC", '');
        datosForm.append("CALLE_FAC", '');
        datosForm.append("NUMERO_FAC", );
        datosForm.append("CP_FAC", );
        datosForm.append("COLONIA_FAC", '');
        datosForm.append("PAIS_FAC", '');
        datosForm.append("ESTADO_FAC", );
        datosForm.append("CIUDAD_FAC", );
        datosForm.append("PERSONA_FAC", );
        datosForm.append("REGIMEN_DES_FAC", '');
        datosForm.append("REGIMEN_FAC", '');
        datosForm.append("USO_CFDI", '');
      }

      for (const value of datosForm.values()) {
        console.log(value);
      }
    } else {
      datosForm.append("EVENTO_ID", 1);
      datosForm.append("CLIENTE_ID", cliente_id);
      //console.log("valor contenido " + contenido + " cantidad boletos " + cantidadBoletos);
      //console.log("EVENTO_ID: %s", 1);
      datosForm.append("CANTIDAD_BOLETOS", (cantidadBoletos * contenido));
      datosForm.append("CANTIDAD_BOLETOS_MENORES", cantidadBoletosMenores);
      datosForm.append("CANTIDAD_BOLETOS_PARVADITOS", cantidadBoletosParvaditos);
      datosForm.append("PRECIO_BOLETOS", precioSeleccionado);
      datosForm.append("PRECIO_BOLETOS_MENORES", precioMenores);
      datosForm.append("PRECIO_BOLETOS_PARVADITOS", precioParvaditos);
      datosForm.append("CLASIFICACION", clasificacion_id);
      datosForm.append("CLASIFICACION_MENORES", boletosMenores.CID);
      datosForm.append("CLASIFICACION_PARVADITOS", clasificacionParvaditos);
      datosForm.append("FOLIO_COMPRA", folio_autorizacion);
      datosForm.append("EVENTO_HORARIO_ID", horarioElegido);
      if ($("#chkCortesia").length > 0 && $("#chkCortesia").is(":checked")) {
        datosForm.append("CORTESIA", "S");
      } else {
        datosForm.append("CORTESIA", "N");
      }
      // datosForm.append( "EVENTO_HORARIO_ID", 1 );
      datosForm.append("NOMBRE_RECEPTOR", $("#nombre").val());

      if (requiereFactura == true) {
        let descripcionRegimen = $('select[id="regimenF"] option:selected').text();

        datosForm.append("REQUIERE_FACTURA", 'S');
        datosForm.append("RFC", $("#RFC").val());
        datosForm.append("NOMBRE_FAC", $("#nombreF").val());
        datosForm.append("CALLE_FAC", $("#calleF").val());
        datosForm.append("NUMERO_FAC", $("#numeroF").val());
        datosForm.append("CP_FAC", $("#cpF").val());
        datosForm.append("COLONIA_FAC", $("#coloniaF").val());
        datosForm.append("PAIS_FAC", $("#paisF").val());
        datosForm.append("ESTADO_FAC", $("#estadoF").val());
        datosForm.append("CIUDAD_FAC", $("#ciudadF").val());
        datosForm.append("PERSONA_FAC", $("#personaF").val());
        datosForm.append("REGIMEN_DES_FAC", descripcionRegimen);
        datosForm.append("REGIMEN_FAC", $("#regimenF").val());
        datosForm.append("USO_CFDI", $("#usoCFDI").val());
        //console.log("Valor del select regimen fiscal "+descripcionRegimen);
      }
    }


    $.ajax({
      url: ruta,
      type: "POST",
      data: datosForm,
      processData: false,
      contentType: false,
      success: function(datos) {
        generarCodigoQR(datos.FOLIO_COMPRA, datos.DETALLE_COMPRA, false);
        $('#panel1').hide();
        $('#panel2').hide();
        $('#panel3').hide();
        $('#conektaIframeContainer').hide();
        $('#openPayFrameContainer').hide();

        $("#mensajeCompraExitosa").append(`
        <div class="alert alert-success my-1" style="text-align: center;" role="alert">
          <strong>¡La compra fue exitosa! A continuación, presiona el boton 'Ver Código' para guardar tus boletos.</strong>
        </div>`);

        $("#panel4Botones").append(`
          <button id="verCodigo" type="button" class="btn btn-success my-2" onclick="continuar(4)">
            Ver Código.
          </button>`);

        setTimeout(() => {
          document.getElementById("verCodigo").click()
        }, 500);

        CerrarModal();
      },
      error: function(res) {
        console.log(res);
        $("#panelAlertas").empty();
        $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                              Ocurrió un error. ${res.MSG}
                            </div>`);
        CerrarModal();
      }
    })
  }

  function mostrarParvaditos() {
    if (document.getElementById('checkParvaditos').checked) {
      
      document.getElementById("cantidadBoletosParvaditos").setAttribute('max', disponiblesParvaditos);

      $('#cantidadParvaditos').show('slow');
    } else {
      $('#cantidadParvaditos').hide('slow');
      cantidadBoletosParvaditos = 0;
    }
  }

  function inputBoletos() {
    cantidadBoletos = parseInt($("#cantidadBoletos").val());
    cantidadBoletosMenores = parseInt($("#cantidadBoletosMenores").val()) || 0;
    cantidadBoletosParvaditos = parseInt($('#cantidadBoletosParvaditos').val()) || 0;
    //console.log("Cant Ad: "+cantidadBoletos + " cant N: "+cantidadBoletosMenores);
    //console.log("suma:",(cantidadBoletos+cantidadBoletosMenores),boletosDisponibles);

    let tipoAcceso = "";

    //console.log("Input boletos tipo usuario " + tipoAcceso);

    if (typeof cantidadBoletosMenores === 'undefined' || isNaN(cantidadBoletosMenores)) {
      //console.log("la cant bol men no esta definida o es NaN");
      cantidadBoletosMenores = 0;
    }
    //Si es administrador se muestran secciones de adulto y menores
    if (tipoAcceso == 'usuario') {
      //console.log("Tipo acceso usuario if");
      $("#mensajeAlerta").hide();
      $("#btnBoletos").attr("disabled", false);
      $("#seccionBoletosMenores").show();

      totalMenores = cantidadBoletosMenores * precioMenores;
      totalAdultos = (cantidadBoletos * contenido) * precioSeleccionado;
      totalParvaditos = cantidadBoletosParvaditos * precioParvaditos;
      total = totalMenores + totalAdultos + totalParvaditos;

      $("#precioTotal").html(" Cant. " + ((cantidadBoletos * contenido) + cantidadBoletosMenores) + " - " + new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MXN"
      }).format(total));
    } else if (isNaN(cantidadBoletos) || cantidadBoletos == 0) {
      $("#btnBoletos").attr("disabled", true);
      $("#precioTotal").html(("$0.00"));
      $("#seccionBoletosMenores").hide();
    }
    //else if((cantidadBoletos + cantidadBoletosMenores) > boletosDisponibles){
    else if ((cantidadBoletos) > boletosDisponibles) {
      $("#btnBoletos").attr("disabled", true);
      $("#precioTotal").html("$0.00");
      $("#mensajeAlerta").show();
      //$("#seccionBoletosMenores").hide(false);
    }else if ((cantidadBoletosParvaditos > disponiblesParvaditos)){
      $("#btnBoletos").attr("disabled", true);
      $("#precioTotal").html("$0.00");
      $("#mensajeAlerta").show();
    } 
    else {
      $("#mensajeAlerta").hide();
      $("#btnBoletos").attr("disabled", false);
      $("#seccionBoletosMenores").show();

      totalMenores = cantidadBoletosMenores * precioMenores;
      totalAdultos = (cantidadBoletos * contenido) * precioSeleccionado;
      totalParvaditos = cantidadBoletosParvaditos * precioParvaditos;
      // console.log("TOTAL MENORES: ",totalMenores, "TOTAL ADULTOS: ",totalAdultos);
      total = totalMenores + totalAdultos + totalParvaditos;

      // console.log(total);
      // $("#precioTotal").html(" Cant. " + ((cantidadBoletos * contenido) + cantidadBoletosMenores) + " - $"+total.toFixed(2) );
      $("#precioTotal").html(" Cant. " + ((cantidadBoletos * contenido) + cantidadBoletosMenores) + " - " + new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MXN"
      }).format(total));
    }
  }
  // ----------------------- FIN INPUT CANTIDAD DE BOLETOS -----------------------

  function retroceder(paso) {
    switch (paso) {
      case 2:
        precioSeleccionado = 0;
        total = 0;

        $("#mensajeAlerta").hide();
        $("#cantidadBoletos").val(0);
        $("#precioTotal").html("$" + 0);
        $("#maximoBoletos").html("");

        $("#panel2").fadeOut(100);
        $("#panel1").delay(110).fadeIn(100);

        $('#seccionBoletosMenores').empty(); //Se vacía el componente para menores cuando se cambia de tipo de recorrido la condición se cumpla correctamente
        $('#seccionBoletosMenores').hide();
        break;

      case 3:
        $("#panel3").fadeOut(100);
        $("#panel2").delay(110).fadeIn(100);
        break;

      case 4:
        $("#mensajeCorreo").empty();
        $("#panel4").fadeOut(100);
        $("#conektaIframeContainer").empty();
        $("#openPayFrameContainer").empty();
        $("#panel3").delay(110).fadeIn(100);
        break;

      default:
        alert("Error al retroceder...")
        break;
    }
  }

  // ---------------------------------------------------------------------
  function continuar(paso) {
    MostrarModal();
    switch (paso) {
      case 2:
        $("#panel2").fadeOut(100);
        panelConfirmar();
        $("#panel3").delay(100).fadeIn(100);
        CerrarModal();
        break;

      case 3:
        let tipo_acceso = "CLIENTE";

        if (tipo_acceso != "" && tipo_acceso == 'USUARIO') {

          if ($("#omitirPago").is(':checked')) {
            // modalConfirmarOmitirCompra
            let modalconfirmar = new bootstrap.Modal(document.getElementById('modalConfirmarOmitirCompra'), {});
            modalconfirmar.show();
          } else {
            if ((requiereFactura == true && camposFactura == true) || requiereFactura == false) {
              procesadorPredet = procesadorPredeterminado();
            }
            crearClienteUsuario()
          }
        } else if (tipo_acceso != "" && tipo_acceso == 'CLIENTE') {
          let camposFactura = false;
          requiereFactura = false;
          if ($("#checkFacturar").is(":checked")) {
            camposFactura = checarCamposFactura();
            requiereFactura = true;
          }

          //SI EL USUARIO HA LLENADO LOS CAMPOS CORRECTAMENTE
          if ((requiereFactura == true && camposFactura == true) || requiereFactura == false) {
            //SI ES UN CLIENTE SE CONSULTA CUÁL TERMINAL SE UTILIZARÁ PARA PROCESAR EL PAGO
            procesadorPredet = procesadorPredeterminado();

            //CONTINUA EL FLUJO DE DATOS
            if (procesadorPredet == "CONEKTA") {
              crearDatosClienteConekta();
            } else if (procesadorPredet == "OPENPAY") {
              crearDatosOpenPay();
            } else if (procesadorPredet == "ERROR") {
              alert("No se pudo cargar el procesador de pago.");
            }
          }


        } else {
          CerrarModal();
        }


        break;

      case 4:
        window.onbeforeunload = null;
        window.location.href = 'http://localhost/PARVADA/public/Eventos/resumenCompra'
        CerrarModal();

        break;

      default:
        alert("Error al continuar...")
        break;
    }
  }

  function checarCamposFactura() {
    let checkCamposFact = true;
    let rfc = $("#RFC");
    let nombre_fac = $("#nombreF");
    let calle_fac = $("#calleF");
    let numero_fac = $("#numeroF");
    let cp_fac = $("#cpF");
    let colonia_fac = $("#coloniaF");
    let pais_fac = $("#paisF");
    let estado_fac = $("#estadoF");
    let ciudad_fac = $("#ciudadF");
    let persona_fac = $("#personaF");
    let regimen_fac = $("#regimenF");

    if (rfc.val() == "") {
      rfc.addClass("error");
      checkCamposFact = false;
    }
    if (nombre_fac.val() == "") {
      nombre_fac.addClass("error");
      checkCamposFact = false;
    }
    if (calle_fac.val() == "") {
      calle_fac.addClass("error");
      checkCamposFact = false;
    }
    if (numero_fac.val() == "") {
      numero_fac.addClass("error");
      checkCamposFact = false;
    }
    if (cp_fac.val() == "") {
      cp_fac.addClass("error");
      checkCamposFact = false;
    }
    if (colonia_fac.val() == "") {
      colonia_fac.addClass("error");
      checkCamposFact = false;
    }
    if (pais_fac.val() == "") {
      pais_fac.addClass("error");
      checkCamposFact = false;
    }
    if (estado_fac.val() == "") {
      estado_fac.addClass("error");
      checkCamposFact = false;
    }
    if (ciudad_fac.val() == "") {
      ciudad_fac.addClass("error");
      checkCamposFact = false;
    }
    if (persona_fac.val() == "D") {
      persona_fac.addClass("error");
      checkCamposFact = false;
    }
    if (regimen_fac.val() == "") {
      regimen_fac.addClass("error");
      checkCamposFact = false;
    }
    if (usosCFDI.val() == "D" || usosCFDI.val() == "") {
      usosCFDI.addClass("error");
      checkCamposFact = false;
    }

    if (checkCamposFact == false) {
      CerrarModal();
      return false;
    } else if (checkCamposFact == true) {
      return true;
    }

  }

  // ---------------------------------------------------------------------
  function getBoletosClasificacion(id_clasificacion, precioClasificacion, clasificacionT, bolDisponibles, cont) {

    if (cont > 1) {
      $("#msgEntrada").text("Selecciona el número de mesas a comprar.");
      $("#cantidadBoletos").attr('placeholder', 'Cantidad de mesas');
    } else {
      $("#msgEntrada").text("Selecciona el número de entradas a comprar.");
      $("#cantidadBoletos").attr('placeholder', 'Cantidad de entradas');
    }

    //Reviso sesión iniciada
    // string
    let acceso = `CLIENTE`;

    if (acceso == `` && (!datosSesion || !datosSesion.hasOwnProperty("id"))) {
      cerrarSesionFB();
      //Se abre modal, al momento de success en inicio se sesión se refresca página
      mostrarModalSesiones();
    } else {
      //YA ESTÁ LOGGEADO EL USUARIO O EL CLIENTE
      MostrarModal(); //MOSTRAR MODAL CARGANDO

      let ruta = "http://localhost/PARVADA/public/Eventos/getBoletosClasificacion";

      precioSeleccionado = precioClasificacion;
      //precioMenores = precioProgM || 0;
      clasificacion = clasificacionT;
      boletosDisponibles = bolDisponibles;
      clasificacion_id = id_clasificacion;
      contenido = cont;

      let datosForm = new FormData();
      datosForm.append("ID_CLASIFICACION", id_clasificacion);
      datosForm.append("EVENTO_ID", 1);


      $.ajax({
        type: 'POST',
        url: ruta,
        data: datosForm,
        processData: false,
        contentType: false,
        success: function(datos) {

          $("#cantidadBoletos").attr({
            // "max" : datos[0].BOLETOS_DISPONIBLES
            "max": (boletosDisponibles / contenido)
          });

          //$("#cantidadBoletos").val(boletosDisponibles);
          //$("#cantidadBoletos").prop('disabled', true);

          $("#clasificacionPrecio").html("Precio unitario: $" + precioClasificacion.toFixed(2));
          $("#clasificacionTexto").html("Clasificación: " + clasificacion);
          $("#maximoBoletos").html("Boletos disponibles: " + boletosDisponibles);

          $("#panel1").fadeOut(100);
          // $("#panel1").hide();
          if ('C' == 'C') {
            // console.log("Tipo acceso cata");
            // console.log("Tipo de acceso ACCESO "+'CLIENTE');
            // console.log("Leyenda clasificacion "+clasificacion);
            //if(('CLIENTE' == 'CLIENTE' && clasificacion != 'PREMIUM') || 'CLIENTE' == 'USUARIO')
            if (clasificacion != 'Premium') {
              $('#cantidadBoletos').val = 0;
              $('#seccionBoletosMenores').empty();
              $('#seccionBoletosMenores').append(
                `<div class="inputField col-sm-12 col-md-8 my-2">
                  <h4 class="fw-light" style="text-align: center;">
                    Entradas menores (12-17 años):
                  </h4>
                  <h5 id="clasificacionPrecio" class="fw-light" style="text-align: center;"> Precio unitario: $ ${precioMenores} </h5>
                  <!-- <div class="inputField col-sm-12 col-md-8 my-2"> -->
                          <input id="cantidadBoletosMenores" class=" fw-light col-sm-12 col-md-8 my-2 form-control boletos"
                          type="number" style="text-align: end!important;" min="0" placeholder="Cantidad de boletos menores" inputmode="numeric"/>
                          <div id="mensajeAlerta" class="alert alert-danger" style="display: none;" role="alert">
                            Selecciona una cantidad que esté dentro del rango de boletos disponibles.
                          </div>
                  <!-- </div> -->

                  </div>
                  `
              );
              $("#cantidadBoletosMenores").on('input', inputBoletos);
            }
          }
          // else
          // {

          // }
          $("#panel2").delay(100).fadeIn(100);
          // $("#panel2").show();

          CerrarModal(); // CERRAR MODAL CARGANDO

        },
        error: function(response) {
          alert("error: " + response.data);
          CerrarModal(); // CERRAR MODAL CARGANDO

        }
      });
    }
  }

  // ---------------------------------------------------------------------
  function panelConfirmar() {
   

    let bodyConfirmar = document.getElementById("bodyConfirmacion");

    while (bodyConfirmar.hasChildNodes()) {
      bodyConfirmar.removeChild(bodyConfirmar.firstChild);
    }

    $("#bodyConfirmacion").append(`
    <fieldset>
      <div class="d-flex">
        <legend class="" style="width:50%;">Datos Personales:</legend>
              </div>

      <div class="row">
        <div class="col-sm-12 col-md-12">
          <label for="nombre">Nombre completo: <span style="color:red;">*</span></label>
          <input data-conekta="card[name]" value="Lydia Ibarra Narvaez" name="name" type="text" id="nombre" class="form-control"/>
        </div>
        <div class="col-sm-12 col-md-12">
          <label for="correo">Número telefónico (10 digitos): <span style="color:red;">*</span></label>
          <input type="text" value="" maxlength="10" id="numeroTel" class="form-control" oninput="this.value = this.value.replace(/[^0-9]/g,'')"/>
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="correo">Correo electrónico: <span style="color:red;">*</span></label>
          <input type="email" value="analy0982@gmail.com" id="correo" class="form-control"/>
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="correo2">Reingresa el correo electrónico: <span style="color:red;">*</span></label>
          <input type="email" value="" id="correo2" class="form-control"/>
        </div>
        
      </div>

        <div class="pt-2" style="margin-bottom: -10px;">
            <span style="color:red;">*</span> - Campos obligatorios
        </div>
        <div id="panelAlertas"></div>

        <div id="datosFiscales" style="display:none;">
          <br>
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <br>
              <label for="modDatosFisc">Modificar datos fiscales:</label>
              <input type="checkbox" class="form-check-input" name="checkModDF" id="checkModDF" onchange="modificarDFCheck()">
            </div>
            <div class="d-flex">
            <legend class="" style="width:50%;">Datos Fiscales:</legend>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="RFC">RFC: <span style="color:red;">*</span></label>
              <input name="RFC" type="text" id="RFC" class="form-control" maxlength="13"/>
            </div>
            <div class="col-sm-12 col-md-12">
              <label for="nombre">Nombre completo: <span style="color:red;">*</span></label>
              <input value="Lydia Ibarra Narvaez" name="name" type="text" id="nombreF" class="form-control"/>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="calle">Calle: <span style="color:red;">*</span></label>
              <input name="calleF" type="text" id="calleF" class="form-control"/>
            </div>
            <div class="col-sm-12 col-md-3">
              <label for="numeroF">Número: <span style="color:red;">*</span></label>
              <input name="numeroF" type="text" id="numeroF" class="form-control"/>
            </div>
            <div class="col-sm-12 col-md-3">
              <label for="cpF">C.P.: <span style="color:red;">*</span></label>
              <input name="cpF" type="text" id="cpF" class="form-control" maxlength="5" oninput="this.value = this.value.replace(/[^0-9]/g,'')"/>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="coloniaF">Colonia: <span style="color:red;">*</span></label>
              <input name="coloniaF" type="text" id="coloniaF" class="form-control"/>
            </div>
            <div class="col-sm-12 col-md-4">
              <label for="paisF">País: <span style="color:red;">*</span></label>
              <select id="paisF" onchange="cargarEstados()" class="form-select">
              <!-- <select id="paisF" class="form-select"> -->
                <option value="D" selected>Selecciona el país</option>
              </select>
            </div>
            <div class="col-sm-12 col-md-4">
              <label for="estadoF">Estado: <span style="color:red;">*</span></label>
              <select id="estadoF" class="form-select" onchange="cargarCiudades()">
              <!-- <select id="estadoF" class="form-select"> -->
              </select>
            </div>
            <div class="col-sm-12 col-md-4">
              <label for="ciudadF">Ciudad: <span style="color:red;">*</span></label>
              <select id="ciudadF" class="form-select">
              </select>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="personaF">Tipo de persona: <span style="color:red;">*</span></label>
              <select id="personaF" onchange="regimenFiscal()" class="form-select">
                <option value="D" selected>Selecciona el tipo de persona</option>
                <option value="F">Física</option>
                <option value="M">Moral</option>
              </select>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="regimenF">Régimen Fiscal: <span style="color:red;">*</span></label>
              <select id="regimenF" class="form-select" onchange="usosCFDI()">
                <option value="D" selected>Selecciona el régimen fiscal</option>
              </select>
            </div>
            <div class="col-sm-12 col-md-6">
              <label for="usosCFDI">Uso CFDI: <span style="color:red;">*</span></label>
              <select id="usosCFDI" class="form-select">
                <option value="D" selected>Selecciona el uso CFDI</option>
              </select>
            </div>
          </div>
          <div id="scriptSelects"></div>
        </div>
    </fieldset>

    <hr>
    <fieldset>
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6 p-2 d-flex">
          <h5>Evento: </h5>
          <span> &nbsp; ${eventoNombre} </span>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-6 p-2 d-flex">
          <h5>Fecha: </h5> 
          <span> &nbsp; ${eventoFecha} ${eventoHora.substr(0,5)} Hrs</span>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-6 p-2 d-flex">
          <h5>Cantidad de boletos a comprar:</h5> 
          <span> &nbsp; ${((cantidadBoletos + cantidadBoletosMenores + cantidadBoletosParvaditos) * contenido)}</span>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-6 p-2 d-flex">
          <h5>Subtotal: </h5>
          <span> &nbsp; $${total.toFixed(2)} MXN</span>
        </div>
      </div>
    </fieldset>

    <hr>

    <div>
      <div class="form-check d-flex justify-content-center" >
        <input type="checkbox" class="form-check-input" name="TYC" id="TYC" value="checkedValue">
        <label for="TYC" class="form-check-label" style="align-self: flex-end;">He leído y acepto la 
          <a href="https://vinosparvada.com/es/cancellations" target="_blank" style="color:#0d6efd!important;">politíca de cancelación.</a>
        </label>
      </div>
    </div>
    `);
  }

  function facturarCheck() {
    if ($("#checkFacturar").is(":checked")) {
      $("#datosFiscales").show('slow');

      getDatosFiscales();
    } else {
      $("#datosFiscales").hide('slow');
      $("#datosFiscales").empty();
    }
  }

  function modificarDFCheck() {
    if ($("#checkModDF").is(":checked")) {
      paisSel = 0;
      estadoSel = 0;
      ciudadSel = 0;
      claveFiscal = 0;
      claveUsoCFDI = 0;
      //console.log("Checado");
      datosFModificados = true;
      $("#RFC").prop('disabled', false);
      $("#nombreF").prop('disabled', false);
      $("#calleF").prop('disabled', false);
      $("#numeroF").prop('disabled', false);
      $("#cpF").prop('disabled', false);
      $("#coloniaF").prop('disabled', false);
      $("#paisF").prop('disabled', false);
      $("#estadoF").prop('disabled', false);
      $("#ciudadF").prop('disabled', false);
      $("#personaF").prop('disabled', false);
      $("#regimenF").prop('disabled', false);
      $("#usosCFDI").prop('disabled', false);
    } else {
      //console.log("No checado");
      $("#RFC").prop('disabled', true);
      $("#nombreF").prop('disabled', true);
      $("#calleF").prop('disabled', true);
      $("#numeroF").prop('disabled', true);
      $("#cpF").prop('disabled', true);
      $("#coloniaF").prop('disabled', true);
      $("#paisF").prop('disabled', true);
      $("#estadoF").prop('disabled', true);
      $("#ciudadF").prop('disabled', true);
      $("#personaF").prop('disabled', true);
      $("#regimenF").prop('disabled', true);
      $("#usosCFDI").prop('disabled', true);
    }
  }

  function getDatosFiscales() {
    let ruta = "http://localhost/PARVADA/public/Usuarios/obtenerDatosFiscales";
    let datos = "";

    $.ajax({
      type: 'GET',
      url: ruta,
      processData: false,
      contentType: false,
      success: function(datos) {

        //if(datos.DATOS_FISCALES_ID != 0)
        if (datos.ESTATUS == 'OK') {
          console.log('NO TIENE DATOS FISCALES');
          cargarPaises();
        } else {
          //console.log(datos);
          //let datos = datosDecoded[0];
          $("#RFC").prop('disabled', true);
          $("#nombreF").prop('disabled', true);
          $("#calleF").prop('disabled', true);
          $("#numeroF").prop('disabled', true);
          $("#cpF").prop('disabled', true);
          $("#coloniaF").prop('disabled', true);
          $("#paisF").prop('disabled', true);
          $("#estadoF").prop('disabled', true);
          $("#ciudadF").prop('disabled', true);
          $("#personaF").prop('disabled', true);
          $("#regimenF").prop('disabled', true);
          $("#usosCFDI").prop('disabled', true);

          $("#RFC").val(datos.RFC);
          $("#nombreF").val(datos.NOMBRE_FISCAL);
          $("#calleF").val(datos.DIRECCION);
          $("#numeroF").val(datos.NUMERO);
          $("#cpF").val(datos.DOMICILIO_FISCAL);
          $("#coloniaF").val(datos.COLONIA);

          paisSel = datos.PAIS_ID;
          cargarPaises();

          estadoSel = datos.ESTADO_ID;
          cargarEstados();

          ciudadSel = datos.CIUDAD_ID;
          cargarCiudades();

          $("#personaF").val(datos.TIPO_PERSONA);

          claveFiscal = datos.CLAVE;
          regimenFiscal();

          claveUsoCFDI = datos.CLAVE_USOCFDI;
          //console.log("CLAVE USO CFDI RECUPERADA " + claveUsoCFDI);
          // $("#usosCFDI").val(datos.CLAVE_USOCFDI);
          setTimeout(function() {
            usosCFDI();
          }, 3000);
          //$("#regimenF").val(datos.CLAVE);
        }
      }
    });

    $("#scriptSelects").append(`<script> async function rellenarDatos(pais, estado, ciudad, paisVar)
    {
      await cargarPaises(pais);
      await cargarEstados();
      setTimeout(function(){
        $("#estadoF").val(estado).change();
      }, 2000);
      
    } `);
  }

  function cargarPaises() {
    let ruta = "http://localhost/PARVADA/public/Clientes/cargarPaises";
    $("#paisF").empty();
    $("#paisF").append(`<option value="D" selected>Selecciona el país</option>`);
    $("#estadoF").empty();
    $("#ciudadF").empty();

    $.ajax({
      url: ruta,
      type: 'GET',
      success: function(paises) {
        for (let pais of paises) {
          if (pais.PAIS_ID == paisSel) {
            $("#paisF").append(`
          <option value="${pais.PAIS_ID}" selected>${pais.NOMBRE}</option>
          `);
          } else {
            $("#paisF").append(`
          <option value="${pais.PAIS_ID}">${pais.NOMBRE}</option>
          `);
          }
        }
      }
    });
  }

  function cargarEstados() {
    let ruta = "http://localhost/PARVADA/public/Clientes/cargarEstados";
    if (estadoSel == 0) {
      paisSel = $("#paisF").val();
    }

    $("#estadoF").empty();
    $("#estadoF").append(`<option value="D" selected>Selecciona el estado</option>`);

    $.ajax({
      url: ruta,
      type: 'POST',
      data: {
        'PAIS_SELECCIONADO': paisSel
      },
      success: function(estados) {
        for (let estado of estados) {
          if (estado.ESTADO_ID == estadoSel) {
            $("#estadoF").append(`
            <option value="${estado.ESTADO_ID}" selected>${estado.NOMBRE}</option>
            `);
          } else {
            $("#estadoF").append(`
            <option value="${estado.ESTADO_ID}">${estado.NOMBRE}</option>
            `);
          }

        }
      }
    });
  }

  function cargarCiudades() {
    let ruta = "http://localhost/PARVADA/public/Clientes/cargarCiudades";
    if (ciudadSel == 0) {
      estadoSel = $("#estadoF").val();
    }

    $("#ciudadF").empty();
    $("#ciudadF").append(`<option value="D" selected>Selecciona la ciudad</option>`);

    $.ajax({
      url: ruta,
      type: 'POST',
      data: {
        'ESTADO_SELECCIONADO': estadoSel
      },
      success: function(ciudades) {
        for (let ciudad of ciudades) {
          if (ciudad.CIUDAD_ID == ciudadSel) {
            $("#ciudadF").append(`
            <option value="${ciudad.CIUDAD_ID}" selected>${ciudad.NOMBRE}</option>
            `);
          } else {
            $("#ciudadF").append(`
            <option value="${ciudad.CIUDAD_ID}">${ciudad.NOMBRE}</option>
            `);
          }
        }
      }
    });
  }

  function regimenFiscal() {
    let ruta = "http://localhost/PARVADA/public/Clientes/RegimenesFiscales";
    let tipoPersona = $("#personaF").val();

    $("#regimenF").empty();
    $("#regimenF").append(`<option value="D" selected>- Selecciona el régimen fiscal -</option>`);

    $.ajax({
      url: ruta,
      type: 'POST',
      data: {
        'TIPO_PERSONA': tipoPersona
      },
      success: function(regimenes) {
        for (let regimen of regimenes) {
          if (regimen.CLAVE == claveFiscal) {
            $("#regimenF").append(`
            <option value="${regimen.CLAVE}" selected>${regimen.NOMBRE}</option>
            `);
          } else {
            $("#regimenF").append(`
            <option value="${regimen.CLAVE}">${regimen.NOMBRE}</option>
            `);
          }
        }
      }
    });
  }

  function usosCFDI() {
    let ruta = "http://localhost/PARVADA/public/Clientes/UsosCFDI";
    let claveFiscal = $('#regimenF').val();
    let tipoPersona = $("#personaF").val();

    $("#usosCFDI").empty();
    $("#usosCFDI").append(`<option value="D" selected>- Selecciona el uso CFDI -</option>`);

    $.ajax({
      url: ruta,
      type: 'POST',
      data: {
        'REGIMEN_FISCAL': claveFiscal,
        'TIPO_PERSONA': tipoPersona
      },

      success: function(usosCFDI) {
        for (let usoCFDI of usosCFDI) {
          if (usoCFDI.CLAVE_CFDI == claveUsoCFDI) {
            $("#usosCFDI").append(`<option value="${usoCFDI.CLAVE_CFDI}" selected>${usoCFDI.DESCRIPCION}</option>`);
          } else {
            $("#usosCFDI").append(`<option value="${usoCFDI.CLAVE_CFDI}">${usoCFDI.DESCRIPCION}</option>`);
          }
        }
      }
    });
  }

  function checkCampos() {
    $("#cerrarModalConfirmar").click();

    nombre_usuario = $("#nombre");
    correo_usuario = $("#correo");
    correo_confirmar = $("#correo2");
    telefono_usuario = $("#numeroTel");
    politica_check = $("#TYC");

    let ejecQuery = true;

    if (nombre_usuario.val() == "") {
      nombre_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
    }
    if (correo_usuario.val() == "") {
      correo_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
    }

    if (telefono_usuario.val() == "" || telefono_usuario.val().length < 10 || telefono_usuario.val().length > 10) {
      telefono_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
    }

    if (correo_usuario.val() != correo_confirmar.val()) {
      correo_confirmar.addClass("error");
      let panelAlertas = $("#panelAlertas");
      panelAlertas.empty();
      panelAlertas.append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                              ¡Los correos no coinciden!
                            </div>`);
      ejecQuery = false;
      CerrarModal();
    }

    if (!politica_check.is(':checked')) {
      politica_check.addClass("error");
      alert("Favor de aceptar la política de cancelación.");
      CerrarModal();
      ejecQuery = false;
    }

    return ejecQuery;
  }

  function crearDatosClienteConekta() {
    let ejecQuery = checkCampos();
    let descripcionCargo = eventoNombre + ' ' + eventoFecha + ' ' + eventoHora;

    if (!ejecQuery) {
      //console.log("No ejecutó función");
      return 0;
    }
    //console.log("Siguió ejecución");
    let panelAlertas = $("#panelAlertas");
    panelAlertas.empty();
    nombre_usuario.removeClass("error");
    correo_usuario.removeClass("error");
    correo_confirmar.removeClass("error");
    telefono_usuario.removeClass("error");

    if (totalAdultos > 0 && totalMenores == 0) {
      itemsOrdenCompra = [{
        'name': descripcionCargo,
        'unit_price': ((precioSeleccionado * 100)),
        'quantity': (cantidadBoletos * contenido)
      }];
    } else if (totalAdultos > 0 && totalMenores > 0) {
      itemsOrdenCompra = [{
          'name': descripcionCargo,
          'unit_price': (precioSeleccionado * 100),
          'quantity': cantidadBoletos
        },
        {
          'name': descripcionCargo,
          'unit_price': (precioMenores * 100),
          'quantity': cantidadBoletosMenores
        }
      ];
    }

    let datosCustomer = new FormData();
    datosCustomer.append("NOMBRE", $("#nombre").val());
    datosCustomer.append("CORREO", $("#correo").val());
    datosCustomer.append("TELEFONO", $("#numeroTel").val());
    datosCustomer.append("FECHA_HORA_BOLETOS", descripcionCargo)
    datosCustomer.append("ITEMS_COMPRA", JSON.stringify(itemsOrdenCompra));
    

    if (sesionIniciadaFB || sesionIniciadaGoogle) {
      if (sesionIniciadaFB) //INICIO CON FACEBOOK
      {
        var datosActualizar = {
          CORREO: $("#correo").val(),
          TELEFONO: $("#numeroTel").val(),
          FB_ID: 'TRUE',
          GOOGLE_ID: ''
        }
      } else if (sesionIniciadaGoogle) //INICIO CON GOOGLE
      {
        //console.log("Has own property SUB (google) " + google_id);
        var datosActualizar = {
          CORREO: $("#correo").val(),
          TELEFONO: $("#numeroTel").val(),
          FB_ID: '',
          GOOGLE_ID: 'TRUE'
        }
      }

      $.ajax({
        url: "http://localhost/PARVADA/public/Clientes/ActualizarClienteCompra",
        type: "POST",
        data: datosActualizar,
        success: function(res) {
          let estatus = res.ESTATUS || "ERROR";

          if (estatus == "CORREO") {
            $("#mensajeCorreo").empty();
            $("#mensajeCorreo").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                ${res.MSG}
                              </div>`);
          }

          if (estatus == "ERROR") {
            $("#panelAlertas").empty();
            $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                Ocurrió un error: ${res.MSG}
                              </div>`);
            CerrarModal();
          } else {
            //console.log("entro a customer if id");

            $("#panelAlertas").empty();
            prepararConekta(datosCustomer);
            $("#panel3").fadeOut(100);
            $("#panel4").delay(100).fadeIn(100);

          }


        },
        error: function(res) {
          console.log(res);
          $("#panelAlertas").empty();
          $("#panelAlertas").append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                                Ocurrió un error. ${res.MSG}
                              </div>`);
          CerrarModal();
        }

      });

    } else {
      //console.log("entro a customer else");
      prepararConekta(datosCustomer);
    }


  }

  // ---------------------------------------------------------------------
  function MostrarModal() {

    $("#staticBackdrop").modal("show");
  }

  function CerrarModal() {

    $("#staticBackdrop").modal("hide");
  }
  // ---------------------------------------------------------------------
  iniciarEvento();
  // ---------------------------------------------------------------------
  let ruta_img_recorrido = "";

  function iniciarEvento() {
    let urlInformacionEvento = "http://localhost/PARVADA/public/Eventos/getInformacionEvento";

    $.ajax({
      type: "POST",
      //data: {"EVENTO_ID": ,
      //        "TIPO_EVENTO":}
      url: urlInformacionEvento,
      success: function(evento) {

        if (evento.length > 0) {
          eventoNombre = evento[0].DESCRIPCION;
          eventoFecha = evento[0].FECHA;
          eventoHora = evento[0].HORA_INICIO;
          horarioElegido = evento[0].EVENTO_HORARIO_ID;
          ruta_img_recorrido = evento[0].IMG_RECORRIDO;

          cliente_id = 9374;

          panelImagenEvento.append(`
          <div class="card deshabilitar shadowImg">
          <img
          class="card-img w-100 d-block cartaImagen shadow-sm rounded"
          src="http://localhost/PARVADA/public${evento[0].IMG_PRESENTACION}"
          />
          
          <div class="card-img-overlay text-center colorContrario">
          <h4 class="text-center tituloEvento">
          ${evento[0].DESCRIPCION}
          </h4>
          <p class="lead descripcionEvento">
          ${evento[0].FECHA}
          </p>
          </div>
          </div>
          `);

          iniciarClasificaciones();
        } else {
          container.append(`<h2 class=" section-heading">
              Ocurrió un problema al mostrar los datos...
            </h2>
            <h3>
              Vuelve en un tiempo para actualizaciones.
            </h3>`);
          CerrarModal();
        }
      },
      error: function() {
        container.append(`
        <h2 class=" section-heading">
          Ocurrió un problema al mostrar los datos...
        </h2>
        <h3>
          Vuelve en un tiempo para actualizaciones.
        </h3>
        `);
        CerrarModal();

      }

    })
  }
  // ---------------------------------------------------------------------
  function crearClienteUsuario() {
    $("#cerrarModalConfirmar").click();
    let nombre_usuario = $("#nombre");
    let correo_usuario = $("#correo");
    let correo_confirmar = $("#correo2");
    let telefono_usuario = $("#numeroTel");
    let politica_check = $("#TYC");
    let ejecQuery = true;

    if (nombre_usuario.val() == "") {
      nombre_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
      return false;
    }
    if (correo_usuario.val() == "") {
      correo_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
      return false;
    }
    if (telefono_usuario.val() == "" || telefono_usuario.val().length < 10 || telefono_usuario.val().length > 10) {
      telefono_usuario.addClass("error");
      CerrarModal();
      ejecQuery = false;
      return false;
    }

    if (correo_usuario.val() != correo_confirmar.val()) {
      correo_confirmar.addClass("error");
      let panelAlertas = $("#panelAlertas");
      panelAlertas.empty();
      panelAlertas.append(`<div class="alert alert-warning my-1" style="text-align: center;" role="alert">
                              ¡Los correos no coinciden!
                            </div>`);
      ejecQuery = false;
      CerrarModal();
      return false;
    }

    if (!politica_check.is(':checked')) {
      politica_check.addClass("error");
      alert("Favor de aceptar la política de cancelación.");
      CerrarModal();
      ejecQuery = false;
    }

    nombre_usuario.removeClass("error");
    correo_usuario.removeClass("error");
    correo_confirmar.removeClass("error");
    telefono_usuario.removeClass("error");

    // let datosForm = new FormData();
    // datosForm.append( "CORREO_USUARIO", correo_usuario.val() );

    if (ejecQuery == true) {
      let ruta = "http://localhost/PARVADA/public/Clientes/CrearClienteUsuario";

      $.ajax({
        url: ruta,
        type: "POST",
        data: {
          NOMBRE_USUARIO: nombre_usuario.val(),
          CORREO_USUARIO: correo_usuario.val(),
          TELEFONO_USUARIO: telefono_usuario.val()
        },
        success: function(res) {
          let estatus = res.ESTATUS || "ERROR";
          //console.log(res);
          if (estatus == "OK") {

            // CHECKBOX OMITIR PAGO
            if ($("#omitirPago").is(':checked')) {
              cliente_id = res.CLIENTE_ID;
              omitirPagoUsuario();
              $("#btnConfirmacion").prop('disabled', true);
            } else {
              
              if (procesadorPredet == 'CONEKTA') {
                console.log("Conekta predeterminado");
                crearDatosClienteConekta();
              } else if (procesadorPredet == 'OPENPAY') {
                console.log("Openpay predeterminado");
                crearDatosOpenPay();
              }
              $("#panel3").fadeOut(100);
              $("#panel4").delay(100).fadeIn(100);
            }


          } else {
            CerrarModal();
            let panelAlertas = $("#panelAlertas");
            panelAlertas.empty();
            panelAlertas.append(`<div class="alert alert-danger my-1" style="text-align: center;" role="alert">
                              Ocurrió un problema al validar los datos, verifica que el correo sea tuyo.
                            </div>`);
          }
        },
        error: function() {
          alert("Ocurrió un problema al conectar con el servidor. Vuelve a intentarlo en un momento.")
          CerrarModal();
        }
      })
    } else {
      return false;
    }

  }
  // ---------------------------------------------------------------------
  var boletosMenores = [];

  function iniciarClasificaciones() {
    let urlInformacionClasificaciones = "http://localhost/PARVADA/public/Eventos/getClasificacionesEvento";

    //console.log('Evento horario  3727');

    $.ajax({
      type: "GET",
      url: urlInformacionClasificaciones,
      success: function(clasificaciones) {
        //console.log(clasificaciones);
        let detallesClasificaciones = ``;

        let vendidosC = clasificaciones[clasificaciones.length - 1];
        //console.log("VENDIDOS DESDE ARREGLO " + vendidosC);

        if (clasificaciones.ESTATUS && clasificaciones.ESTATUS == "ERROR") {
          panelDetallesEvento.append(` 
          <h2 class=" section-heading">
            ${clasificaciones.MSG}
          </h2>
          <h3>
            Vuelve en un tiempo para actualizaciones.
          </h3>`);

          CerrarModal();

          return;
        }
        //for ( let clasificacion of clasificaciones)
        for (let i = 0; i < clasificaciones.length - 1; i++) {
          let clasificacion = clasificaciones[i];
          if ('C' == 'C') {
            precioProgA = 0;
            precioProgM = 0;
            //topeBProg   = 0;
            topeBProg = clasificacion.TOPE_BOLETOS;
            //console.log("TOPE BOLETOS DESDE CLASFICACION "+topeBProg);
            //console.log("TOPE DESDE SESION" + topeBProg);
            if (clasificacion.DESCRIPCION != 'PARVADITOS' && clasificacion.DESCRIPCION != 'MENORES DE 12 AÑOS') {
              topeBProg = topeBProg - vendidosC;
              //console.log("BOLETOS RESTANTES " + topeBProg);
              detallesClasificaciones += `
              <div id="${clasificacion.CID}" class="btn btn-${topeBProg > 0 ? 'light' : 'secondary disabled'}  border border-4 d-block mx-3 py-3" 
                    onclick="getBoletosClasificacion(${clasificacion.CID},${clasificacion.PRECIO},'${clasificacion.DESCRIPCION}',${topeBProg}, 1)">
                  <div class="d-flex justify-content-between">
                    <span class="mx-1" style="align-self: center; text-align:start;">
                      ACCESO ${clasificacion.DESCRIPCION}
                    </span>
                    <div class="row">
                      <span class="mx-1 col-12" style="align-self: center;">
                        MX$${clasificacion.PRECIO}
                      </span>
                      <span class="mx-1 col-12 fw-light" style="align-self: center;">
                        ${
                          topeBProg > 0 
                          ? 'Boletos Disponibles: '+topeBProg
                          : 'No hay boletos Disponibles'
                        }
                      </span>

                        </div>

                      </div>
                    </div>
              `;
            } else if (clasificacion.DESCRIPCION == 'PARVADITOS') {
              parvaditos = true;
              clasificacionParvaditos = clasificacion.CID;
              precioParvaditos = clasificacion.PRECIO;
              let disPar = clasificacion.TOPE_BOLETOS - clasificacion.VENDIDOS;
              disponiblesParvaditos = disPar;
              
              $('#incluirParvaditos').show();
              document.getElementById('clasificacionPrecioParvaditos').innerHTML = "Precio unitario: $"+precioParvaditos;
              
            } else if (clasificacion.DESCRIPCION == 'MENORES DE 12 AÑOS') {
              boletosMenores = clasificacion;
              precioMenores = clasificacion.PRECIO;
            }
          } else {
            detallesClasificaciones += `
              <div id="${clasificacion.CID}" class="btn btn-light  border border-4 d-block mx-3 py-3 ${clasificacion.DISPONIBLES > 0 ? '' : 'disabled'}" 
                    onclick="getBoletosClasificacion(${clasificacion.CID},${clasificacion.PRECIO},'${clasificacion.DESCRIPCION}',${clasificacion.DISPONIBLES}, ${clasificacion.CONTENIDO})">
                      <div class="d-flex justify-content-between">
                        <span class="mx-1" style="align-self: center; text-align:start;">
                          ${clasificacion.DESCRIPCION}
                        </span>
                        <div class="row">
                          <span class="mx-1 col-12" style="align-self: center;">
                            MX$${clasificacion.PRECIO}
                          </span>
                          <span class="mx-1 col-12 fw-light" style="align-self: center; display:none;">
                            Boletos Disponibles: ${clasificacion.DISPONIBLES}
                          </span>

                        </div>

                      </div>
                    </div>
              `;
          }
        }
        panelDetallesEvento.append(`
        <div id="panel1" class="container shadow shadow-1 pb-3" style="background-color: #eee!important;">
          <h3 class="p-2">Clasificaciones</h3>
          ${detallesClasificaciones}
        </div>
        `);

        if ('C' == 'C') {
          if (ruta_img_recorrido != null || ruta_img_recorrido != "") {
            panelDetallesEvento.append(`
            <hr>
            <div class="mt-3" id="panelImgRecorrido">
                <img loading="lazy" id="imagenRecorrido" class="card-img mx-auto shadowImg" 
                    style="display:block; width:95%; padding:5px; border: 1px solid #ddd;border-radius: 4px;" 
                    src="http://localhost/PARVADA/public/${ruta_img_recorrido}" onerror="quitarSeccionImagenRecorrido()" onload="cargarFuncionModal()">
            </div>
          `);
          } else {
            quitarSeccionImagenRecorrido();
          }
        }

        CerrarModal();

      },
      error: function() {
        panelDetallesEvento.append(`
        <h2 class=" section-heading">
          Ocurrió un problema al mostrar los datos...
        </h2>
        <h3>
          Vuelve en un tiempo para actualizaciones.
        </h3>
        `);

        CerrarModal();

      }

    })
  }

  function cargarFuncionModal() {
    var modal = document.getElementById("myModal");
    var img = document.getElementById("imagenRecorrido");
    //console.log(img);
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    img.onclick = function() {
      $("#miModal").modal("show");
      //modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }
    // Get the <span> element that closes the modal
    //var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() { 
    //   modal.style.display = "none";
    // }
  }
  // ---------------------------------------------------------------------
  function omitirPagoUsuario() {
    let ruta = "http://localhost/PARVADA/public/Eventos/pagoCompra2";
    let cortesia = "";

    let datosForm = new FormData();
    datosForm.append("EVENTO_ID", 1);
    datosForm.append("CANTIDAD_BOLETOS", (cantidadBoletos * contenido));
    datosForm.append("CANTIDAD_BOLETOS_MENORES", cantidadBoletosMenores);
    datosForm.append("CANTIDAD_BOLETOS_PARVADITOS", cantidadBoletosParvaditos);
    datosForm.append("CLASIFICACION", clasificacion_id);
    datosForm.append("CLASIFICACION_MENORES", clasificacionMenores);
    datosForm.append("CLASIFICACION_PARVADITOS", clasificacionParvaditos);
    datosForm.append("PRECIO_BOLETOS", precioSeleccionado);
    datosForm.append("PRECIO_BOLETOS_MENORES", precioMenores);
    datosForm.append("PRECIO_BOLETOS_PARVADITOS", precioParvaditos);
    datosForm.append("EVENTO_HORARIO_ID", horarioElegido);
    datosForm.append("CLIENTE_ID", cliente_id);
    if ($("#chkCortesia").length > 0 && $("#chkCortesia").is(":checked")) {
      cortesia = "S";
    } else {
      cortesia = "N";
    }
    datosForm.append("CORTESIA", cortesia);
    datosForm.append("NOMBRE_RECEPTOR", $("#nombre").val());

    $.ajax({
      type: 'POST',
      url: ruta,
      data: datosForm,
      processData: false,
      contentType: false,
      success: function(datos) {
        $("#panel4Botones").empty();
        CerrarModal();
        generarCodigoQR(datos.FOLIO_COMPRA, datos.DETALLE_COMPRA, true);
        //mandarCorreo(true); // true redirecciona a resumen de compra.
      },
      error: function() {
        CerrarModal();
      }

    });
  }
  // ---------------------------------------------------------------------
  // METODOS PARA GENERAR EL QR
  function generarCodigoQR(folio_compra, detalle_compra, redireccionar) {
    let datosCodigoQR = detalle_compra;

    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
      // type: "svg",
      type: "canvas",
      // data: "https://www.facebook.com/",
      data: datosCodigoQR,
      // image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      // image: "descargar.png",
      image: "http://localhost/PARVADA/public/assets/img/imagenQR.png",
      dotsOptions: {
        color: "#000000",
        type: "square"
      },
      backgroundOptions: {
        "color": "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
      }
    });

    qrCode.append(document.getElementById("canvas"));
    // qrCode.download({ name: "qr", extension: "svg" });
    //console.log("terminó");
    setTimeout(() => {

      guardarCodigoQR(folio_compra, redireccionar);

    }, 1000);

  }

  function guardarCodigoQR(folio_c, redireccionar) {
    let url = 'http://localhost/PARVADA/public/Eventos/guardarQRCompra';
    let canvas = document.getElementsByTagName("canvas");
    let urlIMG = canvas[0].toDataURL();
    let img = document.createElement("img");
    img.src = urlIMG;

    //let datosForm = new FormData();
    // datosForm.append("CODIGO_QR", urlIMG);
    // datosForm.append("FOLIO_COMPRA", "");

    $.ajax({
      type: "POST",
      url: url,
      data: {
        CODIGO_QR: img.src,
        FOLIO_COMPRA: folio_c
      },
      success: function(mensaje) {
        //console.log("creo el codigo: ",mensaje);
        //mandarCorreo(redireccionar);
        // mandarCorreo();
        // mandarMensaje();
      },
      error: function(mensaje) {
        console.log(mensaje);
      },
    });
  }

  function procesadorPredeterminado() {
    let url = 'http://localhost/PARVADA/public/Eventos/procesadorPredeterminado';
    let predet = "";

    $.ajax({
      url: url,
      processData: false,
      contentType: false,
      type: "GET",
      async: false,
      success: function(respuesta) {
        predet = respuesta;
      },
      error: function() {
        predet = "ERROR";
      }
    });

    return predet;
  }

  function prepararConekta(datosCust) {
    if (horarioElegido != 0 && horarioElegido > 0) {
      // setTimeout(function() {
      //   window.location = "https://boletos.vinosparvada.com/";
      // }, 300000);
      // alert('Cuentas con 5 minutos para terminar la compra.');
    } else {
      //alert("Por favor vuelve a seleccionar la fecha de tu reserva.");
      window.location = "https://boletos.vinosparvada.com/";
    }

    $.ajax({
      url: "http://localhost/PARVADA/public/Eventos/test",
      type: "POST",
      data: datosCust,
      processData: false,
      contentType: false,

      success: function(id_checkout) {
        //console.log("id orden compra desde back", id_checkout);
        //$("#openPayFrameContainer").hide();
        $("#openPayFrameContainer").css({
          "height": "0"
        });
        window.ConektaCheckoutComponents.Integration({
          targetIFrame: "#conektaIframeContainer",
          checkoutRequestId: id_checkout, // checkout request id
          publicKey: "key_MPaVWoKqy4QuSyTS54nyCwg", // SOTI PRUEBAS
          //publicKey: "key_UFv7qB9b71bkHQTbTeBh3cA", // PARVADA REAL
          options: {
            theme: 'green',
          },
          styles: {
            logo: {
              size: 'large', // small | medium | large
              typeImage: 'url', // url | base64
              source: 'https://parvadacv.mx/wp-content/uploads/2019/07/icono.png'
            },
            buttonType: 'rounded',
            inputType: 'line' // 'basic' | 'rounded' | 'line'
          },
          onFinalizePayment: function(event) {
            console.log(event);

            $("#panel4Botones").empty();
            window.onbeforeunload = function() {
              alert("¡Aún no has presionado el boton! ");
              return "¿Estás seguro que quieres salir?";
            }

            let ruta = "http://localhost/PARVADA/public/Eventos/pagoCompra2";

            let datosForm = new FormData();
            // datosForm.append( "CLIENTE_ID",  );
            datosForm.append("EVENTO_ID", 1);
            //console.log("valor contenido " + contenido + " cantidad boletos " + cantidadBoletos);
            //console.log("EVENTO_ID: %s", 1);
            datosForm.append("CANTIDAD_BOLETOS", (cantidadBoletos * contenido));
            datosForm.append("CLASIFICACION", clasificacion_id);
            datosForm.append("PRECIO_BOLETOS", precioSeleccionado);
            datosForm.append("CANTIDAD_BOLETOS_MENORES", cantidadBoletosMenores);
            datosForm.append("PRECIO_BOLETOS_MENORES", precioMenores);
            datosForm.append("FOLIO_COMPRA", event.id);
            console.log("Horario elegido " + horarioElegido);
            datosForm.append("EVENTO_HORARIO_ID", horarioElegido);
            datosForm.append("CLIENTE_ID", cliente_id);
            if ($("#chkCortesia").length > 0 && $("#chkCortesia").is(":checked")) {
              datosForm.append("CORTESIA", "S");
            } else {
              datosForm.append("CORTESIA", "N");
            }
            // datosForm.append( "EVENTO_HORARIO_ID", 1 );
            datosForm.append("NOMBRE_RECEPTOR", $("#nombre").val());

            if (requiereFactura == true) {
              let descripcionRegimen = $('select[id="regimenF"] option:selected').text();

              datosForm.append("REQUIERE_FACTURA", 'S');
              if (datosFModificados == true) {
                datosForm.append("DATOS_FACTURA_MODIFICADOS", 'S');
              } else {
                datosForm.append("DATOS_FACTURA_MODIFICADOS", 'N');
              }
              datosForm.append("RFC", $("#RFC").val());
              datosForm.append("NOMBRE_FAC", $("#nombreF").val());
              datosForm.append("CALLE_FAC", $("#calleF").val());
              datosForm.append("NUMERO_FAC", $("#numeroF").val());
              datosForm.append("CP_FAC", $("#cpF").val());
              datosForm.append("COLONIA_FAC", $("#coloniaF").val());
              datosForm.append("PAIS_FAC", $("#paisF").val());
              datosForm.append("ESTADO_FAC", $("#estadoF").val());
              datosForm.append("CIUDAD_FAC", $("#ciudadF").val());
              datosForm.append("PERSONA_FAC", $("#personaF").val());
              datosForm.append("REGIMEN_DES_FAC", descripcionRegimen);
              datosForm.append("REGIMEN_FAC", $("#regimenF").val());
            }

            console.log("Arreglo de datos");
            console.log(datosForm);

            $.ajax({
              type: 'POST',
              url: ruta,
              data: datosForm,
              processData: false,
              contentType: false,
              success: function(datos) {
                generarCodigoQR(datos.FOLIO_COMPRA, datos.DETALLE_COMPRA, false);

                $("#mensajeCompraExitosa").append(`
                      <div class="alert alert-success my-1" style="text-align: center;" role="alert">
                        <strong>¡La compra fue exitosa! A continuacion, presiona el boton 'Ver Codigo' para guardar tus boletos.</strong>
                      </div>`);

                // $("#panel4Botones").empty();
                $("#panel4Botones").append(`
                      <button type="button" class="btn btn-success my-2" onclick="continuar(4)">
                        Ver Codigo.
                      </button>`);
                //mandarMensaje();
                // alert("termino el pago");
                CerrarModal();

                // window.location.href = 'http://localhost/PARVADA/public/Eventos/resumenCompra'
              },
              error: function() {
                CerrarModal();

              }

            });
          }
        });
        // crearOrdenClienteConekta( customer.id );
        CerrarModal();

      },
      error: function() {
        CerrarModal();

      }
    });
  }

  function mandarCorreo(redireccionar) {
    //$("#btnCorreo").addClass("btn-cargando");
    if ($("#omitirEnvio").is(":checked") && redireccionar) {

      window.location.href = 'http://localhost/PARVADA/public/Eventos/resumenCompra';
      return;

    } else if ($("#omitirEnvio").is(":checked")) {

      return;
    }

    let url = 'http://localhost/PARVADA/public/Eventos/mandarCorreo';

    let canvas = document.getElementsByTagName("canvas");
    let urlIMG = canvas[0].toDataURL();

    let img = document.createElement("img");
    img.src = urlIMG;

    // document.body.appendChild(img);
    // document.body.appendChild(img)
    // console.log(img);

    let datosForm = new FormData();
    // datosForm.append( "QR", $("#canvas").html() );
    datosForm.append("QR", img.outerHTML);

    $.ajax({
      url: url,
      data: datosForm,
      processData: false,
      contentType: false,
      type: "POST",
      success: function(respuesta) {
        //console.log(respuesta);
        let estatus = respuesta.ESTATUS || "ERROR";
        if (estatus == "OK") {
          let tituloToast = "CORREO";
          let mensajeToast = "El correo se ha enviado. Verifica la bandeja."
          mostrarToast(tituloToast, mensajeToast);
          //mandarMensaje( redireccionar );
        } else {
          let tituloToast = "CORREO";
          let mensajeToast = "Ocurrió un error al enviar el correo, inténtalo de nuevo."
          mostrarToast(tituloToast, mensajeToast);
        }
        //$("#btnCorreo").removeClass("btn-cargando");
      },
      error: function() {
        //$("#btnCorreo").removeClass("btn-cargando");
      }
    })

  }

  function mandarMensaje(redireccionar) {
    // if ( !$("#omitirEnvio").is(":checked") ) return;

    let url = 'http://localhost/PARVADA/public/Eventos/mandarMensaje';

    // let datosForm = new FormData();
    // datosForm.append( "QR", $("#canvas").html() );
    // datosForm.append( "QR", img.outerHTML );

    $.ajax({
      url: url,
      type: "GET",
      success: function(response) {
        console.log(response);

        let estatus = response.ESTATUS || "ERROR";
        if (estatus == "OK") {
          let tituloToast = "MENSAJE";
          let mensajeToast = "El código se ha enviado a tu WhatsApp.";
          mostrarToast(tituloToast, mensajeToast);
        } else {
          let tituloToast = "MENSAJE";
          let mensajeToast = "Ocurrió un problema al enviar el mensaje, inténtalo de nuevo.";
          mostrarToast(tituloToast, mensajeToast);
        }

        if (redireccionar) {
          window.location.href = 'http://localhost/PARVADA/public/Eventos/resumenCompra';
        }

      },
      error: function(error) {
        console.log(error);
        let tituloToast = "MENSAJE";
        let mensajeToast = "Ocurrió un problema al enviar el mensaje, inténtalo de nuevo.";
        mostrarToast(tituloToast, mensajeToast);
      }
    })

  }

  function quitarSeccionImagenRecorrido() {
    $("#panelImgRecorrido").empty();
  }

  //METODOS QUE NO SE USAN
  function procesarDatosPago() {
    let validarCorreo = /^\S+@\S+\.\S+$/;
    let bandera = true;

    nombre = $("#nombre").val();
    correo = $("#correo").val();
    numTarjeta = $("#numero").val();
    fechaTarjeta = $("#fecha").val();
    cvv = $("#cvv").val();

    if (nombre.length <= 0 || nombre.length >= 150) {
      $("#nombre").addClass("error")
      bandera = false;
    } else {
      $("#nombre").removeClass("error")
    }

    if (!validarCorreo.test(correo)) {
      $("#correo").addClass("error")
      bandera = false;
    } else {
      $("#correo").removeClass("error")
    }

    if (!numTarjeta) {
      $("#numero").addClass("error")
      bandera = false;
    } else {
      $("#numero").removeClass("error")
    }

    // if ( !fechaTarjeta ) {
    //   $("#fecha").addClass("error")
    //   bandera = false;
    // }else{ $("#fecha").removeClass("error") }

    if (!cvv) {
      $("#cvv").addClass("error")
      bandera = false;
    } else {
      $("#cvv").removeClass("error")
    }


    //console.log(nombre,correo,numTarjeta,fechaTarjeta,cvv);
    return bandera;

  }

  function crearDatosOpenPay() {
    let ejecQuery = checkCampos();

    if (ejecQuery) {
      $("#conektaIframeContainer").css({
        "height": "0"
      });
      $("#panel3").fadeOut(100);
      $("#panel4").delay(100).fadeIn(100);

      CerrarModal();

      let panelAlertas = $("#panelAlertas");
      panelAlertas.empty();
      nombre_usuario.removeClass("error");
      correo_usuario.removeClass("error");
      correo_confirmar.removeClass("error");
      telefono_usuario.removeClass("error");

      $("#openPayFrameContainer").append(`
      <div class="creditCardForm container" style="padding: 5px;" id="ccForm">
          <div class="heading">
              <h1>Confirmar compra</h1>
              <div class="alert alert-info" role="alert">
                De momento sólo aceptamos tarjetas Visa/Mastercard.
              </div>        
          </div>
          <div class="payment">
              <form id="payment-form">
                  <input type="hidden" name="token_id" id="token_id">
                  <input type="hidden" name="deviceIdHiddenFieldName" id="deviceIdHiddenFieldName">
                  <div class="form-group" style="text-align: center; ">
                  <!-- <div style="text-align: center;"> -->
                    <img src="https://public.openpay.mx/images/logos/openpay/logo_login.png">
                  <!-- </div> -->
                  </div>
                  <div class="form-group owner">
                      <label for="owner">Nombre del titular</label>
                      <input type="text" class="form-control" id="owner" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name">
                  </div>                
                  <div class="form-group" id="card-number-field">
                      <label for="cardNumber">Número de tarjeta</label>
                      <input type="text" class="form-control" id="cardNumber" maxlength="16" autocomplete="off" data-openpay-card="card_number">
                  </div>
                  <div class="form-group" id="expiration-date">
                      <label>Fecha de expiración</label>
                      <select data-openpay-card="expiration_month">
                          <option value="01">Enero</option>
                          <option value="02">Febrero </option>
                          <option value="03">Marzo</option>
                          <option value="04">Abril</option>
                          <option value="05">Mayo</option>
                          <option value="06">Junio</option>
                          <option value="07">Julio</option>
                          <option value="08">Agosto</option>
                          <option value="09">Septiembre</option>
                          <option value="10">Octubre</option>
                          <option value="11">Noviembre</option>
                          <option value="12">Diciembre</option>
                      </select>
                      <select data-openpay-card="expiration_year">                          
                          <option value="24">2024</option>
                          <option value="25">2025</option>
                          <option value="26">2026</option>
                          <option value="27">2027</option>
                          <option value="28">2028</option>
                          <option value="29">2029</option>
                          <option value="30">2030</option>
                          <option value="31">2031</option>
                          <option value="32">2032</option>
                          <option value="33">2033</option>
                          <option value="34">2034</option>
                      </select>                    
                  </div>
                  <div class="form-group cvv">
                      <label for="cvv">CVV</label>
                      <input type="text" class="form-control" id="cvv" autocomplete="off" data-openpay-card="cvv2">
                  </div>
                  <div hidden class="form-group parcializacion">
                      <label for="Parcialidades">Parcialidades</label>
                      <select id="parcialidades">
                        <option value="1">Un sólo pago</option>
                        <!-- <option value="3">3 meses sin intereses</option> -->
                        <!-- <option value="6">6 meses sin intereses</option> -->
                        <!-- <option value="9">9 meses sin intereses</option> -->
                        <!-- <option value="12">12 meses sin intereses</option> -->
                        <!-- <option value="18">18 meses sin intereses</option> -->
                      </select>
                  </div>
                  <div class="form-group" id="credit_cards">
                      <!-- <img src="https://public.openpay.mx/images/logos/openpay/logo_login.png"> -->
                      <img src="http://localhost/PARVADA/public/assets/img/visa.jpg" id="visa">
                      <img src="http://localhost/PARVADA/public/assets/img/mastercard.jpeg" id="mastercard">                      
                      <!-- <img src="http://localhost/PARVADA/public/assets/img/amex.jpg" id="amex"> -->
                  </div>                  
                  <div class="form-group" id="debit_cards">
                      <img src="http://localhost/PARVADA/public/assets/img/afirme.png" width = "10%" height = "10%" id="afirme">
                      <img src="http://localhost/PARVADA/public/assets/img/bancoAzteca.png" width = "10%" height = "10%" id="bancoAzteca">
                      <img src="http://localhost/PARVADA/public/assets/img/banorte.png" width = "10%" height = "10%" id="banorte">
                      <img src="http://localhost/PARVADA/public/assets/img/banregio.png" width = "10%" height = "10%" id="banregio">
                      <img src="http://localhost/PARVADA/public/assets/img/BBVA.png" width = "10%" height = "10%" id="BBVA">
                      <img src="http://localhost/PARVADA/public/assets/img/citibanamex.png" width = "10%" height = "10%" id="citibanamex">
                      <img src="http://localhost/PARVADA/public/assets/img/hsbc.png" width = "10%" height = "10%" id="hsbc">
                      <img src="http://localhost/PARVADA/public/assets/img/inbursa.png" width = "10%" height = "10%" id="inbursa">
                      <img src="http://localhost/PARVADA/public/assets/img/invex.png" width = "10%" height = "10%" id="invex">
                      <img src="http://localhost/PARVADA/public/assets/img/ixe.png" width = "10%" height = "10%" id="ixe">
                      <img src="http://localhost/PARVADA/public/assets/img/santander.png" width = "10%" height = "10%" id="santander">
                      <img src="http://localhost/PARVADA/public/assets/img/scotiabank.png" width = "10%" height = "10%" id="scotiabank">                      
                  </div>
                  <div class="form-group" id="pay-now">
                      <btn class="btn btn-default" id="pay-button" onclick="botonPagar(this)">Procesar pago</btn>
                  </div>
              </form>
          </div>
      </div>`);
    }
    $.getScript("../assets/js/jquery.payform.min.js");
    $.getScript("../assets/js/script.js");

    const btnPagar = document.getElementById('pay-button');

    btnPagar.addEventListener('click', function() {
      // btnPagar.disabled = true;
      // btnPagar.textContent = 'Procesando pago...';
      if (pagarPresionado == true) {
        //console.log("MENSAJE AMERICAN EXPRESS");
        btnPagar.disabled = true;
        btnPagar.textContent = 'Procesando pago...';
      }
      if (pagarPresionado == false) {
        btnPagar.textContent = 'Procesar pago';
      }
    });
  }


  // ---------------------------------------------------------------------
  // METODOS PARA GENERAR EL QR
  function generarCodigoQR(folio_compra, detalle_compra) {


    let datosCodigoQR = detalle_compra;
    // console.log("datosqr",datosCodigoQR);

    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
      // type: "svg",
      type: "canvas",
      // data: "https://www.facebook.com/",
      data: datosCodigoQR,
      // image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      // image: "descargar.png",
      image: "http://localhost/PARVADA/public/assets/img/imagenQR.png",
      dotsOptions: {
        color: "#000000",
        type: "square"
      },
      backgroundOptions: {
        "color": "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
      }
    });

    qrCode.append(document.getElementById("canvas"));
    // qrCode.download({ name: "qr", extension: "svg" });
    console.log("terminó");
    setTimeout(() => {

      guardarCodigoQR(folio_compra);
    }, 1000);

  }

  function guardarCodigoQR(folio_c) {
    // console.log("entro");
    let url = 'http://localhost/PARVADA/public/Eventos/guardarQRCompra';
    let canvas = document.getElementsByTagName("canvas");
    let urlIMG = canvas[0].toDataURL();


    let img = document.createElement("img");
    img.src = urlIMG;

    // document.body.appendChild(img);

    // document.body.appendChild(img);

    let datosForm = new FormData();
    // datosForm.append("CODIGO_QR", urlIMG);
    // datosForm.append("FOLIO_COMPRA", "");

    // console.log(img.src);


    // console.log(urlIMG);

    $.ajax({
      type: "POST",
      url: url,
      data: {
        CODIGO_QR: img.src,
        FOLIO_COMPRA: folio_c
      },
      success: function(mensaje) {
        console.log("creo el codigo: ", mensaje);
        // mandarCorreo();
        // mandarMensaje();
      },
      error: function(mensaje) {
        console.log(mensaje);
      },
    });
  }

  function prepararConekta(datosCust) {
    $.ajax({
      url: "http://localhost/PARVADA/public/Eventos/test",
      type: "POST",
      data: datosCust,
      processData: false,
      contentType: false,

      success: function(id_checkout) {
        console.log("id orden compra desde back", id_checkout);

        window.ConektaCheckoutComponents.Integration({
          targetIFrame: "#conektaIframeContainer",
          checkoutRequestId: id_checkout, // checkout request id
          publicKey: "key_MPaVWoKqy4QuSyTS54nyCwg",
          options: {
            theme: 'green',
          },
          styles: {
            logo: {
              size: 'large', // small | medium | large
              typeImage: 'url', // url | base64
              source: 'https://parvadacv.mx/wp-content/uploads/2019/07/icono.png'
            },
            buttonType: 'rounded',
            inputType: 'line' // 'basic' | 'rounded' | 'line'
          },
          onFinalizePayment: function(event) {
            // console.log(event);

            $("#panel4Botones").empty();
            window.onbeforeunload = function() {
              alert("¡Aún no has presionado el boton! ");
              return "¿Estás seguro que quieres salir?";
            }

            let ruta = "http://localhost/PARVADA/public/Eventos/pagoCompra2";

            let datosForm = new FormData();
            // datosForm.append( "CLIENTE_ID",  );
            datosForm.append("EVENTO_ID", 1);
            console.log("valor contenido " + contenido + " cantidad boletos " + cantidadBoletos);
            console.log("EVENTO_ID: %s", 1);
            datosForm.append("CANTIDAD_BOLETOS", (cantidadBoletos * contenido));
            datosForm.append("CLASIFICACION", clasificacion_id);
            datosForm.append("PRECIO_BOLETOS", precioSeleccionado);
            datosForm.append("FOLIO_COMPRA", event.id);
            // datosForm.append( "EVENTO_HORARIO_ID", 1 );

            $.ajax({
              type: 'POST',
              url: ruta,
              data: datosForm,
              processData: false,
              contentType: false,
              success: function(datos) {

                generarCodigoQR(datos.FOLIO_COMPRA, datos.DETALLE_COMPRA);

                $("#mensajeCompraExitosa").append(`
                            <div class="alert alert-success my-1" style="text-align: center;" role="alert">
                              <strong>¡La compra fue exitosa! A continuacion, presiona el boton 'Ver Codigo' para guardar tus boletos.</strong>
                            </div>`);

                // $("#panel4Botones").empty();
                $("#panel4Botones").append(`
                            <button type="button" class="btn btn-success my-2" onclick="continuar(4)">
                              Ver Codigo.
                            </button>`);

                // alert("termino el pago");
                CerrarModal();

                // window.location.href = 'http://localhost/PARVADA/public/Eventos/resumenCompra'
              },
              error: function() {
                CerrarModal();

              }

            });
          }
        });
        // crearOrdenClienteConekta( customer.id );
        CerrarModal();

      },
      error: function() {
        CerrarModal();

      }

    });
  }