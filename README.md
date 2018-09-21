# js-camera


## START SERVER API
On local development environment

```sh
vagrant up
```

The vagrant guest vm starts and has its ip address on "192.168.10.100".
Network IP address forwarding does NOT work as expected, the reason is not sure.
So the serverless app starts on ip address "192.16.10.100" instead of "localhost".

```sh
vagrant ssh
cd /opt/app/js-camera/serverless-api
sls offline start --host 192.168.10.100
```

### Create S3 Bucket
It is needed to create s3rver bucket at the first time only.

```sh
aws --endpoint http://localhost:8000 s3api create-bucket --bucket [bucket_name]
aws --endpoint http://localhost:8000 s3api list-buckets
```

## START FRONTEND

```sh
cd client
yarn watch
```
