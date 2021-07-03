const express = require('express')
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const app = express()
const port = 3000

mock_linode_list = JSON.stringify(
    {
        "data": [
            {
                "alerts": {
                    "cpu": 180,
                    "io": 10000,
                    "network_in": 10,
                    "network_out": 10,
                    "transfer_quota": 80
                },
                "backups": {
                    "enabled": true,
                    "last_successful": "2018-01-01T00:01:01",
                    "schedule": {
                        "day": "Saturday",
                        "window": "W22"
                    }
                },
                "created": "2018-01-01T00:01:01",
                "group": "Linode-Group",
                "hypervisor": "kvm",
                "id": 123,
                "image": "linode/debian10",
                "ipv4": [
                    "203.0.113.1",
                    "192.0.2.1"
                ],
                "ipv6": "c001:d00d::1337/128",
                "label": "linode123",
                "region": "us-east",
                "specs": {
                    "disk": 81920,
                    "memory": 4096,
                    "transfer": 4000,
                    "vcpus": 2
                },
                "status": "running",
                "tags": [
                    "example tag",
                    "another example"
                ],
                "type": "g6-standard-1",
                "updated": "2018-01-01T00:01:01",
                "watchdog_enabled": true
            }
        ],
        "page": 1,
        "pages": 1,
        "results": 1
    }
) 

apiToken = 'apiToken';

passport.use(new BearerStrategy(
    function(token, done) {
        if (token !== apiToken) {
            return done(null, false, {message: 'Incorrect token'});
        }
        return done(null, true);
    }
));

app.get(
    '/dst/api/v1/list',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(mock_linode_list)
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
