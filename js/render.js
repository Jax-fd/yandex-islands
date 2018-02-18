(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @param {string} [text] текст
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className, text, coordinates, map_num, html) {
        var elem = document.createElement(type);
        elem.className = className;
        if(coordinates){
            if(map_num == 1){
                elem.setAttribute('yx', coordinates);
            }else{
                elem.setAttribute('m2_yx', coordinates);
            }
        }
        if (text) {
            elem.innerText = text;
        }
        if (html){

            elem.innerHtml = html;
            console.log(elem.innerHtml); 
        }

        return elem;
    }

    /**
     * Создает визуализацию карты по его схеме
     *
     * @param {number[][]} map карта островов
     * @param {number} count кол-во островов
     * @returns {HTMLElement} HTML элемент
     */
    function render(map, count) {
        var containerElem = element('div', 'container'),
            map_1 = element('div', 'map'),
            map_2 = element('div', 'map_2'),
            rowElem_1,
            rowElem_2,
            type,
            row,
            cell,
            x,
            y;

        
        var map_res = element('div', 'map__res', 'Всего островов: ');
        map_res.appendChild(element('div','map__res_value',Number(count)));
        containerElem.appendChild(map_res);

        for (y = 0; y < map.length; y++) {
            row = map[y];
            rowElem_1 = element('div', 'map__row');
            rowElem_2 = element('div', 'map__row');
            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WATER:
                        type = 'water';
                        break;

                    case ISLAND:
                        type = 'island';
                        break;

                    default:
                        type = undefined;
                }

                rowElem_1.appendChild(
                    element('div', 'map__cell' + (type ? ' map__cell_' + type : ''),
                             type == "island" ? "1" : "0", 
                             (y).toString() + '_' + (x).toString(), 1 )
                );
                rowElem_2.appendChild(
                    element('div', 'map__cell map__cell_water', "0",
                             (y).toString() + '_' + (x).toString() )
                );
            }

            map_1.appendChild(rowElem_1);
            map_2.appendChild(rowElem_2);
        }
        containerElem.appendChild(map_1);
        containerElem.appendChild(map_2);
       /* containerElem.appendChild(element('br'));
        index = element('div', 'index');
        index.appendChild(element('i','fas fa-question-circle','Индекс уникальности:'));
        containerElem.appendChild(index);
        containerElem.appendChild(element('div', 'index_val', '0' ));*/
        return containerElem;
    }

    root.SHRI_ISLANDS.render = render;
})(this);
