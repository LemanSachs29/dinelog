cd "D:\Workspace\Universidad\Mobile\Dinelog"

adb kill-server
adb start-server
adb -s R5CY50CNDZX reverse --remove-all
adb -s R5CY50CNDZX reverse tcp:8081 tcp:8081

npx expo start --dev-client --clear --port 8081