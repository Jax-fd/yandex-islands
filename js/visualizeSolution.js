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
        //Отключаем кнопку
        $('#start').attr('disabled','disabled');
        //Обнуляем результат
        $('.map__res_value').text('0');

        //Инициализация переменных
        var count=0;					//Количество островов
        var index = 0;				//Уникальный индекс
        var zero = 0;					//1 - нет воды на карте, 0 - есть
        var isl_del;
        var islands = [];			//массив массивов координат каждого острова
        var m = map.length;		//длинна (y)
        var n = map[0].length;//ширина (x)
        var map2 = [];				//Вспомогательный массив
        var interval = 500;		//интервал между итерациями
        var delay = false;		//дополнительная задержка - если объединение островов

        //Инциализируем 2й массив нулями
        for (var y=0; y < m; y++) {
            map2.push([]);
            for (var x=0; x < n; x++) { 
                map2[y].push(0);
            }
        }

        //Функция, выполненяющая одну итерацию
        const pickOutCell = (y,x) => new Promise((resolve, reject) => {
        		$('.map__cell').css("transition-duration", interval * 0.1 * 0.001 +'s');
            setTimeout(() => {
                addLog("y: " + y + "; x: " + x, 0, y, x);
                
                interval = document.getElementById("speed_slider").value;
                document.getElementById("speed_old").innerText = interval;
                
                delay = false;
                if(map[y][x] == 1){  //если текущий элемент 1
									addLog('Текущий элемент - остров.',1);
									
									//добавляем и двигаем стрелку вверх, убираем
									$('[yx="' + y + '_' + x + '"]').append('<div id="ar_up_'+y+'_'+x+'" class="arrow_up"><i> <i class="fas fa-arrow-up"></i></i></div>');
	                setTimeout(function(){
	                	$('#ar_up_'+y+'_'+x).css({"transition-duration": interval * 0.5 * 0.001 +'s',"margin-top":"-75px",});
	                },10);
	                setTimeout(function(){
	                	$('#ar_up_'+y+'_'+x).css("display","none");
	                }, interval * 0.5);

	                //добавляем и двигаем стрелку влево, убираем
	                $('[yx="' + y + '_' + x + '"]').append('<div id="ar_left_'+y+'_'+x+'" class="arrow_left"><i> <i class="fas fa-arrow-left"></i></i></div>');
	                setTimeout(function(){
	                	$('#ar_left_'+y+'_'+x).css({"transition-duration": interval * 0.5 * 0.001 +'s',"margin-left":"-40px",});
	                },10);
	                setTimeout(function(){
	                	$('#ar_left_'+y+'_'+x).css("display","none");
	                }, interval * 0.5);

                  	//если есть верхний элемент и равен 1
                    if((y-1 >-1) && (map[y-1][x] == 1)){ 
                    			//изменяем текущую ячейку в втором массиве: воду на остров
				                	setTimeout(function(){
				                    $('[m2_yx="' + y + '_' + x + '"]').removeClass("map__cell_water");
				                    $('[m2_yx="' + y + '_' + x + '"]').addClass("map__cell_island");
				                  }, interval * 0.5);

                    			//окрашиваем стрелку up в желтый
                          setTimeout(function(){
                    				$('#ar_up_'+y+'_'+x+' svg').css('color','#c4a000');
                    				addLog("Сверху есть остров.",1);
                  				}, interval * 0.17);
                          
                          //присоединяем: текущему присваиваем общее значение острова с верхнего
                          map2[y][x] = map2[y-1][x];
                          setTimeout(function(){
                          	$('[m2_yx="' + y + '_' + x + '"]').text(map2[y-1][x]);
                          	addLog("Присоединяем текущий остров к верхнему:",1);
                          	addLog("Текущему элементу во 2-м массиве ставим индекс верхнего",1);
                          }, interval * 1.0);

                          //добавляем текущий элемент к верхнему острову - записываем координаты
                          islands[map2[y-1][x]].push({'x' : x, 'y' : y});

                        //если есть и боковой элемент равный 1, и его номер не совпадает с верхним, то соединяем два острова
                          if( (x-1 >-1) && (map[y][x-1] == 1) && (map2[y][x-1] != map2[y-1][x]) ){
                          	//Уменьшаем количество островов
                          	count--;
                          	//устанавливаем флаг увеличения итерации
                          	delay = true;
                          	//окрашиваем стрелку left в желтый, уменьшаем количество островов
                          	setTimeout(function(){
                    					$('#ar_left_'+y+'_'+x+' svg').css('color','#c4a000');
                    					$('.map__res_value').text(count);
                    					addLog("Слева есть остров с другим индексом. <br>Объединяем два острова:",1);
                    					addLog('Уменьшаем счетчик островов(' + count + ')',1);
            				 				}, interval * 0.17 );

                          	//рисуем звено на текущей ячейке
                          	setTimeout(function(){
                          		$('[m2_yx="' + y + '_' + x + '"]').html('<i class="fas fa-link"></i>');
                          		addLog("Устанавливаем все ячейки левого острова значением из верхнего.",1);
                           	}, interval * 1.5 );
                          	
                          	//убираем звено возвращаем значение
                          	setTimeout(function(){
                          		$('[m2_yx="' + y + '_' + x + '"]').text(map2[y-1][x]);
                           	}, interval * 2.5 );

                            //Слияние: меняем 2-ю карту, перекидываем координаты всех точек одного острова(левого) в другой (верхний)
                            var isl = islands[map2[y][x-1]]; //вытягиваем координаты левого острова
                            //помечаем индекс поглащаемого острова
                            isl_del = map2[y][x-1];
                            //перебор координат
                            islands[map2[y][x-1]].forEach(function(point,isl) {
                                map2[point['y']][point['x']] = map2[y-1][x];
                                //выделяем левый остров и устанавливаем в каждую ячейку индекс верхнего острова
                                setTimeout(function(){
                                	$('[m2_yx="' + point['y'] + '_' + point['x'] + '"]').text(map2[y-1][x]);
                                	$('[m2_yx="' + point['y'] + '_' + point['x'] + '"]').addClass("map__cell_select");
                                }, interval * 2.0 );
                                //снимаем выделение
                                setTimeout(function(){
                                	$('[m2_yx="' + point['y'] + '_' + point['x'] + '"]').removeClass("map__cell_select");
                                }, interval * 2.2 );
                                //выделяем 
                                setTimeout(function(){
                                	$('[m2_yx="' + point['y'] + '_' + point['x'] + '"]').addClass("map__cell_select");
                                }, interval * 2.3 );
                                //снимаем выделение
                                setTimeout(function(){
                                	$('[m2_yx="' + point['y'] + '_' + point['x'] + '"]').removeClass("map__cell_select");
                                }, interval * 2.5 );
                                //добавляем координату в текущий остров
                                islands[map2[y-1][x]].push(point);
                            });
                            //удаляем поглощенный остров без сдвига индексов
                            delete islands[isl_del];
                          }
                      }else{
                        if((x-1 >-1) && (map[y][x-1] == 1)){ //если есть боковой элемент
                        	
                        	//изменяем текущую ячейку в втором массиве: воду на остров
				                	setTimeout(function(){
				                    $('[m2_yx="' + y + '_' + x + '"]').removeClass("map__cell_water");
				                    $('[m2_yx="' + y + '_' + x + '"]').addClass("map__cell_island");
				                  }, interval * 0.5 );

                        	//окрашиваем стрелку в желтый
                          setTimeout(function(){
                    				$('#ar_left_'+y+'_'+x+' svg').css('color','#c4a000');
                    				addLog("Слева есть остров.",1);
                  				}, interval * 0.17 );

                          map2[y][x] = map2[y][x-1]; //присоединяем: текущему присваиваем общее значение острова с бокового
                          
                          setTimeout(function(){
                          	$('[m2_yx="' + y + '_' + x + '"]').text(map2[y][x-1]);
                          	addLog("Присоединяем текущий остров к боковому:",1);
                          	addLog("Текущему элементу во 2-м массиве ставим индекс бокового",1);
                          }, interval * 0.5 );
                          islands[map2[y][x-1]].push({'x' : x, 'y' : y});
                        }else{
                        	setTimeout(function(){
				                    $('[m2_yx="' + y + '_' + x + '"]').removeClass("map__cell_water");
				                    $('[m2_yx="' + y + '_' + x + '"]').addClass("map__cell_island");
				                  }, interval * 0.5 );
                          index++;
                          count++;
                          map2[y][x]=index;

                          setTimeout(function(){
                          	addLog("Сверху и слева островов нет.", 1);
                          	addLog('Увеличиваем счетчик островов(' + count + ')', 1);
                          	addLog('Увеличиваем уникальный индекс (' + index + ') и присваиваем его значение в текущую ячейку 2-го массива.', 1);
                          	$('.map__res_value').text(count);
                          	$('.index_val').text(index);
                          	$('[m2_yx="' + y + '_' + x + '"]').text(index);
                          }, interval * 0.5);

                          islands[index] = [];
                          islands[index].push({'x' : x, 'y' : y});
                        }
                    }
                }

                
                $('[yx="' + y + '_' + x + '"]').addClass("map__cell_select");
                setTimeout(function(){
                	$('[yx="' + y + '_' + x + '"]').removeClass("map__cell_select");
                	$('[m2_yx="' + y + '_' + x + '"]').addClass("map__cell_select");
                }, delay ? interval * 0.5 : interval * 0.5 );
                setTimeout(function(){
                    $('[m2_yx="' + y + '_' + x + '"]').removeClass("map__cell_select");
                    $('[yx="' + y + '_' + x + '"]').addClass("map__cell_checked");
                    addLog('<br>');
                }, delay ? interval * 3 : interval );

                
                resolve();
            }, delay ? interval*3 : interval );
        });
        const addCount = (m = 0, n = 0, y = 0, x = 0) => {
            if (x > n-1) {
                x=0;
                y++;
                if(y > (m-1) ){
	                	setTimeout(function(){
	                    addLog("Конец выполнения.");
	                    addLog("Количество найденых островов: " + count);
										}, delay ? interval*3 : interval );                   
                    return Promise.resolve();    
                }
            }
            return new Promise((resolve, reject) => {
                pickOutCell(y,x).then(() => addCount(m, n, y, x+1));
            });
        };

        //Запускаем цикл промисов
        addCount(m,n);
    }

    //функция вывода сообщений в лог
    var log_elem = document.querySelector('#log');
    function addLog(msg,depth,y,x,end){
    	var html = log_elem.innerHTML;
    	html += '<p ';
    	if(y!=null && x!=null){
  			html+='id="log_' + y + '_' + x + '" ';
  		}
    	html += 'style="padding-left:'+ 10*depth + 'px">' + msg + '</p>';
    	//if(end){html +='</p><br>';};
    	log_elem.innerHTML = html;
			log_elem.scrollTop = log_elem.scrollHeight;
			
			//Устанавливаем лог
		  $( '[id^="log_"]').hover(
        function() {
            	$('.map__cell').removeClass('map__cell_select_log');
          		$( '[id^="log_"]').css('color','#0f0');
            	$('#'+this.id).css('color','#fff');
            	$('[m2_yx=' + this.id.substring(4) + ']').addClass('map__cell_select_log');
        },
        function() {
            //$('[m2_yx=' + this.id.substring(4) + ']').removeClass('map__cell_select_log');
        }
  		);
			$( '[id="log"]').hover(
        function() {},
        function() {
        	$( '[id^="log_"]').css('color','#0f0');
        	$('.map__cell').removeClass('map__cell_select_log');
        }
      );
    }

    var start_btn = document.querySelector('#start');
    start_btn.addEventListener('click', function(){visualizeSolution(map)});

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
