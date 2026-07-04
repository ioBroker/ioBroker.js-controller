[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SupportedFeature

# Type Alias: SupportedFeature

> **SupportedFeature** = `"ALIAS"` \| `"ALIAS_SEPARATE_READ_WRITE_ID"` \| `"ADAPTER_GETPORT_BIND"` \| `"ADAPTER_DEL_OBJECT_RECURSIVE"` \| `"ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE"` \| `"ADAPTER_AUTO_DECRYPT_NATIVE"` \| `"PLUGINS"` \| `"CONTROLLER_NPM_AUTO_REBUILD"` \| `"CONTROLLER_READWRITE_BASE_SETTINGS"` \| `"CONTROLLER_MULTI_REPO"` \| `"CONTROLLER_LICENSE_MANAGER"` \| `"CONTROLLER_OS_PACKAGE_UPGRADE"` \| `"DEL_INSTANCE_CUSTOM"` \| `"CUSTOM_FULL_VIEW"` \| `"ADAPTER_GET_OBJECTS_BY_ARRAY"` \| `"CONTROLLER_UI_UPGRADE"` \| `"ADAPTER_WEBSERVER_UPGRADE"` \| `"CONTROLLER_CMD_EXEC_FILES"` \| `"CONTROLLER_FEATURE_REQUEST"`

Defined in: [types-dev/index.d.ts:63](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/index.d.ts#L63)

Features which can be checked via `adapter.supportsFeature(...)`.
The runtime list of currently supported features lives in
`@iobroker/js-controller-common` (`SUPPORTED_FEATURES`) and must stay in sync with this type.
