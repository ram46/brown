<h1> Brown Tour </h1>
Brown has 4 tabs as below:

# Four Tabs of Browns
<ul>
  <li> Home </li>
    <p style="text-indent: 10px"> It is a server side rendered page that contains all the information about the website architecture </p>
  <li> CRUD </li>
    <p style="text-indent: 10px"> It is a client side rendered page that allows user to create, read, update and delete IOCs. The input boxes have JSON validation check that turns the text green on good JSON </p>
  <li> Search </li>
    <p style="text-indent: 10px"> It is a client side rendered page. Search tab allows use to search for ioc in case files. Using drop downs a user can search for different versions of a ioc set  </p>
  <li> Visualize </li>
    <p style="text-indent: 10px"> It is a client side rendered page. It lets user to see the timeline of a case and a bar chart view for case's create, read, update and write count </p>
  <li> Subscribe </li>
    <p style="text-indent: 10px"> It is a client side rendered page that lets user subscribe to receive alert via email and/or sms.  </p>
</ul>



# Example for CRUD interface

<p> Create </p>
<pre> {"caseName":"APT222", "ioc": "ylio.exe", "ioctype":"file"}  </pre>

<p> Read </p>
<pre> {"caseName": "APT222"} </pre>

<p> Modify </p>
<pre> {"caseName": "APT222", "fromValue": "ylio.exe", "toValue":"1.2.3.4", "iocType":"ip"} </pre>

<p> Delete </p>
<pre> {"caseName": "APT222", "iocToDelete": "1.2.3.4"} </pre>

<p> For PWA </p>
<pre> /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
  --user-data-dir=/Users/{username}/Downloads/deleteme/
  --ignore-certificate-errors
  --unsafely-treat-insecure-origin-as-secure=https://ele-one-brown.com:7777/ </pre>

<br/> <hr/>



<video width="400" controls>
  <source src="views/eleone1.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>

