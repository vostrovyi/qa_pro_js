/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 56.658318978642946, "KoPercent": 43.341681021357054};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5570868235304812, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5616480130355428, 500, 1500, "DELETE Character"], "isController": false}, {"data": [0.5559824867378824, 500, 1500, "POST Character"], "isController": false}, {"data": [0.5492873408878526, 500, 1500, "GET All Characters"], "isController": false}, {"data": [0.558293334787826, 500, 1500, "GET Character by ID"], "isController": false}, {"data": [0.5602488033052436, 500, 1500, "PUT Character"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1100105, 476804, 43.341681021357054, 153.53962576299807, 0, 333395, 2.0, 4.0, 6.0, 11110.960000000006, 2123.1031401558207, 8691.918624022139, 229.75591039321424], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["DELETE Character", 219707, 95969, 43.680447140965015, 59.99417405908632, 0, 33970, 1.0, 5.0, 8.0, 10281.0, 897.1734017183365, 1004.6190599120822, 108.16459335492144], "isController": false}, {"data": ["POST Character", 220176, 94802, 43.057372283990986, 156.6994222803554, 0, 34723, 1.0, 5.0, 9.0, 3789.0, 898.9894453177633, 1006.8813893340547, 110.48019051252476], "isController": false}, {"data": ["GET All Characters", 220442, 94333, 42.79266201540541, 317.00502626541277, 0, 333395, 145.0, 183.0, 200.0, 1365.0, 425.43311994966797, 6796.0728813453015, 37.79028817349018], "isController": false}, {"data": ["GET Character by ID", 220008, 95824, 43.55477982618814, 157.15145812879425, 0, 34085, 1.0, 5.0, 9.0, 588.9800000000032, 898.3291685040913, 1001.8503719700358, 81.13764674515532], "isController": false}, {"data": ["PUT Character", 219772, 95876, 43.6252115829132, 76.31235098192558, 0, 34130, 1.0, 5.0, 8.0, 174.9900000000016, 897.4461586207459, 997.8882233723039, 106.3800676960402], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 1629, 0.34164981837400693, 0.1480767744897078], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 789, 0.16547679969127777, 0.07172042668654356], "isController": false}, {"data": ["404/Not Found", 5418, 1.1363159705036032, 0.4924984433304094], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:3001 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Operation timed out", 13, 0.00272648719389938, 0.001181705382668018], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 467211, 97.9880621806864, 42.469673349362104], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 1744, 0.36576874355080913, 0.15853032210561718], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1100105, 476804, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 467211, "404/Not Found", 5418, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 1744, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 1629, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 789], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["DELETE Character", 219707, 95969, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 93103, "404/Not Found", 2315, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 476, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 58, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 13], "isController": false}, {"data": ["POST Character", 220176, 94802, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 93336, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 818, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 357, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 288, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:3001 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Operation timed out", 3], "isController": false}, {"data": ["GET All Characters", 220442, 94333, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 93911, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 419, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to localhost:3001 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Operation timed out", 3, "", "", "", ""], "isController": false}, {"data": ["GET Character by ID", 220008, 95824, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 93462, "404/Not Found", 1276, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 566, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 503, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 16], "isController": false}, {"data": ["PUT Character", 219772, 95876, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 93399, "404/Not Found", 1827, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 408, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Operation timed out", 232, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 8], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
