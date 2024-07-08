<html>
  <head>
    <meta charset="utf-8" />
    <title>Checkout</title>
    <script crossorigin src="https://pay.conekta.com/v1.0/js/conekta-checkout.min.js"></script>
    <!-- En este archivo esta la config del componente -->
  </head>
  <body>
    <div id="example" style="height: 714px"></div>
    <script type="text/javascript">
      const options = {
        backgroundMode: 'lightMode', //lightMode o darkMode
        colorPrimary: '#081133', //botones y bordes
        colorText: '#585987', // títulos
        colorLabel: '#585987', // input labels
        inputType: 'minimalMode', // minimalMode o flatMode
      };
      const config = {
        locale: 'es',
        publicKey: '{{yourKey}}',
        targetIFrame: '#example',
      };

      const callbacks = {
        // Evento que permitirá saber que el token se creado de forma satisfactoria, es importante que se consuman los datos que de él derivan.
        onCreateTokenSucceeded: function (token) {
          console.log('token', token);
        },
        // Evento que permitirá saber que el token se creado de manera incorrecta, es importante que se consuman los datos que de él derivan y se hagan las correciones pertinentes.
        onCreateTokenError: function (error) {
          console.log(error);
        },
        // Evento que notifica cuando finalizó la carga del component/tokenizer
        onGetInfoSuccess: function (loadingTime) {
          console.log('loading time en milisegundos', loadingTime.initLoadTime);
        }
      };
      window.ConektaCheckoutComponents.Card({
        config,
        callbacks,
        options
      });
    </script>
  </body>
</html>