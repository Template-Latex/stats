/**
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

var download_list_counter;

/*
Para actualizar, buscar template en https://hanadigital.github.io/grev/?user=Template-Latex&repo=Template-Informe
y copiar el siguiente código:

let jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
if (!String.format) {
    String.format = function ($format) {
        let $args = Array.prototype.slice.call(arguments, 1);
        return $format.replace(/{(\d+)}/g, function ($match, $number) {
            return typeof $args[$number] !== 'undefined' ?
                $args[$number] :
                $match;
        });
    };
}
setTimeout(function () {
    let $str = '';
    $($('.col.rightCol.statsShown .assets .asset').get().reverse()).each(function f() {
        let $item = $(this);
        let $tag = $item.find('p');
        let $version = $tag[0].innerHTML;
        $version = $version.split(' v')[1];
        let $count = $tag[1].innerHTML;
        $str += String.format("[{0}, '{1}'],\n", $count, $version);
    });
    console.log($str);
}, 1000);
*/

/**
 * Actualizador de descargas.
 *
 * @param {number} $downloads - Número de descargas
 * @param {string} $source - Tipo de fuente
 * @return {*}
 */
function updateDownloadCounter($downloads, $source) {
    switch ($source) {
        case 'Professional-CV':
            download_list_counter = [
                [75, '1.0.3'],
                [35, '1.0.6'],
                [42, '1.0.7'],
                [44, '1.2.0'],
                [249, '1.2.2'],
                [51, '1.2.3'],
                [73, '1.2.4'],
                [227, '1.2.5'],
                [172, '1.2.6'],
                [52, '1.3.0'],
                [430, '1.3.1'],
                [138, '1.3.2'],
                [254, '2.0.0'],
                [102, '2.1.0'],
                [72, '2.1.2'],
                [132, '2.1.3'],
                [70, '2.1.4'],
                [58, '2.1.5'],
                [27, '2.2.0'],
                [29, '2.2.1'],
                [23, '2.2.2'],
                [14, '3.0.0'],
                [8, '3.0.1'],
                [17, '3.0.2'],
                [37, '3.0.3'],
                [152, '3.1.0'],
                [29, '3.2.0'],
                [217, '3.2.1'],
                [82, '3.2.2'],
                [135, '3.2.3'],
                [9, '3.2.4'],
                [16, '3.2.5'],
                [12, '3.2.6'],
                [252, '3.2.7'],
                [34, '3.2.8'],
                [363, '3.2.9'],
                [9, '3.3.0'],
                [28, '3.3.1'],
                [17, '4.0.0'],
                [10, '4.0.1'],
                [15, '4.0.2'],
                [20, '4.0.3'],
                [52, '4.0.4'],
                [119, '4.0.5'],
                [87, '4.0.6'],
                [79, '4.0.7'],
                [4, '4.0.8'],
                [6, '4.0.9'],
                [249, '4.1.0'],
                [42, '4.1.1'],
                [25, '4.1.2'],
                [10, '4.1.3'],
                [1, '4.1.4'],
            ];
            break;
        case 'Template-Articulo':
            download_list_counter = [
                [23, '1.0.0'],
                [14, '1.0.1'],
                [8, '1.0.2'],
                [10, '1.0.3'],
                [7, '1.0.4'],
                [10, '1.0.5'],
                [10, '1.0.6'],
                [26, '1.0.7'],
                [11, '1.0.8'],
                [22, '1.0.9'],
                [20, '1.1.0'],
                [14, '1.1.1'],
                [19, '1.1.2'],
                [48, '1.1.3'],
                [13, '1.1.4'],
                [12, '1.1.5'],
                [159, '1.1.6'],
                [46, '1.1.7'],
                [9, '1.1.9'],
                [9, '1.2.0'],
                [9, '1.2.1'],
                [26, '1.2.2'],
                [38, '1.2.3'],
                [33, '1.2.4'],
                [35, '1.2.5'],
                [44, '1.2.6'],
                [54, '1.2.7'],
                [9, '1.2.8'],
                [7, '1.2.9'],
                [5, '1.3.0'],
                [11, '1.3.1'],
                [71, '1.3.2'],
                [40, '1.3.3'],
                [11, '1.3.4'],
                [113, '1.3.5'],
                [17, '1.3.6'],
                [83, '1.3.7'],
                [9, '1.3.8'],
                [9, '1.3.9'],
            ];
            break;
        case 'Template-Auxiliares':
            download_list_counter = [
                [13, '2.2'],
                [36, '2.4'],
                [14, '3.0'],
                [38, '3.1'],
                [12, '3.5.0'],
                [12, '4.0'],
                [14, '4.1.5'],
                [12, '4.1.6'],
                [12, '4.1.8'],
                [16, '4.2.1'],
                [15, '4.2.4'],
                [36, '4.2.5'],
                [23, '4.2.6'],
                [13, '4.2.7'],
                [21, '4.3.0'],
                [13, '4.3.2'],
                [12, '4.3.3'],
                [16, '4.3.4'],
                [24, '4.3.5'],
                [37, '4.3.7'],
                [27, '4.4.0'],
                [26, '4.4.1'],
                [37, '4.4.2'],
                [178, '4.4.3'],
                [16, '5.0.0'],
                [10, '5.0.4'],
                [24, '5.0.5'],
                [15, '5.0.8'],
                [15, '5.1.0'],
                [14, '5.1.4'],
                [22, '5.2.0'],
                [12, '5.2.1'],
                [74, '5.2.2'],
                [19, '5.2.6'],
                [10, '5.2.7'],
                [76, '5.2.8'],
                [19, '5.2.9'],
                [48, '5.3.0'],
                [23, '6.0.0'],
                [19, '6.0.1'],
                [15, '6.0.2'],
                [39, '6.0.3'],
                [31, '6.0.4'],
                [23, '6.0.5'],
                [24, '6.0.6'],
                [18, '6.0.7'],
                [35, '6.0.8'],
                [104, '6.0.9'],
                [55, '6.1.1'],
                [52, '6.1.2'],
                [28, '6.1.3'],
                [42, '6.1.4'],
                [19, '6.1.5'],
                [19, '6.2.0'],
                [22, '6.2.1'],
                [15, '6.2.2'],
                [20, '6.2.3'],
                [20, '6.2.4'],
                [67, '6.2.8'],
                [28, '6.2.9'],
                [23, '6.3.0'],
                [26, '6.3.3'],
                [20, '6.3.4'],
                [13, '6.3.7'],
                [17, '6.3.8'],
                [41, '6.4.0'],
                [19, '6.4.1'],
                [32, '6.4.2'],
                [84, '6.4.3'],
                [52, '6.4.5'],
                [23, '6.4.7'],
                [71, '6.4.8'],
                [11, '6.4.9'],
                [29, '6.5.0'],
                [56, '6.5.2'],
                [128, '6.5.3'],
                [37, '6.5.4'],
                [54, '6.5.5'],
                [16, '7.0.0'],
                [61, '7.0.1'],
                [147, '7.0.3'],
                [46, '7.0.4'],
                [43, '7.0.5'],
                [21, '7.0.6'],
                [19, '7.0.7'],
                [32, '7.0.8'],
                [42, '7.1.0'],
                [6, '7.1.1'],
                [14, '7.1.2'],
                [8, '7.1.3'],
                [43, '7.1.4'],
                [67, '7.1.5'],
                [46, '7.1.6'],
                [62, '7.1.7'],
                [37, '7.1.8'],
                [53, '7.1.9'],
                [23, '7.2.0'],
                [17, '7.2.1'],
                [20, '7.2.2'],
                [13, '7.2.3'],
                [12, '7.2.4'],
                [18, '7.2.6'],
                [8, '7.2.7'],
                [8, '7.2.8'],
                [9, '7.3.0'],
                [11, '7.3.1'],
                [9, '7.3.2'],
                [8, '7.3.3'],
                [11, '7.3.4'],
                [19, '7.3.5'],
                [15, '7.3.6'],
                [19, '7.3.7'],
                [12, '7.3.8'],
                [26, '7.3.9'],
                [16, '7.4.0'],
                [116, '7.4.1'],
                [11, '8.0.0'],
                [14, '8.0.1'],
                [7, '8.0.2'],
                [7, '8.0.3'],
                [6, '8.0.4'],
                [11, '8.0.5'],
                [27, '8.0.6'],
                [15, '8.0.7'],
                [40, '8.0.8'],
                [52, '8.0.9'],
                [19, '8.1.0'],
                [20, '8.1.1'],
                [61, '8.1.2'],
                [13, '8.1.3'],
                [9, '8.1.4'],
                [50, '8.1.5'],
                [243, '8.1.6'],
                [22, '8.1.7'],
                [12, '8.1.8'],
                [12, '8.1.9'],
                [14, '8.2.1'],
                [149, '8.2.2'],
                [99, '8.2.3'],
                [61, '8.2.4'],
                [129, '8.2.5'],
                [9, '8.2.6'],
                [20, '8.2.7'],
                [85, '8.2.8'],
                [9, '8.2.9'],
                [127, '8.3.0'],
                [17, '8.3.1'],
                [386, '8.3.2'],
                [11, '8.3.3'],
                [3, '8.3.4'],
            ];
            break;
        case 'Template-Controles':
            download_list_counter = [
                [12, '1.0.0'],
                [11, '1.0.6'],
                [15, '1.0.8'],
                [14, '1.1.3'],
                [23, '1.1.4'],
                [16, '1.1.5'],
                [14, '1.1.6'],
                [13, '1.1.8'],
                [13, '1.2.0'],
                [14, '1.2.1'],
                [14, '1.2.2'],
                [16, '1.2.3'],
                [20, '1.2.4'],
                [20, '1.2.6'],
                [21, '1.2.7'],
                [27, '1.2.8'],
                [62, '1.2.9'],
                [12, '2.0.0'],
                [11, '2.0.3'],
                [19, '2.0.5'],
                [14, '2.0.6'],
                [12, '2.0.8'],
                [4, '2.1.1'],
                [15, '2.1.5'],
                [11, '2.1.8'],
                [31, '2.1.9'],
                [12, '2.2.1'],
                [12, '2.2.2'],
                [33, '2.2.3'],
                [10, '2.2.4'],
                [18, '2.2.5'],
                [14, '3.0.0'],
                [11, '3.0.1'],
                [13, '3.0.2'],
                [19, '3.0.3'],
                [21, '3.0.4'],
                [18, '3.0.5'],
                [7, '3.0.6'],
                [12, '3.0.7'],
                [16, '3.0.8'],
                [27, '3.0.9'],
                [27, '3.1.1'],
                [15, '3.1.2'],
                [16, '3.1.3'],
                [20, '3.1.4'],
                [11, '3.1.5'],
                [16, '3.2.0'],
                [10, '3.2.1'],
                [11, '3.2.2'],
                [12, '3.2.3'],
                [11, '3.2.4'],
                [17, '3.2.8'],
                [20, '3.2.9'],
                [14, '3.3.0'],
                [16, '3.3.3'],
                [8, '3.3.4'],
                [12, '3.3.7'],
                [10, '3.3.8'],
                [13, '3.4.0'],
                [10, '3.4.1'],
                [16, '3.4.2'],
                [24, '3.4.3'],
                [29, '3.4.5'],
                [12, '3.4.7'],
                [22, '3.4.8'],
                [8, '3.4.9'],
                [8, '3.5.0'],
                [15, '3.5.1'],
                [41, '3.5.3'],
                [28, '3.5.4'],
                [35, '3.5.5'],
                [13, '4.0.0'],
                [46, '4.0.1'],
                [51, '4.0.3'],
                [25, '4.0.4'],
                [29, '4.0.5'],
                [20, '4.0.6'],
                [13, '4.0.7'],
                [32, '4.0.8'],
                [24, '4.1.0'],
                [5, '4.1.1'],
                [8, '4.1.2'],
                [7, '4.1.3'],
                [21, '4.1.4'],
                [22, '4.1.5'],
                [22, '4.1.6'],
                [16, '4.1.7'],
                [17, '4.1.8'],
                [46, '4.1.9'],
                [19, '4.2.0'],
                [20, '4.2.1'],
                [20, '4.2.2'],
                [12, '4.2.3'],
                [8, '4.2.4'],
                [18, '4.2.6'],
                [10, '4.2.7'],
                [10, '4.2.8'],
                [10, '4.3.0'],
                [8, '4.3.1'],
                [9, '4.3.2'],
                [7, '4.3.3'],
                [10, '4.3.4'],
                [10, '4.3.5'],
                [9, '4.3.6'],
                [9, '4.3.7'],
                [9, '4.3.8'],
                [4, '4.3.9'],
                [8, '4.4.0'],
                [46, '4.4.1'],
                [13, '5.0.0'],
                [14, '5.0.1'],
                [7, '5.0.2'],
                [10, '5.0.3'],
                [8, '5.0.4'],
                [10, '5.0.5'],
                [19, '5.0.6'],
                [12, '5.0.7'],
                [21, '5.0.8'],
                [29, '5.0.9'],
                [19, '5.1.0'],
                [11, '5.1.1'],
                [34, '5.1.2'],
                [10, '5.1.3'],
                [9, '5.1.4'],
                [12, '5.1.5'],
                [59, '5.1.6'],
                [13, '5.1.7'],
                [11, '5.1.8'],
                [8, '5.1.9'],
                [12, '5.2.0'],
                [58, '5.2.1'],
                [44, '5.2.3'],
                [13, '5.2.4'],
                [48, '5.2.5'],
                [5, '5.2.6'],
                [8, '5.2.7'],
                [7, '5.2.8'],
                [38, '5.2.9'],
                [34, '5.3.0'],
                [9, '5.3.1'],
                [144, '5.3.2'],
                [3, '5.3.3'],
                [3, '5.3.4'],
            ];
            break;
        case 'Template-Informe':
            download_list_counter = [
                [11, '1.8.5'],
                [14, '1.8.8'],
                [9, '1.8.9'],
                [12, '1.9.0'],
                [0, '1.9.1'],
                [9, '1.9.3'],
                [14, '1.9.5'],
                [0, '1.9.6'],
                [20, '1.9.7'],
                [18, '1.9.8'],
                [27, '1.9.9'],
                [12, '2.0.0'],
                [15, '2.0.1'],
                [15, '2.0.2'],
                [10, '2.0.3'],
                [32, '2.0.4'],
                [17, '2.0.6'],
                [13, '2.0.7'],
                [15, '2.1.0'],
                [13, '2.1.1'],
                [14, '2.1.2'],
                [64, '2.1.3'],
                [124, '2.1.8'],
                [85, '2.2.0'],
                [26, '2.2.2'],
                [12, '2.2.3'],
                [28, '2.2.4'],
                [20, '2.2.5'],
                [77, '2.2.6'],
                [81, '2.2.7'],
                [21, '2.2.8'],
                [20, '2.2.9'],
                [15, '2.3.0'],
                [43, '2.3.1'],
                [12, '2.3.2'],
                [70, '2.3.3'],
                [12, '2.3.4'],
                [28, '2.3.5'],
                [48, '2.3.6'],
                [17, '2.4.0'],
                [165, '3.0.0'],
                [81, '3.0.1'],
                [50, '3.1.0'],
                [51, '3.1.2'],
                [104, '3.1.3'],
                [23, '3.1.4'],
                [23, '3.1.5'],
                [33, '3.1.6'],
                [128, '3.2.0'],
                [53, '3.2.1'],
                [22, '3.3.7'],
                [29, '3.3.8'],
                [129, '3.4.0'],
                [75, '3.4.5'],
                [26, '3.5.7'],
                [28, '3.6.0'],
                [51, '3.6.1'],
                [21, '3.6.3'],
                [21, '3.6.5'],
                [28, '3.6.7'],
                [24, '3.7.0'],
                [21, '3.7.3'],
                [34, '3.7.4'],
                [24, '3.7.5'],
                [67, '3.7.7'],
                [54, '3.8.0'],
                [23, '3.8.5'],
                [24, '3.8.6'],
                [90, '3.8.7'],
                [51, '3.9.0'],
                [90, '3.9.1'],
                [70, '4.0.0'],
                [24, '4.0.1'],
                [36, '4.0.2'],
                [127, '4.0.5'],
                [31, '4.1.3'],
                [38, '4.2.0'],
                [27, '4.2.7'],
                [50, '4.2.8'],
                [48, '4.3.1'],
                [29, '4.3.3'],
                [139, '4.3.6'],
                [134, '4.3.7'],
                [117, '4.3.8'],
                [30, '4.4.3'],
                [29, '4.4.4'],
                [52, '4.4.5'],
                [201, '4.5.0'],
                [43, '4.5.5'],
                [61, '4.5.7'],
                [32, '4.6.0'],
                [86, '4.6.1'],
                [217, '4.6.2'],
                [188, '4.6.3'],
                [237, '4.6.6'],
                [108, '4.6.7'],
                [72, '4.6.8'],
                [411, '4.7.0'],
                [418, '4.7.1'],
                [728, '4.7.2'],
                [901, '4.7.3'],
                [797, '4.7.4'],
                [483, '5.0.0'],
                [590, '5.0.5'],
                [526, '5.1.1'],
                [576, '5.1.2'],
                [384, '5.1.5'],
                [605, '5.4.0'],
                [455, '5.4.5'],
                [496, '5.4.6'],
                [925, '5.4.7'],
                [519, '5.4.8'],
                [450, '5.5.0'],
                [325, '5.5.2'],
                [553, '5.5.3'],
                [675, '5.5.4'],
                [471, '5.5.5'],
                [844, '5.5.7'],
                [608, '6.0.0'],
                [488, '6.0.1'],
                [569, '6.0.2'],
                [513, '6.0.3'],
                [469, '6.0.6'],
                [1051, '6.1.0'],
                [400, '6.1.2'],
                [420, '6.1.3'],
                [379, '6.1.4'],
                [257, '6.1.5'],
                [426, '6.1.6'],
                [369, '6.1.7'],
                [382, '6.2.0'],
                [607, '6.2.1'],
                [1088, '6.2.2'],
                [760, '6.2.3'],
                [748, '6.2.4'],
                [822, '6.2.5'],
                [813, '6.2.6'],
                [440, '6.2.7'],
                [483, '6.3.0'],
                [486, '6.3.3'],
                [496, '6.3.5'],
                [454, '6.3.7'],
                [421, '6.4.0'],
                [771, '6.4.3'],
                [589, '6.4.4'],
                [522, '6.4.5'],
                [495, '6.5.0'],
                [407, '6.5.2'],
                [388, '6.5.5'],
                [413, '6.5.6'],
                [575, '6.5.7'],
                [379, '6.5.8'],
                [577, '6.6.0'],
                [954, '6.6.2'],
                [749, '6.7.0'],
                [647, '6.7.2'],
                [866, '6.7.3'],
                [373, '6.7.4'],
                [457, '6.8.0'],
                [850, '6.8.2'],
                [1274, '6.8.3'],
                [521, '6.8.4'],
                [604, '6.8.5'],
                [265, '7.0.0'],
                [813, '7.0.1'],
                [964, '7.0.3'],
                [538, '7.0.4'],
                [481, '7.0.5'],
                [268, '7.0.6'],
                [476, '7.0.7'],
                [501, '7.1.0'],
                [123, '7.1.1'],
                [240, '7.1.2'],
                [123, '7.1.3'],
                [486, '7.1.4'],
                [285, '7.1.5'],
                [219, '7.1.6'],
                [441, '7.1.7'],
                [394, '7.1.8'],
                [689, '7.1.9'],
                [376, '7.2.0'],
                [249, '7.2.1'],
                [411, '7.2.2'],
                [184, '7.2.3'],
                [175, '7.2.4'],
                [282, '7.2.6'],
                [157, '7.2.7'],
                [120, '7.2.8'],
                [159, '7.3.0'],
                [126, '7.3.1'],
                [158, '7.3.2'],
                [118, '7.3.3'],
                [206, '7.3.4'],
                [214, '7.3.5'],
                [150, '7.3.6'],
                [162, '7.3.7'],
                [155, '7.3.8'],
                [106, '7.3.9'],
                [144, '7.4.0'],
                [1013, '7.4.1'],
                [191, '8.0.0'],
                [345, '8.0.1'],
                [128, '8.0.2'],
                [141, '8.0.3'],
                [121, '8.0.4'],
                [180, '8.0.5'],
                [207, '8.0.6'],
                [363, '8.0.7'],
                [261, '8.0.8'],
                [597, '8.0.9'],
                [560, '8.1.0'],
                [284, '8.1.1'],
                [266, '8.1.2'],
                [606, '8.1.3'],
                [173, '8.1.4'],
                [198, '8.1.5'],
                [431, '8.1.6'],
                [1722, '8.1.7'],
                [376, '8.1.8'],
                [189, '8.1.9'],
                [170, '8.2.0'],
                [173, '8.2.1'],
                [469, '8.2.2'],
                [762, '8.2.3'],
                [714, '8.2.4'],
                [442, '8.2.5'],
                [356, '8.2.6'],
                [872, '8.2.7'],
                [100, '8.2.8'],
                [151, '8.2.9'],
                [106, '8.3.0'],
                [214, '8.3.1'],
                [760, '8.3.2'],
                [590, '8.3.3'],
                [156, '8.3.4'],
                [1216, '8.3.5'],
                [1170, '8.3.6'],
                [94, '8.3.7'],
                [72, '8.3.8'],
            ];
            break;
        case 'Template-Poster':
            download_list_counter = [
                [16, '1.0.0'],
                [8, '1.0.1'],
                [8, '1.0.2'],
                [10, '1.0.3'],
                [15, '1.0.4'],
                [13, '1.0.5'],
                [14, '1.0.6'],
                [11, '1.0.7'],
                [12, '1.0.8'],
                [13, '1.0.9'],
                [20, '1.1.0'],
                [11, '1.1.1'],
                [97, '1.1.2'],
                [19, '1.1.3'],
                [11, '1.1.4'],
                [9, '1.1.5'],
                [8, '1.1.6'],
                [20, '1.1.7'],
                [21, '1.1.8'],
                [23, '1.1.9'],
                [37, '1.2.0'],
                [7, '1.2.1'],
                [27, '1.2.2'],
                [58, '1.2.3'],
                [144, '1.2.4'],
                [7, '1.2.5'],
                [3, '1.2.6'],
            ];
            break;
        case 'Template-Presentacion':
            download_list_counter = [
                [161, '1.0.0'],
                [144, '1.0.1'],
                [62, '1.1.0'],
                [131, '1.1.1'],
                [131, '1.1.2'],
                [131, '1.1.3'],
                [126, '1.1.6'],
                [139, '1.1.7'],
                [121, '1.1.8'],
                [138, '1.2.0'],
                [117, '1.2.1'],
                [111, '1.2.3'],
                [117, '1.2.4'],
                [124, '1.2.5'],
                [150, '1.2.6'],
                [117, '1.2.7'],
                [134, '1.2.8'],
                [122, '1.2.9'],
                [21, '1.3.0'],
                [102, '1.3.1'],
                [58, '1.3.2'],
                [109, '2.0.0'],
                [110, '2.0.1'],
                [116, '2.0.2'],
                [118, '2.0.3'],
                [181, '2.0.4'],
                [172, '2.0.5'],
                [135, '2.0.6'],
                [103, '2.0.7'],
                [115, '2.0.8'],
                [117, '2.0.9'],
                [143, '2.1.0'],
                [139, '2.1.1'],
                [140, '2.1.2'],
                [222, '2.1.3'],
                [182, '2.1.4'],
                [163, '2.1.5'],
                [147, '2.1.6'],
                [142, '2.1.7'],
                [179, '2.1.8'],
                [124, '2.1.9'],
                [153, '2.2.0'],
                [171, '2.2.1'],
                [104, '2.2.2'],
                [107, '2.2.3'],
                [124, '2.2.4'],
                [238, '2.2.5'],
                [221, '2.2.6'],
                [322, '2.2.7'],
                [50, '2.2.8'],
                [39, '2.2.9'],
            ];
            break;
        case 'Template-Reporte':
            download_list_counter = [
                [27, '1.0.0'],
                [253, '1.1.0'],
                [200, '1.1.2'],
                [96, '1.1.3'],
                [182, '1.1.5'],
                [191, '1.1.6'],
                [201, '1.1.7'],
                [215, '1.1.8'],
                [125, '1.1.9'],
                [301, '1.2.0'],
                [243, '1.2.2'],
                [205, '1.2.3'],
                [234, '1.2.4'],
                [132, '1.2.5'],
                [165, '1.2.7'],
                [138, '1.2.8'],
                [319, '1.2.9'],
                [309, '1.3.0'],
                [353, '1.3.1'],
                [325, '1.3.2'],
                [166, '2.0.0'],
                [232, '2.0.1'],
                [274, '2.0.3'],
                [210, '2.0.4'],
                [184, '2.0.5'],
                [169, '2.0.6'],
                [175, '2.0.7'],
                [197, '2.0.8'],
                [212, '2.1.0'],
                [70, '2.1.1'],
                [84, '2.1.2'],
                [59, '2.1.3'],
                [107, '2.1.4'],
                [136, '2.1.5'],
                [132, '2.1.6'],
                [126, '2.1.7'],
                [155, '2.1.8'],
                [199, '2.1.9'],
                [156, '2.2.0'],
                [140, '2.2.1'],
                [89, '2.2.2'],
                [128, '2.2.3'],
                [128, '2.2.4'],
                [169, '2.2.6'],
                [111, '2.2.7'],
                [115, '2.2.8'],
                [136, '2.3.0'],
                [116, '2.3.1'],
                [107, '2.3.2'],
                [111, '2.3.3'],
                [124, '2.3.4'],
                [138, '2.3.5'],
                [110, '2.3.6'],
                [136, '2.3.7'],
                [124, '2.3.8'],
                [35, '2.3.9'],
                [106, '2.4.0'],
                [215, '2.4.1'],
                [108, '3.0.0'],
                [141, '3.0.1'],
                [107, '3.0.2'],
                [118, '3.0.3'],
                [115, '3.0.4'],
                [115, '3.0.5'],
                [167, '3.0.6'],
                [183, '3.0.7'],
                [160, '3.0.8'],
                [193, '3.0.9'],
                [149, '3.1.0'],
                [121, '3.1.1'],
                [122, '3.1.2'],
                [176, '3.1.3'],
                [110, '3.1.4'],
                [141, '3.1.5'],
                [149, '3.1.6'],
                [395, '3.1.7'],
                [58, '3.1.8'],
                [148, '3.1.9'],
                [153, '3.2.0'],
                [153, '3.2.1'],
                [188, '3.2.2'],
                [165, '3.2.3'],
                [173, '3.2.4'],
                [164, '3.2.5'],
                [152, '3.2.6'],
                [152, '3.2.7'],
                [88, '3.2.8'],
                [96, '3.2.9'],
                [108, '3.3.0'],
                [124, '3.3.1'],
                [192, '3.3.2'],
                [170, '3.3.3'],
                [81, '3.3.4'],
                [245, '3.3.5'],
                [234, '3.3.6'],
                [38, '3.3.7'],
                [32, '3.3.8'],
            ];
            break;
        case 'Template-Tesis':
            download_list_counter = [
                [277, '0.1.3'],
                [263, '1.0.0'],
                [113, '1.0.1'],
                [113, '1.0.5'],
                [227, '1.1.1'],
                [220, '1.1.2'],
                [224, '1.1.3'],
                [222, '1.1.5'],
                [227, '1.1.6'],
                [280, '1.1.7'],
                [251, '1.2.0'],
                [222, '1.2.1'],
                [282, '1.2.2'],
                [163, '1.2.3'],
                [189, '1.2.4'],
                [208, '1.2.5'],
                [332, '1.2.6'],
                [360, '1.2.7'],
                [350, '1.2.8'],
                [169, '2.0.0'],
                [253, '2.0.1'],
                [278, '2.0.3'],
                [178, '2.0.4'],
                [200, '2.0.5'],
                [177, '2.0.6'],
                [193, '2.0.7'],
                [220, '2.1.0'],
                [80, '2.1.1'],
                [101, '2.1.2'],
                [71, '2.1.3'],
                [209, '2.1.4'],
                [120, '2.1.5'],
                [122, '2.1.6'],
                [70, '2.1.7'],
                [167, '2.1.8'],
                [169, '2.1.9'],
                [195, '2.2.0'],
                [154, '2.2.1'],
                [142, '2.2.2'],
                [146, '2.2.3'],
                [142, '2.2.4'],
                [126, '2.2.5'],
                [176, '2.2.7'],
                [115, '2.2.8'],
                [116, '2.2.9'],
                [147, '2.3.0'],
                [117, '2.3.1'],
                [120, '2.3.2'],
                [112, '2.3.3'],
                [156, '2.3.4'],
                [192, '2.3.5'],
                [125, '2.3.6'],
                [144, '2.3.7'],
                [133, '2.3.8'],
                [47, '2.3.9'],
                [103, '2.4.0'],
                [461, '2.4.1'],
                [117, '3.0.0'],
                [162, '3.0.1'],
                [110, '3.0.2'],
                [117, '3.0.3'],
                [110, '3.0.4'],
                [135, '3.0.5'],
                [173, '3.0.6'],
                [198, '3.0.7'],
                [195, '3.0.8'],
                [142, '3.0.9'],
                [289, '3.1.0'],
                [181, '3.1.1'],
                [149, '3.1.2'],
                [151, '3.1.3'],
                [162, '3.1.4'],
                [323, '3.1.5'],
                [154, '3.1.6'],
                [178, '3.1.7'],
                [272, '3.1.8'],
                [765, '3.1.9'],
                [287, '3.2.0'],
                [182, '3.2.1'],
                [163, '3.2.2'],
                [174, '3.2.3'],
                [217, '3.2.4'],
                [146, '3.2.5'],
                [177, '3.2.6'],
                [90, '3.2.7'],
                [183, '3.2.8'],
                [243, '3.2.9'],
                [286, '3.3.0'],
                [347, '3.3.1'],
                [126, '3.3.2'],
                [153, '3.3.3'],
                [142, '3.3.4'],
                [194, '3.3.5'],
                [466, '3.3.6'],
                [279, '3.3.7'],
                [96, '3.3.8'],
                [633, '3.3.9'],
                [553, '3.4.0'],
                [56, '3.4.1'],
                [51, '3.4.2'],
            ];
            break;
    }

    let $tdownld;
    for (let $i = 0; $i < download_list_counter.length; $i++) {
        $tdownld = download_list_counter[$i][0];
        if (Array.isArray($tdownld)) {
            $downloads += ($tdownld[0] + $tdownld[1]);
        } else {
            $downloads += $tdownld;
        }
    }
    return $downloads;
}