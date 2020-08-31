import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import ProjectBreadcrumb from './ProjectBreadcrumb';
// import DashboardBreadcrumb from './DashboardBreadcrumb';
import EnvironmentsBreadcrumb from './EnvironmentsBreadcrumb';
import EnvironmentBreadcrumb from './EnvironmentBreadcrumb';
import TogglesBreadcrumb from './TogglesBreadcrumb';
import ToggleBreadcrumb from './ToggleBreadcrumb';
import AccessBreadcrumb from './AccessBreadcrumb';
import X509Breadcrumb from './X509Breadcrumb';
import { AiOutlineRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  // { path: '/', breadcrumb: DashboardBreadcrumb },
  { path: '/projects/:id', breadcrumb: ProjectBreadcrumb },
  {
    path: '/projects/:id/environments',
    breadcrumb: EnvironmentsBreadcrumb,
  },
  {
    path: '/projects/:id/environments/:environmentKey',
    breadcrumb: EnvironmentBreadcrumb,
  },
  { path: '/projects/:id/toggles', breadcrumb: TogglesBreadcrumb },
  { path: '/projects/:id/toggles/:toggleKey', breadcrumb: ToggleBreadcrumb },
  {
    path: '/projects/:projectId/certificates',
    breadcrumb: AccessBreadcrumb,
  },
  {
    path: '/projects/:projectId/certificates/:strategyId',
    breadcrumb: X509Breadcrumb,
  },
];

const style = {
  paddingTop: '17px',
};

const Breadcrumbs = ({ breadcrumbs }) => (
  <div style={style}>
    {breadcrumbs.map(({ match, breadcrumb }, index) => (
      <span key={match.url}>
        {index < breadcrumbs.length - 1 ? (
          <NavLink to={match.url}>{breadcrumb}</NavLink>
        ) : (
          <span>{breadcrumb}</span>
        )}
        {index < breadcrumbs.length - 1 && (
          <span className="menu-sep">
            <IconContext.Provider
              value={{
                style: { verticalAlign: 'text-bottom' },
                size: '1.1em',
                color: '#abc',
              }}
            >
              <AiOutlineRight />
            </IconContext.Provider>
          </span>
        )}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes, { disableDefaults: true })(Breadcrumbs);
