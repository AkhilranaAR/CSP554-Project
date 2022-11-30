CSP554 - Big Data Technologies

Course Project -Draft
Fall 2022

Akhil Rana
arana8@hawk.iit.edu



Implementing file storage and retrieval technique using GridFS in MongoDB


Introduction:
GridFS is a specification of MongoDB facilitating storage and retrieval of files exceeding the document-size limit of 16 MB. Instead of storing the file or the document in its entirety, GridFS divides it into smaller chunks with each one having a default size of 255 kB. GridFS uses two collections to store files. One collection stores the file chunks, and the other stores the metadata for finding the next chunk, thus promoting the retrieval of the document in an efficient manner. 

Architecture:
The flow diagram of my program. The execution will work in the following manner:


























Design:
For the project I’ll be developing a GridFS plugin/module which is currently running on localhost server and I may publish it on a container-based cloud platform for hoisting. 

-	I’ve installed the following libraries and each serve a purpose in my application.

 
Figure 2: Libraries installed.

-	The current status of the application is that I’ve established a connection between the mongo daemon (mongod) via a ORM (Object relational mapping) called mongoose with the frontend, which can be linked by gridfs-stream for creating documents inside the selected collection using the MongoDB’s GridFS module.

-	The user can select any type of document and upload it through the frontend i.e., form of the application. After the upload is successful, the documents and its fs.files and fs.chucks can be viewed by accessing the collection. It’s highly probable (next step) I’ll be displaying the chucks on the right hand side of the window, for analysis comparison. Thus, try to find the use cases for different types of documents i.e., video files, heavy image file, etc and come up with improved anatomy and suggestions.  

-	I’ll be analysing the time and size comparison of bulky files as well as the chucks for such documents and display the analysis in a graphical format. Queries for fetching the documents can also be compared for better performance.

-	All documents stored by the means of GridFS along with the metadata can be viewed by the user for fetching data. This also serves the purpose of maintain the unit and integration tests.

-	If needed, more routes can be made for increasing the functionality of the project. The middleware and API layer can be scaled by just developing new .ejs files for the said functionality. Currently, the documents are queried from the mongo CLI shell and fed to the API’s for generating the analysis (next steps).

-	I’ve pushed my code to GitHub and the link to the repository is https://github.com/AkhilranaAR/CSP554-Project the repo is public and future collaboration is most appreciated.



 
Figure 3: Screengrab of UI.


Links:
Project is published on GitHub and the repository link is as follows:
https://github.com/AkhilranaAR/CSP554-Project 

Conclusion:
The implementation of GridFS module will be analysed and conclusions will be fabricated on the basis of such comparisons.

References:
-	2022 MongoDB, Inc. “GridFS” mongodb 2022. November 10, 2022. https://www.mongodb.com/docs/manual/core/gridfs/#std-label-gridfs-collections
-	2022 MongoDB, Inc. “Sharding” mongodb 2022. November 11, 2022. https://www.mongodb.com/docs/upcoming/sharding/ 
-	Wang, Shuang. Li, Guoqing. “A Distributed Storage and Access Approach for Massive Remote Sensing Data in MongoDB”. MDPI. November 27, 2019. https://www.mdpi.com/2220-9964/8/12/533/htm
-	Qinghu, Li. Jianmin, Wang. Lam, Kwok Yan. Jiaguang, Sun. “GridFS: A Web-Based Data Grid for the Distributed Sharing of Educational Resource Files”. Springer, Berlin, Heidelberg. 2003. https://link.springer.com/chapter/10.1007/978-3-540-45200-3_9
-	Kudo, Tsukasa. Ito, Yuki. Serizawa, Yuki. “An Application of MongoDB to Enterprise System Manipulating Enormous Data”. International Journal of Informatics Society. Vol. 9, No. 3. 2017. http://www.infsoc.org/journal/vol09/IJIS_09_3_097-108.pdf
