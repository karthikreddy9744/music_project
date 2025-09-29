// app-client/common/directives/leafletMap.directive.js
(function () {
    'use strict';

    function leafletMap($timeout) {
        return {
            restrict: 'E',
            scope: {
                location: '=location' // Two-way binding for { latitude, longitude }
            },
            template: '<div id="mapid" style="height: 350px; width: 100%;"></div>',
            link: function (scope, element, attrs) {
                var map = null;
                var marker = null;
                const defaultCoords = [17.385044, 78.486671]; // Default (Lat, Lng)

                function initMap(lat, lng) {
                    // Ensure the map container is created before initializing Leaflet
                    $timeout(function() {
                        if (map) map.remove(); 
                        map = L.map('mapid').setView([lat, lng], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; OpenStreetMap contributors'
                        }).addTo(map);

                        marker = L.marker([lat, lng], { 
                            draggable: true,
                            title: "Drag to set location"
                        }).addTo(map);

                        marker.on('dragend', function() {
                            const newLatlng = marker.getLatLng();
                            scope.$apply(function() {
                                // Update the model: [lng, lat] for GeoJSON Point structure used in backend (Festival model)
                                scope.location.longitude = newLatlng.lng;
                                scope.location.latitude = newLatlng.lat;
                            });
                        });
                    }, 0);
                }

                scope.$watch('location', function(newVal) {
                    if (newVal && typeof newVal.latitude === 'number' && typeof newVal.longitude === 'number') {
                        const lat = newVal.latitude;
                        const lng = newVal.longitude;
                        
                        if (!map) {
                            initMap(lat, lng);
                        } else {
                            map.setView([lat, lng], map.getZoom());
                            marker.setLatLng([lat, lng]);
                        }

                    } else if (!map) {
                        // Init map with default coords if location data is missing
                        initMap(defaultCoords[0], defaultCoords[1]);
                    }
                }, true);
            }
        };
    }

    angular.module('musicProjectApp').directive('leafletMap', leafletMap);
    leafletMap.$inject = ['$timeout'];
})();