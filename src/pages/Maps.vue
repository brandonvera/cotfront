<template>
    <card class="card-map" title="Ubicación geográfica del Estado Táchira">
      <div class="map">
        <div id="map"></div>
      </div>
    </card>
</template>
<script>
export default {
  mounted() {
    var sc = new window.google.maps.LatLng(7.770524, -72.227963);
    var cardenas = new window.google.maps.LatLng(7.8206646, -72.2175976);
    var lobatera = new window.google.maps.LatLng(7.9310657, -72.2498704);
    var urena = new window.google.maps.LatLng(7.9212222, -72.4436797);
    var jauregui = new window.google.maps.LatLng(8.1323707, -71.9828641);
    var vargas = new window.google.maps.LatLng(8.0291703, -72.0666944);
    var junin = new window.google.maps.LatLng(7.6951067, -72.3638182);
    var torbes = new window.google.maps.LatLng(7.6536705, -72.1729996);
    var panam = new window.google.maps.LatLng(8.3320329, -72.0951276);
    var feo = new window.google.maps.LatLng(7.5252012, -71.9746544);

    var bolivar = new window.google.maps.LatLng(7.8068074, -72.4410723);
    var sucre = new window.google.maps.LatLng(7.9175818, -72.0172865);
    var seboruco = new window.google.maps.LatLng(8.1440122, -72.0768145);
    var hevia = new window.google.maps.LatLng(8.2109283, -72.253085);
    var urdaneta = new window.google.maps.LatLng(7.5709155, -72.4471932);
    var cordoba = new window.google.maps.LatLng(7.6308825, -72.2877452);
    var ayacucho = new window.google.maps.LatLng(8.0411456, -72.268288);
    var samuel = new window.google.maps.LatLng(8.4987521, -71.8441406);
    var miranda = new window.google.maps.LatLng(7.9150614, -71.9727369);
    var cviejo = new window.google.maps.LatLng(7.8210711, -72.3365894);

    var michel = new window.google.maps.LatLng(7.9565994, -72.2516728);
    var costa = new window.google.maps.LatLng(8.1685982, -72.1694159);
    var simon = new window.google.maps.LatLng(8.3521912, -71.8537554);
    var bello = new window.google.maps.LatLng(7.8578248, -72.1784869);
    var tadeo = new window.google.maps.LatLng(8.2688221, -72.0680998);
    var libert = new window.google.maps.LatLng(7.6279875, -71.5148729);
    var uribante = new window.google.maps.LatLng(8.008972, -71.7646703);
    var cnuevo = new window.google.maps.LatLng(7.8029671, -72.2826885);
    var guasimo = new window.google.maps.LatLng(7.8648364, -72.2243927);

    var mapOptions = {
      zoom: 13,
      center: sc,
      scrollwheel: false, 
    };

    var map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    var marker = new window.google.maps.Marker({
      position: sc,
      title: "San Cristóbal"
    });

    var marker2 = new window.google.maps.Marker({
      position: cardenas,
      title: "Cárdenas"
    });

    var marker3 = new window.google.maps.Marker({
      position: lobatera,
      title: "Lobatera"
    });

    var marker4 = new window.google.maps.Marker({
      position: urena,
      title: "Pedro María Ureña"
    });

    var marker5 = new window.google.maps.Marker({
      position: jauregui,
      title: "Jáuregui"
    });

    var marker6 = new window.google.maps.Marker({
      position: vargas,
      title: "José María Vargas"
    });

    var marker7 = new window.google.maps.Marker({
      position: junin,
      title: "Junín"
    });

    var marker8 = new window.google.maps.Marker({
      position: torbes,
      title: "Torbes"
    });

    var marker9 = new window.google.maps.Marker({
      position: panam,
      title: "Panamericano"
    });

    var marker10 = new window.google.maps.Marker({
      position: feo,
      title: "Fernández Féo"
    });

    var marker11 = new window.google.maps.Marker({
      position: bolivar,
      title: "Bolívar"
    });

    var marker12 = new window.google.maps.Marker({
      position: sucre,
      title: "Sucre"
    });

    var marker13 = new window.google.maps.Marker({
      position: seboruco,
      title: "Seboruco"
    });

    var marker14 = new window.google.maps.Marker({
      position: hevia,
      title: "García de Hevia"
    });

    var marker15 = new window.google.maps.Marker({
      position: urdaneta,
      title: "Rafael Urdaneta"
    });

    var marker16 = new window.google.maps.Marker({
      position: cordoba,
      title: "Córdoba"
    });

    var marker17 = new window.google.maps.Marker({
      position: ayacucho,
      title: "Ayacucho"
    });

    var marker18 = new window.google.maps.Marker({
      position: samuel,
      title: "Samuel Darío Maldonado"
    });

    var marker19 = new window.google.maps.Marker({
      position: miranda,
      title: "Francisco de Miranda"
    });

    var marker20 = new window.google.maps.Marker({
      position: cviejo,
      title: "Libertad"
    });

    var marker21 = new window.google.maps.Marker({
      position: michel,
      title: "Michelena"
    });

    var marker22 = new window.google.maps.Marker({
      position: costa,
      title: "Antonio Rómulo Costa"
    });

    var marker23 = new window.google.maps.Marker({
      position: simon,
      title: "Simón Rodríguez"
    });

    var marker24 = new window.google.maps.Marker({
      position: bello,
      title: "Andres Bello"
    });

    var marker25 = new window.google.maps.Marker({
      position: tadeo,
      title: "San Judas Tadeo"
    });

    var marker26 = new window.google.maps.Marker({
      position: libert,
      title: "Libertador"
    });

    var marker27 = new window.google.maps.Marker({
      position: uribante,
      title: "Uribante"
    });

    var marker28 = new window.google.maps.Marker({
      position: cnuevo,
      title: "Independencia"
    });

    var marker29 = new window.google.maps.Marker({
      position: guasimo,
      title: "Guásimos"
    });

    marker.setMap(map);
    marker2.setMap(map);
    marker3.setMap(map);
    marker4.setMap(map);
    marker5.setMap(map);
    marker6.setMap(map);
    marker7.setMap(map);
    marker8.setMap(map);
    marker9.setMap(map);
    marker10.setMap(map);
    marker11.setMap(map);
    marker12.setMap(map);
    marker13.setMap(map);
    marker14.setMap(map);
    marker15.setMap(map);
    marker16.setMap(map);
    marker17.setMap(map);
    marker18.setMap(map);
    marker19.setMap(map);
    marker20.setMap(map);
    marker21.setMap(map);
    marker22.setMap(map);
    marker23.setMap(map);
    marker24.setMap(map);
    marker25.setMap(map);
    marker26.setMap(map);
    marker27.setMap(map);
    marker28.setMap(map);
    marker29.setMap(map);
  }
};
</script>
<style>
</style>
