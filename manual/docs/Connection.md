## Direct connection 

* If open clickhouse , see russian article for more info : https://www.etlforeveryone.ru/single-post/connecttotabix


## Use chproxy


chproxy provides the following features to tabix:


* chproxy may accept requests from readonly=1 users if allow_cors config is set. There is no need in add_http_cors_header hack.
* chproxy supports https out of the box, so tabix can send requests over untrusted networks without worrying that passwords may be intercepted.


https://github.com/Vertamedia/chproxy



## Use mode "RO User" (experimentally)

Your need config in CH server :

* add_http_cors_header=1
* output_format_json_quote_64bit_integers=1
* output_format_json_quote_denormals=1


## Use mode "HTTP Auth" (experimentally)

Your need Nginx as http proxy