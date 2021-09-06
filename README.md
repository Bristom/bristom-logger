# Bristom Logger

This is the project created for the library responsible for the logs in all the Bristom projects. It is built on top of Winston and it's custom formats, together with a splat formatter to support multiple arguments into a single logger call.

It has only one configuration for the log level, controlled by the WINSTON_LEVEL environment variable, if the variable isn't present, the default level is **"debug"**.

Written and maintened by [luk3skyw4lker](https://github.com/luk3skyw4lker).
