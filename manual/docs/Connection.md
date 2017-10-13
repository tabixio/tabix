## Direct connection 

* If open clickhouse 


## Use chproxy


chproxy provides the following features to tabix:


* chproxy may accept requests from readonly=1 users if allow_cors config is set. There is no need in add_http_cors_header hack.
* chproxy supports https out of the box, so tabix can send requests over untrusted networks without worrying that passwords may be intercepted.


https://github.com/Vertamedia/chproxy
