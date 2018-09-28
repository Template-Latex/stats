/**
 TEMPLATE-LATEX STATS

 Author: Pablo Pizarro R. @ ppizarror.com
 Licence:
 The MIT License (MIT)
 Copyright 2017-2018 Pablo Pizarro R.

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

let downloadPartChartType = 'style1'; // Tipo de gráfico de descargas ultimas 30 (style1,style2)
let downloadTotalChartType = 'bar'; // Tipo de gráfico de descargas totales (bar,line)
let downloadVariationRoundNumber = 2; // Cantidad de decimales a redondear gráfico variación descargas
let dptosDisplayDefaultLinePlot = ['DIC', 'DIE', 'DCC', 'FCFM']; // Departamentos que grafica por defecto
let plotIntersectToShowLegend = false; // Indica si se debe intersectar datos en gráfico para mostrar tooltips
let plotLineWidth = 2; // Ancho de línea en gráficos
let plotTitleFontSize = 13.5; // Tamaño fuente de títulos en gráficos
let plotTitleFontStyle = 'bold'; // Tipo de fuente en título de gráficos
let plotXaxisID = true; // Indica si plotea por id o versión en el eje x
let processBarAnimationStyle = 1; // Animación del círculo de progreso (1,2)
let processBarColor = '#3598DB'; // Color del círculo de progreso
let processBarLColor = '#93bad5'; // Color del círculo de progreso + claro
let processBarSetOpacity = 0.5; // Opacidad en la que se fija la barra de progreso de carga
let processBarStrokeWidth = 10; // Ancho del círculo de progreso
let pxScrollDownToFixTable = 90; // Cuántos píxeles scrollear para fixear tabla
let pxScrollToShowButton = 600; // Cuantos píxeles scrollear para mostrar botón subir
let showPieDownloadChart = false; // Muestra gráfico pie chart de descargas
let tableDataNameCols = ['ID', 'VERSIÓN', 'TCMP', 'FECHA', 'LINEAS', 'HASH']; // Nombre columna tabla
let tableHighReg = 50; // Registros altos a mostrar en tabla
let tableMaxReg = 100; // Registros máximos a mostrar en tabla
let tableMedReg = 30; // Registros medios a mostrar en tabla
let tableMinReg = 15; // Registros mínimos a mostrar en tabla
let timeDurationProcessBar = 700; // Tiempo en ms de efecto de círculo de progreso
let timeProcessOnGETurl = 200; // Tiempo en ms de espera para procesar template pasado por parámetro get en url
let timeShowContentOnLoad = 400; // Tiempo en ms que demora en mostrar contenido generado