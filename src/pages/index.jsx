import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import exifImage from "../../static/images/image.jpg";
import exifJs from "../../static/scripts/exif.js";
import init from "../../static/scripts/init.js";

function exifTest() {
  // Import result is the URL of your image
  return 
    
    <div className="exifTest">
      <script type="text/javascript" src={exifJs}></script>
      <img id="the-img" src={exifImage} alt="Logo" />
      <p id="pic-info"></p>
      <p id="map-link"></p>
    </div>
}

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="index-container">
          <Helmet>
            <title>{config.siteTitle}</title>
            <script src={init} />
          </Helmet>
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
