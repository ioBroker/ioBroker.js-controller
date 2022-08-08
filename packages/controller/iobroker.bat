@echo off
if %1==fix (
    npx @iobroker/fix
) else (
    if exist serviceIoBroker.bat (
        if %1==start (
            call serviceIoBroker.bat start
        ) else (
            if %1==stop (
                call serviceIoBroker.bat stop
            ) else (
                node iobroker.js %*
            )
        )
    ) else (
        node iobroker.js %*
    )
)
