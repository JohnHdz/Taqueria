const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const os = require('os');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
   res.send({
      server: 'ok'
   });
});

app.post('/formularioContacto', function (req, res) {
    const contactoForm = req.body;
    const contact = {
        name: contactoForm.name,
        email: contactoForm.email,
        subject: contactoForm.subject,
        message: contactoForm.message
    };
    const transport = nodemailer.createTransport({ /*Definición del transporte donde se enviará el correo*/
        host: 'smtp.1and1.mx',
        port: 587,
        auth: {
            user: 'prueba@geekosofia.mx',
            pass: 'Prueba1.'
        }
    });
    transport.verify(function (error, succes) { /*Verificación de que esté funcionando correctamente el envío de correos*/
        if(error){
            console.log(error)
        } else {
            console.log('Mensaje enviado exitosamente!');
        }

    })

    const mailOptions = { /*Configuración del contenido del correo*/
        from: contact.email,
        to: 'pruebanode27@gmail.com',
        subject: contact.name + ' | Has sent you a new message!',
        text: contact.subject+ ' ' + ' '+contact.message
    }

    transport.sendMail(mailOptions, function (error, response) {   /*Envía el correo tomando como primer parámetro*/
        if(error){                                                 /* la configutación del contenido del correo*/
            console.log(error);                                    /*e informa si hay un error*/
        }else{
            res.redirect('/');
        }
    })

    console.log(contact);
    res.send({message: 'ok'});
});

app.post('/formularioPedido', function (req, res) {
    const pedidosForm = req.body;
    const pedidos = {
        /*Data user*/
        name: pedidosForm.name,
        celphone: pedidosForm.celphone,
        dirEntrega: pedidosForm.dirEntrega,
        delegacion: pedidosForm.delegacion,
        cpostal: pedidosForm.cpostal,
        noext: pedidosForm.noext,
        noint: pedidosForm.noint,
        referencias: pedidosForm.referencias,
        /*EatUser*/
        tacos: pedidosForm.tacos,
        kilo: pedidosForm.kilo,
        sodas: pedidosForm.sodas,
        otros: pedidosForm.otros,
        /*QuantityUser*/
        tacosCantidad: pedidosForm.tacosCantidad,
        kiloCantidad: pedidosForm.kiloCantidad,
        sodasCantidad: pedidosForm.sodasCantidad,
        otrosCantidad: pedidosForm.otrosCantidad
    }

    const smtptransport = nodemailer.createTransport({ /*Definición del transporte donde se enviará el correo*/
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'pruebanode27@gmail.com',
            pass: 'Prueba1.'
        }
    });

    smtptransport.verify(function (error, succes) { /*Verificación de que esté funcionando correctamente el envío de correos*/
        if(error){
            console.log(error)
        } else {
            console.log('Mensaje enviado exitosamente!');
        }

    })

    const mailOptionsPedidos = { /*Configuración del contenido del correo*/
        from: pedidos.email,
        to: 'pruebanode27@gmail.com',
        subject: pedidos.name + ' | Has request you for food!',
        text: 'Hola soy: '+ pedidos.name +' y de comer quiero... '
        + ' ' + '* '+pedidos.tacosCantidad + ' '+ pedidos.tacos
        + ' ' + '* '+pedidos.kiloCantidad + ' '+ pedidos.kilo + ' '
        + ' ' + '* '+pedidos.sodasCantidad + ' '+ pedidos.sodas + ' '
        + ' ' + '* '+pedidos.otrosCantidad + ' '+ pedidos.otros +
        ' ||||| A la siguiente dirección: ' + pedidos.dirEntrega + ' ' +pedidos.delegacion + ' ' + pedidos.cpostal +' '+ pedidos.noext + ' ' + pedidos.noint + ' '+
        pedidos.referencias + ' Me puedes contactar al número: ' + pedidos.celphone
    }

    smtptransport.sendMail(mailOptionsPedidos, function (error, response) {   /*Envía el correo tomando como primer parámetro*/
        if(error){                                                 /* la configutación del contenido del correo*/
            console.log(error);                                    /*e informa si hay un error*/
        }else{
            res.redirect('/');
        }
    })

    console.log(pedidos)
    res.send({message: 'ok'});
});

app.listen(3000, function () {
    console.log('Servidor Funcionando en: '+ os.hostname());
    var ifaces=os.networkInterfaces();
    for (var dev in ifaces) {
        var alias=0;
        ifaces[dev].forEach(function(details){
            if (details.family=='IPv4') {
                console.log(dev+(alias?':'+alias:''),details.address);
                ++alias;
            }
        });
    }
});


