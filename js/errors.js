/*
TEMPLATE-LATEX STATS

Author: Pablo Pizarro R. @ ppizarror.com
Licence:
    The MIT License (MIT)
    Copyright 2017,2018 Pablo Pizarro R.

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
    "genplots": {
        "msg": "Error al generar los gráficos",
        "code": 4,
        "moreinfo": "Ocurrió un error inesperado al generar los gráficos, posible error de datos"
    },
    "parsedata": {
        "msg": "Error al procesar los datos",
        "code": 5,
        "moreinfo": "Ocurrió un error al procesar los datos de las estadísticas, datos erróneos o mal parseados"
    },
    "getdownloads": {
        "msg": "Error al obtener estadística de descargas",
        "code": 6,
        "moreinfo": "Ocurrió un error al accesar a la estadística de descargas de la API de Github"
    },
    "downloadgraph": {
        "msg": "Error al generar los gráficos de descargas",
        "code": 7,
        "moreinfo": "Ocurrió un error al procesar los datos de descargas totales y parciales por versión al generar los gráficos"
    },
    "deletetable": {
        "msg": "Error al limpiar la tabla anterior de datos",
        "code": 8,
        "moreinfo": "Ocurrió un error crítico al limpiar (resetear) la tabla de datos generada en el proceso anterior"
    },
    "criticaltemplateloading": {
        "msg": "Ocurrió un error inesperado al cargar los datos del template",
        "code": 9,
        "moreinfo": "Ocurrió un error inesperado y no atrapado al procesar los datos de la solicitud, navegue por la consola del navegador para saber más sobre la excepción atrapada"
    },
    "loadingbarsetup": {
        "msg": "Ocurrió un error al generar la barra de progreso de carga",
        "code": 10,
        "moreinfo": "Ocurrió un error inesperado al generar la barra de progreso de carga (progressLoadingBar)"
    },
    "errorcreatedayactivitystat": {
        "msg": "Error al generar estadísticas actividad por día",
        "code": 11,
        "moreinfo": "Ocurrió un error al generar las estadísticas de actividad (número de compilaciones) por día"
    },
    "invalidchartdownloadparttype": {
        "msg": "Estilo de gráfico descargas parciales incorrecto",
        "code": 12,
        "moreinfo": "La configuración <b>downloadPartChartType</b> no es correcta"
    },
    "errorretrievetemplatelist": {
        "msg": "Error al cargar la lista de templates disponibles",
        "code": 13,
        "moreinfo": "Un error de configuración en <b>status.js</b> impide cargar la lista completa de templates disponibles"
    },
    "retrievedownloadcounter": {
        "msg": "Error al obtener lista de descargas anteriores",
        "code": 14,
        "moreinfo": "Ocurrió un error al acceder a la función <i>getDownloadCounter</i> de Template-Informe, probablemente el tag del Template no existe o no fue definido correctamente"
    },
    "erroraccessfile": {
        "msg": "Error al obtener el archivo de compilaciones",
        "code": 15,
        "moreinfo": "Ocurrió un error al acceder al archivo de compilaciones, probable error de servidor"
    },
    "erroraccessjsonreleases": {
        "msg": "Error al acceder al archivo JSON de releases",
        "code": 16,
        "moreinfo": "Ocurrió un error al acceder al archivo JSON de releases de Github Stats, probable error de servidor"
    },
    "erroridnormalsingle": {
        "msg": "No se encontró los archivos compacto y normal para Template-Informe",
        "code": 17,
        "moreinfo": "Ocurrió un error al obtner los id de los archivos compacto y normal"
    }
}

// Escribe el error en el panel
function throwErrorID(errorid, exceptionmsg) {
    clearInterval(loadingBarAnimation);
    $('#progressLoading').html('');
    $('#progressLoading').fadeTo('slow', 1.0);
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
