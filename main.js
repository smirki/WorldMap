var mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(mymap);

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    for (var i = 0; i < data.length; i++) {
      var location = data[i];
      var marker = L.marker([location.lat, location.lng]).addTo(mymap);
      marker.bindPopup(`<strong>${location.name}</strong><br>Lat: ${location.lat}, Lng: ${location.lng}`);
    }
  });

mymap.dragging.enable();

function getCountryName(lat, lng, callback) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        callback(data.address.country);
      })
      .catch(error => {
        console.error(error);
        callback(null);
      });
  }

  mymap.on('click', function (e) {
    let inputYear = document.getElementById('year-input').value || 1970;
    getCountryName(e.latlng.lat, e.latlng.lng, function (country, countryCode) {
      if (country && countryCode) {
        getEconomicData(countryCode.toUpperCase(), inputYear, function (gdpPerCapita) {
          if (gdpPerCapita) {
            let content = `<div class="card">
                             <div class="card-body">
                               <h5 class="card-title">${country} - ${inputYear}</h5>
                               <h6 class="card-subtitle mb-2 text-muted">GDP per Capita (constant 2010 US$)</h6>
                               <p>${gdpPerCapita.toFixed(2)}</p>
                             </div>
                           </div>`;
            var popup = L.popup()
              .setLatLng(e.latlng)
              .setContent(content)
              .openOn(mymap);
          }
        });
      }
    });
  });
  
    
  function getEconomicData(countryCode, year, callback) {
    fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.KD?format=json&date=${year}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data[1] && data[1][0]) {
          let gdpPerCapita = data[1][0].value;
          callback(gdpPerCapita);
        } else {
          callback(null);
        }
      })
      .catch(error => {
        console.error(error);
        callback(null);
      });
  }
  

    function getCountryName(lat, lng, callback) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
          .then(response => response.json())
          .then(data => {
            callback(data.address.country, data.address.country_code);
          })
          .catch(error => {
            console.error(error);
            callback(null, null);
          });
      }
      
      const countryCoordinates = {
        "Afghanistan": [33.93911, 67.709953],
        "Albania": [41.153332, 20.168331],
        "Algeria": [28.033886, 1.659626],
        "Andorra": [42.546245, 1.601554],
        "Angola": [-11.202692, 17.873887],
        "Antigua and Barbuda": [17.060816, -61.796428],
        "Argentina": [-38.416097, -63.616672],
        "Armenia": [40.069099, 45.038189],
        "Australia": [-25.274398, 133.775136],
        "Austria": [47.516231, 14.550072],
        "Azerbaijan": [40.143105, 47.576927],
        "Bahamas": [25.03428, -77.39628],
        "Bahrain": [26.0667, 50.5577],
        "Bangladesh": [23.684994, 90.356331],
        "Barbados": [13.193887, -59.543198],
        "Belarus": [53.709807, 27.953389],
        "Belgium": [50.503887, 4.469936],
        "Belize": [17.189877, -88.49765],
        "Benin": [9.30769, 2.315834],
        "Bhutan": [27.514162, 90.433601],
        "Bolivia": [-16.290154, -63.588653],
        "Bosnia and Herzegovina": [43.915886, 17.679076],
        "Botswana": [-22.328474, 24.684866],
        "Brazil": [-14.235004, -51.92528],
        "Brunei": [4.535277, 114.727669],
        "Bulgaria": [42.733883, 25.48583],
        "Burkina Faso": [12.238333, -1.561593],
        "Burundi": [-3.373056, 29.918886],
        "Cabo Verde": [16.5388, -23.0418],
        "Cambodia": [12.565679, 104.990963],
        "Cameroon": [7.369722, 12.354722],
        "Canada": [56.130366, -106.346771],
        "Central African Republic": [6.611111, 20.939444],
        "Chad": [15.454166, 18.732207],
        "Chile": [-35.675147, -71.542969],
        "China": [35.86166, 104.195397],
        "Colombia": [4.570868, -74.297333],
        "Comoros": [-11.875001, 43.872219],
        "Congo (Congo-Brazzaville)": [-0.228021, 15.827659],
        "Costa Rica": [9.748917, -83.753428],
        "Croatia": [45.1, 15.2],
        "Cuba": [21.521757, -77.781167],
        "Cyprus": [35.126413, 33.429859],
        "Czechia (Czech Republic)": [49.817492, 15.472962],
        "Côte d'Ivoire (Ivory Coast)": [7.539989, -5.54708],
        "Denmark": [56.26392, 9.501785],
        "Djibouti": [11.825138, 42.590275],
        "Dominica": [15.414999, -61.370976],
        "Dominican Republic": [18.735693, -70.162651],
        "Ecuador": [-1.831239, -78.183406],
        "Egypt": [26.820553, 30.802498],
        "El Salvador": [13.794185, -88.89653],
        "Equatorial Guinea": [1.650801, 10.267895],
        "Eritrea": [15.179384, 39.782334],
        "Estonia": [58.595272, 25.013607],
        "Eswatini (fmr. Swaziland)": [-26.522503, 31.465866],
        "Ethiopia": [9.145, 40.489673],
        "Fiji": [-16.578193, 179.414413],
        "Finland": [61.92411, 25.748151],
        "France": [46.227638, 2.213749],
        "Gabon": [-0.803689, 11.609444],
        "Gambia": [13.443182, -15.310139],
        "Georgia": [42.315407, 43.356892],
        "Germany": [51.165691, 10.451526],
        "Ghana": [7.946527, -1.023194],
        "Greece": [39.074208, 21.824312],
        "Grenada": [12.262776, -61.604171],
        "Guatemala": [15.783471, -90.230759],
        "Guinea": [9.945587, -9.696645],
        "Guinea-Bissau": [11.803749, -15.180413],
        "Guyana": [4.860416, -58.93018],
        "Haiti": [18.971187, -72.285215],
        "Honduras": [15.199999, -86.241905],
        "Hungary": [47.162494, 19.503304],
        "Iceland": [64.963051, -19.020835],
        "India": [20.593684, 78.96288],
        "Indonesia": [-0.789275, 113.921327],
        "Iran": [32.427908, 53.688046],
        "Iraq": [33.223191, 43.679291],
        "Ireland": [53.41291, -8.24389],
        "Israel": [31.046051, 34.851612],
        "Italy": [41.87194, 12.56738]
      }
       
      

let heatmapLayer;

function updateHeatmap(year) {
  if (heatmapLayer) {
    mymap.removeLayer(heatmapLayer);
  }

  let heatmapData = [];

  const countries = Object.keys(countryCoordinates);
  let remainingCountries = countries.length;

  countries.forEach(countryCode => {
    getEconomicData(countryCode, year, gdpPerCapita => {
      remainingCountries--;

      if (gdpPerCapita) {
        const latLng = countryCoordinates[countryCode];
        heatmapData.push([latLng[0], latLng[1], gdpPerCapita]);
      }

      if (remainingCountries === 0) {
        heatmapLayer = L.heatLayer(heatmapData, {
          radius: 25,
          blur: 15,
          maxZoom: 18,
          max: Math.max(...heatmapData.map(d => d[2]))
        }).addTo(mymap);
      
      }
    });
  });
}

document.getElementById('year-input').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      updateHeatmap(e.target.value);
    }
  });
  
