#!/usr/bin/env sh

if [ ! -L node_modules/src ]
then
    ln -s ../src node_modules/src
fi

npm run server &
backendPid=$!

npm run client &
devServerPid=$!

killBackend() {
    if kill -9 ${backendPid}
    then
        echo "stopped webpack dev server"
    fi
}

killDevServer() {
    if kill -9 ${devServerPid}
    then
        echo "stopped webpack dev server"
    fi
}

onClose() {
    killDevServer
    killBackend
}


if ! kill -0 ${devServerPid}
then
    killBackend
    exit 1
fi

if ! kill -0 ${backendPid}
then
    killDevServer
    exit 1
fi

trap onClose 1 2 3 6
wait
