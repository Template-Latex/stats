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

var staticUrl = location.protocol + '//' + location.host + location.pathname; // Ubicación del archivo web

// Añade format a los strings
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

// Obtiene parámetros de la url
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}

// Redondea un número
function roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
        var arr = ("" + num).split("e");
        var sig = ""
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        var i = +arr[0] + "e" + sig + (+arr[1] + scale);
        var j = Math.round(i);
        var k = +(j + "e-" + scale);
        return k;
    }
}

// Carga un template y genera gráficos
function loadTemplate(templateid) {

    // Limpia errores anteriores
    cleanErrorMsg();
    console.log(String.format('Cargando ID <{0}>', templateid));

    // Carga el id
    try {
        st = stat[templateid];
    } catch (e) {
        throwErrorID(errorID.badtemplateid);
        return;
    } finally {}

    // Muestra barra progreso y nombre template
    $('#templateName').html(String.format('<img src="res/icon.png" /> {0}', st.name));
    $('#progressLoading').css('opacity', '1.0');
    $('#progressLoading').css('display', 'block');
    var bar = new ProgressBar.Circle('#progressLoading', {
        strokeWidth: 12,
        easing: 'easeInOut',
        duration: 700,
        color: '#3598DB',
        trailColor: '#eee',
        trailWidth: 0.01,
        svgStyle: null
    });
    bar.animate(1);

    // Limpia estado anterior
    $('#tableMem').html('');
    if (!hasLoaded) {
        $("#mainSelector option[value='none']").remove();
    } else {
        $('#mainContent').css('display', 'none');
        if ($.fn.DataTable.isDataTable('#mainTable')) {
            $('#mainTable').DataTable().clear().destroy();
            writeTableHeader();
        }
    }

    // Se carga archivo de estadísticas
    jQuery.get(String.format('{0}{1}', mainUrl, st.data), function(data) {
        data = data.split('\n');

        // Se cargan datos a listas
        plot_id = [];
        plot_ctime = [];
        plot_nline = [];

        for (var i = 1; i < data.length; i++) {
            a = [];
            line = data[i].split(' ');
            for (var j = 0; j < line.length; j++) {
                if (line[j] != '') {
                    a.push(line[j]);
                }
            }
            loadedData.push(a);
            plot_id.push(parseInt(a[0]));
            plot_ctime.push(parseFloat(a[2]));
            plot_nline.push(parseInt(a[4]));
            $('#tableMem').append(String.format('<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr>', a[0], a[1], a[2], a[3], a[4], a[5]));
        }

        // Se genera la tabla
        lenghtmenuoption = [];
        if (loadedData.length >= 100) {
            lenghtmenuoption = [15, 30, 50, 100];
        } else if (50 <= loadedData.length && loadedData.length < 100) {
            lenghtmenuoption = [15, 30, 50, loadedData.length];
        } else if (30 <= loadedData.length && loadedData.length < 50) {
            lenghtmenuoption = [15, 30, loadedData.length];
        } else if (15 <= loadedData.length && loadedData.length < 30) {
            lenghtmenuoption = [15, loadedData.length];
        } else {
            lenghtmenuoption = [loadedData.length];
        }
        try {
            $('#mainTable').DataTable({
                "language": {
                    "url": "http://latex.ppizarror.com/stats/res/tableSpanish.json"
                },
                "order": [
                    [0, "desc"]
                ],
                "lengthMenu": lenghtmenuoption
            });
        } catch (e) {
            throwErrorID(errorID.generatetable, e);
            return;
        } finally {}
        hasLoaded = true;

        // Genera estadísticas adicionales
        try {
            mean_ctime = roundNumber(jStat.mean(plot_ctime), 2);
            plot_mean_ctime = [];
            for (k = 0; k < loadedData.length; k++) {
                plot_mean_ctime.push(mean_ctime);
            }
        } catch (e) {
            throwErrorID(errorID.calcctimemean, e);
            return;
        } finally {}

        // Plotea las estadísticas
        try {
            writeGraphCanvases();

            new Chart($('#plot-ctime'), {
                type: 'line',
                data: {
                    labels: plot_id,
                    datasets: [{
                            data: plot_ctime,
                            label: "Tiempo de compilación (s)",
                            borderColor: "#8436d7",
                            backgroundColor: "#8436d7",
                            fill: false,
                            radius: 1
                        },
                        {
                            data: plot_mean_ctime,
                            label: "Promedio (s)",
                            borderColor: "#e470f6",
                            backgroundColor: "#e470f6",
                            borderDash: [5, 5],
                            fill: false,
                            radius: 0
                        }
                    ]
                },
                options: {
                    title: {
                        display: false,
                        text: 'Tiempo de compilación'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Tiempo de compilación (s)'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'ID de compilación'
                            }
                        }]
                    },
                    legend: {
                        display: true
                    }
                }
            });
            new Chart($('#plot-nline'), {
                type: 'line',
                data: {
                    labels: plot_id,
                    datasets: [{
                        data: plot_nline,
                        label: "Número de líneas de código",
                        borderColor: "#3e95cd",
                        fill: false,
                        radius: 1
                    }]
                },
                options: {
                    title: {
                        display: false,
                        text: 'Línea de código en el tiempo'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Líneas de código'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'ID de compilación'
                            }
                        }]
                    },
                    legend: {
                        display: true
                    }
                }
            });
        } catch (e) {
            throwErrorID(errorID.genplots, e);
            return;
        } finally {}

        // Muestra el contenido final con efecto
        setTimeout(function() {
            $('#mainContent').fadeIn('slow', function() {});
            $('#progressLoading').fadeOut('slow', function() {
                $('#progressLoading').html(' ');
            });
        }, 300);

    });
}

function writeTableHeader() {
    $('#tableData').html('<table id="mainTable" class="display" width="100%" cellspacing="0"><thead><tr><th>ID</th><th>Versión</th><th>Ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></thead><tfoot><tr><th>ID</th><th>Versión</th><th>Ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></tfoot><tbody id="tableMem"></tbody></table>');
}

function writeGraphCanvases() {
    $('#graphSection').html('<canvas id="plot-ctime" class="graphCanvas"></canvas><canvas id="plot-nline" class="graphCanvas"></canvas>');
}
