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

  image: {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    minWidth: 50,
    borderRadius: `100%`,
  },
});

const QUERY = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
        }
      }
    }
  }
`;

const Bio = () => {
  const data = useStaticQuery(QUERY);
  const { author, social } = data.site.siteMetadata;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        className={classes.image}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />

      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>You should follow him on Twitter</a>
      </p>
    </div>
  );
};

export default Bio;
