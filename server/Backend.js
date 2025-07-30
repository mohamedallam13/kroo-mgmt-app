(function (root, factory) {
    root.BACKEND = factory();
  })(this, function () {
  
    const SYSTEM_SCRIPT_ID = 'https://script.google.com/macros/s/AKfycbxIFwg8NgLLc563_ndGgIyaPvQEVPFyyC88_3bqL1OQmBRrJXDVbKosPg9OUg-EOW3M/exec'
  
    function checkInPublicArea(request) {
      const parsedRequest = JSON.parse(request)
      const systemRequestObj = new PARequest(parsedRequest)
      console.log(systemRequestObj)
      const response = sendRequestToRemoteScript("signInPublicArea", systemRequestObj)
      return response
    }
  
    function PARequest(request) {
      this.member = request.member.email
      this.dailyType = request.formData.accessType.split(" ")[1]
      this.accessType = request.formData.accessType.split(" ")[0]
      this.discount = request.formData.discount
      this.multiplier = request.formData.multiplier
      this.fromApp = true
    }
  
    function bookRoom(request) {
      return true
    }
  
    function bookDedicatedDesks() {
      return true
    }
  
    function checkInDedicatedDesks(request) {
      return true
  
    }
  
    function addSunscription() {
      return true
    }
  
    function sendRequestToRemoteScript(functionName, params = {}) {
      const webAppUrl = SYSTEM_SCRIPT_ID
  
      try {
        const url = `${webAppUrl}?function=${functionName}&${Object.keys(params)
          .map(key => `${key}=${encodeURIComponent(params[key])}`)
          .join('&')}`;
  
        const response = UrlFetchApp.fetch(url);
  
        if (response.getResponseCode() !== 200) {
          throw new Error(`HTTP ${response.getResponseCode()}: ${response.getContentText()}`);
        }
  
        return JSON.parse(response.getContentText());
  
      } catch (error) {
        console.error(`Error calling ${functionName}:`, error);
        return { success: false, error: error.toString() };
      }
    }
  
  
    return {
      checkInPublicArea,
      bookRoom,
      checkInDedicatedDesks
    }
  
  })
  
  function testProcessPA() {
    const request = {
      member: {
        email: "Marlenbotros@gmail.com"
      },
      formData: {
        accessType: "Daily Plus",
        multiplier: 1
      }
    }
    BACKEND.checkInPublicArea(JSON.stringify(request))
  }
  
  function processPublicAreaAccess(request) {
    return BACKEND.checkInPublicArea(request)
  }
  
  function bookRoom(request) {
    return BACKEND.bookRoom(request)
  }
  
  function checkInDedicatedDesks(request) {
    return BACKEND.checkInDedicatedDesks(request)
  }