
Implementing file storage and retrieval technique using GridFS in MongoDB



Akhil Rana
arana8@hawk.iit.edu
CSP554 Big Data Technologies
Mr. Jawahar Panchal
December 2, 2022
 
Introduction
	
Document databases can store files irrespective of the schema design which helps in adaptive storage and retrieval process. Using GridFS to shard collection into files and chunks enables easy access and sharing of files over web interface with additional security attributes.

The first V in defining ‘Big Data’ is the volume of data and especially unstructured data, which is amplifying rapidly with velocity and variety, generating large scale datasets. One such aspect of analysis and extraction of knowledge requires storing heavy document files in databases. An important use case of choosing MongoDB as the database to store files allows us a coherent file storage and retrieval technique. Instead of storing a file in a single document, GridFS divides the file into smaller chunks and store each chunk as a separate document.

GridFS is a specification for storing and retrieving files larger than the 16 MB size limit for BSON documents. GridFS divides a file into sections, or chunks, and saves each chunk as a separate document rather than storing the entire file in a single document. GridFS divides a file into 255 kB pieces by default, with the exception of the final chunk, and employs this default chunk size when dealing with files. The final portion is only as big as is required. Similar to this, files that do not exceed the chunk size just have a final chunk and occupy the minimum amount of space necessary plus some extra metadata.

GridFS stores files in two groupings. 1The file chunks are stored in one collection, while the file information is stored in the other. Each collection is described in depth under the section GridFS Collections. When you request a file from GridFS, the driver will reassemble the pieces as needed. Range queries may be run on files stored in GridFS. You may also retrieve data from arbitrary file parts, such as "skipping" to the center of a movie or audio clip.

GridFS is helpful not just for storing files larger than 16 MB, but also for storing any files that require access without requiring the complete file to be loaded into memory.

When should you use GridFS?
In some cases, storing huge files in a MongoDB database may be more efficient than on a system-level disk. If your filesystem restricts the amount of files that may be stored in a directory, you can utilize GridFS to store as many files as you need. 2GridFS may be used to remember chunks of files without reading the complete file into memory when you want to retrieve information from pieces of huge files without having to load entire files into memory.

GridFS may be used to maintain your files and metadata automatically synchronized and distributed across many systems and locations. MongoDB can automatically distribute files and their information to a number of mongod instances and facilities when employing globally distributed replica sets.

When not to use GridFS?
If you need to atomically change the content of a whole  file, avoid using GridFS. As an alternative, you may keep numerous copies of each file and designate the most recent version in the metadata. After uploading the new version of the file, you may use an atomic update to update the metadata field that shows "latest" status, and you can subsequently remove prior versions if necessary.

Furthermore, if all of your files are less than the 16 MB BSON Document Size restriction, consider storing them all in a single document rather than utilizing GridFS. To store binary data, use the BinData data type. For more information on utilizing BinData, consult your driver's documentation.

Architecture of GridFS
The flow diagram of my program.  ,3The execution will work in the following manner:






![title](Images/GridFS_Diagram_2.drawio.png)








Going over the flow diagram, the user can upload a document (in my program it’s limited to photos with any extension due to parsing issues with the multer-storage plugin) via a form along with short description. The GridFS module stores the image in the database and specifically in the collection in the form of files and chunks whose importance is discussed in the design stage. Upon retrieval of the document (which is done simultaneously on the homepage where all the objects or testcases are displayed), the plugin fetches the various chunks and display the entire document i.e., the stored image.

Design
I’ve created an application to showcase the working of the GridFS module by implementing a form connected by the MongoDB database and the frontend homepage through mongoose and grid-fs stream package. Initially, we will work out way up by fetching the libraries needed from the application. The required libraries are shown below by the code snippet:
 

![title](Images/Screenshot_2022-11-12_at_2.37.14_PM.png)

Figure 2: Libraries Installation.
 

![title](Images/Screenshot_2022-12-02_at_6.33.01_PM.png)
Figure 3: Exporting and requiring libraries.

After requiring all the libraries, I’ll walk through the setup before connecting the API’s and database with the frontend. First, we need to establish a connection with MongoDB through mongoose and get up a schema for a collection to be stored through gridfs-stream package. Following the official documentation and modifying to our needs i.e., the callback functions. After we’ve established a connection with the database our codebase will look like the snippet provided below:

![title](Images/Screenshot_2022-12-02_at_6.46.53_PM.png)
 
Attaching the callback functions on mongoose.connect and mongoose.connection for catching errors and handling the event listeners. I’ve provided additional comments for better readability. Once our buckets and collections are named, we’ll move to initialize the storage engine by setting up multer-gridfs-storage which helps us to store the documents by using the gridfs-stream API for creating chunks and files for the document being uploaded into the database. Also, we benefit from the built-in methods for better functionality. We can set up the storage engine by the following snippet:

![title](Images/Screenshot_2022-12-02_at_7.03.17_PM.png)
 
Here, we give the path of our mongo database’s url and the function returns a promise object after creating the name for the file using crypto plugin and it’s randomBytes method for 16 bit naming convention. We can also specify the extension of our document i.e, here it’s a image. ‘uploads’ is the bucket name specified by me as its being used at the mongo database.

Next step is setting up the middleware for our API calls. Middleware methods are exported by express library and we modify them according to our needs. I’ve included comments under each middleware and about its functionality. This concludes our setup and connections at the database level. For frontend I initially started developing react components but due to the limited routes, I’ve gone with EJS and have created a views directory under which all the pages are maintained.

![title](Images/Screenshot_2022-12-02_at_7.54.53_PM.png)
 
We can access the entire codebase by clicking on the project repository being hosted on GitHub. The repo link is: https://github.com/AkhilranaAR/CSP554-Project


