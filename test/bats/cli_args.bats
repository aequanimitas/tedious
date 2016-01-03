#!/usr/bin/env bats

@test "calling tedious with no arguments" {
    run node index.js
    [ "${lines[0]}" = "tedious v0.0.1" ]
}
