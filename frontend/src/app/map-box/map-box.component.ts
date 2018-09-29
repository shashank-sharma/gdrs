import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';
import * as turf from '@turf/turf';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapBoxComponent implements OnInit{


  public truckLocation = [-83.093, 42.376];
  public warehouseLocation = [73.7979971, 18.5559074];
  public lastQueryTime = 0;
  public lastAtRestaurant = 0;
  public keepTrack = [];
  public currentSchedule = [];
  public currentRoute = null;
  public pointHopper: any = {};
  public pause = true;
  public speedFactor = 50;
  public restaurantIndex: any;

  public warehouse = turf.featureCollection([turf.point(this.warehouseLocation)]);
  public dropoffs = turf.featureCollection([]);
  public nothing = turf.featureCollection([]);


  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v9';
  lat = 18.5559074;
  lng = 73.7979971;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  ngOnInit() {
    console.log('loading');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [(this.lng + this.warehouseLocation[0]) / 2, (this.lat + this.warehouseLocation[1]) / 2]
        });
        const marker = document.createElement('div');
        marker.classList.add('truck');

        // Create a new marker
        const truckMarker = new mapboxgl.Marker(marker)
          .setLngLat([this.lng, this.lat])
          .addTo(this.map);

        this.truckLocation = [this.lng, this.lat];
      });
    }

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lat, this.lng]
    });

    this.map.on('load', () => {


      this.map.addSource('route', {
        type: 'geojson',
        data: this.nothing
      });

      this.map.addLayer({
        id: 'routeline-active',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': {
            base: 1,
            stops: [[12, 3], [22, 12]]
          }
        }
      }, 'waterway-label');







      this.map.on('click', (e) => {
        // When the map is clicked, add a new drop-off point
        // and update the `dropoffs-symbol` layer
        this.newDropoff(this.map.unproject(e.point));
        this.updateDropoffs(this.dropoffs);
      });




      this.map.addLayer({
        id: 'dropoffs-symbol',
        type: 'symbol',
        source: {
          data: this.dropoffs,
          type: 'geojson'
        },
        layout: {
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': 'marker-15',
        }
      });




      this.map.addLayer({
        id: 'warehouse',
        type: 'circle',
        source: {
          data: this.warehouse,
          type: 'geojson'
        },
        paint: {
          'circle-radius': 20,
          'circle-color': 'white',
          'circle-stroke-color': '#3887be',
          'circle-stroke-width': 3
        }
      });

// Create a symbol layer on top of circle layer
      this.map.addLayer({
        id: 'warehouse-symbol',
        type: 'symbol',
        source: {
          data: this.warehouse,
          type: 'geojson'
        },
        layout: {
          'icon-image': 'grocery-15',
          'icon-size': 1
        },
        paint: {
          'text-color': '#3887be'
        }
      });


      this.map.addLayer({
        id: 'routearrows',
        type: 'symbol',
        source: 'route',
        layout: {
          'symbol-placement': 'line',
          'text-field': '▶',
          'text-size': {
            base: 1,
            stops: [[12, 24], [22, 60]]
          },
          'symbol-spacing': {
            base: 1,
            stops: [[12, 30], [22, 160]]
          },
          'text-keep-upright': false
        },
        paint: {
          'text-color': '#3887be',
          'text-halo-color': 'hsl(55, 11%, 96%)',
          'text-halo-width': 3
        }
      }, 'waterway-label');


    });
  }

  buildMap() {

  }

  newDropoff(coords) {
    // Store the clicked point as a new GeoJSON feature with
    // two properties: `orderTime` and `key`
    const pt = turf.point(
      [coords.lng, coords.lat],
      {
        orderTime: Date.now(),
        key: Math.random()
      }
    );
    this.dropoffs.features.push(pt);
    this.pointHopper[pt.properties.key] = pt;

    const httpOptions = {
    };

    this.http.get(this.assembleQueryURL(), httpOptions).subscribe((data: any) => {
      console.log(data);
      let routeGeoJSON = turf.featureCollection([turf.feature(data.trips[0].geometry)]);
      if (!data.trips[0]) {
        routeGeoJSON = this.nothing;
      } else {
        // Update the `route` source by getting the route source
        // and setting the data equal to routeGeoJSON
        this.map.getSource('route')
          .setData(routeGeoJSON);
      }

      if (data.waypoints.length === 12) {
        window.alert('Maximum number of points reached. Read more at mapbox.com/api-documentation/#optimization.');
      }
    }, (error) => {
      console.log(error);
    });
  }

  updateDropoffs(geojson) {
    this.map.getSource('dropoffs-symbol')
      .setData(geojson);
  }

  assembleQueryURL() {

    // Store the location of the truck in a variable called coordinates
    const coordinates = [this.truckLocation];
    const distributions = [];
    this.keepTrack = [this.truckLocation];

    // Create an array of GeoJSON feature collections for each point
    const restJobs = this.objectToArray(this.pointHopper);

    // If there are actually orders from this restaurant
    if (restJobs.length > 0) {

      // Check to see if the request was made after visiting the restaurant
      const needToPickUp = restJobs.filter((d, i) => {
        return d.properties.orderTime > this.lastAtRestaurant;
      }).length > 0;

      // If the request was made after picking up from the restaurant,
      // Add the restaurant as an additional stop
      if (needToPickUp) {
        this.restaurantIndex = coordinates.length;
        // Add the restaurant as a coordinate
        // coordinates.push(this.warehouseLocation);
        // push the restaurant itself into the array
        this.keepTrack.push(this.pointHopper.warehouse);
      }

      restJobs.forEach((d, i) => {
        // Add dropoff to list
        this.keepTrack.push(d);
        coordinates.push(d.geometry.coordinates);
        // if order not yet picked up, add a reroute
        if (needToPickUp && d.properties.orderTime > this.lastAtRestaurant) {
          distributions.push(this.restaurantIndex + ',' + (coordinates.length - 1));
        }
      });
    }


    console.log(coordinates);

    // Set the profile to `driving`
    // Coordinates will include the current location of the truck,
    return 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/' + coordinates.join(';') + ';' + this.warehouseLocation[0] + ',' + this.warehouseLocation[1] + '?overview=full&steps=true&annotations=duration,distance,speed&geometries=geojson&source=first&destination=last&roundtrip=false&access_token=' + mapboxgl.accessToken;
  }

  objectToArray(obj) {
    const keys = Object.keys(obj);
    const routeGeoJSON = keys.map(function(key) {
      return obj[key];
    });
    return routeGeoJSON;
  }



}
