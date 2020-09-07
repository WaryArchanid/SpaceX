# SpaceX Launch Program
SpaceX Launch Program is application program which is used to get the details by API. It's about the SpaceX launches where we can filter launch programs by year, landing and launching. Filter can also applied by combined all search criteria. 

![image](https://user-images.githubusercontent.com/37687132/92406960-f77f0680-f156-11ea-8320-c1d0cc680ce9.png)

## Technologies
- Bootstrap 4
- Core JavaScript
- Web API
  - fetch API
- CSS
- HTML

## Setup
To run this application, install XAMPP Web Server locally:
![image](https://user-images.githubusercontent.com/37687132/92408286-a6711180-f15a-11ea-93b0-5a78bec5194d.png)
  - XAMPP can be download from https://www.apachefriends.org/download.html
  - After successful installation, click on start button to start the server
  - Copy folder or Extract if zip file to the htdocs folder within the XAMPP Folder
  - Navigate to the browser and type url http://localhost/{application_path} (Replace application_path with actual application root folder)

## Approach
Core Javascript used to server side rendering the elements. Create Class where functions has been declared, and each function has it's own functonality which fulfil the application needs to make it working. On the Page load, trigger request to the server through API with the help fo fetch function. Within the fetch function fetch api has been used to which accept one parameter which is API URL. API url dyanmically generated using the url function which append the query string to the API. By using an async and await keywords which makes the function asynchronous.

## Deployed Url
http://pixacafe.in/SpaceX/
