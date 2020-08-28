import produce from 'immer';
import * as actions from '../actions/types';

const getStoreKey = (projectId, strategyId) => {
  let storeKey = `${projectId}/${strategyId}`;
  return storeKey;
};

// Read

export const getClientAccessStrategy = (state, projectId, strategyId) => {
  let storeKey = getStoreKey(projectId, strategyId);
  let projection = state.strategy.strategies[storeKey];
  let strategy = undefined;

  if (projection) {
    strategy = projection.strategy;
  }

  if (!strategy) {
    return null;
  }

  return {
    projectId: projectId,
    id: strategyId,
    clientCertificate: {
      id: strategy.clientCertificate.id,
      pem: strategy.clientCertificate.pem,
      created: strategy.clientCertificate.created,
      notAfter: strategy.clientCertificate.notAfter,
      status: strategy.clientCertificate.status,
    },
    rootCertificatePem: strategy.rootCertificatePem,
    audit: getAudit(strategy),
  };
};

export const getIsLoading = (state, projectId, strategyId) => {
  let projection =
    state.strategy.strategies[getStoreKey(projectId, strategyId)];
  if (projection) {
    return projection.isLoading === true;
  }
  return false;
};

export const getIsCreating = (state, projectId, strategyId) => {
  let projection =
    state.strategy.strategies[getStoreKey(projectId, strategyId)];
  if (projection) {
    return projection.isCreating === true;
  }
  return false;
};

const getAudit = (strategy) => {
  if (!strategy) {
    return null;
  }

  return {
    created: strategy.clientCertificate.audit.created,
    createdBy: strategy.clientCertificate.audit.createdBy,
    lastModified: strategy.clientCertificate.audit.lastModified,
    lastModifiedBy: strategy.clientCertificate.audit.lastModifiedBy,
    version: strategy.clientCertificate.audit.version,
  };
};

// Write

const INITIAL_STATE = {
  strategies: {},
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;

  switch (action.type) {
    case actions.CLIENT_ACCESS_STRATEGY_X509_ADD_REQUESTED:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        let projection = draft.strategies[storeKey];
        if (!projection) {
          projection = {};
          draft.strategies[storeKey] = projection;
        }
        projection.isCreating = true;
      }
      break;

    case actions.CLIENT_ACCESS_STRATEGY_X509_ADD_SUCCEEDED:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        let projection = draft.strategies[storeKey];
        if (!projection) {
          projection = {};
          draft.strategies[storeKey] = projection;
        }
        projection.isCreating = false;
      }
      break;

    case actions.CLIENT_ACCESS_STRATEGY_X509_ADD_FAILED:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        let projection = draft.strategies[storeKey];
        if (!projection) {
          projection = {};
          draft.strategies[storeKey] = projection;
        }
        projection.isCreating = false;
      }
      break;

    case actions.REQUEST_CLIENT_ACCESS_STRATEGY:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        let projection = draft.strategies[storeKey];
        if (!projection) {
          projection = {};
          draft.strategies[storeKey] = projection;
        }
        projection.isLoading = true;
      }
      break;

    case actions.RECEIVE_CLIENT_ACCESS_STRATEGY:
      storeKey = getStoreKey(action.projectId, action.strategyId);
      draft.strategies[storeKey].strategy = action.data;
      draft.strategies[storeKey].isLoading = false;
      break;

    case actions.RECEIVE_CLIENT_ACCESS_STRATEGY_ERROR:
      storeKey = getStoreKey(action.projectId, action.strategyId);
      draft.strategies[storeKey].isLoading = false;
      break;

    case actions.CLIENT_ACCESS_STRATEGY_X509_DELETE_SUCCEEDED:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        draft.strategies[storeKey] = undefined;
      }
      break;

    default:
      break;
  }
}, INITIAL_STATE);
