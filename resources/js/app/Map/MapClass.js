'use strict';

let maps, clusterer, coordinates = [];

export default class MapClass {

    /**
     * Map Container Init
     */
    constructor() {
        window.addEventListener('load', () => {
            this.map = new ymaps.Map("map", {
                center: [42.885079, 74.591314],
                zoom: 11,
                controls: ['fullscreenControl'],
            });

            this.map.container.fitToViewport();

            this.clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            });

            this.map.options.set('maxZoom', 11);
        });
    }

    /**
     * Clear Map from objects
     */
    static clear() {
        this.map.geoObjects.removeAll();
    }

    /**
     * get distance
     */
    static distance(route) {
        return ymaps.route(route, {mapStateAutoApply:true})
    }

    /**
     * get sugges
     */
    static suggest(val) {
        return ymaps.suggest(val)
    }

    /**
     * build route in map
     */
    buildRoute(route) {
    }


























    /**
     * create i Maps
     */
    static create(tag) {
        maps = new ymaps.Map(tag, {
            center: [42.885079, 74.591314],
            zoom: 11,
            controls: [],
        });
        maps.container.fitToViewport();

        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        maps.options.set('maxZoom', 11);
    }


    /**
     * показать объект на карте
     */
    static showObject(data) {

        let geoObjects = [];

        for(let key in data) {
            this.getCoordinates(data[key].location).then(response => {
                clusterer.add(new ymaps.Placemark(response, this.dataTemplate(data[key]), this.dataOptions()));
                maps.geoObjects.add(clusterer);
                maps.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true
                });
            })
        }
    }

    /**
     * clasterer event
     */
    static clasterer() {
        // Можно слушать сразу несколько событий, указывая их имена в массиве.
        clusterer.events.add(['mouseenter', 'mouseleave'], function (e) {
            var target = e.get('target'),
                type = e.get('type');
            if (typeof target.getGeoObjects != 'undefined') {
                // Событие произошло на кластере.
                if (type == 'mouseenter') {
                    target.options.set('preset', 'islands#invertedPinkClusterIcons');
                } else {
                    target.options.set('preset', 'islands#invertedVioletClusterIcons');
                }
            } else {
                // Событие произошло на геообъекте.
                if (type == 'mouseenter') {
                    target.options.set('preset', 'islands#pinkIcon');
                } else {
                    target.options.set('preset', 'islands#violetIcon');
                }
            }
        });
    }

    /**
     * get data coordinates
     */
    static async getCoordinates(routes) {
        let value = ymaps.geocode(routes).then(res => {
            return res.geoObjects.get(0).geometry.getCoordinates();
        });
        /**
         * Ищем координаты указанного адреса
         */
        let coordinates = await value;

        return coordinates;
    }

    /**
     * Формируем кластер для вывода на карте
     */
    static geoObjects(data, coord) {
        return new ymaps.Placemark(
            coord,
            this.dataTemplate(data),
            this.dataOptions(),
        )
    }


    static dataOptions() {
        return {
            preset: 'islands#violetIcon'
        };
    }

    /**
     * Шаблоны карточек
     * --------------------------------------------
     * --------------------------------------------
     */

    static dataTemplate(data) {
        return {
            balloonContentBody: `<li class="mb-4 w-100 maps-card">
                                    <div class="card-temp col-12 m-0 p-0">
                                        <div class="row card-header position-relative">
                                            <div class="col-8 px-2 h-100">
                                                <p class="title-app">
                                                    ${this.username(data.user)}
                                                </p>
                                            </div>
                                            <div class="col-4 px-2 pt-1 text-right dropdown h-100">
                                                <div class="bookmarks d-inline-block mr-2">
                                                    <i aria-hidden="true" class="fa fa-bookmark-o"></i>
                                                </div>
                                            </div>
                                            <div class="app-date position-absolute">${data.created_at}</div>
                                        </div>
                                        <div class="row card-body">
                                            <div class="col-12 px-2">
                                                <div class="row country py-2 pr-4 mx-0">
                                                    ${this.routesValue(data)}
                                                </div>
                                            </div>
                                            <div class="col-12 px-2">
                                                <div class="row w-100 description m-0">
                                                    <div class="col-4 pl-0 d-flex align-items-center">
                                                        <p class="h6 mb-0">
                                                            <small class="h-100 text-bottom f-11">Описание:</small>
                                                        </p>
                                                    </div>
                                                    <div class="col-8 px-0">
                                                        <p class="text-truncate mb-0">
                                                            ${data.description}
                                                        </p>
                                                    </div>
                                                </div>
                            
                                                <div class="row w-100 short-description m-0">
                                                    <div class="col-6 pl-0 d-flex align-items-center">
                                                        <p class="h6 mb-0">
                                                            <small class="h-100 text-bottom f-11">Расстояние/Ставка:</small>
                                                        </p>
                                                    </div>
                                                    <div class="col-6 p-0 text-right">
                                                        <p class="text-truncate mb-0">
                                                            ${data.distance}
                                                            <small class="price">${data.price} ${data.currency}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row card-footer"></div>
                                    </div>
                                </li>`,
            clusterCaption: `<p class="text-truncate w-100 mb-0" style="width: 100px;">${this.titleCard(data)}</p>`,
        }
    }

    static titleCard(data) {
        if (data.cars) {
            return data.cars.model.join(', ');
        }
        else {
            return data.shipment.model.join(', ')
        }
    }

    static advertsType(data) {
        if (data.cars) {
            return data.cars.model.join(', ')+ ' '+ data.cars.carcass.join(', ')+ ' '+ data.cars.description
        }
        else {
            return data.shipment.model.join(', ')+ ' '+ data.shipment.carcass.join(', ')+ ' '+ data.shipment.description
        }
    }

    static routesValue(data) {
        let routes = `<div class="col-6 position-relative pr-0 mr-1 first"><p class="m-0 text-left">${ data.location }</p><div class="arrow-left position-absolute"></div></div>`;

        if (data.intermediate)  {
            for (let key in data.intermediate) {
                routes += `<div class="col-6 position-relative middle mr-1"><p class="m-0 text-left">${ intermediate[key] }</p><div class="arrow-left position-absolute"></div><div class="arrow-right position-absolute"></div></div>`;
            }
        }

        if (data.destination != '' && data.destination != null) {
            routes += `<div class="col-6 position-relative last"><p class="m-0 text-left text-truncate">${ data.destination }</p><div class="arrow-left position-absolute"></div><div class="arrow-right position-absolute"></div></div>`;
        }

        return routes;
    }

    static username(user) {
        if (user.name)
            return user.name;
        else if (user.phone)
            return user.phone
        else if(user.email)
            return user.email
    }


    /*/!**
     * Функция возвращающая координаты города, страны и т.д.
     * не обходимо передать название города, страны и т.д.
     *
     * @param name
     *!/
    async getCoordinate(name) {
        let value = ymaps.geocode(name).then(res => {
            return res.geoObjects.get(0).geometry.getCoordinates();
        });
        /!**
         * Ищем координаты указанного адреса
         *!/
        let coordinates = await value;

        return coordinates;
    }

    /!**
     * Load objects data to map
     *!/
    static addObjects(data) {
        window.addEventListener('load', () => {
            for(let key in data) {
                this.getCoordinate(data[key].location).then(resolve => {
                    this.clusterer.add(new ymaps.Placemark(resolve, this.getTemplateObject()));
                    this.map.geoObjects.add(this.clusterer);
                    this.map.setBounds(this.clusterer.getBounds(), {
                        checkZoomRange: true
                    });

                })
            }
        })
    }

    */
}
