(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    var map = root.SHRI_ISLANDS.MAP;
    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(map) {
        // todo: визуализировать работу алгоритма
        var count=0;
        var index = 0;
        var zero = 0;
        var isl_del;
        var islands = [];
        var m = map.length;//длинна (y)
        var n = map[0].length;//ширина (x)
        var map2 = [];
        for (var y=0; y < m; y++) {
            map2.push([]);
            for (var x=0; x < n; x++) { 
                map2[y].push(0);
            }     
        }

        const pickOutCell = (y,x) => new Promise((resolve, reject) => {
            setTimeout(() => {
                
                /*$('.map .map__row:nth-child('+ y +') .map__cell:nth-child('+ x +')').css("border-color","red");*/
                $('[yx="' + y + '.' + x + '"]').addClass("map__cell_select");
                setInterval(function(){
                    $('[yx="' + y + '.' + x + '"]').removeClass("map__cell_select");
                }, 500);

                console.log('y:' + y +"; x: "+ x);
                resolve();
            }, 500);
        });
        const addCount = (m = 0, n = 0, y = 1, x = 1) => {
            if (x > n) {
                x=1;
                y++;
                if(y > (m+1) ){
                    console.log("end");
                    return Promise.resolve();    
                }
                
            }
            return new Promise((resolve, reject) => {
                pickOutCell(y,x).then(() => addCount(m, n, y, x+1));
            });
        };

        addCount(m,n);


       /* for (var y=2; y <= m+1; y++) {
            
            for (var x=1; x <= n; x++) { 
                $('.map .map__row:nth-child('+ y +') .map__cell:nth-child('+ x +')').css("border-color","red");
                console.log('y:' + y +"; x: "+ x);
            }     
        }*/
        /*$('.map .map__row:nth-child(2) .map__cell:nth-child(2)').css("border-color","red");*/
        /*$('[class^="map__cell"').css("border-color","red");*/
    }

    

    var start_btn = document.querySelector('#start');
    start_btn.addEventListener('click', function(){visualizeSolution(map)});

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
