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

var loadingBarAnimation; // Animación de la barra de carga
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

// Crea un loadingbar
function loadingBarTrigger() {
    $('#progressLoading').html(' ');
    switch (processBarAnimationStyle) {
        case 1:
            var bar = new ProgressBar.Circle('#progressLoading', {
                strokeWidth: processBarStrokeWidth,
                easing: 'easeInOut',
                duration: timeDurationProcessBar,
                color: processBarColor,
                trailColor: processBarColor,
                trailWidth: 0.01,
                svgStyle: null
            });
            bar.animate(1);
            break;
        case 2:
            var circle = new ProgressBar.Circle('#progressLoading', {
                color: processBarColor,
                trailColor: processBarLColor,
                strokeWidth: processBarStrokeWidth,
                duration: 2500,
                easing: 'easeInOut'
            });

            circle.set(0.05);

            setTimeout(function() {
                circle.animate(0.3);
            }, 1000);

            setTimeout(function() {
                circle.animate(0.4);
            }, 3500);

            setTimeout(function() {
                circle.animate(0.8);
            }, 5500);

            setTimeout(function() {
                circle.animate(1);
            }, 8000);
            break;
    }
}

// Crea una fecha a partir de un string
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

// Hace la diferencia entre dos días
function daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

// Ajusta las versiones de desarrollo para gráficos
function parseDevVersion(version) {
    if (version.length > 7) {
        version = version.substring(0, 7);
    }
    return version;
}

