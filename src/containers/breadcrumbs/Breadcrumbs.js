import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import ProjectBreadcrumb from './ProjectBreadcrumb';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import EnvironmentBreadcrumb from './EnvironmentBreadcrumb';
import ToggleBreadcrumb from './ToggleBreadcrumb';
import X509Breadcrumb from './X509Breadcrumb';
import { BsChevronRight } from 'react-icons/bs';

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: '/', breadcrumb: DashboardBreadcrumb },
  { path: '/projects/:id', breadcrumb: ProjectBreadcrumb },
  {
    path: '/projects/:id/environments/:environmentKey',
    breadcrumb: EnvironmentBreadcrumb
  },
  { path: '/projects/:id/toggles/:toggleKey', breadcrumb: ToggleBreadcrumb },
  { path: '/projects/:id/certificates/:strategyId', breadcrumb: X509Breadcrumb }
];

const style = {
  paddingTop: '17px'
};

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }) => (
  <div style={style}>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        {index < breadcrumbs.length - 1 ? (
          <NavLink to={breadcrumb.props.match.url}>{breadcrumb}</NavLink>
        ) : (
          <span>{breadcrumb}</span>
        )}
        {index < breadcrumbs.length - 1 && (
          <span className="menu-sep">
            <BsChevronRight glyph="menu-right" />
          </span>
        )}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes, { disableDefaults: true })(Breadcrumbs);
