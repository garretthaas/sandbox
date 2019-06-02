
document.getElementById("the-img").onclick = function() {

  EXIF.getData(this, function() {

      myData = this;

      console.log(myData.exifdata);

      document.getElementById('pic-info').innerHTML = 'This photo was taken on ' + myData.exifdata.DateTime + ' with a ' + myData.exifdata.Make + ' ' + myData.exifdata.Model;
      
      // Calculate latitude decimal
      var latDegree = myData.exifdata.GPSLatitude[0].numerator;
      var latMinute = myData.exifdata.GPSLatitude[1].numerator;
      var latSecond = myData.exifdata.GPSLatitude[2].numerator;
      var latDirection = myData.exifdata.GPSLatitudeRef;
      
      var latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
      console.log(latFinal);

      // Calculate longitude decimal
      var lonDegree = myData.exifdata.GPSLongitude[0].numerator;
      var lonMinute = myData.exifdata.GPSLongitude[1].numerator;
      var lonSecond = myData.exifdata.GPSLongitude[2].numerator;
      var lonDirection = myData.exifdata.GPSLongitudeRef;

      var lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
      console.log(lonFinal);

      document.getElementById('map-link').innerHTML = '<a href="http://www.google.com/maps/place/'+latFinal+','+lonFinal+'" target="_blank">Google Maps</a>';

  });
}



function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  
  var dd = degrees + (minutes/60) + (seconds/3600);
  
  if (direction == "S" || direction == "W") {
      dd = dd * -1; 
  }
  
  return dd;
}
