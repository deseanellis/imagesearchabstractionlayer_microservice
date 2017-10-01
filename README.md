Free Code Camp | Image Search Abstraction Layer
=========================

This microservice returns a list of image metadata using Google's Custom Search API. The list is paged, with 10 items returned on each page. Using an offset key you can transverse the pages. You can also view a list of the top 10 recent search terms.
The return format is JSON.

How to Use Image Search
-------------
Access the Search API via /api/imagesearch/

Append your search term to the API endpoint.

`https://cedar-lamp.glitch.me/api/imagesearch/liverpool`

Offset using the "offset" key, when the value is the page number (by default the page number is set to 1, when no key is specified).

`https://cedar-lamp.glitch.me/api/imagesearch/liverpool?offset=2`

How to View Recent Search Terms
-------------
Access the Recent Search Terms API via /api/latest/imagesearch/

`https://cedar-lamp.glitch.me/api/latest/imagesearch/`

You will receive a JSON response:

`{ "term": "lolcats funny", "when": "2017-10-01T07:02:17.665Z"}`

Developed by DeSean Ellis - Free Code Camp