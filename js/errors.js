/*
TEMPLATE-LATEX STATS

Author: Pablo Pizarro R. @ ppizarror.com
Licence:
    The MIT License (MIT)
    Copyright 2017 Pablo Pizarro R.

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Código de errores
var errorID = {
    "badtemplateid": {
        "msg": "ID de Template incorrecto",
        "code": 1,
        "moreinfo": "ID del Template no encontrada en la base de datos, se recomienda acceder al subtemplate mediante el menú desplegable en la esquina superior derecha"
    },
    "generatetable": {
        "msg": "Error al generar la tabla de datos",
        "code": 2,
        "moreinfo": "No se pudo generar la tabla de datos, posiblemente error en configuración"
    },
    "calcctimemean": {
        "msg": "Error al calcular tiempo de compilación promedio",
        "code": 3,
        "moreinfo": "Existe un error en los datos, imposible calcular el tiempo de compilación promedio"
    },
}

// Escribe el error en el panel
function throwErrorID(errorid, exceptionmsg) {
    $('#mainContent').css('display', 'none');
    $('#errorMsg').css('display', 'block');
    $('#errorMsgText').html(String.format('{0} {1}', '<img src="res/erroricon.png" />', errorid.msg));
    $('#errorMoreInfoMsg').html(errorid.moreinfo + '.');

    if (exceptionmsg != '') {
        console.log(String.format('Error #{0}: {1}', errorid.code, errorid.msg));
        console.log(String.format('EXCEPTION: {0} {1}', exceptionmsg.message, exceptionmsg.stack));
    }
}

// Oculta mensajes de error
function cleanErrorMsg() {
    $('#errorMsg').css('display', 'none');
    $('#errorMsgText').html('');
    $('#errorMoreInfoMsg').html('');
}
