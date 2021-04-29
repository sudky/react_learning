export function apicall(method, path, callback, data){
   var jsonData
   if(data){
       jsonData = JSON.stringify(data)
   }

   const xhr = new XMLHttpRequest()
   const url = `http://127.0.0.1:8080/api${path}`
   xhr.responseType = 'json'
   xhr.open(method, url)
   xhr.setRequestHeader("Content-Type", "application/json")
   xhr.onload = function(){
       callback(xhr.response, xhr.status)
   }
   xhr.onerror = function(){
       callback({"message": "Something went wrong. Please try again."}, 400)
   }

   xhr.send(jsonData)
}