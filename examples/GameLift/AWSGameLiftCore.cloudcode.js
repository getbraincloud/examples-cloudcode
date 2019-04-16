/**
 * @module BrainCloudLift
 * @description Integrate BrainCloud with GameLift.
 * @version 1.0
 * Special Thanks To ChiefGUI for initial Version
 */
var response = {};
var EmptyJsonScriptData = {};
var HTTP_Path = "";

// Get BC Proxies.
var scriptProxy = bridge.getScriptServiceProxy();
var httpClientProxy = bridge.getHttpClientServiceProxy();

// This library will always perform actions only against GameLift.
var SERVICE = 'gamelift'

var HTTPserviceCode = "GameLift_" + kebabToSnake(data.region).toString();

// The default request method the actions will be performed.
// GameLift uses 'POST' as the default one for every and each action.
var DEFAULT_REQUEST_METHOD = 'POST'

// Debugging BrainCloud Script.
bridge.logDebug("Running the **AWSGameLiftCore** script...", null);

function hmac(key, keyEncoding, string) {
  var JsonScriptData = {
    "key": key,
    "keyEncoding": keyEncoding,
    "string": string
  }
  var postResult = scriptProxy.runScript("Sha", JsonScriptData)
  return postResult.data.response.hash
}

function hash(string) {
  var JsonScriptData = {
    "string": string
  }
  var postResult = scriptProxy.runScript("Sha256HEX", JsonScriptData)
  return postResult.data.response.hash
}

function kebabToSnake(str) {
  // Replace all dashes with.
  var myString = str.replace(/-/g, "_");
  // Return string.
  return myString;
}

/**
 * The AWS object
 * @param {Object} options All the options needed to perform AWS requests.
 * @param {string} options.region Region of the fleet corresponding to GameLift.
 * @param {string} options.action The action to perform the request. Ie. CreateGameSession, SearchGameSessions.
 * @param {string[]} [options.headers] Request headers given in object format {"key": "value"}
 * @param {Object[]} [options.params] Request parameters given in object format {"key": "value"}
 * @param {Object} [options.payload] Request payload given in object format {"key": "value"}
 * @param {Object} [options.local] Information needed to perform requests to GameLiftLocal
 * @param {string} options.local.address The address (IP, domain, etc.) where GameLiftLocal is running at.
 * @param {number} options.local.port The port GameLiftLocal is listening to.
 * @returns {Object} response The response object of the performed request.
 **/
var AWS = function (options) {
  this.options = options
  this.region = options.region
  this.params = options.params || {}
  this.headers = options.headers || {}
  this.payload = options.payload || {}

  var date = new Date()

  var GameLiftCredentialsCall = scriptProxy.runScript("AWSCredentials", EmptyJsonScriptData)

  this.key = GameLiftCredentialsCall.data.response.AWSCredentials.key
  this.secret = GameLiftCredentialsCall.data.response.AWSCredentials.secret

  this.headers.Host = getHost(options.region) // Must be present in headers
  this.headers['X-Amz-Date'] = this.awsDateTimeFormat(date)
  this.headers['Content-Type'] = 'application/x-amz-json-1.1'
  this.headers['X-Amz-Target'] = 'GameLift.' + options.action

  var requestHeaders = JSON.parse(JSON.stringify(this.headers))
  requestHeaders.Authorization = this.getAuthHeader(date)

  var canonicalQueryString = this.getCanonicalQueryString()
  var hasParameters = Object.keys(this.params).length > 0

  if (hasParameters) {
    HTTP_Path = '?' + canonicalQueryString
  }

  var HTTPresponse = httpClientProxy.getResponseJson(HTTPserviceCode, HTTP_Path, this.payload, requestHeaders);

  if (HTTPresponse === null) {
    return {
      status: 0,
      json: {}
    }
  }

  return {
    status: HTTPresponse.data.statusCode,
    json: HTTPresponse.data.json
  }
}

/**
 * Get the host of which requests will be performed against.
 * @param {string} region
 */
function getHost(region) {
  return SERVICE + '.' + region + '.amazonaws.com'
}

/**
 * Get the correct request URL depending on the target environment: local or production.
 * @param {Object} options The parameters of the function
 * @param {string} options.region The region of the GameLift's fleet
 * @param {string} options.canonicalQueryString The canonical query string to mount the request URL
 * @param {boolean} options.hasParameters If parameters are sending alongside the request, needed to prepare the endpoint.
 * @param {Object} [options.local] - the local object, containing information to make the request ping against GameLiftLocal
 * @returns {string}
 */
function getURLPath(options) {
  if (options.hasParameters) {
    path = +'?' + options.canonicalQueryString
  }
  if (path != null)
    return path
}

AWS.prototype.getCanonicalHeaders = function () {
  var h = this.headers
  return Object.keys(h)
    .sort()
    .map(function (name) {
      return name.toLowerCase().trim() + ':' + h[name].toString().trim() + '\n'
    })
    .join('')
}

AWS.prototype.getCanonicalQueryString = function () {
  var p = this.params
  return Object.keys(p)
    .sort()
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(p[key])
    })
    .join('&')
}

AWS.prototype.getAuthHeader = function (date) {
  return (
    'AWS4-HMAC-SHA256 Credential=' +
    this.key +
    '/' +
    this.getAwsCredentialScope(date) +
    ', SignedHeaders=' +
    this.getAwsSignedHeaders() +
    ', Signature=' +
    this.getAwsCredentialSignature(date)
  )
}

AWS.prototype.getAwsCredentialSignature = function (date) {
  return hmac(
    this.getAwsCredentialSignatureKey(date),
    'HEX',
    this.getAwsCredentialSignatureValue(date)
  )
}

AWS.prototype.getAwsCredentialSignatureKey = function (date) {
  var h1 = hmac('AWS4' + this.secret, 'TEXT', this.awsDateTimeFormatShort(date))
  var h2 = hmac(h1, 'HEX', this.region)
  var h3 = hmac(h2, 'HEX', SERVICE)
  return hmac(h3, 'HEX', 'aws4_request')
}

AWS.prototype.getAwsCredentialSignatureValue = function (date) {
  return [
    'AWS4-HMAC-SHA256',
    this.awsDateTimeFormat(date),
    this.getAwsCredentialScope(date),
    hash(this.getCanonicalRequest())
  ].join('\n')
}

AWS.prototype.getCanonicalRequest = function () {
  return [
    DEFAULT_REQUEST_METHOD,
    '/',
    this.getCanonicalQueryString(),
    this.getCanonicalHeaders(),
    this.getAwsSignedHeaders(),
    hash(this.payload)
  ].join('\n')
}

AWS.prototype.getAwsSignedHeaders = function () {
  return Object.keys(this.headers)
    .sort()
    .map(function (name) {
      return name.toLowerCase().trim()
    })
    .join(';')
}

AWS.prototype.getAwsCredentialScope = function (date) {
  return [
    this.awsDateTimeFormatShort(date),
    this.region,
    SERVICE,
    'aws4_request'
  ].join('/')
}

AWS.prototype.awsDateTimeFormat = function (date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '')
}

AWS.prototype.awsDateTimeFormatShort = function (date) {
  return this.awsDateTimeFormat(date).substring(0, 8)
}

// Start Calling AWS
response = new AWS(data);

// Send Back Response
response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"AWSGameLiftCore",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"",
// "parms":"{\\n}",
// "version":59,
// "updatedAt":1555348126742