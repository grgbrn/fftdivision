requires 2 processes which don't necessarily need to use npm:

- tsc compiler. this can either be run in a terminal, or just let vscode do it magically?
    vscode way is:
    shift-cmd-B "run build command"
    then choose
    "tsc watch"



- a webserver with live-reload magic. i like live-server better than some of the other options

> npx live-server --watch=build

