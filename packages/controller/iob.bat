@echo off
if %1==fix (npx @iobroker/fix) else (node iobroker.js %1 %2 %3 %4 %5 %6 %7 %8)