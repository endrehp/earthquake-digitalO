mapboxgl.accessToken = 'pk.eyJ1IjoiZW5kcmVocCIsImEiOiJjamRsNmlvZjYwM3RqMnhwOGRneDhhc2ZkIn0.wVZHznNCtC5_gJAnLC2EJQ';

console.log('begynn igjen')

var l = 0;
var v =[];
var i;
var Time;
var url; //= mode + '_' + earthquakeDate;
var play = false;
var b;
var a;
var endTime = 700;
var speed = 10;
var title;
var slider_end_time;
 

var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-98.2022, 16.6855], // initial map center in [lon, lat]
  zoom: 5.5,
});



map.on('load', function() {
    slider_end_time = document.getElementById('slider');
    
    document.querySelector('.new-data').addEventListener('click', function () {
    
    if (l > 0) {
    map.removeLayer('earthquake' + l);
    map.removeLayer('act' + l)
    } ;
    l += 1;
    
    console.log('legg til noe')
    add_data()
    });
    
    
document.getElementById('slider').addEventListener('input', function(e) {
    Time = parseInt(e.target.value);
    i = Time;
    updateLayer(Time)  
});

document.getElementById('stop').addEventListener('click', function() {
    if (l > 0) {
    reset();
    document.getElementById('play-pause').innerHTML= '<span class="oi oi-media-play"></span>';
    }});

document.getElementById('play-pause').addEventListener('click', function() {
  if (l > 0 && play == false ){
        play_b();
        document.getElementById('play-pause').innerHTML= '<span class="oi oi-media-pause"></span>'; //'<i class="ion-ios-plus-outline"></i>';
    }
    
    else if (l>0 && play == true){
		pause();
	   document.getElementById('play-pause').innerHTML= '<span class="oi oi-media-play"></span>';//'<i class="ion-ios-plus-outline"></i>';
	}});

});


function add_data() {
//setEndTime();
 
    map.addLayer({
      id: 'earthquake' + l,
      type: 'circle',
      source: {
        type: 'geojson',
        data: url, //replace this with the url of your own geojson
      },
      paint: {
        'circle-radius':
             
          [
            'interpolate',
          ['linear'],
          ['number', ['get', 'S_Gal']],
        0, 6,
        5, 16,
        10, 20,
        50, 25,
        100, 30
        ],
        
        'circle-color': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'S_Gal']],
          0, '#000000',
          5, '#6ecfdb', //1
          10,'#73ce2c', //1
          15,'#aadc00', //2
          25,'#6bc50a',  //2
          50,'#e9a102', //3
          75,'#df4d11', //4
          100,'#c12b1c',  //5
          150,'#a14090'  //6
            
          
        ],
        
        'circle-opacity': 0.8
      }
    }, 'admin-2-boundaries-dispute');
    
private_version();
reset();
};


function updateLayer(Time) {
    map.setFilter('earthquake'+ l, ['==', ['number', ['get', 'Time']], Time]);
    map.setFilter('act' + l, ['==', ['number', ['get', 'Time']], Time]);
    document.getElementById('active-hour').innerText = display_time(Time);
};

function play_b() {

if (play == false) {
v = [];
for (var j=0; j < endTime; j++) {
    v.push(setTimeout( function () {
        
        if (i < endTime){
        document.getElementById('slider').value=i;
        Time = i;
        i++;
        
    }
        updateLayer(Time) }, j*1000/speed));
    }
    play = true;
}
};

function reset() { 
    pause();
    i = 0;
    document.getElementById('slider').value=i;
    Time = i;
    updateLayer(Time);
};

function pause() { 
    if (v.length > 0){
    for (var j = 0; j < v.length; j++){
          clearTimeout(v[j])}
    };
    play = false;
        
    };

function setEndTime() {
    $.getJSON(url, function (data) {
        b = data.features.length;
        endTime = data.features[b-1].properties['Time'];
    })
    for (var h = 0; h < 10;h++){
        document.getElementById('slider').max = endTime;
    };
    }


function private_version() {
    map.addLayer({
      id: 'act' + l,
      type: 'circle',
      source: {
        type: 'geojson',
        data: url,//'./' + url + '.geojson' // replace this with the url of your own geojson
      },
      paint: {
        'circle-radius': 6,
          
        'circle-color': ["step",
            ['number', ['get', 'MdAct']] ,
            '#000000',
            0,'#000000',
            1, '#2fff05'
            
        ]
            
          
        ,
        'circle-opacity': 0.8
      }
    }, 'admin-2-boundaries-dispute');



    
    map.on('click', 'earthquake' + l, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var serial_number = e.features[0].properties.Sn;
        var description = e.features[0].properties.Description;
        
      
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        
      
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
    
};

function setEndTime() {
    $.getJSON(url, function (data) {
        b = data.features.length;
        
        slider_end_time.max = data.features[b-1].properties['Time'];
        endTime = data.features[b-1].properties['Time'];    
    })
    
    };

function display_time(Time) {
    var minutes   = Math.floor(Time / 60);
    var seconds = Time - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
};



function select_earthquake(e) {
    
    for (var i=0; i < document.getElementsByClassName('table_row').length; i++){
        //console.log(document.getElementsByClassName('table_row')[i].innerHTML)
        document.getElementsByClassName('table_row')[i].style.background = 'white';
        document.getElementsByClassName('table_row')[i].style.color = '#333333';
    };
        
    e.style.background = '#333333';
    e.style.color = 'white';
    
    title = e.getElementsByClassName('title')[0].innerText;
    url = 'media/private_' + title + '.geojson';
    setEndTime();

    document.getElementById('load').click();
};

function speed_x(e) {
    speed = Number(e.innerText.slice(0,2))
    //console.log(speed)
    for (var i = 0; i < document.getElementsByClassName('speed_col').length; i++) {
        document.getElementsByClassName('speed_col')[i].style.background = 'None';
        //document.getElementsByClassName('speed_col')[i].style.color = 'black';
    };
    
    //e.style.color='white';
    e.style.background='black';
    document.getElementById('play-pause').click();
    document.getElementById('play-pause').click();
};

//set color by magnitude


document.addEventListener('DOMContentLoaded', function() {
   
    var magnitudes = document.getElementsByClassName('magnitude')
    
    for (var j = 0; j < magnitudes.length; j++){
    var value = Number(magnitudes[j].innerText);
        
    if (value > 6.0) {
        magnitudes[j].style.color = 'red';
    }
    
    else if (value > 4.0) {
        magnitudes[j].style.color = 'orange';
    }
    else {
        magnitudes[j].style.color = 'green';
    }
    }
}, false);


/*



*/



