let handle = async request =>
{
  let url = new URL(request.url)
  let response = {}
  let pretty = url.searchParams.has('pretty')
  let raw = url.searchParams.has('raw')

  try
  {
    url = new URL(url.searchParams.get('url'))
    let {method, headers, body} = request
    let res = await fetch(url, {method, headers, body})
    let responseHeaders = {}

    for (let [name, value] of res.headers)
      responseHeaders[name] = value

    if (raw)
    {
      responseHeaders['access-control-allow-origin'] = '*'

      return new Response(res.body, {
        status: res.status,
        headers: responseHeaders
      })
    }
    else
    {
      response.success = true
      response.url = res.url
      response.ok = res.ok
      response.redirected = res.redirected
      response.status = res.status
      response.statusText = res.statusText
      response.headers = responseHeaders
      response.body = await res.text()
    }
  }
  catch (error)
  {
    response.success = false
    response.message = error.message
  }

  if (pretty)
    response = JSON.stringify(response, null, 2)
  else
    response = JSON.stringify(response)

  return new Response(response, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*'
    }
  })
}

addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})
