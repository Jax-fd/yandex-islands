<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Острова</title>
    <meta name="description" content="shri islands">

    <link rel="stylesheet" href="css/main.css">
</head>
<body style="margin:20px">
   <?

   /* Описание решения
      Содается дополнительный массив с хранением остравов с уникальными индексами. 
      */
   $map = array();
   $map2 = array();
   switch( 0 ){
    case 0: 
      $map =  [
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1],
              ];

      //массив отделения уникальности островов
      $map2 = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
              ];
      $n = count($map[0]);
      $m = count($map);
      break;

    case 1:
      $map =  [
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
              ];
      $map2 = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ];
      break;
    
    case 2: 
      $m = 5; $n = 5;
      for ($y=0; $y < $m; $y++) { 
        $map[]=array();
        $map2[]=array();
        for ($x=0; $x < $n; $x++) { 
          $map[$y][] = rand(0,1);
          $map2[$y][] = 0;
        }
      }
      break;
   }
  
    echo 'ширина:' . $n . '<br>';
    echo 'высота:' . $m . '<br>';
 
  $islands = [];
 
 /* $islands = [
              [//первый остров
                ['x' => 1, 'y' =>3],
                ['x' => 2, 'y' =>4]
              ],
              [//второй остров
                ['x' => 2, 'y' =>3],
                ['x' => 3, 'y' =>4]
              ],
             ];*/

   /* array_push($islands,[//второй остров
                ['x' => 2, 'y' =>3],
                ['x' => 3, 'y' =>4]
              ] );*/
    /*echo "<pre>";
    print_r($islands);
    echo "</pre>";*/
    //echo $islands[1][1]['x'];

   
   
    echo '<div style="margin-left:250px; position:fixed">';
    for ($y=0; $y < $m; $y++) { 
      for ($x=0; $x < $n; $x++) { 
        echo " ".$map[$y][$x]." ";
      }
      echo "<br>";
    }
    echo '</div>';
    echo "<br>";
    $index = 0;
    //$indexEx = 1;
    for ($y=0; $y < $m; $y++) { 
      for ($x=0; $x < $n; $x++) { 
        echo 'y: ' . $y . ' | ';
        echo 'x: ' . $x . '<br>';
        if($map[$y][$x] == 1){  //если текущий элемент 1
          if(($y-1 >-1) && ($map[$y-1][$x] == 1)){ //если есть верхний элемент и равен 1

              //присоединяем: текущему присваиваем общее значение острова с верхнего
              $map2[$y][$x] = $map2[$y-1][$x]; 
              //добавляем текущий элемент к верхнему острову - записываем координаты
              $islands[$map2[$y-1][$x]][] = ['x' => $x, 'y' =>$y];
              //если есть и боковой элемент равный 1, а номер острова не совпадает с верхним, то соединяем два острова
              if( ($x-1 >-1) && ($map[$y][$x-1] == 1) && ($map2[$y][$x-1] != $map2[$y-1][$x]) ){ 
                //помечаем индекс поглащаемого острова
                $isl_del = $map2[$y][$x-1];
                //Слияние: меняем доп карту, перекидываем координаты одного острова(бокового) в другой (верхний)
                foreach ($islands[$map2[$y][$x-1]] as $point) { 
                  $map2[$point['y']][$point['x']] = $map2[$y-1][$x];
                  $islands[$map2[$y-1][$x]][] = $point;
                }
                //echo $isl_del;
                unset($islands[$isl_del]);
              }
          }else{
            if(($x-1 >-1) && ($map[$y][$x-1] == 1)){ //если есть боковой элемент
              $map2[$y][$x] = $map2[$y][$x-1]; //присоединяем: текущему присваиваем общее значение острова с бокового
              $islands[$map2[$y][$x-1]][] = ['x' => $x, 'y' =>$y];
            }else{
              $index++;
              $map2[$y][$x]=$index;
              $islands[$index][] = ['x' => $x, 'y' =>$y];
              /*array_push($islands[$index],
                                    ['x' => $x, 'y' =>$y]
                                  );*/

            }
          }
        }
       /* for ($i=0; $i < $m; $i++) { 
          for ($j=0; $j < $n; $j++) { 
            if($i==$y and $j==$x){
              echo "<b> ".$map2[$i][$j]."</b> ";
            }else{
              echo " ".$map2[$i][$j]." ";  
            }
            
          }
          echo "<br>";
        }
        echo "<pre>";
        print_r($islands);
        echo "</pre>";*/

      }
      echo "<br>";
    }
    for ($y=0; $y < $m; $y++) { 
      for ($x=0; $x < $n; $x++) { 
        echo " ".$map2[$y][$x]." ";
      }
      echo "<br>";
    }

    //подсчитываем количество уникальных значений
    $array_map2 = [];
    for ($y=0; $y < $m; $y++) { 
      for ($x=0; $x < $n; $x++) { 
        $array_map2[] = $map2[$y][$x];
      }
    }
    print_r($array_map2);
    echo "<br>";
    print_r(array_unique($array_map2));
    echo "<br>";
    $result = count(array_unique($array_map2))-1;

    echo 'Всего островов: ' . $result . '<br>';
    
    echo "<pre>";
    print_r($islands);
    echo "</pre>";
   ?>
   
</body>
</html>
