import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { createUseStyles } from 'react-jss';

import { rhythm } from '../utils/typography';

// withPrefix is required because in production the path needs to be prefixed with /blog.
const NAME_AND_MARK = withPrefix('/logo/name-and-mark-476x173-1x.png');

const useStyles = createUseStyles({
  h3: {
    fontFamily: `Montserrat, sans-serif`,
    marginTop: 0,
  },

  Link: {
    boxShadow: `none`,
    color: `inherit`,
  },

  root: {
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: rhythm(24),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  },

  logoText: {
    display: 'none',
  },

  logoLink: {
    height: '100%',
    width: '100%',
    display: 'block',
    textDecoration: 'none',
    outline: 'none',
    boxShadow: 'none',
  },

  logoContainer: {
    backgroundImage: `url("${NAME_AND_MARK}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    marginBottom: 24,
  },
});

const Layout = ({ location, title, children }) => {
  let header;
  const classes = useStyles();
  const rootPath = `${__PATH_PREFIX__}/`;

  const logoContainerStyles = {
    height: 173 / 2,
    width: 476 / 2,
  };

  if (location.pathname !== rootPath) {
    logoContainerStyles.height = logoContainerStyles.height / 2;
    logoContainerStyles.width = logoContainerStyles.width / 2;
  }

  header = (
    <div className={classes.logoContainer} style={logoContainerStyles}>
      <Link to="/" className={classes.logoLink}>
        <h1 className={classes.logoText}>{title}</h1>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} Larder, Inc.
      </footer>
    </div>
  );
};

export default Layout;
