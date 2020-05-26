/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { createUseStyles } from 'react-jss';

import { rhythm } from '../utils/typography';

const useStyles = createUseStyles({
  root: {
    display: `flex`,
    marginBottom: rhythm(2.5),
  },
});

const QUERY = graphql`
  query BioQuery {
    site {
      siteMetadata {
        bio
      }
    }
  }
`;

const Bio = () => {
  const data = useStaticQuery(QUERY);
  const { bio } = data.site.siteMetadata;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>{bio}</p>
    </div>
  );
};

export default Bio;
