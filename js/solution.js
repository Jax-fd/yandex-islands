(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */

     function rand() {
        var i = Math.random()
        if(i>0.5){
            return 1;
        }else{
            return 0;
        }
    }
    function solution(map) {
        // todo: подсчитать кол-во островов на карте
        var count=0;
        var index = 0;
        var zero = 0;
        var isl_del;
        var islands = [];

        switch (0){
            //работа с исходным массивом
            case 0: 
                var n = map[0].length;//ширина
                var m = map.length;//длинна
                var map2 = [];
                for (var y=0; y < m; y++) {
                    map2.push([]);
                    for (var x=0; x < n; x++) { 
                        map2[y].push(0);
                    }     
                }
                break;
            //работа с рандомным массивом
            case 1:
                var n = 10;//ширина
                var m = 8;//длинна
                var map = [];
                var map2 = [];
                for (var y=0; y < m; y++) {
                    map.push([]);
                    map2.push([]);
                    for (var x=0; x < n; x++) { 
                        map[y].push(rand());
                        map2[y].push(0);
                    }     
                }
                break;
        }

        for (var y=0; y < m; y++) { 
            for (var x=0; x < n; x++) { 
                if(map[y][x] == 1){  //если текущий элемент 1
                    if((y-1 >-1) && (map[y-1][x] == 1)){ //если есть верхний элемент и равен 1

                          //присоединяем: текущему присваиваем общее значение острова с верхнего
                          map2[y][x] = map2[y-1][x]; 
                          //добавляем текущий элемент к верхнему острову - записываем координаты
                          islands[map2[y-1][x]].push({'x' : x, 'y' : y});
                          //если есть и боковой элемент равный 1, а номер острова не совпадает с верхним, то соединяем два острова
                          if( (x-1 >-1) && (map[y][x-1] == 1) && (map2[y][x-1] != map2[y-1][x]) ){ 
                            //помечаем индекс поглащаемого острова
                            isl_del = map2[y][x-1];
                            //Слияние: меняем доп карту, перекидываем координаты одного острова(бокового) в другой (верхний)
                            var tmp = islands[map2[y][x-1]];
                            islands[map2[y][x-1]].forEach(function(point,tmp) {
                                map2[point['y']][point['x']] = map2[y-1][x];
                                islands[map2[y-1][x]].push(point);
                            
                            });
                            //echo $isl_del;
                            delete islands[isl_del];
                          }
                      }else{
                        if((x-1 >-1) && (map[y][x-1] == 1)){ //если есть боковой элемент
                          map2[y][x] = map2[y][x-1]; //присоединяем: текущему присваиваем общее значение острова с бокового
                          islands[map2[y][x-1]].push({'x' : x, 'y' : y});
                        }else{
                          index++;
                          map2[y][x]=index;
                          islands[index] = [];
                          islands[index].push({'x' : x, 'y' : y});
                        }
                    }
                }

            }
        }//for end

        var msg = '';
        for (var y=0; y < m; y++) { 
            for (var x=0; x < n; x++) { 
               msg += " " + map[y][x] + " ";
            }
            msg += "<br>";
        }
        msg += "<br>";
        for (var y=0; y < m; y++) { 
            for (var x=0; x < n; x++) { 
               msg += " " + map2[y][x] + " ";
            }
            msg += "<br>";
        }

        //делаем из двухмерного массива одномерный
        array_map2 = [];
        for (var y=0; y < m; y++) { 
          for (var x=0; x < n; x++) { 
            array_map2.push(map2[y][x]);
            //ищем есть ли нули, нужно для дальнейшего подсчета остравов 
            if(zero == 0 && map2[y][x] == 0){
              zero = 1;
            }
          }
        }
        var result = [];

        nextInput:
          for (var i = 0; i < array_map2.length; i++) {
            var el = array_map2[i]; // для каждого элемента
            for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
              if (result[j] == el) continue nextInput; // если да, то следующий
            }
            result.push(el);
          }
        //если есть нули, то их онимаем
        if(zero == 1){
          count = result.length-1;
        }else{
          count = result.length;
        }
        
        if(1){//Дополнительная инфа
        document.getElementById("info-box").innerHTML='<br>' +
            'ширина:' + n + '<br>'+
            'высота:' + m + '<br>'+
            msg;
        }
        return count;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
