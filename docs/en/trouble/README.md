---
title: Troubleshooting - Introduction
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/README.md
hash: Eg6CPYwoYp2esUMQ505awF386equ/Q/P+q9L2XoICas=
---
# Troubleshooting
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

@@@ General Procedures. Refer to individual help with the particular adapter, installation procedure and platform.
@@@

On this page you will find information about problems and their solutions or approaches for solutions.
Please look through the topics, whether your problem here or on the subpages is already included and thus possibly the solution.

## First aid checklist "My ioBroker does not work anymore" - What should I test for the most part and always post in the forum?
Important information is always the following version information:

* `node -v`: ioBroker supports the" LTS versions "of nodejs (even version numbers). New installations must use at least nodejs 8.12. **Attention:** Development versions of nodejs (odd version numbers) are not officially supported! Please also use completely new LTS versions only after forum information. Recommended is nodejs 8.15 or higher.
* `npm -v`: ioBroker supports npm in version 3 and> 5.7.1, recommended is 6.4.1 or higher
* `iobroker -v`
* Version number of the adapter (s) concerned
* Operating system (Linux, MacOS, Windows)
* Hardware Platform

This information is best provided directly in the thread.

Furthermore please check this troubleshooting page and also the FAQ --LINK-- before a forum request if the topic is already included there. If you have already tried actions from these documents, please also write to them.

Please check the logs to see if any of the relevant adapters have entries that are helpful at the time of the problem. Sets logs and scripts or similar. always in spoilers.

Where can I find logs?
Logs can be found in the simplest case in the admin UI in the web browser. Please note, however, that in the admin the log lines are cut off after about 200 characters. This may cause important information to be lost or incomplete.
Furthermore, the logs in the Admin are always only available for the current browser session.

ioBroker also writes all logs to a log file. This is located in the ioBroker directory in the subdirectory "log" and is normally available there for 7 days. Simply open with a text editor and send extracts if necessary.

## How do I change the log level of an adapter instance?
By default, the js-controller and the adapters are running in the log level "info". This means that the information that the adapter developer has considered useful is output in the log. In total, there are the following log levels:

* **error** Only errors are logged
* **warn** errors and warnings are logged
* **info** Information, warnings and errors are logged, standard
* **debug** In addition to information, warnings and errors, additional information is logged that the adapter developer considers useful for troubleshooting.
* **silly** Most detailed log-level, in which also messages from the js-controller are logged, only use if explicitly requested.

The log level of an instance can be set in the Admin WebUI. To do this, activate the expert mode under "Instances" and set the log level in the column of the same name for the instance.
After a change in the log level, the instance is automatically restarted.

** Attention: ** Depending on the log level (especially debug and silly), the logfile on the disk can be quite large. Pay attention to the available space.

## After operating system updates ioBroker does not work anymore (check nodeversion and stuff)
## An adapter / ioBroker does not start anymore with error "wrong node version native package bla"? (npm rebuild and so on)
## I have several different nodejs versions on my machine?
## Suddenly, ioBroker / Adapter stops responding with message "Syntax Error Unexpected / Invalid Token or similar" (File corrupt, sd card ...)
## At adapter start Error 7 / Reconnect to DB (reasons ... solutions)
## The ioBroker is suddenly no longer available, but my computer still? (syslog oom or something)
## The whole host suddenly freezes during operation (swapping top ...)
## The whole host freezes on adapter updates (eg sql installation)
## How can I manually reinstall the js-controller and when should I do something like that? What do I have to consider?
## How can I manually reinstall an adapter and when should I do something like that? What do I have to consider?
## When installing an adapter comes a window with "index.html not found"? (Install Admin3)
## My adapters are all gone?
...

## Where are the data from iobroker?
* Iobroker-data objects, and backup and such

## My memory RAM is constantly full?
## My system crashes? Remains constantly, no longer accessible
* Ssh yet?
* Not more?
* Power adapter?
* Syslog

Where can I find the iobroker logfile?
## Not 2x installable on the same computer / Docker
## Node and nodejs different issues
## How do I turn on debug log mode on adapter instances?
## Ppm error when installing adapters
* ENOGIT
* EACCESS
* ENOSPC

## Error: Module version mismatch. Expected 48, got 67.
## Iot devices are not working anymore?
## Cloud or iot?
## Error while calling the admin page "index.html not found"
## When forum when GitHub issue?
## It all worked, I did not change anything and now something is not working anymore?
* Communication error
* File system error

## After power failure / power off without a clean shutdown error
## Iobroker updates? Adapter? Controller? When npm?
## Warnings at ppm actions?
* No Access
* Audit, Security, Deprications

## Reconnection to DB
## Error 7 Adapter is already running
## Reinstall / rebuild (and error shell script)
## Have not made a backup but still have the Biobroker directory? Is it enough for restores?