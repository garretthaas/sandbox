import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

function exifTest() {
  import exifImage from "../../static/images/image.jpg";
  import exifJs from "../../static/scripts/exif.js";
  // Import result is the URL of your image
  return 
    
    <div className="exifTest">
      <script type="text/javascript" src={exifJs}></script>
      <img id="the-img" src={exifImage} alt="Logo" />
      <p id="pic-info"></p>
      <p id="map-link"></p>
    </div>
}


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

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <exifTest />
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
