import produce from 'immer';
import * as actionTypes from '../actions/types';

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
      status: strategy.clientCertificate.status
    },
    rootCertificatePem: strategy.rootCertificatePem,
    audit: getAudit(strategy)
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

const getAudit = strategy => {
  if (!strategy) {
    return null;
  }

  return {
    created: strategy.clientCertificate.audit.created,
    createdBy: strategy.clientCertificate.audit.createdBy,
    lastModified: strategy.clientCertificate.audit.lastModified,
    lastModifiedBy: strategy.clientCertificate.audit.lastModifiedBy,
    version: strategy.clientCertificate.audit.version
  };
};

// Write

const INITIAL_STATE = {
  strategies: {}
};

export const reducer = produce((draft, action) => {
  let storeKey = undefined;

  switch (action.type) {
    case actionTypes.requestClientAccessStrategy:
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

    case actionTypes.receiveClientAccessStrategy:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        draft.strategies[storeKey].strategy = action.json;
        draft.strategies[storeKey].isLoading = false;
      }
      break;

    case actionTypes.receiveClientAccessStrategyError:
      {
        storeKey = getStoreKey(action.projectId, action.strategyId);
        draft.strategies[storeKey].isLoading = false;
      }
      break;
  }
}, INITIAL_STATE);
