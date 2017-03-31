/*
 * Licensed under the Apache License, Version 2.0 Copyright 2017 Igor Strykhar,Ivan Kudinov,SMI2 LLC and other contributors
 */

'use strict';

class DrawGoogleMap extends DrawBasicChart {

    constructor(Widget, drawType) {
        super(Widget);

        this.type = drawType.toUpperCase();
        this.library = 'gmaps';
        this._map = false;
        this.mapOptions = {
            // center: {lat: -34.397, lng: 150.644},
            zoom: 4
        }


    }

    onResize() {
        if (this._map) {
            google.maps.event.trigger(this._map, 'resize');
        }
        // отправденна комманда resize
        // if (this.chart && this.init) {
        //     this.chart.resize();
        // }
    }


    preProcessor() {
        // загрузка карты
        this.loadGoogleMapJS(this);
    }

    afterLoadMapProcessor() {
        // карты загружены

        if (this.initChartByJsCode()) {
            this.init = true;
        }
        else {
            this.init = this.create();
        }

        if (this.getError()) {
            console.error(this.getError());

            this.chart.before("<p>" + this.getError() + "</p>");

            return false;
        }

        let drw = this.getDrawCommandObject();
        if (drw.raw) {
            this.options = _.merge(this.options, drw.raw);
        }


        if (this.isDark()) {
            // this.options.backgroundColor = '#404a59';
            // this.options.color = ['#1a4882','#dd4444', '#fec42c', '#80F1BE'];
        }
        // log
        console.info('preProcessor', this.init, this.options);

    }

    loadGoogleMapJS(callback) {
        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/load-docpage/


        if (window._sendGoogleMapLoad) {
            // уже отправили запрос на загрузку карты
            // @todo : rewrite &&& тут нужно дождаться когда _isGoogleMapLoaded=true

            this.afterLoadMapProcessor();

            //window.setTimeout(, 5000);

            return;
        }
        window._sendGoogleMapLoad = true;
        window._isGoogleMapLoaded = false;
        console.info("YA_MAP>Start load map : api-maps.yandex.ru");
        let sc = document.createElement('script');
        sc.type = 'text/javascript';
        sc.async = true; // SYNCHRONOUSLY
        // sc.src = 'https://api-maps.yandex.ru/2.1/?load=package.standard,package.clusters&mode=release&lang=ru-RU&ns=ymaps';
        sc.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCRQH39oyrPnfPPgADuOp0eSRsDHRUMyyY';
        sc.charset = 'utf-8';

        sc.onload = sc.onreadystatechange = function () {
            if (sc.readyState && sc.readyState !== "complete" &&
                sc.readyState !== "loaded") {
                return;
            }
            // если все загрузилось, то снимаем обработчик и выбрасываем callback
            sc.onload = sc.onreadystatechange = null;
            // ready & callback
            callback.afterLoadMapProcessor();
            window._isGoogleMapLoaded = true;

        };


        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(sc, s);

    }

    getDarkStyle() {

        return [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 13
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#144b53"
                    },
                    {
                        "lightness": 14
                    },
                    {
                        "weight": 1.4
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#08304b"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0c4152"
                    },
                    {
                        "lightness": 5
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b434f"
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b3d51"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#146474"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#021019"
                    }
                ]
            }
        ];
    }

    getLightStyle() {
        return [
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "hue": "#FFBB00"
                    },
                    {
                        "saturation": 43.400000000000006
                    },
                    {
                        "lightness": 37.599999999999994
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "stylers": [
                    {
                        "hue": "#FFC200"
                    },
                    {
                        "saturation": -61.8
                    },
                    {
                        "lightness": 45.599999999999994
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "hue": "#FF0300"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 51.19999999999999
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "hue": "#FF0300"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 52
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "hue": "#0078FF"
                    },
                    {
                        "saturation": -13.200000000000003
                    },
                    {
                        "lightness": 2.4000000000000057
                    },
                    {
                        "gamma": 1
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "hue": "#00FF6A"
                    },
                    {
                        "saturation": -1.0989010989011234
                    },
                    {
                        "lightness": 11.200000000000017
                    },
                    {
                        "gamma": 1
                    }
                ]
            }
        ];
    }

    create() {


        console.warn("CREATE");

        this._map = new google.maps.Map(this.widget.element[0], this.mapOptions);

        let st = this.getLightStyle();
        if (this.isDark()) {
            st = this.getDarkStyle()
        }
        this._map.setOptions({styles: st});
        let self = this;
        // Если это код не JS попробуем получить обьект
        let drw = this.getDrawCommandObject();

        let sets = {
            longitude: 'longitude',
            latitude: 'latitude',
            count: 'count',
            title: 'title'
        };

        let bounds = new google.maps.LatLngBounds();
        let max_value = 0;
        if (drw) {
            sets = Object.assign(sets, drw);
        }
        // ---------------------------------------------------------------------------
        this.data().forEach(function (itemOpt, i) {

            let v = parseInt(itemOpt[sets.count]);
            if (max_value < v) max_value = v;
            let myLatLng = {lat: itemOpt[sets.latitude], lng: itemOpt[sets.longitude]};

            let infowindow = false;


            if (itemOpt[sets.title]) {
                infowindow = new google.maps.InfoWindow({
                    content: '<div id="content" class="gmapInfo">' + itemOpt[sets.title] + '</div>',

                });
            }


            bounds.extend(myLatLng);
            let marker = new google.maps.Marker({
                position: myLatLng,
                map: self._map,
                title: 'Value:' + v,

            });
            if (infowindow) {
                marker.addListener('click', function () {
                    infowindow.open(this._map, marker);
                });
            }



        });


        this._map.fitBounds(bounds);
        this._map.panToBounds(bounds);

    }

}