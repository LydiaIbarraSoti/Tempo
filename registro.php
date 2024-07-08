<?php
// Incluir el archivo de conexión
include("conexion.php");
conexion_cliente();

?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
               
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
       
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
        <!-- Vendor CSS Files -->
        <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
        <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
        <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
        <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
        <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
        <!-- Template Main CSS File -->
        <link href="assets/css/style.css" rel="stylesheet">
        <link href="assets/css/cargando.css" rel="stylesheet">    
        <script src="registro/registro.js"></script> 
        <!-- <link href="assets/css/style.css" rel="stylesheet"> -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> -->
        
        <script crossorigin src="https://pay.conekta.com/v1.0/js/conekta-checkout.min.js"></script>


       
        
        
    </head>
        <body>
            <!-- ======= Header ======= -->
            <header id="header" class="fixed-top ">
                <div class="container d-flex align-items-center justify-content-between" style="padding: 10px 30px 10;">                
                  <a class="logo" ><img src="assets/img/WEB_APP/Logo/vido.png" alt="" class="img-fluid"></a>
                    <nav id="navbar" class="navbar">
                        <ul>
                        <li><a class="nav-link scrollto active" href="index.php">Inicio</a></li>                    
                        <li><a class="nav-link scrollto" href="registro.php">Registro</a></li>  
                        <!-- <li><a class="nav-link scrollto" href="pago.php">Pago</a></li> -->
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav><!-- .navbar -->
                </div>
            </header><!-- End Header -->

            <!-- ======= Hero Section ======= -->
        <section id="hero2">  
            <div class="hero-container" style="padding-top: 5%;"> 
                <div id="conent" >
                    <div class="alert alert-success alert-dismissible fade show" role="alert" style="display: none;" id="alertGuardar">
                        Cliente guardado con éxito.                        
                    </div>

                    <div class="alert alert-success alert-dismissible fade show" role="alert" style="display: none;" id="alertNombre">
                        El Nombre ya existe en el sistema.                        
                    </div>                                       
                    
                    <div class="alert alert-warning alert-dismissible fade show" role="alert" style="display: none;" id="alertWarning">
                        Ocurrió un error al realizar la transacción.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 

                </div>
                <!-- TERMINA CONTENT -->

                <div id="conentCliente" >
                    <form class="user" method="post" id="registrar_cliente">   
                        <div class="container" style="padding-top: 0%; padding-left: 20%; padding-right: 20%;" >       
                            <div class="card shadow-lg  my-5" >
                                <div class="card-body p-0"> 
                                    <div class="row">
                                        <div class="col-lg-12">                     
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h4 class="text-dark mb-4">Registrar Cliente</h4>
                                                </div>

                                                <!-- INPUT PARA GUARDAR NOMBRE -->  
                                                <div style="padding-left: 3.2%; padding-right: 3.2%" class="form-group">
                                                    <strong class="col-form-label">Razón social</strong>
                                                    <input class="form-control" type="text" id="nombre" placeholder="Nombre" name="nombre" maxlength="100"   />
                                                    <div class="RESULTADO-nombre" style="color: #800" id="RESULTADO-nombre" name="RESULTADO-nombre"></div>
                                                </div>
                                                

                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR RFC -->
                                                    <div class="col" style="padding-left: 4.5%;">
                                                        <div><strong class="col-form-label">RFC</strong></div>
                                                        <input class="form-control" type="text" id="rfc" placeholder="RFC" name="rfc" maxlength="13"  />
                                                        <div class="RESULTADO-rfc" style="color: #800" id="RESULTADO-rfc" name="RESULTADO-rfc"></div>
                                                    </div>
                                                </div>   

                                                <!-- INPUT PARA GUARDAR CALLE -->
                                                <div style="padding-left: 4.5%; padding-right: 4%" class="form-group row">
                                                    <strong class="col-form-label" style="padding-left: 0%;" >Calle</strong>
                                                    <input class="form-control" rows="2" id="calle" placeholder="Calle" name="calle" maxlength="100" />
                                                    <div class="RESULTADO-calle" style="color: #800" id="RESULTADO-calle" name="RESULTADO-calle"></div>
                                                </div>

                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR NUMERO EXTERIOR -->
                                                    <div class="col" style="padding-left: 4.5%; padding-top: 2%;">
                                                        <div><strong class="col-form-label">Número exterior</strong></div>
                                                        <input class="form-control" type="text" id="num_ext" placeholder="Número exterior" name="num_ext" maxlength="10" />
                                                        <div class="RESULTADO-num_ext" style="color: #800" id="RESULTADO-num_ext" name="RESULTADO-num_ext"></div>
                                                    </div>

                                                    <!-- INPUT PARA GUARDAR NUMERO INTERIOR -->
                                                    <div class="col" style="padding-left: 4.5%; padding-right: 3.5%; padding-top: 2%;" >
                                                        <div><strong class="col-form-label">Número interior</strong></div>
                                                        <input class="form-control" type="text" id="num_int" placeholder="Número interior" name="num_int" maxlength="10" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR COLONIA -->
                                                    <div class="col" style="padding-left: 4.5%; padding-top: 2%;" >
                                                        <div ><strong class="col-form-label">Colonia</strong></div>
                                                        <input class="form-control" rows="2" id="colonia" placeholder="Colonia" name="colonia" maxlength="100" />
                                                        <div class="RESULTADO-colonia" style="color: #800" id="RESULTADO-colonia" name="RESULTADO-colonia"></div> 
                                                    </div>

                                                    <!-- INPUT PARA GUARDAR CODIGO POSTAL -->
                                                    <div class="col" style="padding-left: 4.5%; padding-right: 3.5%; padding-top: 2%;">
                                                        <div  ><strong class="col-form-label">Código Postal</strong></div>
                                                        <input class="form-control" rows="2" id="c_p" placeholder="Código Postal" name="c_p" maxlength="10" />
                                                        <div class="RESULTADO-c_p" style="color: #800" id="RESULTADO-c_p" name="RESULTADO-c_p"></div>

                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR CIUDAD -->
                                                    <div class="col" style="padding-left: 4.5%; padding-top: 2%;">
                                                        <div><strong class="col-form-label">Ciudad</strong></div>
                                                        <input class="form-control" rows="2" id="ciudad" placeholder="Ciudad" name="ciudad" maxlength="100" />
                                                        <div class="RESULTADO-ciudad" style="color: #800" id="RESULTADO-ciudad" name="RESULTADO-ciudad"></div>
                                                    </div>

                                                    <!-- INPUT PARA GUARDAR ESTADO -->
                                                    <div class="col" style="padding-left: 4.5%; padding-right: 3.5%; padding-top: 2%;">
                                                        <div  ><strong class="col-form-label">Estado</strong></div>
                                                        <input class="form-control" rows="2" id="estado" placeholder="Estado" name="estado" maxlength="100" />
                                                        <div class="RESULTADO-estado" style="color: #800" id="RESULTADO-estado" name="RESULTADO-estado"></div>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR PAÍS -->
                                                    <div class="col" style="padding-left: 4.5%; padding-top: 2%;">
                                                        <strong class="col-form-label" style="padding-left: 0%">País</strong>
                                                        <input class="form-control" rows="2" id="pais" placeholder="País" name="pais" maxlength="100"  />
                                                        <div class="RESULTADO-pais" style="color: #800" id="RESULTADO-pais" name="RESULTADO-pais"></div>
                                                    </div>

                                                    <!-- INPUT PARA GUARDAR TELEFONO -->
                                                    <div class="col" style="padding-left: 4.5%; padding-right: 3.5%; padding-top: 2%;">
                                                        <strong class="col-form-label" style="padding-left: 0%">Teléfono</strong>
                                                        <input class="form-control" type="text" id="telefono" placeholder="Teléfono" name="telefono" maxlength="10" />
                                                        <div class="RESULTADO-telefono" style="color: #800" id="RESULTADO-telefono" name="RESULTADO-telefono"></div>

                                                    </div>  
                                                </div>                         															

                                                <div style="padding-left: 3%; padding-right: 2%; padding-top: 2%;" class="form-group row">
                                                    <form enctype="multipart/form-data">
                                                        <!-- INPUT PARA GUARDAR IMAGEN -->  
                                                        <strong>Imagen</strong>
                                                        <input class="form-control" accept=".png" type="file" id="IMAGEN" placeholder="Imagen" name="IMAGEN" />
                                                        <br>
                                                        <img id="logoImg" style="width: 100%; height: 200px; padding-top: 20px; display: none;">
                                                        <a id="quitarImagen" onclick="quitarImagen();" style="display: none; cursor: pointer;"><u>Quitar imagen</u></a>
                                                        <div class="RESULTADO-img" style="color: #800" id="RESULTADO-img" name="RESULTADO-img"></div>
                                                    </form>
                                                </div>
                                                
                                                <div class="modal-footer">                                                    
                                                    <input  type="button" class="btn btn-warning" name="Siguiente" id="Siguiente" value="Siguiente">
                                                </div>                                    
                                                
                                            </div>
                                        </div>
                                    </div>   
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>
                <!-- TERMINA CONENT CLIENTE -->

                <div id="conentAdmin" style="display: none;" >
                    <form class="user" method="post"  style="padding-left: 20%; padding-right: 20%;" >   
                        <div class="container" style="padding-top: 0%; padding-left: 20%; padding-right: 20%;" >       
                            <div class="card shadow-lg  my-5" >
                                <div class="card-body p-0"> 
                                    <div class="row">
                                        <div class="col-lg-12">                     
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h4 class="text-dark mb-4">Usuario Administrador</h4>
                                                </div>
                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR NOMBRE -->
                                                    <strong class="col-form-label">Nombre</strong>
                                                    <input class="form-control" type="text" id="nombreAdmin" placeholder="Nombre" name="nombreAdmin" maxlength="100"  />
                                                </div>
                                                <div class="form-group row" id="g_apellido_p">
                                                    <!-- INPUT PARA GUARDAR APELLIDO PATERNO -->
                                                    <strong class="col-form-label">Apellido Paterno</strong>
                                                    <input class="form-control" type="text" id="apellido_p" placeholder="Apellido Paterno" name="apellido_p" maxlength="50"  />
                                                </div>
                                                <div class="form-group row" id="g_apellido_m">
                                                    <!-- INPUT PARA GUARDAR APELLIDO MATERNO -->
                                                    <strong class="col-form-label">Apellido Materno</strong>
                                                    <input class="form-control" type="text" id="apellido_m" placeholder="Apellido Materno" name="apellido_m" maxlength="50" />
                                                </div>                                                                                          
                                                                                                    
                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR CORREO -->
                                                    <strong class="col-form-label">Usuario</strong>
                                                    <input class="form-control" type="text" id="usuario" placeholder="Usuario" name="usuario" maxlength="50" />
                                                    <div class="RESULTADO-usuario" style="color: #800" id="RESULTADO-usuario" name="RESULTADO-usuario"></div>
                                                </div>
                                                
                                                <div class="form-group row">
                                                    <!-- INPUT PARA GUARDAR CONTRASEÑA -->
                                                    <strong class="col-form-label">Contraseña</strong>
                                                    <input class="form-control" type="password" id="password" placeholder="Contraseña" name="password" maxlength="99" onblur="confirmacionContraseña();"  autocomplete="off" />
                                                </div>
                                                <div class="form-group row">
                                                    <!-- INPUT PARA CONFIRMAR CONTRASEÑA -->
                                                    <strong class="col-form-label">Confirmar contraseña</strong>
                                                    <input class="form-control" type="password" id="password_conf" placeholder="Confirmación de contraseña" name="password_conf" maxlength="99" onblur="confirmacionContraseña();"   autocomplete="off" />
                                                </div>
                                                <div class="form-group row">
                                                    <label id="contrasenas" style="color:#800000; display: none;">Las contraseñas no coinciden</label>
                                                </div>

                                                <div class="modal-footer">
                                                    <!-- BOTONES PARA CERRAR O GUARDAR LA MODAL -->  
                                                    <input  type="button" class="btn btn-warning" name="Atras" id="Atras" value="Atras">
                                                    <input  type="button" class="btn btn-warning" name="Siguiente2" id="Siguiente2" value="Siguiente">

                                                    
                                                </div> 
                                            </div>
                                        </div>
                                    </div>   
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>
                <!-- TERMINA CONENT ADMIN -->

                <div id="conentPlanes" style="display: none;" class="pricing" >
                    <form class="user" method="post">   
                        <div class="container" style="padding-top: 0%; padding-left: 0%; padding-right: 0%;" >       
                            <div class="card shadow-lg  my-5" >
                                <div class="card-body p-0"> 
                                    <div class="row">
                                        <div class="col-lg-12">                     
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h4 class="text-dark mb-4">Contrataciones</h4>
                                                </div>
                                                <div class="row">
                                                  <div class="container"> 
                                                    <div class="row">
                                                      <div class="col-lg-4 col-md-6">
                                                        <div class="box">
                                                          <h3>Free</h3>
                                                          <h4><sup>$</sup>0<span> / month</span></h4>
                                                          <ul>
                                                            <li>Aida dere</li>
                                                            <li>Nec feugiat nisl</li>
                                                            <li>Nulla at volutpat dola</li>
                                                            <li class="na">Pharetra massa</li>
                                                            <li class="na">Massa ultricies mi</li>
                                                          </ul>
                                                          <div class="btn-wrap">
                                                            <a  class="btn-buy">Buy Now</a>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div class="col-lg-4 col-md-6 mt-4 mt-md-0">
                                                        <div class="box recommended">
                                                          <span class="recommended-badge">Recommended</span>
                                                          <h3>Business</h3>
                                                          <h4><sup>$</sup>19<span> / month</span></h4>
                                                          <ul>
                                                            <li>Aida dere</li>
                                                            <li>Nec feugiat nisl</li>
                                                            <li>Nulla at volutpat dola</li>
                                                            <li>Pharetra massa</li>
                                                            <li class="na">Massa ultricies mi</li>
                                                          </ul>
                                                          <div class="btn-wrap">
                                                            <a  class="btn-buy">Buy Now</a>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div class="col-lg-4 col-md-6 mt-4 mt-lg-0">
                                                        <div class="box">
                                                          <h3>Developer</h3>
                                                          <h4><sup>$</sup>29<span> / month</span></h4>
                                                          <ul>
                                                            <li>Aida dere</li>
                                                            <li>Nec feugiat nisl</li>
                                                            <li>Nulla at volutpat dola</li>
                                                            <li>Pharetra massa</li>
                                                            <li>Massa ultricies mi</li>
                                                          </ul>
                                                          <div class="btn-wrap">
                                                            <a class="btn-buy">Buy Now</a>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                      <div class="modal-footer" style=" height: 10px;">                                                    
                                                            <input type="button" class="btn btn-warning"  name="Siguiente3" id="Siguiente3" value="Siguiente">

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </form>
                
                    <!-- TERMINA CONENT PLANES -->
                



                <div id="conentPago" style="display: none;" >
                    <form class="user" method="post"  id="registrar_admin">   
                        <div class="container" style="padding-top: 0%; padding-left: 20%; padding-right: 20%;" >       
                            <div class="card shadow-lg  my-5" >
                                <div class="card-body p-0"> 
                                    <div class="row">
                                        <div class="col-lg-12">                     
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h4 class="text-dark mb-4">Metodo de Pago</h4>
                                                </div>

                                                <div id="example" style="height: 600px"></div>
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
                                                
                                                    <div class="modal-footer">  
                                                      <input type="submit" class="btn btn-warning" name="GUARDAR_CLIENTE" id="GUARDAR_CLIENTE" value="Registrar">                                                   
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- TERMINA CONENT PAGO -->
                

                  <div class="container2" style="display: none;" id="container2">
                    <div class="cargando">
                        <div class="pelotas"></div>
                        <div class="pelotas"></div>
                        <div class="pelotas"></div>
                        <span class="texto-cargando">Cargando...</span>
                    </div>
                  </div>   
            </div>
            <!-- TERMINA HERO-CONTAINER -->                       

        </section>
            <!-- End Hero -->
            <!-- ======= Footer ======= -->
            <footer id="footer">   
                <div class="container d-md-flex py-2"  >
                    <div class="me-md-auto text-center text-md-start">
                        <div class="copyright">                
                        </div>
                        <div class="credits">   
                        D.R. © 2021-2023 DIKKAT PROMOTORA MEXICANA. Todos los derechos reservados DIKKAT PROMOTORA MEXICANA y sus licenciantes. 
                        Todas las demás marcas comerciales registradas son propiedad de sus respectivos dueños.                
                        </div>
                    </div>            
                </div>
            </footer><!-- End Footer -->
            <!-- <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a> -->
            <!-- Vendor JS Files -->
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <!-- Template Main JS File -->
            <script src="assets/js/main.js"></script>
        </body>
        </html> 

        