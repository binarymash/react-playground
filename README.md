# Evelyn Management UI

For documentation [Read the Docs](https://evelyn-management-ui.readthedocs.io/en/latest/). 

## Overview

Evelyn is a [feature toggling](https://martinfowler.com/articles/feature-toggles.html) framework. It allows users to decouple software releases from the functional changes within, reducing the risk of deployment and providing rollback functionality. 

The Evelyn Stack consists of the following parts:

- A core framework providing the underlying feature toggling functionality, written in C# and targetting .NET Standard 2.0 

- A ReST API server and client that expose this functionality over HTTP, written in C# and targetting .NET Standard 2.0. Sample hosts are provided for .NET Core 2.1.

- A management user interface, built on React/Redux/Node.

Evelyn has a modular architecture which allows for flexible deployment configurations and user extensibility. The core framework is built around CQRS and Event Sourcing: implementations are provided for an in-memory event store and for Greg Young's [Event Store](https://eventstore.org/); you can plug in your own event store integration.

This project is pre-release: things might break at any moment; APIs might change; it is insecure. 


## This Repository

This repository contains the source code for the management UI. You can learn more about this at [Read the Docs](https://evelyn-management-ui.readthedocs.io/en/latest/). 

For more information on the core framework and the ReST API server and client head over to [https://github.com/binarymash/evelyn](https://github.com/binarymash/evelyn)
