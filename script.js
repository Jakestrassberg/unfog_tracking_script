var websiteID = document.currentScript.getAttribute("data-website-id")

var secondsCountingStartTime = Date.now()
var initialBeacon = true

function beacon(){
    viewDurationSeconds = Math.floor((Date.now() - secondsCountingStartTime) / 1000)
    navigator.sendBeacon(`https://unfog.io/api/script/${websiteID}/visitors/?initialBeacon=${initialBeacon}&visibility=${document.visibilityState}&pathname=${window.location.pathname}&referer=${document.referrer}&viewDurationSeconds=${viewDurationSeconds}`);
    initialBeacon = false
    secondsCountingStartTime = Date.now()
}

beacon()

var heartbeatInterval

function heartbeat(action) {
    if (action == 'start') {
        heartbeatInterval = setInterval(function(){
            beacon()
        }, 5000);
    } else {
        clearInterval(heartbeatInterval)
    }
}

heartbeat("start")

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState == 'visible') {
        secondsCountingStartTime = Date.now()
        heartbeat("start")
    } else {
        heartbeat("stop")
        beacon()
    }
})



