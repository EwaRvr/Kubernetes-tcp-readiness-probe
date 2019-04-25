# Kubernetes-tcp-readiness-probe
There is plenty of information available on the internet that indicates that you SHOULD have readiness and liveness probes to monitor the state of your kubernetes pods. However, most code samples available focus on using express, and creating http endpoints.
If you don't want to add an express dependency (and the potential additional attack vector on your app), it is fairly easy to use TCP instead. But there is not much information or an (reference) implementation out there exactly how to do that.

This library is to resolve that.

Usage:

```JavaScript
const probe = require('./Kubernetes-tcp-readiness-probe');
probe.start()
  .then(()=>{
    //start up your application
  })
  .then(()=>probe.ready());
```

Alternatively, you can specify your own ports and/or logger.
(Note, the valuesdisplayed below are the default values)
```JavaScript
const probe = require('./Kubernetes-tcp-readiness-probe');
probe.start({port:7070,logger:console})
  .then(()=>{
    //start up your application
  })
  .then(()=>probe.ready({port:7071,logger:console}));
```

For completeness, the corresponding yaml could look like:

```yaml
    readinessProbe:
      tcpSocket:
        port:7071
      initialDelaySeconds: 5
      periodSeconds: 10
      timeoutSeconds: 3
      successThreshold: 1
      failureThreshold: 5
    livenessProbe:
      tcpSocket:
        port:7070
      initialDelaySeconds: 15
      periodSeconds: 20
      timeoutSeconds: 3
      successThreshold: 1
      failureThreshold: 5
```
