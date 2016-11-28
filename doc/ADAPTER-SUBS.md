## Subscribes to adapter states

There is a functionality to automatically inform adapters, that other instances want to have their states.
It is required for adapters that have limited read/write bandwidth and must read only states that a really 
now required (e.g. user selected some view in vis).

Let's say, that the adapter, that can deliver states is PUBLISHER (PUB) and the adapter, who wants to have 
PUB's states is SUBSCRIBER (SUB). 

There are three functions in states to control subscribes 