// Carga un template y genera gráficos
function loadTemplate(templateid) {

    // Limpia errores anteriores
    cleanErrorMsg();
    console.log(String.format('Cargando ID <{0}> ...', templateid));

    // Carga el id
    try {
        st = stat[templateid];
    } catch (e) {
        throwErrorID(errorID.badtemplateid);
        return;
    } finally {}

    // Muestra barra progreso y nombre template
    try {
        $('#templateNameTxt').html(String.format('<a href="{1}">{0}</a>', st.header, st.link));
        $(document).prop('title', 'Stats - ' + st.header);
        $('#progressLoading').fadeTo('slow', processBarSetOpacity);
        loadingBarTrigger();
        loadingBarAnimation = setInterval(function() {
            loadingBarTrigger();
        }, timeDurationProcessBar + 50);
    } catch (e) {
        throwErrorID(errorID.loadingbarsetup);
        return;
    } finally {}

    // Limpia estado anterior
    writeGraphCanvases();
    $('#tableMem').html('');
    if (!hasLoaded) {
        $("#mainSelector option[value='none']").remove();
    } else {
        $('#footer').css('display', 'none');
        $('#mainContent').css('display', 'none');
        try {
            if ($.fn.DataTable.isDataTable('#mainTable')) {
                $('#mainTable').DataTable().clear().destroy();
                writeTableHeader();
            }
        } catch (e) {
            throwErrorID(errorID.deletetable, e);
            return;
        } finally {}
    }

    // Se carga archivo de estadísticas
    jQuery.get(String.format('{0}{1}', mainUrl, st.data), function(data) {
        try {
            data = data.split('\n');

            // Se cargan datos a listas
            plot_id = [];
            plot_ctime = [];
            plot_nline = [];
            plot_ver = [];

            try {
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
                    plot_ver.push(parseDevVersion(a[1]));
                    $('#tableMem').append(String.format('<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr>', a[0], a[1], a[2], a[3], a[4], a[5]));
                }
            } catch (e) {
                throwErrorID(errorID.parsedata, e);
                return;
            } finally {}

            // Se genera la tabla
            try {
                lenghtmenuoption = [];
                if (loadedData.length >= tableMaxReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, tableHighReg, tableMaxReg];
                } else if (tableHighReg <= loadedData.length && loadedData.length < tableMaxReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, tableHighReg, loadedData.length];
                } else if (tableMedReg <= loadedData.length && loadedData.length < tableHighReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, loadedData.length];
                } else if (tableMinReg <= loadedData.length && loadedData.length < tableMedReg) {
                    lenghtmenuoption = [tableMinReg, loadedData.length];
                } else {
                    lenghtmenuoption = [loadedData.length];
                }
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
                plot_partial_mean_ctime = [];
                total_sum = 0.0;
                for (k = 0; k < loadedData.length; k++) {
                    plot_mean_ctime.push(mean_ctime);
                    total_sum += plot_ctime[k];
                    plot_partial_mean_ctime.push(roundNumber(total_sum / (k + 1), 2));
                }
            } catch (e) {
                throwErrorID(errorID.calcctimemean, e);
                return;
            } finally {}

            // Plotea las estadísticas
            try {
                if (plotXaxisID) {
                    new Chart($('#plot-ctime'), {
                        type: "line",
                        data: {
                            labels: plot_id,
                            datasets: [{
                                    data: plot_ctime,
                                    label: "Tiempo de compilación (s)",
                                    borderColor: "#8436d7",
                                    backgroundColor: "#8436d7",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 1
                                },
                                {
                                    data: plot_mean_ctime,
                                    label: "Promedio (s)",
                                    borderColor: "#e470f6",
                                    backgroundColor: "#e470f6",
                                    borderDash: [5, 5],
                                    borderWidth: plotLineWidth,
                                    fill: false,
                                    radius: 0
                                },
                                {
                                    data: plot_partial_mean_ctime,
                                    label: "Promedio parcial (s)",
                                    borderColor: "#fccf5f",
                                    backgroundColor: "#fccf5f",
                                    borderWidth: 2,
                                    fill: false,
                                    radius: 0
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: false,
                                text: "Tiempo de compilación"
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Tiempo de compilación (s)"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "ID de compilación"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                    new Chart($('#plot-nline'), {
                        type: "line",
                        data: {
                            labels: plot_id,
                            datasets: [{
                                data: plot_nline,
                                label: "Número de líneas de código",
                                borderColor: "#3e95cd",
                                backgroundColor: "#3e95cd",
                                fill: false,
                                radius: 1,
                                tension: 0,
                                borderWidth: plotLineWidth
                            }]
                        },
                        options: {
                            title: {
                                display: false,
                                text: "Línea de código en el tiempo"
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Líneas de código"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "ID de compilación"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                } else {
                    new Chart($('#plot-ctime'), {
                        type: "line",
                        data: {
                            labels: plot_ver,
                            datasets: [{
                                    data: plot_ctime,
                                    label: "Tiempo de compilación (s)",
                                    borderColor: "#8436d7",
                                    backgroundColor: "#8436d7",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 1
                                },
                                {
                                    data: plot_mean_ctime,
                                    label: "Promedio (s)",
                                    borderColor: "#e470f6",
                                    backgroundColor: "#e470f6",
                                    borderDash: [5, 5],
                                    borderWidth: plotLineWidth,
                                    fill: false,
                                    radius: 0
                                },
                                {
                                    data: plot_partial_mean_ctime,
                                    label: "Promedio parcial (s)",
                                    borderColor: "#fccf5f",
                                    backgroundColor: "#fccf5f",
                                    borderWidth: 2,
                                    fill: false,
                                    radius: 0
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: false,
                                text: "Tiempo de compilación"
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Tiempo de compilación (s)"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Número de versión"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                    new Chart($('#plot-nline'), {
                        type: "line",
                        data: {
                            labels: plot_ver,
                            datasets: [{
                                data: plot_nline,
                                label: "Número de líneas de código",
                                borderColor: "#3e95cd",
                                backgroundColor: "#3e95cd",
                                fill: false,
                                radius: 0,
                                tension: 0,
                                borderWidth: plotLineWidth
                            }]
                        },
                        options: {
                            title: {
                                display: false,
                                text: "Línea de código en el tiempo"
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Líneas de código"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Número de versión"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                }
            } catch (e) {
                throwErrorID(errorID.genplots, e);
                return;
            } finally {}

            // Obtiene descargas de la versión
            downloads_link_compact = [];
            downloads_link_normal = [];
            downloads_total = [];
            lastday_released = [];
            lastdownloads_compact_size = [];
            lastdownloads_normal_size = [];
            lastdownloads_total = [];
            lastversion_releases = [];
            version_releases = [];
            try {
                $.getJSON(st.json, function(json) {
                    for (i = json.length - 1; i >= 0; i--) {
                        try {
                            downloads_link_compact.push(json[i].assets[0].download_count);
                            downloads_link_normal.push(json[i].assets[1].download_count);
                            downloads_total.push(json[i].assets[0].download_count + json[i].assets[1].download_count);
                            lastday_released.push(parseDate(json[i].published_at.substring(0, 10)));
                            lastdownloads_compact_size.push(roundNumber(json[i].assets[0].size / 1000, 2));
                            lastdownloads_normal_size.push(roundNumber(json[i].assets[1].size / 1000, 2));
                            lastdownloads_total.push(json[i].assets[0].download_count + json[i].assets[1].download_count);
                            lastversion_releases.push(json[i].tag_name);
                            version_releases.push(json[i].tag_name);
                        } catch (err) {}
                    }

                    // Obtiene descargas anteriores
                    prev_downloads = getDownloadCounter(st.name);
                    prev_downloads.reverse();
                    for (var i = 0; i < prev_downloads.length; i++) {
                        version_releases.unshift(prev_downloads[i][1]);
                        downloads_total.unshift(prev_downloads[i][0]);
                    }

                    // Genera descargas acumulado
                    acum_downloads = [downloads_total[0]];
                    for (var i = 1; i < downloads_total.length; i++) {
                        acum_downloads.push(downloads_total[i] + acum_downloads[i - 1]);
                    }

                    // Calcula días de cada versión disponibles
                    lastday_total = [];
                    for (var i = 0; i < lastday_released.length - 1; i++) {
                        lastday_total.push(daydiff(lastday_released[i], lastday_released[i + 1]));
                    }
                    lastday_total.push(daydiff(lastday_released[lastday_released.length - 1], new Date()));

                    // Genera el gráfico de descargas
                    try {
                        new Chart($('#plot-totaldownloads'), {
                            type: "line",
                            data: {
                                labels: version_releases,
                                datasets: [{
                                    data: downloads_total,
                                    label: "N° descargas de cada versión",
                                    borderColor: "#004f16",
                                    backgroundColor: "#004f16",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 2,
                                    pointStyle: 'circle'
                                }]
                            },
                            options: {
                                title: {
                                    display: false,
                                    text: "Descargas de cada versión"
                                },
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Descargas de cada versión"
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Número de versión"
                                        }
                                    }]
                                },
                                legend: {
                                    display: true
                                }
                            }
                        });
                        new Chart($('#plot-acumdownloads'), {
                            type: "line",
                            data: {
                                labels: version_releases,
                                datasets: [{
                                    data: acum_downloads,
                                    label: "N° descargas acumuladas hasta versión",
                                    borderColor: "#9f0000",
                                    backgroundColor: "#9f0000",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 1,
                                    pointStyle: 'circle'
                                }]
                            },
                            options: {
                                title: {
                                    display: false,
                                    text: "Descargas acumuladas"
                                },
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Descargas acumuladas"
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Número de versión"
                                        }
                                    }]
                                },
                                legend: {
                                    display: true
                                }
                            }
                        });
                        new Chart($('#plot-sizeversion'), {
                            type: "line",
                            data: {
                                labels: lastversion_releases,
                                datasets: [{
                                        data: lastdownloads_normal_size,
                                        label: "Versión normal",
                                        borderColor: "#ff8f2e",
                                        backgroundColor: "#ff8f2e",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 2,
                                        pointStyle: 'circle'
                                    },
                                    {
                                        data: lastdownloads_compact_size,
                                        label: "Versión compacta",
                                        borderColor: "#ff346f",
                                        backgroundColor: "#ff346f",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 2,
                                        pointStyle: 'triangle'
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: false,
                                    text: "Peso en KB de cada versión"
                                },
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Peso (KB)"
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Número de versión"
                                        }
                                    }]
                                },
                                legend: {
                                    display: true
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var value = data.datasets[0].data[tooltipItem.index];
                                            value = value.toString();
                                            value = value.replace('.', ',');
                                            return 'Peso: ' + value + ' KB';
                                        }
                                    }
                                }
                            }
                        });
                        new Chart($('#plot-partdownloads'), {
                            type: "line",
                            data: {
                                labels: lastversion_releases,
                                datasets: [{
                                        data: downloads_link_normal,
                                        label: "Versión normal",
                                        borderColor: "#057375",
                                        backgroundColor: "#057375",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 2,
                                        pointStyle: 'circle',
                                        tension: 0,
                                        yAxisID: "y-axis-1"
                                    },
                                    {
                                        data: downloads_link_compact,
                                        label: "Versión compacta",
                                        borderColor: "#aab104",
                                        backgroundColor: "#aab104",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 2,
                                        pointStyle: 'rect',
                                        tension: 0,
                                        yAxisID: "y-axis-1"
                                    },
                                    {
                                        data: lastdownloads_total,
                                        label: "Suma",
                                        borderColor: "#001471",
                                        backgroundColor: "#001471",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 2,
                                        borderDash: [5, 5],
                                        pointStyle: 'cross',
                                        tension: 0,
                                        yAxisID: "y-axis-1"
                                    },
                                    {
                                        data: lastday_total,
                                        label: "Días activo",
                                        borderColor: "#530071",
                                        backgroundColor: "#530071",
                                        fill: false,
                                        borderWidth: plotLineWidth,
                                        radius: 1,
                                        pointStyle: 'triangle',
                                        tension: 0,
                                        yAxisID: "y-axis-2"
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: false,
                                    text: "Descargas por modo"
                                },
                                scales: {
                                    yAxes: [{
                                        display: true,
                                        position: "left",
                                        id: "y-axis-1",
                                        scaleLabel: {
                                            labelString: "Número de descargas",
                                            display: true,
                                        }
                                    }, {
                                        position: "right",
                                        id: "y-axis-2",
                                        gridLines: {
                                            drawOnChartArea: false,
                                        },
                                        scaleLabel: {
                                            labelString: "Días disponible",
                                            display: true,
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Número de versión"
                                        }
                                    }]
                                },
                                legend: {
                                    display: true
                                }
                            }
                        });
                        // Genera gráfico torta
                        if (showPieDownloadChart) {
                            $('#plot-piedownloads').css('display', 'block');
                            total_downloads_colors_pie = [];
                            for (var i = 0; i < downloads_total.length; i++) {
                                total_downloads_colors_pie.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
                            };
                            new Chart($('#plot-piedownloads'), {
                                type: "pie",
                                data: {
                                    labels: version_releases,
                                    datasets: [{
                                        label: "Population (millions)",
                                        backgroundColor: total_downloads_colors_pie,
                                        borderColor: total_downloads_colors_pie,
                                        data: downloads_total
                                    }]
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: "Descargas por versión"
                                    },
                                    legend: {
                                        display: false
                                    }
                                }
                            });
                        }
                    } catch (e) {
                        throwErrorID(errorID.downloadgraph, e);
                        return;
                    } finally {}

                    // Muestra el contenido final con efecto
                    setTimeout(function() {
                        $('#mainContent').fadeIn('slow', function() {
                            $('#footer').css('display', 'inline-block');
                            clearInterval(loadingBarAnimation);
                            $('#progressLoading').html('');
                            $('#progressLoading').fadeTo('slow', 1.0);
                        });
                        console.log('Carga exitosa')
                    }, timeShowContentOnLoad);
                });
            } catch (e) {
                throwErrorID(errorID.getdownloads, e);
                return;
            } finally {}
        } catch (e) {
            throwErrorID(errorID.criticaltemplateloading, e);
            return;
        } finally {}
    });
}

// Regenera los datos de la tabla
function writeTableHeader() {
    $('#tableData').html('<table id="mainTable" class="display" width="100%" cellspacing="0"><thead><tr><th>ID</th><th>Versión</th><th>ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></thead><tfoot><tr><th>ID</th><th>Versión</th><th>ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></tfoot><tbody id="tableMem"></tbody></table>');
}

// Regenera la sección de los gráficos
function writeGraphCanvases() {
    $('#graphSection').html('<canvas id="plot-ctime" class="graphCanvas" style="margin-top:-8.5px;"></canvas><canvas id="plot-nline" class="graphCanvas"></canvas><canvas id="plot-totaldownloads" class="graphCanvas"></canvas><canvas id="plot-partdownloads" class="graphCanvas"></canvas><canvas id="plot-acumdownloads" class="graphCanvas"></canvas><canvas id="plot-sizeversion" class="graphCanvas"></canvas><canvas id="plot-piedownloads" class="graphCanvas"></canvas>');
}

// Obtiene la lista de descargas y versiones de un id
function getDownloadCounter(templateid) {
    updateDownloadCounter(0, templateid);
    return download_list_counter;
}
