/* ============================================ */
/*                  INITIAL MAP                 */
/* ============================================ */

var map_init = L.map('map', {
  center: [9.082, 8.6753],
  zoom: 12,
});
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map_init);

var marker = L.marker([9.082, 8.6753]).addTo(map_init);
var Basemaps = {
  OSM: osm,
};
var Overlaymaps = {
  Marker: marker,
};
L.control.layers(Basemaps, Overlaymaps).addTo(map_init);

/* ============================================ */
/*                      DOM                     */
/* ============================================ */

const input = document.querySelector('.input input');
const btSubmit = document.querySelector('.input button');

const ipAddress = document.querySelector('.ip');
const locate = document.querySelector('.location');
const timeZone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');

/* ============================================ */
/*                   EVENT IP                   */
/* ============================================ */

btSubmit.addEventListener('click', handleCLick);

// click
function handleCLick() {
  if (!input.value) {
    console.error('please fill your IP ');
  } else {
    let URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_rGLjgwUjSt9NYiRaqtwCoA4XpfBZ0&ipAddress=${input.value}`;

    getLocation(URL);
  }
}

// fetch ve
function getLocation(link) {
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      renderDetail(data);
      console.log('getLocation -> data', data);
      renderMap(data);
    });
}

// render ra
function renderDetail(data) {
  ipAddress.innerHTML = data.ip;
  locate.innerHTML =
    data.location.country +
    ' ' +
    data.location.region +
    ' ' +
    data.location.city;

  timeZone.innerHTML = 'UTC' + data.location.timezone;
  isp.innerHTML = data.isp;
}

function renderMap(data) {
  map_init.setView([data.location.lat, data.location.lng], 13);
  marker.setLatLng([data.location.lat, data.location.lng]);
}
