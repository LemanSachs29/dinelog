curl http://localhost:8081/status
adb -s R5CY50CNDZX reverse --list
adb -s R5CY50CNDZX reverse tcp:8081 tcp:8081
adb -s R5CY50CNDZX shell am force-stop com.anonymous.Dinelog
adb -s R5CY50CNDZX shell monkey -p com.anonymous.Dinelog 1