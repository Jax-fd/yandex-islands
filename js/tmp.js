var map=[
          [0, 0, 1, 0],
          [1, 0, 1, 1],
          [0, 0, 0, 1],
          [1, 0, 0, 0],
          [0, 1, 0, 0]
        ];

var map2=[
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];

var map3=[
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
ind=1;
ind2=1;
for (var x = 0; x <= n-1; x++) {
  for (var y = 0; y <= m-1; y++) {
    if(map[x][y] == 1){
      if (map3[x][y] == 0){
        map2[x][y]=ind2;
        map3[x][y]=1;
      }
      ind2=map2[x][y];
      four_near(map,map2,map3,x,y,n,m,ind,ind2);
    }
  }
}

function four_near(map, map2, map3, x, y, n, m, ind,ind2){
  if( (x > -1) && (y > -1) && (x < n) && (y < m) ){
    if(map[x,y]==1){ 
      if(map3[x,y]==0){
        map2[x,y]=ind;
      }else{
        map3[x][y]=1;
        map2[x][y]=ind2;
      }
    }
  }
}
function checkTopAndLeft(){
  switch (top*10+left){
    case  0: map2[x][y] = ind; break;
    case 10: map2[x][y] = map2[x-1][y]; break;
    case  1: map2[x][y] = map2[x][y-1]; break;
    case 11: 
      if(map2[x-1][y] != map2[x][y-1]){

      }
        break;
  }
}
function rewriteIsland(islands, ind, value){
  for (var i = 0; i < length(islands[ind]); i++) {
    islands[ind][i]=value
    map2[islands[ind][i]['x']][islands[ind][i]['y']]=value;
  }
  for (var i = 0; i < length(islands[ind]); i++) {
}
islands[
        [//первый остров
          [//первая координата острова
            'x' => 1,
            'y' => 4
          ],
          [
            'x' => 1,
            'y' => 3
          ],
          ...
        ],
        [...],
        [...],
        ...
]